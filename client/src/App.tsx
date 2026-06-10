import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DemoBanner from './components/DemoBanner'
import { AppProvider } from './context/AppContext'

// Lazy load pages (we will create them next)
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Appointments from './pages/Appointments'
import Invoices from './pages/Invoices'
import Settings from './pages/Settings'

export default function App() {
  const location = useLocation()
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/': return 'Dashboard'
      case '/clients': return 'Gestione Clienti'
      case '/appointments': return 'Appuntamenti'
      case '/invoices': return 'Fatturazione'
      case '/settings': return 'Impostazioni'
      default: return 'StudioFlow'
    }
  }

  return (
    <AppProvider>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <DemoBanner />
          <Header title={getPageTitle()} />
          <div className="page-content animate-fade-in">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </AppProvider>
  )
}