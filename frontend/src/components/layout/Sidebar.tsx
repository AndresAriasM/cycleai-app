// src/components/layout/Sidebar.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Database, 
  Settings, 
  Brain, 
  Cog, 
  HelpCircle,
  X
} from 'lucide-react';
import UserAvatar from '../common/UserAvatar';

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

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobile, currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Inicio', path: '/menu' },
    { icon: BarChart3, label: 'Análisis', path: '/analysis' },
    { icon: Database, label: 'Mis datos', path: '/data' },
    { icon: Settings, label: 'Gestión', path: '/management' },
    { icon: Brain, label: 'Inteligencia Artificial', path: '/ai-tools' },
    { icon: Cog, label: 'Configuración', path: '/config' },
    { icon: HelpCircle, label: 'Soporte', path: '/support' }
  ];

  const handleMenuItemClick = (path: string) => {
    if (isMobile) {
      onClose();
    }
    navigate(path);
  };

  const handleProfileClick = () => {
    if (isMobile) {
      onClose();
    }
    navigate('/user-profile');
  };

  const sidebarStyle: React.CSSProperties = {
    width: '280px',
    background: 'linear-gradient(180deg, #4c1d95 0%, #3730a3 100%)',
    position: isMobile ? 'fixed' : 'relative',
    left: isMobile && !isOpen ? '-280px' : '0',
    top: 0,
    height: '100vh',
    zIndex: 50,
    transition: 'left 0.3s ease-in-out',
    boxShadow: isMobile ? '2px 0 20px rgba(0,0,0,0.3)' : '2px 0 10px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  };

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '3px',
    overflow: 'hidden'
  };

  const progressFillStyle = (progress: number, color: string): React.CSSProperties => ({
    width: `${progress}%`,
    height: '100%',
    backgroundColor: color,
    borderRadius: '3px',
    transition: 'width 0.5s ease'
  });

  return (
    <div style={sidebarStyle}>
      {/* Close button para móvil */}
      {isMobile && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 60
          }}
        >
          <X size={20} color="white" />
        </button>
      )}

      {/* Usuario Profile - CLICKEABLE */}
      <div 
        style={{
          padding: '2rem 1.5rem 1.5rem', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
          transition: 'background 0.3s ease'
        }}
        onClick={handleProfileClick}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
          <UserAvatar 
            name={currentUser.name}
            avatar={currentUser.avatar}
            size="lg"
            showBorder={true}
            showStatus={true}
          />
          <div style={{marginLeft: '1rem'}}>
            <div style={{color: 'white', fontWeight: 'bold', fontSize: '1.1rem'}}>
              {currentUser.name}
            </div>
            <div style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '0.25rem'}}>
              {currentUser.role}
            </div>
            <div style={{
              background: 'rgba(6, 182, 212, 0.3)',
              color: '#67e8f9',
              padding: '0.25rem 0.75rem',
              borderRadius: '15px',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'inline-block',
              border: '1px solid rgba(103, 232, 249, 0.3)'
            }}>
              Pro
            </div>
          </div>
        </div>

        {/* Mini progress indicators en el sidebar */}
        <div style={{marginTop: '1rem'}}>
          <div style={{marginBottom: '0.75rem'}}>
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '0.25rem'
            }}>
              <span style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)'}}>
                Análisis
              </span>
              <span style={{fontSize: '0.8rem', color: 'white', fontWeight: '600'}}>
                {currentUser.analysisCredits}/{currentUser.maxAnalysisCredits}
              </span>
            </div>
            <div style={progressBarStyle}>
              <div style={progressFillStyle((currentUser.analysisCredits / currentUser.maxAnalysisCredits) * 100, '#10b981')}></div>
            </div>
          </div>
          
          <div>
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '0.25rem'
            }}>
              <span style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)'}}>
                IA
              </span>
              <span style={{fontSize: '0.8rem', color: 'white', fontWeight: '600'}}>
                {currentUser.aiCredits}/{currentUser.maxAiCredits}
              </span>
            </div>
            <div style={progressBarStyle}>
              <div style={progressFillStyle((currentUser.aiCredits / currentUser.maxAiCredits) * 100, '#f59e0b')}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{padding: '1rem 0', flex: 1}}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.875rem 1.5rem',
                margin: '0.25rem 1rem',
                borderRadius: '12px',
                background: isActive ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                color: isActive ? '#67e8f9' : 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
              onClick={() => handleMenuItemClick(item.path)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }
              }}
            >
              <Icon size={22} style={{minWidth: '22px'}} />
              <span style={{marginLeft: '0.875rem'}}>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Logo Footer */}
      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.3rem'
        }}>
          {/* Logo Image */}
          <img 
            src="/assets/logo/logo.png" 
            alt="CycleAI Logo" 
            style={{
              width: '180px',
              height: '90px',
              marginRight: '0.75rem',
              objectFit: 'contain',
              // Elimina el filtro primero para ver si aparece el logo
              // filter: 'brightness(0) invert(1)',
              display: 'block'
            }}
            onError={(e) => {
              // Fallback al círculo con letra si falla la imagen
              console.log('Error cargando logo desde:', e.currentTarget.src);
              e.currentTarget.style.display = 'none';
              const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallbackElement) {
                fallbackElement.style.display = 'flex';
              }
            }}
            onLoad={() => {
              console.log('Logo cargado correctamente');
            }}
          />
          {/* Fallback - círculo con letra (se oculta cuando la imagen carga correctamente) */}
          <div style={{
            width: '45px',
            height: '45px',
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            borderRadius: '12px',
            display: 'none', // Se muestra solo si falla la imagen
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '0.75rem',
            fontSize: '1.2rem'
          }}>
            C
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;