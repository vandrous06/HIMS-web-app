import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  CubeIcon, ShoppingCartIcon, ExclamationTriangleIcon, 
  CurrencyDollarIcon, ChartBarIcon, BuildingStorefrontIcon,
  ArrowTrendingUpIcon, ArrowTrendingDownIcon,
  UserGroupIcon, WrenchScrewdriverIcon, ClipboardDocumentListIcon,
  WrenchIcon,
  MagnifyingGlassIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import './Dashboard.css';
import avatarImage from '../assets/avatar.png';

function Dashboard() {
  // Sample data for charts
  const inventoryData = [
    { name: 'Jan', expenses: 400, profit: 600 },
    { name: 'Feb', expenses: 300, profit: 500 },
    { name: 'Mar', expenses: 600, profit: 900 },
    { name: 'Apr', expenses: 800, profit: 1200 },
    { name: 'May', expenses: 500, profit: 800 },
    { name: 'Jun', expenses: 700, profit: 1100 },
  ];

  const orderStats = [
    { name: 'Mon', value: 20 },
    { name: 'Tue', value: 35 },
    { name: 'Wed', value: 25 },
    { name: 'Thu', value: 45 },
    { name: 'Fri', value: 30 },
    { name: 'Sat', value: 15 },
    { name: 'Sun', value: 25 },
  ];

  const pieData = [
    { name: 'Medical Supplies', value: 400 },
    { name: 'Equipment', value: 300 },
    { name: 'Pharmaceuticals', value: 300 },
    { name: 'Others', value: 200 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <div className="avatar">
            <img src={avatarImage} alt="User avatar" />
          </div>
          <div className="header-text">
            <h1 className="welcome-text">Welcome Johnson !</h1>
            <p className="header-subtitle">Here's what's happening with your inventory today.</p>
          </div>
        </div>
        <div className="header-right">
          <div className="search-bar">
            <MagnifyingGlassIcon className="search-icon" />
            <input type="text" placeholder="Search inventory, orders, suppliers..." />
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <BellIcon className="notification-icon" />
              <span className="notification-badge">3</span>
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <CubeIcon className="stat-icon" />
            <div className="stat-title">Total Products</div>
          </div>
          <div className="stat-value">5,483</div>
          <div className="stat-change positive">
            <ArrowTrendingUpIcon className="trend-icon" />
            12.5% from last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <ShoppingCartIcon className="stat-icon" />
            <div className="stat-title">Orders</div>
          </div>
          <div className="stat-value">2,859</div>
          <div className="stat-change positive">
            <ArrowTrendingUpIcon className="trend-icon" />
            8.2% from last week
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <ChartBarIcon className="stat-icon" />
            <div className="stat-title">Total Stock</div>
          </div>
          <div className="stat-value">5,483</div>
          <div className="stat-change negative">
            <ArrowTrendingDownIcon className="trend-icon" />
            3.1% from last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <ExclamationTriangleIcon className="stat-icon" />
            <div className="stat-title">Out of Stock</div>
          </div>
          <div className="stat-value">38</div>
          <div className="stat-change negative">
            <ArrowTrendingUpIcon className="trend-icon" />
            12 items since last week
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <ClipboardDocumentListIcon className="stat-icon" />
            <div className="stat-title">Transactions</div>
          </div>
          <div className="stat-value">1,284</div>
          <div className="stat-change positive">
            <ArrowTrendingUpIcon className="trend-icon" />
            15.2% this month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <WrenchScrewdriverIcon className="stat-icon" />
            <div className="stat-title">Equipment</div>
          </div>
          <div className="stat-value">328</div>
          <div className="stat-change positive">
            <ArrowTrendingUpIcon className="trend-icon" />
            5.3% new items
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <UserGroupIcon className="stat-icon" />
            <div className="stat-title">Users</div>
          </div>
          <div className="stat-value">156</div>
          <div className="stat-change positive">
            <ArrowTrendingUpIcon className="trend-icon" />
            12 new users
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <WrenchIcon className="stat-icon" />
            <div className="stat-title">Maintenance</div>
          </div>
          <div className="stat-value">45</div>
          <div className="stat-change negative">
            <ArrowTrendingUpIcon className="trend-icon" />
            8 pending
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Expense vs Profit</h3>
            <div className="chart-actions">
              <button className="chart-btn">Week</button>
              <button className="chart-btn active">Month</button>
              <button className="chart-btn">Year</button>
            </div>
          </div>
          <div className="line-chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="expenses" stroke="#ff4500" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Inventory Distribution</h3>
          </div>
          <div className="pie-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {pieData.map((entry, index) => (
                <div key={`legend-${index}`} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: COLORS[index] }}></span>
                  <span className="legend-label">{entry.name}</span>
                  <span className="legend-value">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Top 10 Stores by Sales</h3>
          </div>
          <div className="stores-list">
            {[
              { name: 'Gateway', value: 87.4 },
              { name: 'The Rustic Fox', value: 72.1 },
              { name: 'Smart View', value: 69.8 },
              { name: 'Blue Harbor', value: 65.5 },
              { name: 'Deluxe Novelties', value: 59.2 }
            ].map((store, index) => (
              <div key={index} className="store-item">
                <div className="store-header">
                  <span className="store-name">{store.name}</span>
                  <span className="store-value">{store.value}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-value" 
                    style={{width: `${store.value}%`}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {/* Add activity items here */}
          <div className="activity-item">
            <div className="activity-icon">📦</div>
            <div className="activity-details">
              <p>New order received from Supplier XYZ</p>
              <span>2 hours ago</span>
            </div>
          </div>
          {/* Add more activity items */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 