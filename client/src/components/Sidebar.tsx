import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Calendar, FileText, Settings, Briefcase } from 'lucide-react'

export default function Sidebar() {
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/clients', icon: <Users size={20} />, label: 'Clienti' },
    { path: '/appointments', icon: <Calendar size={20} />, label: 'Appuntamenti' },
    { path: '/invoices', icon: <FileText size={20} />, label: 'Fatture' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Impostazioni' }
  ]

  return (
    <aside className="sidebar">
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ background: 'var(--accent)', padding: '0.5rem', borderRadius: '8px', color: '#fff' }}>
          <Briefcase size={24} />
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>StudioFlow</span>
      </div>
      <nav style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--bg-surface)' : 'transparent',
              borderRight: isActive ? '3px solid var(--accent)' : '3px solid transparent',
              transition: 'all 0.2s ease'
            })}
          >
            {item.icon}
            <span style={{ fontWeight: 500 }}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}