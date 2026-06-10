import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Client { id: string; name: string; email: string; phone: string; status: 'active' | 'inactive' }
export interface Appointment { id: string; clientId: string; title: string; date: string; status: 'scheduled' | 'completed' | 'cancelled' }
export interface Invoice { id: string; clientId: string; amount: number; date: string; status: 'paid' | 'pending' | 'overdue' }

interface AppState {
  clients: Client[]
  appointments: Appointment[]
  invoices: Invoice[]
  addClient: (c: Omit<Client, 'id'>) => void
  addAppointment: (a: Omit<Appointment, 'id'>) => void
  addInvoice: (i: Omit<Invoice, 'id'>) => void
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void
  loadDemoData: () => void
  clearData: () => void
}

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const addClient = (c: Omit<Client, 'id'>) => {
    setClients(prev => [{ ...c, id: Math.random().toString(36).substr(2, 9) }, ...prev])
  }
  const addAppointment = (a: Omit<Appointment, 'id'>) => {
    setAppointments(prev => [{ ...a, id: Math.random().toString(36).substr(2, 9) }, ...prev])
  }
  const addInvoice = (i: Omit<Invoice, 'id'>) => {
    setInvoices(prev => [{ ...i, id: Math.random().toString(36).substr(2, 9) }, ...prev])
  }
  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }
  const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }

  const loadDemoData = () => {
    const demoClients: Client[] = [
      { id: 'c1', name: 'Mario Rossi', email: 'mario@example.com', phone: '3331234567', status: 'active' },
      { id: 'c2', name: 'Giulia Bianchi', email: 'giulia@example.com', phone: '3339876543', status: 'active' },
      { id: 'c3', name: 'Luca Verdi', email: 'luca@example.com', phone: '3335554444', status: 'inactive' }
    ]
    const demoAppointments: Appointment[] = [
      { id: 'a1', clientId: 'c1', title: 'Consulenza Fiscale', date: new Date(Date.now() + 86400000).toISOString(), status: 'scheduled' },
      { id: 'a2', clientId: 'c2', title: 'Revisione Bilancio', date: new Date(Date.now() - 86400000).toISOString(), status: 'completed' }
    ]
    const demoInvoices: Invoice[] = [
      { id: 'i1', clientId: 'c1', amount: 1500, date: new Date().toISOString().split('T')[0], status: 'pending' },
      { id: 'i2', clientId: 'c2', amount: 850, date: new Date(Date.now() - 864000000).toISOString().split('T')[0], status: 'paid' },
      { id: 'i3', clientId: 'c3', amount: 420, date: new Date(Date.now() - 2592000000).toISOString().split('T')[0], status: 'overdue' }
    ]
    setClients(demoClients)
    setAppointments(demoAppointments)
    setInvoices(demoInvoices)
  }

  const clearData = () => {
    setClients([])
    setAppointments([])
    setInvoices([])
  }

  return (
    <AppContext.Provider value={{ clients, appointments, invoices, addClient, addAppointment, addInvoice, updateAppointmentStatus, updateInvoiceStatus, loadDemoData, clearData }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}