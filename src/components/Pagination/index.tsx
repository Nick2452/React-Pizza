import React from 'react'

import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

type PaginationProps = {
	currentPage: number
	onChangePage: (selected: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.paginate}
			breakLabel='...'
			nextLabel='>'
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			previousLabel='<'
			forcePage={currentPage - 1}
		/>
	)
}
