import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/types'

export interface MainStoreProps {
	sidebarOpen: boolean
	setSidebarOpen: (value: boolean) => void
}

export const useMainStore = create<MainStoreProps>()(
	persist(
		(set, get) => ({
			sidebarOpen: false,
			setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),
		}),
		{
			name: 'store',
			storage: createJSONStorage(() => localStorage),
		}
	)
)
