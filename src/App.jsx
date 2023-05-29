import { Header } from './components/Header/Header'

import './styles/global.scss'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound/NotFound'
import { Cart } from './pages/Cart/Cart'
import { Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'

export const SearchContext = React.createContext()

function App() {
	const [searchValue, setSearchValue] = useState('')

	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home searchValue={searchValue} />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	)
}

export default App
