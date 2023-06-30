import React from 'react'

import './NotFound.scss'

export const NotFound: React.FC = () => {
	return (
		<div className='notFound'>
			<h1 className='notFound__title'>
				<span>😕</span>
				<br />
				Not Found
			</h1>
		</div>
	)
}
