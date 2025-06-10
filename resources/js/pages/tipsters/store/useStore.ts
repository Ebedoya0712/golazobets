import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Tipster {
	id: number
	name: string
	avatar?: string
	wins: number
	losses: number
	winRate: number
	roi: number
	status: 'active' | 'inactive'
}

interface FilterState {
	orderBy: string
	sport: number | null
}

interface TipsterStore {
	tipsters: Tipster[]
	selectedTipster: Tipster | null
	filterFreeTipsters: FilterState
	filterPremiumTipsters: FilterState
	setTipsters: (tipsters: Tipster[]) => void
	addTipster: (tipster: Tipster) => void
	updateTipster: (id: number, data: Partial<Tipster>) => void
	deleteTipster: (id: number) => void
	selectTipster: (tipster: Tipster | null) => void
}

export const useStore = create<TipsterStore>()(
	persist(
		(set) => ({
			tipsters: [],
			selectedTipster: null,
			filterFreeTipsters: {
				orderBy: 'created_at',
				sport: null,
			},
			filterPremiumTipsters: {
				orderBy: 'created_at',
				sport: null,
			},
			setTipsters: (tipsters) => set({ tipsters }),
			addTipster: (tipster) =>
				set((state) => ({
					tipsters: [...state.tipsters, tipster],
				})),
			updateTipster: (id, data) =>
				set((state) => ({
					tipsters: state.tipsters.map((t) =>
						t.id === id ? { ...t, ...data } : t
					),
				})),
			deleteTipster: (id) =>
				set((state) => ({
					tipsters: state.tipsters.filter((t) => t.id !== id),
				})),
			selectTipster: (tipster) => set({ selectedTipster: tipster }),
		}),
		{
			name: 'tipster-storage',
		}
	)
)
