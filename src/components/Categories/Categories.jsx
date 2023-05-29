import React, { useState } from 'react'

import './Categories.scss'
export const Categories = ({ value, onChangeCategory }) => {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, i) => (
					<li
						key={i}
						className={value === i ? 'active' : ''}
						onClick={() => onChangeCategory(i)}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}