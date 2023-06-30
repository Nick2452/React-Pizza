import React from 'react'

import emptyCart from '../../image/empty-cart.png'

export const CartEmpty: React.FC = () => {
	return (
		<>
			<div className='cart cart--empty'>
				<h2>
					Корзина пустая <span>😕</span>
				</h2>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу.
					<br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src={emptyCart} alt='Empty Cart' />
				<a href='/' className='button button--black'>
					<span>Вернуться назад</span>
				</a>
			</div>
		</>
	)
}
