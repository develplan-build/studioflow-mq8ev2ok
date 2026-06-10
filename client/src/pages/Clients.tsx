import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Plus, Search, Mail, Phone, MoreVertical } from 'lucide-react'

export default function Clients() {
  const { clients, addClient } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Cerca cliente..." 
            className="form-control" 
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuovo Cliente
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredClients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Search size={48} /></div>
            <h3 className="empty-state-title">Nessun cliente trovato</h3>
            <p className="empty-state-desc">Non ci sono clienti che corrispondono alla tua ricerca o il database è vuoto.</p>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Aggiungi il primo cliente</button>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Contatti</th>
                  <th>Stato</th>
                  <th style={{ textAlign: 'right' }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr key={client.id}>
                    <td style={{ fontWeight: 500 }}>{client.name}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> {client.email}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14} /> {client.phone}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${client.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                        {client.status === 'active' ? 'Attivo' : 'Inattivo'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary" style={{ padding: '0.25rem' }}><MoreVertical size={18} /></button>
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
            <h2 style={{ marginBottom: '1.5rem' }}>Nuovo Cliente</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              addClient({
                name: fd.get('name') as string,
                email: fd.get('email') as string,
                phone: fd.get('phone') as string,
                status: 'active'
              })
              setIsModalOpen(false)
            }}>
              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <input type="text" name="name" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Telefono</label>
                <input type="tel" name="phone" className="form-control" required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button type="submit" className="btn btn-primary">Salva Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}