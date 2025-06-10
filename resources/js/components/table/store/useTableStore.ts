import { create } from 'zustand'

interface TableState {
	// data: any[]
	// setData: (data: any[]) => void

	loading: boolean
	setLoading: (loading: boolean) => void

	error: string | null
	setError: (error: string | null) => void
	resetState: () => void
}

const initialState = {
	// data: [],
	loading: true,
	error: null,
}

export const useTableStore = create<TableState>((set) => ({
	...initialState,

	// setData: (data) => set({ data }),

	setLoading: (loading) => set({ loading }),

	setError: (error) => set({ error }),

	resetState: () => set(initialState),
}))
