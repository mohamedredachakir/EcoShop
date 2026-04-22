import React from 'react';
import { 
  LayoutDashboard, Package, Users, ShoppingBag, 
  Settings, TrendingUp, DollarSign, PackageCheck,
  MoreVertical, Edit, Trash
} from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard" style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '280px',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--outline-variant)',
        padding: '32px 0'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
            { icon: <Package size={20} />, label: 'Products' },
            { icon: <ShoppingBag size={20} />, label: 'Orders' },
            { icon: <Users size={20} />, label: 'Customers' },
            { icon: <TrendingUp size={20} />, label: 'Analytics' },
            { icon: <Settings size={20} />, label: 'Settings' }
          ].map((item, i) => (
            <button key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 32px',
              width: '100%',
              textAlign: 'left',
              color: item.active ? 'var(--primary)' : 'var(--on-surface-variant)',
              backgroundColor: item.active ? 'var(--primary-container)' : 'transparent',
              borderLeft: item.active ? '4px solid var(--primary)' : '4px solid transparent',
              fontWeight: item.active ? 600 : 400
            }}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', backgroundColor: 'var(--surface-container-low)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px' }}>Dashboard Overview</h1>
            <p style={{ color: 'var(--on-surface-variant)' }}>Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <button className="btn btn-primary">Download Report</button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {[
            { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: <DollarSign className="text-primary" /> },
            { label: 'Active Orders', value: '156', change: '+12.5%', icon: <PackageCheck className="text-primary" /> },
            { label: 'Total Customers', value: '2,420', change: '+4.3%', icon: <Users className="text-primary" /> },
            { label: 'Avg. Order Value', value: '$86.20', change: '-2.1%', icon: <TrendingUp className="text-primary" /> }
          ].map((stat, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ backgroundColor: 'var(--primary-container)', padding: '10px', borderRadius: '12px' }}>
                  {stat.icon}
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: stat.change.startsWith('+') ? '#2e7d32' : '#d32f2f' }}>
                  {stat.change}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--outline-variant)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px' }}>Recent Orders</h3>
            <button style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-container-lowest)', color: 'var(--on-surface-variant)', fontSize: '14px' }}>
                <th style={{ padding: '16px 24px' }}>Order ID</th>
                <th style={{ padding: '16px 24px' }}>Customer</th>
                <th style={{ padding: '16px 24px' }}>Status</th>
                <th style={{ padding: '16px 24px' }}>Date</th>
                <th style={{ padding: '16px 24px' }}>Total</th>
                <th style={{ padding: '16px 24px' }}></th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#ORD-7231', customer: 'Sarah Johnson', status: 'Delivered', date: 'Oct 20, 2023', total: '$124.50' },
                { id: '#ORD-7232', customer: 'Michael Chen', status: 'Processing', date: 'Oct 21, 2023', total: '$45.00' },
                { id: '#ORD-7233', customer: 'Emma Wilson', status: 'Shipped', date: 'Oct 21, 2023', total: '$89.20' },
                { id: '#ORD-7234', customer: 'James Miller', status: 'Delivered', date: 'Oct 22, 2023', total: '$210.00' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--outline-variant)', fontSize: '14px' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 600 }}>{row.id}</td>
                  <td style={{ padding: '16px 24px' }}>{row.customer}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: row.status === 'Delivered' ? '#e8f5e9' : row.status === 'Processing' ? '#fff3e0' : '#e3f2fd',
                      color: row.status === 'Delivered' ? '#2e7d32' : row.status === 'Processing' ? '#ef6c00' : '#1565c0'
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--on-surface-variant)' }}>{row.date}</td>
                  <td style={{ padding: '16px 24px', fontWeight: 600 }}>{row.total}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button style={{ color: 'var(--on-surface-variant)' }}><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
