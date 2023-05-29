import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Search } from '../Search'

import logo from '../../image/pizza-logo.svg'
import './Header.scss'
import { useSelector } from 'react-redux'

export const Header = () => {
	const { items, totalPrice } = useSelector(state => state.cart)

	const totalCount = items.reduce((sum, item) => sum + item.count, 0)
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
				<div className='header__cart'>
					<Link to='/cart' className='button button--cart'>
						<span>{totalPrice} CZK</span>
						<AiOutlineShoppingCart size={20} className='icon' />
						<p>{totalCount}</p>
					</Link>
				</div>
			</div>
		</div>
	)
}
