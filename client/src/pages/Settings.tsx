import React from 'react'
import { useAppContext } from '../context/AppContext'
import { Database, Trash2, Save } from 'lucide-react'

export default function Settings() {
  const { loadDemoData, clearData } = useAppContext()

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={24} className="text-accent" />
          Gestione Dati (Modalità Demo)
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          L'applicazione è attualmente in modalità demo. I dati sono salvati localmente nel browser.
          Usa questi controlli per popolare l'app con dati di esempio o per svuotarla.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={() => {
            loadDemoData()
            alert('Dati demo caricati con successo!')
          }}>
            <Database size={18} /> Carica Dati Demo
          </button>
          <button className="btn btn-danger" onClick={() => {
            if(confirm('Sei sicuro di voler eliminare tutti i dati locali?')) {
              clearData()
            }
          }}>
            <Trash2 size={18} /> Azzera Dati
          </button>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Profilo Studio</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          alert('Impostazioni salvate (simulazione)')
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Nome Studio</label>
              <input type="text" className="form-control" defaultValue="StudioFlow Demo" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Contatto</label>
              <input type="email" className="form-control" defaultValue="info@studioflow.demo" />
            </div>
            <div className="form-group">
              <label className="form-label">Partita IVA</label>
              <input type="text" className="form-control" defaultValue="IT12345678901" />
            </div>
            <div className="form-group">
              <label className="form-label">Valuta</label>
              <select className="form-control">
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            <Save size={18} /> Salva Impostazioni
          </button>
        </form>
      </div>
    </div>
  )
}