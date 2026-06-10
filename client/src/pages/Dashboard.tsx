import React from 'react'
import { useAppContext } from '../context/AppContext'
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const { clients, appointments, invoices } = useAppContext()

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
  const pendingRevenue = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0)
  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled').length

  const chartData = [
    { name: 'Gen', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'Mag', revenue: 1890 },
    { name: 'Giu', revenue: 2390 },
    { name: 'Lug', revenue: totalRevenue > 0 ? totalRevenue : 3490 }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <KpiCard title="Clienti Totali" value={clients.length} icon={<Users size={24} />} trend="+12%" />
        <KpiCard title="Fatturato (Pagato)" value={`€${totalRevenue.toLocaleString()}`} icon={<DollarSign size={24} />} trend="+8%" />
        <KpiCard title="Da Incassare" value={`€${pendingRevenue.toLocaleString()}`} icon={<TrendingUp size={24} />} trend="-2%" isNegative />
        <KpiCard title="Prossimi Appuntamenti" value={upcomingAppointments} icon={<Calendar size={24} />} trend="+4%" />
      </div>

      <div className="card" style={{ height: '400px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Andamento Fatturato</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
            <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="var(--accent)" fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function KpiCard({ title, value, icon, trend, isNegative = false }: { title: string, value: string | number, icon: React.ReactNode, trend: string, isNegative?: boolean }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</p>
          <h3 style={{ fontSize: '1.875rem', margin: 0 }}>{value}</h3>
        </div>
        <div style={{ padding: '0.75rem', background: 'var(--bg-surface-hover)', borderRadius: '12px', color: 'var(--accent)' }}>
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
        <span style={{ color: isNegative ? 'var(--danger)' : 'var(--success)', fontWeight: 500 }}>{trend}</span>
        <span style={{ color: 'var(--text-secondary)' }}>vs mese precedente</span>
      </div>
    </div>
  )
}