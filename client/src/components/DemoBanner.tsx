import React, { useState } from 'react'
import { HAS_BACKEND } from '../config'
import { X, Info } from 'lucide-react'

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(!HAS_BACKEND)

  if (!isVisible) return null

  return (
    <div style={{ 
      background: 'rgba(6, 182, 212, 0.1)', 
      borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
      padding: '0.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      color: 'var(--accent)',
      fontSize: '0.875rem',
      position: 'relative',
      zIndex: 50
    }}>
      <Info size={16} />
      <span><strong>Modalità Demo:</strong> i dati sono salvati localmente. Scarica il codice e segui il README per collegare il backend reale.</span>
      <button 
        onClick={() => setIsVisible(false)}
        style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.25rem' }}
      >
        <X size={16} />
      </button>
    </div>
  )
}