import React, { useCallback, useRef, useState } from 'react'

import debounce from 'lodash.debounce'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdClear } from 'react-icons/md'
import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

export const Search: React.FC = () => {
	const [value, setValue] = useState('')
	const dispatch = useDispatch()
	const inputRef = useRef<HTMLInputElement>(null)

	const onClearInput = () => {
		dispatch(setSearchValue(''))
		setValue('')

		// if (inputRef.current) {
		// 	inputRef.current.focus()
		// }

		inputRef.current?.focus()
	}

	const updateSearchValue = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str))
		}, 300),
		[]
	)

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
