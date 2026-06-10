import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles-1.css'
import './styles-2.css'
import './styles-3.css'

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#fff', background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>Si è verificato un problema</h1>
          <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>{this.state.error?.message || 'Errore imprevisto'}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ background: '#06b6d4', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
          >
            Ricarica l'applicazione
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)