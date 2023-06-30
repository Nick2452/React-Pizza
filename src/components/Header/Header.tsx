import React, { useEffect, useRef } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { Search } from '../Search'

import logo from '../../image/pizza-logo.svg'
import { useSelector } from 'react-redux'
import { selectCart } from '../../redux/slices/cartSlice'

import './Header.scss'

export const Header: React.FC = () => {
	const { items, totalPrice } = useSelector(selectCart)
	const location = useLocation()
	const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)

	const isMounted = useRef(false)

	useEffect(() => {
		if (isMounted.current) {
			const json = JSON.stringify(items)
			localStorage.setItem('cart', json)
		}
		isMounted.current = true
	}, [items])

	return (
		<div className='header'>
			<div className='container'>
				<Link to='/'>
					<div className='header__logo'>
						<img width='38' src={logo} alt='Pizza logo' />
						<div>
							<h1>React Pizza</h1>
							<p>самая вкусная пицца во вселенной</p>
						</div>
					</div>
				</Link>
				<Search />
				{location.pathname !== '/cart' && (
					<div className='header__cart'>
						<Link to='/cart' className='button button--cart'>
							<span>{totalPrice} CZK</span>
							<AiOutlineShoppingCart size={20} className='icon' />
							<p>{totalCount}</p>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
