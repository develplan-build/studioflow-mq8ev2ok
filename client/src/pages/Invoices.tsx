import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Plus, FileText, Download, CheckCircle } from 'lucide-react'

export default function Invoices() {
  const { invoices, clients, addInvoice, updateInvoiceStatus } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getClientName = (id: string) => clients.find(c => c.id === id)?.name || 'Cliente Sconosciuto'

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid': return <span className="badge badge-success">Pagata</span>
      case 'pending': return <span className="badge badge-info">In attesa</span>
      case 'overdue': return <span className="badge badge-warning">Scaduta</span>
      default: return null
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Fatture</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuova Fattura
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {invoices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><FileText size={48} /></div>
            <h3 className="empty-state-title">Nessuna fattura</h3>
            <p className="empty-state-desc">Non hai ancora emesso fatture.</p>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Emetti la prima fattura</button>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Numero / Data</th>
                  <th>Cliente</th>
                  <th>Importo</th>
                  <th>Stato</th>
                  <th style={{ textAlign: 'right' }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {invoices.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(inv => (
                  <tr key={inv.id}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span style={{ fontWeight: 500 }}>FATT-{inv.id.toUpperCase()}</span>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          {new Date(inv.date).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{getClientName(inv.clientId)}</td>
                    <td style={{ fontWeight: 600 }}>€{inv.amount.toLocaleString()}</td>
                    <td>{getStatusBadge(inv.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        {inv.status !== 'paid' && (
                          <button className="btn btn-secondary" style={{ padding: '0.25rem', color: 'var(--success)' }} onClick={() => updateInvoiceStatus(inv.id, 'paid')} title="Segna come pagata">
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button className="btn btn-secondary" style={{ padding: '0.25rem' }} onClick={() => alert('Download PDF simulato')} title="Scarica PDF">
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-slide-up">
            <h2 style={{ marginBottom: '1.5rem' }}>Nuova Fattura</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              addInvoice({
                clientId: fd.get('clientId') as string,
                amount: Number(fd.get('amount')),
                date: fd.get('date') as string,
                status: 'pending'
              })
              setIsModalOpen(false)
            }}>
              <div className="form-group">
                <label className="form-label">Cliente</label>
                <select name="clientId" className="form-control" required>
                  <option value="">Seleziona un cliente...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Importo (€)</label>
                <input type="number" name="amount" step="0.01" min="0" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Data Emissione</label>
                <input type="date" name="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button type="submit" className="btn btn-primary">Emetti Fattura</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}