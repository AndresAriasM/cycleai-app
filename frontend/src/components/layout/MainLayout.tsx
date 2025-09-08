// src/components/layout/MainLayout.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Filter, 
  Bell, 
  LogOut,
  X
} from 'lucide-react';
import Sidebar from './Sidebar';
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

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = "CycleAI",
  showSearch = true,
  searchPlaceholder = "¿Qué buscas hoy?",
  onSearchChange,
  searchValue = ""
}) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
        setIsSearchExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sincronizar con prop externa
  useEffect(() => {
    setSearchQuery(searchValue);
  }, [searchValue]);

  // Mock data del usuario - idealmente vendría de un contexto/store
  const currentUser: User = {
    id: '1',
    name: 'Sergio Arboleda',
    role: 'Dir Innovación',
    level: 'Tech Analyst III',
    xp: 340,
    maxXp: 500,
    streak: 5,
    analysisCredits: 362,
    maxAnalysisCredits: 500,
    aiCredits: 101,
    maxAiCredits: 200,
    avatar: '/src/assets/users/sergio.jpg'
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleSearchToggle = () => {
    if (isMobile) {
      setIsSearchExpanded(!isSearchExpanded);
      if (!isSearchExpanded) {
        // Focus en el input cuando se expande
        setTimeout(() => {
          const searchInput = document.getElementById('mobile-search-input');
          searchInput?.focus();
        }, 100);
      }
    }
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
    setSearchQuery('');
    onSearchChange?.('');
  };

  const containerStyle: React.CSSProperties = {
    height: '100vh',
    display: 'flex',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#f8fafc',
    position: 'relative'
  };

  const sidebarOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
    display: isMobile && isSidebarOpen ? 'block' : 'none'
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const headerStyle: React.CSSProperties = {
    height: '70px',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0 1rem' : '0 2rem',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative',
    zIndex: 30
  };

  // Header expandido para búsqueda en móvil
  const expandedSearchStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    zIndex: 35,
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  };

  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    padding: isMobile ? '1rem' : '2rem',
    overflowY: 'auto',
    background: '#f8fafc'
  };

  const searchStyle: React.CSSProperties = {
    width: isMobile ? '100%' : '300px',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '2px solid #e2e8f0',
    borderRadius: '50px',
    fontSize: '0.9rem',
    outline: 'none',
    background: '#f8fafc'
  };

  const mobileSearchStyle: React.CSSProperties = {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '50px',
    fontSize: '0.9rem',
    outline: 'none',
    background: '#f8fafc',
    marginLeft: '1rem',
    marginRight: '1rem'
  };

  const iconButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease'
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar Overlay para móvil */}
      <div 
        style={sidebarOverlayStyle}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isMobile={isMobile}
        currentUser={currentUser}
      />

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Header Normal */}
        <div style={headerStyle}>
          <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={iconButtonStyle}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              <Menu size={24} color="#64748b" />
            </button>
            
            {/* Título - solo en desktop o cuando búsqueda no está expandida en móvil */}
            {!isMobile && (
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginLeft: '1rem', marginRight: '2rem'}}>
                {title}
              </div>
            )}

            {/* Búsqueda en Desktop */}
            {!isMobile && showSearch && (
              <div style={{position: 'relative', maxWidth: '300px'}}>
                <Search size={18} style={{
                  position: 'absolute', 
                  left: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  style={searchStyle}
                  placeholder={searchPlaceholder}
                />
                {searchQuery && (
                  <div style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <Filter size={16} color="#64748b" style={{cursor: 'pointer'}} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            {/* Botón de búsqueda en móvil */}
            {isMobile && showSearch && (
              <button
                onClick={handleSearchToggle}
                style={iconButtonStyle}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <Search size={20} color="#64748b" />
              </button>
            )}

            {/* Notificaciones - solo en desktop */}
            {!isMobile && (
              <button
                style={iconButtonStyle}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <Bell size={20} color="#64748b" />
              </button>
            )}
            
            {/* Avatar clickeable */}
            <div onClick={handleProfileClick} style={{cursor: 'pointer'}}>
              <UserAvatar 
                name={currentUser.name}
                avatar={currentUser.avatar}
                size="sm"
                showBorder={true}
                showStatus={true}
              />
            </div>
          </div>
        </div>

        {/* Header de Búsqueda Expandida en Móvil */}
        {isMobile && isSearchExpanded && (
          <div style={expandedSearchStyle}>
            <button
              onClick={handleSearchClose}
              style={iconButtonStyle}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              <X size={20} color="#64748b" />
            </button>
            
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              style={mobileSearchStyle}
              placeholder="¿Qué buscas?"
              autoFocus
            />
            
            {/* Filtro aparece cuando hay texto en la búsqueda */}
            {searchQuery && (
              <button
                style={iconButtonStyle}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <Filter size={20} color="#64748b" />
              </button>
            )}
          </div>
        )}

        {/* Content Area */}
        <div style={contentAreaStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;