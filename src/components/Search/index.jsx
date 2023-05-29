import React, { useCallback, useContext, useRef, useState } from 'react'
import { SearchContext } from '../../App'

import debounce from 'lodash.debounce'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdClear } from 'react-icons/md'
import styles from './Search.module.scss'

export const Search = () => {
	const [value, setValue] = useState('')

	const { setSearchValue } = useContext(SearchContext)
	const inputRef = useRef()

	const onClearInput = () => {
		setSearchValue('')
		setValue('')
		inputRef.current.focus()
	}

	const updateSearchValue = useCallback(
		debounce(str => {
			setSearchValue(str)
		}, 300),
		[]
	)

	const onChangeInput = event => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.search}>
			<HiOutlineSearch className={styles.icon} />
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Search pizzas...'
			/>
			{value && <MdClear onClick={onClearInput} className={styles.iconClear} />}
		</div>
	)
}
