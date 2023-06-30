import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { Sort } from './filterSlice'

export enum Status {
	LOADING = 'loading',
	ERROR = 'error',
	SUCCESS = 'success',
}

interface PizzaSliceState {
	items: Pizza[]
	status: Status
}

type Pizza = {
	id: number
	title: string
	imageUrl: string
	price: number
	sizes: number[]
	types: number[]
	rating: string
}

export type SearchPizzaParams = {
	sortBy: string
	order: string
	category: string
	search: string
	currentPage: number
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async params => {
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get<Pizza[]>(
			`https://645779f50c15cb14820985bf.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = Status.LOADING
			state.items = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload
			state.status = Status.SUCCESS
		})
		builder.addCase(fetchPizzas.rejected, state => {
			state.status = Status.ERROR
			state.items = []
		})
	},

	// extraReducers: {
	// 	[fetchPizzas.pending]: state => {
	// 		state.status = 'Loading'
	// 		state.items = []
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload
	// 		state.status = 'success'
	// 	},

	// 	[fetchPizzas.rejected]: (state, action) => {
	// 		state.status = 'Error'
	// 		state.items = []
	// 	},
	// },
})

export const selectPizzaData = (state: RootState) => state.pizza
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
