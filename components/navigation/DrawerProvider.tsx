'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface DrawerContextType {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const DrawerContext = createContext<DrawerContextType | null>(null)

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DrawerContext.Provider value={{
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(prev => !prev),
    }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawer() {
  const ctx = useContext(DrawerContext)
  if (!ctx) throw new Error('useDrawer must be used within DrawerProvider')
  return ctx
}
