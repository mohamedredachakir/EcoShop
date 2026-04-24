import React, { useEffect, useMemo, useState } from 'react';
import { 
  LayoutDashboard, Package, Users, ShoppingBag, 
  Settings, TrendingUp, DollarSign, PackageCheck,
  MoreVertical, Edit, Trash
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!user?.role || user.role !== 'admin') {
        setDashboardLoading(false);
        return;
      }

      setDashboardLoading(true);
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          api.get('/products'),
          api.get('/orders'),
          api.get('/users'),
        ]);

        setProducts(productsRes.data || []);
        setOrders(ordersRes.data?.data || ordersRes.data || []);
        setCustomers(usersRes.data || []);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setDashboardLoading(false);
      }
    };

    if (!loading) {
      fetchDashboard();
    }
  }, [loading, user]);

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
    const activeOrders = orders.filter((order) => ['pending', 'confirmed'].includes(order.status)).length;

    return [
      { label: 'Total Revenue', value: `$${revenue.toFixed(2)}`, change: '+0.0%', icon: <DollarSign className="text-primary" /> },
      { label: 'Active Orders', value: String(activeOrders), change: '+0.0%', icon: <PackageCheck className="text-primary" /> },
      { label: 'Total Customers', value: String(customers.length), change: '+0.0%', icon: <Users className="text-primary" /> },
      { label: 'Avg. Order Value', value: orders.length ? `$${(revenue / orders.length).toFixed(2)}` : '$0.00', change: '+0.0%', icon: <TrendingUp className="text-primary" /> },
    ];
  }, [customers.length, orders]);

  if (!loading && (!user || user.role !== 'admin')) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <div className="card" style={{ padding: '40px', maxWidth: '640px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>Admin access required</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  if (loading || dashboardLoading) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', color: 'var(--on-surface-variant)' }}>Loading dashboard...</div>
      </div>
    );
  }

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
          {stats.map((stat, i) => (
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
              {orders.slice(0, 4).map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--outline-variant)', fontSize: '14px' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 600 }}>#{row.id}</td>
                  <td style={{ padding: '16px 24px' }}>{row.user?.name || 'Customer'}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: row.status === 'delivered' ? '#e8f5e9' : row.status === 'confirmed' ? '#fff3e0' : '#e3f2fd',
                      color: row.status === 'delivered' ? '#2e7d32' : row.status === 'confirmed' ? '#ef6c00' : '#1565c0'
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--on-surface-variant)' }}>{row.created_at ? new Date(row.created_at).toLocaleDateString() : '-'}</td>
                  <td style={{ padding: '16px 24px', fontWeight: 600 }}>${Number(row.total_amount || 0).toFixed(2)}</td>
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
