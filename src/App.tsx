import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound/NotFound'
import { Cart } from './pages/Cart/Cart'
import { Route, Routes } from 'react-router-dom'

import FullPizza from './pages/FullPizza/FullPizza'

import MainLayout from './components/Layout/MainLayout'
import './styles/global.scss'
function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='pizza/:id' element={<FullPizza />} />
				<Route path='cart' element={<Cart />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
