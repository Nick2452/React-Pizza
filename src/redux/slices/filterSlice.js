import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	sort: { name: 'популярности', sortProperty: 'rating' },
	currentPage: 1,
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setCurrenrPage(state, action) {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			state.currentPage = Number(action.payload.currentPage)
			state.categoryId = Number(action.payload.categoryId)
			state.sort = action.payload.sort
		},
	},
})

export const { setCategoryId, setSort, setCurrenrPage, setFilters } = filterSlice.actions

export default filterSlice.reducer