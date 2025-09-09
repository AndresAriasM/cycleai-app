// src/components/common/UserDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Bell, 
  Settings, 
  HelpCircle
} from 'lucide-react';
import UserAvatar from './UserAvatar';

interface User {
  id: string;
  name: string;
  role: string;
  level: string;
  xp: number;
  maxXp: number;
  streak: number;
  analysisCredits: number;
  maxAnalysisCredits: number;
  aiCredits: number;
  maxAiCredits: number;
  avatar?: string;
}

interface UserDropdownProps {
  currentUser: User;
  isMobile: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ currentUser, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action: string) => {
    setIsOpen(false);
    
    switch (action) {
      case 'profile':
        navigate('/user-profile');
        break;
      case 'settings':
        navigate('/config');
        break;
      case 'support':
        navigate('/support');
        break;
      case 'logout':
        navigate('/login');
        break;
      default:
        break;
    }
  };

  // Menu items data
  const menuItems = [
    {
      id: 'profile',
      icon: User,
      label: 'Ver perfil',
      action: 'profile'
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notificaciones',
      action: 'notifications',
      badge: '3'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Configuración',
      action: 'settings'
    },
    {
      id: 'support',
      icon: HelpCircle,
      label: 'Ayuda',
      action: 'support'
    },
    {
      id: 'logout',
      icon: LogOut,
      label: 'Cerrar sesión',
      action: 'logout',
      danger: true
    }
  ];

  const MenuItem: React.FC<{ item: any }> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    const Icon = item.icon;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.75rem 1rem',
          color: item.danger ? '#ef4444' : '#374151',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.875rem',
          gap: '0.75rem',
          background: isHovered ? '#f3f4f6' : 'transparent'
        }}
        onClick={() => handleMenuItemClick(item.action)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon size={16} />
        <span style={{ flex: 1 }}>{item.label}</span>
        {item.badge && (
          <div style={{
            background: '#ef4444',
            color: 'white',
            borderRadius: '10px',
            padding: '0.125rem 0.375rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginLeft: 'auto'
          }}>
            {item.badge}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Avatar clickeable */}
      <div 
        onClick={toggleDropdown} 
        style={{
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'scale(0.95)' : 'scale(1)',
          borderRadius: '50%'
        }}
      >
        <UserAvatar 
          name={currentUser.name}
          avatar={currentUser.avatar}
          size="sm"
          showBorder={true}
          showStatus={true}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '0.5rem',
          width: isMobile ? '240px' : '280px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* User Section */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e2e8f0',
            background: '#f8fafc'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <UserAvatar 
                name={currentUser.name}
                avatar={currentUser.avatar}
                size="sm"
                showBorder={false}
                showStatus={false}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{
                  color: '#1e293b',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  margin: '0 0 0.25rem 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {currentUser.name}
                </h4>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.8rem',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {currentUser.role}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;