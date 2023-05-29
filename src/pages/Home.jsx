import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { Sort, sortList } from '../components/Sort/Sort'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Categories } from '../components/Categories/Categories'
import { Pagination } from '../components/Pagination'
import { PizzaBlockSkeleton } from '../components/PizzaBlock/PizzaBlockSkeleton'

import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setCurrenrPage, setFilters } from '../redux/slices/filterSlice'

export const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const categoryId = useSelector(state => state.filter.categoryId)
	const currentPage = useSelector(state => state.filter.currentPage)
	const sortType = useSelector(state => state.filter.sort.sortProperty)

	const { searchValue } = useContext(SearchContext)
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const onChangeCategory = id => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = number => {
		dispatch(setCurrenrPage(number))
	}

	const fetchPizzas = () => {
		setIsLoading(true)
		const sortBy = sortType.replace('-', '')
		const order = sortType.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		try {
			axios
				.get(
					`https://645779f50c15cb14820985bf.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
				)
				.then(res => {
					setItems(res.data)
					setIsLoading(false)
				})
		} catch (err) {
			console.log(err, 'This is error')
		}

		window.scrollTo(0, 0)
	}

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortList.find(obj => obj.sortType === params.sortProperty)

			dispatch(setFilters({ ...params, sort }))

			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		if (!isSearch.current) {
			fetchPizzas()
		}
		isSearch.current = false
	}, [categoryId, sortType, searchValue, currentPage])

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify(
				{
					sortType: sortType,
					currentPage,
					categoryId,
				},
				{ addQueryPrefix: true }
			)
			navigate(`${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sortType, currentPage])

	const pizzas = items.map(obj => (
		<PizzaBlock
			key={obj.id}
			{...obj}
			// title={pizza.title}
			// price={pizza.price}
			// image={pizza.imageUrl}
			// sizes={pizza.sizes}
			// types={pizza.types}
		/>
	))
	const skeletons = [...new Array(6)].map((_, index) => (
		<PizzaBlockSkeleton key={index} />
	))

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>All Pizzas</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination value={currentPage} onChangePage={onChangePage} />
		</div>
	)
}
