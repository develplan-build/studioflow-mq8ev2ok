import React from 'react'
import { Bell, Search, User } from 'lucide-react'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <h1 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Cerca..." 
            className="form-control" 
            style={{ paddingLeft: '2.5rem', width: '250px', background: 'var(--bg-surface)', border: 'none' }}
          />
        </div>
        <button className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Bell size={20} />
        </button>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }}>
          <User size={20} />
        </div>
      </div>
    </header>
  )
}