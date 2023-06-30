import React, { useEffect, useRef } from 'react'

import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { SortPopUp, sortList } from '../components/Sort/Sort'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Categories } from '../components/Categories/Categories'
import { Pagination } from '../components/Pagination'
import { PizzaBlockSkeleton } from '../components/PizzaBlock/PizzaBlockSkeleton'

import { useSelector } from 'react-redux'
import {
	selectFilter,
	selectSortType,
	setCategoryId,
	setCurrenrPage,
	setFilters,
} from '../redux/slices/filterSlice'
import {
	SearchPizzaParams,
	Status,
	fetchPizzas,
	selectPizzaData,
} from '../redux/slices/pizzasSlice'

import './Home.scss'
import { useAppDispatch } from '../redux/store'
export const Home: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { categoryId, currentPage, searchValue } = useSelector(selectFilter)
	const sortType = useSelector(selectSortType)

	const { items, status } = useSelector(selectPizzaData)

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (page: number) => {
		dispatch(setCurrenrPage(page))
	}

	const getPizzas = async () => {
		const sortBy = sortType.replace('-', '')
		const order = sortType.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage: Number(currentPage),
			})
		)
		window.scrollTo(0, 0)
	}

	// useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(
	// 			window.location.search.substring(1)
	// 		) as unknown as SearchPizzaParams

	// 		const sort = sortList.find(obj => obj.sortType === params.sortBy)

	// 		dispatch(
	// 			setFilters({
	// 				searchValue: params.search,
	// 				categoryId: Number(params.category),
	// 				currentPage: Number(params.currentPage),
	// 				sort: sort || sortList[0],
	// 			})
	// 		)

	// 		isSearch.current = true
	// 	}
	// }, [])

	useEffect(() => {
		if (!isSearch.current) {
			getPizzas()
		}
		isSearch.current = false
	}, [categoryId, sortType, searchValue, currentPage])

	// useEffect(() => {
	// 	if (isMounted.current) {
	// 		const queryString = qs.stringify(
	// 			{
	// 				sortType: sortType,
	// 				currentPage,
	// 				categoryId,
	// 			},
	// 			{ addQueryPrefix: true }
	// 		)
	// 		navigate(`${queryString}`)
	// 	}
	// 	isMounted.current = true
	// }, [categoryId, sortType, currentPage])

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(6)].map((_, index) => (
		<PizzaBlockSkeleton key={index} />
	))

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<SortPopUp />
			</div>
			<h2 className='content__title'>All Pizzas</h2>
			{status === 'error' ? (
				<div className='error'>
					<h2 className='error__title'>Произошла ошибка 😕</h2>
					<p>Не удалось получить питсы,попробуйте повторить попытку позже =)</p>
				</div>
			) : (
				<div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}
