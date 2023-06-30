import axios from 'axios'

import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './FullPizza.scss'

const FullPizza: React.FC = () => {
	const { id } = useParams()
	const [pizza, setPizza] = useState<{
		imageUrl: string
		price: number
		title: string
		descr: string
	}>()

	const navigate = useNavigate()

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://645779f50c15cb14820985bf.mockapi.io/items/' + id
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при пролучении пиццы!')
				navigate('/')
			}
		}

		fetchPizza()
	}, [])

	if (!pizza) {
		return 'Loading....'
	}

	return (
		<div className='container'>
			<div className='pizza__info'>
				<img className='img' src={pizza.imageUrl} />
				<p className='pizza__info-descr'>{pizza.descr}</p>
			</div>
			<h2>{pizza.title}</h2>
			<p className='price'>от {pizza.price} CZK</p>
			<div className='btn'>
				<Link to={'/'}>
					<button className='btn__back'>Back</button>
				</Link>
			</div>
		</div>
	)
}

export default FullPizza
