import { useReducer, type PropsWithChildren, createContext } from 'react'
import { type SortDescriptor } from '@nextui-org/react'

import type { NotificationContextProps } from '@/types/notifications'

const initialState = {
	selectedNotification: null,
	sortDescriptor: {} as SortDescriptor,
	listLoading: true,
}

function reducer(state: any, action: any) {
	switch (action.type) {
		case 'setSortDescriptor':
			return { ...state, sortDescriptor: action.payload }
		case 'setListLoading':
			return { ...state, listLoading: action.payload }
		default:
			throw new Error()
	}
}

export const NotificationContext =
	createContext<NotificationContextProps | null>(null)

export const NotificationProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<NotificationContext.Provider value={{ state, dispatch }}>
			{children}
		</NotificationContext.Provider>
	)
}
