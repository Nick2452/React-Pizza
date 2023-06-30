import React from 'react'
import ContentLoader from 'react-content-loader'

export const PizzaBlockSkeleton: React.FC = props => {
	return (
		<ContentLoader
			speed={2}
			width={280}
			height={500}
			viewBox='0 0 280 500'
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
			{...props}
		>
			<circle cx='135' cy='110' r='110' />
			<rect x='0' y='245' rx='0' ry='0' width='280' height='31' />
			<rect x='0' y='294' rx='10' ry='10' width='280' height='90' />
			<rect x='0' y='408' rx='10' ry='10' width='100' height='28' />
			<rect x='135' y='398' rx='20' ry='20' width='150' height='45' />
		</ContentLoader>
	)
}
