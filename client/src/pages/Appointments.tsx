import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle, XCircle } from 'lucide-react'

export default function Appointments() {
  const { appointments, clients, addAppointment, updateAppointmentStatus } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getClientName = (id: string) => clients.find(c => c.id === id)?.name || 'Cliente Sconosciuto'

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'scheduled': return <span className="badge badge-info">Programmato</span>
      case 'completed': return <span className="badge badge-success">Completato</span>
      case 'cancelled': return <span className="badge badge-warning">Annullato</span>
      default: return null
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Prossimi Appuntamenti</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuovo Appuntamento
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><CalendarIcon size={48} /></div>
            <h3 className="empty-state-title">Nessun appuntamento</h3>
            <p className="empty-state-desc">Non hai appuntamenti in programma.</p>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Fissa un appuntamento</button>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Data e Ora</th>
                  <th>Cliente</th>
                  <th>Oggetto</th>
                  <th>Stato</th>
                  <th style={{ textAlign: 'right' }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {appointments.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(apt => {
                  const dateObj = new Date(apt.date)
                  return (
                    <tr key={apt.id}>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span style={{ fontWeight: 500 }}>{dateObj.toLocaleDateString('it-IT')}</span>
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={14} /> {dateObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 500 }}>{getClientName(apt.clientId)}</td>
                      <td>{apt.title}</td>
                      <td>{getStatusBadge(apt.status)}</td>
                      <td style={{ textAlign: 'right' }}>
                        {apt.status === 'scheduled' && (
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button className="btn btn-secondary" style={{ padding: '0.25rem', color: 'var(--success)' }} onClick={() => updateAppointmentStatus(apt.id, 'completed')} title="Segna come completato">
                              <CheckCircle size={18} />
                            </button>
                            <button className="btn btn-secondary" style={{ padding: '0.25rem', color: 'var(--warning)' }} onClick={() => updateAppointmentStatus(apt.id, 'cancelled')} title="Annulla">
                              <XCircle size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-slide-up">
            <h2 style={{ marginBottom: '1.5rem' }}>Nuovo Appuntamento</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              addAppointment({
                clientId: fd.get('clientId') as string,
                title: fd.get('title') as string,
                date: fd.get('date') as string,
                status: 'scheduled'
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
                <label className="form-label">Oggetto</label>
                <input type="text" name="title" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Data e Ora</label>
                <input type="datetime-local" name="date" className="form-control" required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button type="submit" className="btn btn-primary">Salva Appuntamento</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}