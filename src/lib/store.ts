'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  selectedPlan: string | null
  isLoggedIn: boolean
  userEmail: string | null
  checkoutUrl: string | null
  setSelectedPlan: (plan: string) => void
  setLoggedIn: (status: boolean) => void
  setUserEmail: (email: string | null) => void
  setCheckoutUrl: (url: string | null) => void
  reset: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedPlan: null,
      isLoggedIn: false,
      userEmail: null,
      checkoutUrl: null,
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      setLoggedIn: (status) => set({ isLoggedIn: status }),
      setUserEmail: (email) => set({ userEmail: email }),
      setCheckoutUrl: (url) => set({ checkoutUrl: url }),
      reset: () => set({
        selectedPlan: null,
        isLoggedIn: false,
        userEmail: null,
        checkoutUrl: null
      })
    }),
    {
      name: 'levin-app-storage'
    }
  )
)