import React, { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'

import './PizzaBlock.scss'

const typesName = ['тонкое', 'традиционное', 'фирменное']

export const PizzaBlock = ({ id, title, imageUrl, price, sizes, types }) => {
	const [activeType, setActiveType] = useState(0)
	const [activeSize, setActiveSize] = useState(0)

	const cartItem = useSelector(state => state.cart.items.find(obj => obj.id === id))

	// const cartItem = useSelector(state =>
	// 	state.cart.items.find(
	// 		obj =>
	// 			obj.id === id && obj.type === types[activeType] && obj.size === sizes[activeSize]
	// 	)
	// )

	const dispatch = useDispatch()

	const addedInCart = cartItem ? cartItem.count : 0

	const onClickAdd = () => {
		const item = {
			id,
			title,
			imageUrl,
			price,
			sizes: sizes[activeSize],
			types: typesName[activeType],
		}
		dispatch(addItem(item))
	}

	return (
		<div className='pizza-block-wrapper'>
			<div className='pizza-block'>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
				<h4 className='pizza-block__title'>{title}</h4>
				<div className='pizza-block__selector'>
					<ul>
						{types.map((type, i) => (
							<li
								key={i}
								onClick={() => setActiveType(type)}
								className={activeType === type ? 'active' : ''}
							>
								{typesName[type]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, i) => (
							<li
								key={i}
								onClick={() => setActiveSize(i)}
								className={activeSize === i ? 'active' : ''}
							>
								{size} см.
							</li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {price} CZK</div>
					<button onClick={onClickAdd} className='button button--outline button--add'>
						<BsPlusLg />
						<span>Добавить</span>
						{addedInCart > 0 && <i className='count'>{addedInCart}</i>}
					</button>
				</div>
			</div>
		</div>
	)
}
