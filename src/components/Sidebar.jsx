import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  HomeIcon, CubeIcon, UserGroupIcon, 
  ShoppingCartIcon, ClipboardDocumentListIcon,
  WrenchScrewdriverIcon, ChartPieIcon,
  Cog6ToothIcon, ArrowLeftOnRectangleIcon,
  ChevronDownIcon, CurrencyDollarIcon,
  TagIcon, WrenchIcon, UsersIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import './Sidebar.css';
import logoImage from '../assets/logo.png';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { path: '/items', icon: TagIcon, label: 'Items' },
    { path: '/inventory', icon: CubeIcon, label: 'Inventory' },
    { path: '/suppliers', icon: UserGroupIcon, label: 'Suppliers' },
    {
      path: '/orders',
      icon: ShoppingCartIcon,
      label: 'Manage Orders',
      hasDropdown: true,
      dropdownItems: [
        { path: '/orders', label: 'Orders', icon: ClipboardDocumentListIcon },
        { path: '/order-items', label: 'Order Items', icon: TagIcon }
      ]
    },
    { path: '/transactions', icon: CurrencyDollarIcon, label: 'Transactions' },
    { path: '/equipment', icon: WrenchScrewdriverIcon, label: 'Equipment' },
    { path: '/maintenance', icon: WrenchIcon, label: 'Maintenance' },
    {
      path: '/users',
      icon: UsersIcon,
      label: 'Manage Users',
      hasDropdown: true,
      dropdownItems: [
        { path: '/users', label: 'Users', icon: UsersIcon },
        { path: '/access-control', label: 'Access Control', icon: ShieldCheckIcon }
      ]
    },
    { path: '/reports', icon: ChartPieIcon, label: 'Reports' },
    { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
  ];

  const handleDropdown = (type) => {
    if (type === 'orders') {
      setOrderDropdownOpen(!orderDropdownOpen);
      setUserDropdownOpen(false);
    } else if (type === 'users') {
      setUserDropdownOpen(!userDropdownOpen);
      setOrderDropdownOpen(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <img src={logoImage} alt="HIMS Logo" />
          <span>HIMS</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          if (item.hasDropdown) {
            const isOpen = item.label === 'Manage Orders' ? orderDropdownOpen : userDropdownOpen;
            return (
              <div key={item.path} className="nav-item-with-dropdown">
                <button 
                  className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                  onClick={() => handleDropdown(item.label === 'Manage Orders' ? 'orders' : 'users')}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  <ChevronDownIcon 
                    className={`dropdown-icon ${isOpen ? 'open' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="dropdown-menu">
                    {item.dropdownItems.map((dropdownItem) => {
                      const DropdownIcon = dropdownItem.icon;
                      return (
                        <Link
                          key={dropdownItem.path}
                          to={dropdownItem.path}
                          className={`dropdown-item ${location.pathname === dropdownItem.path ? 'active' : ''}`}
                        >
                          <DropdownIcon className="dropdown-icon-small" />
                          {dropdownItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button onClick={() => navigate('/login')} className="sign-out-btn">
          <ArrowLeftOnRectangleIcon className="nav-icon" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar; 