// src/screens/menu/MenuScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Home, 
  BarChart3, 
  Database, 
  Settings, 
  Brain, 
  Cog, 
  HelpCircle,
  Search,
  Filter,
  Award,
  LogOut,
  Bell,
  X,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

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
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
}

interface Category {
  name: string;
  shortName?: string;
  analysisCount: number;
  color: string;
  isFrequent?: boolean;
}

const MenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock data
  const currentUser: User = {
    id: '1',
    name: 'Sergio',
    role: 'Dir Innovación',
    level: 'Tech Analyst III',
    xp: 340,
    maxXp: 500,
    streak: 5,
    analysisCredits: 362,
    maxAnalysisCredits: 500,
    aiCredits: 101,
    maxAiCredits: 200
  };

  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Inicio', path: '/menu', active: true },
    { icon: BarChart3, label: 'Análisis', path: '/analysis' },
    { icon: Database, label: 'Mis datos', path: '/data' },
    { icon: Settings, label: 'Gestión', path: '/management' },
    { icon: Brain, label: 'Inteligencia Artificial', path: '/ai-tools' },
    { icon: Cog, label: 'Configuración', path: '/config' },
    { icon: HelpCircle, label: 'Soporte', path: '/support' }
  ];

  const frequentCategories: Category[] = [
    { name: 'Hypecycle Gartner', shortName: 'Hypecycle', analysisCount: 0, color: '#8b5cf6', isFrequent: true },
    { name: 'Matriz MICMAC', shortName: 'MICMAC', analysisCount: 0, color: '#06b6d4', isFrequent: true },
    { name: 'Curvas en S', shortName: 'Curvas', analysisCount: 0, color: '#3b82f6', isFrequent: true },
    { name: 'Método MACTUN', shortName: 'MACTUN', analysisCount: 0, color: '#10b981', isFrequent: true }
  ];

  const savedCategories: Category[] = [
    { name: 'Agroindustry', analysisCount: 4, color: '#f59e0b' },
    { name: 'Artificial Intelligence', analysisCount: 16, color: '#ef4444' },
    { name: 'Education', analysisCount: 7, color: '#8b5cf6' }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const handleMenuItemClick = (path: string) => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    navigate(path);
  };

  // Estilos responsivos
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

  const sidebarStyle: React.CSSProperties = {
    width: isMobile ? '280px' : '280px',
    background: 'linear-gradient(180deg, #4c1d95 0%, #3730a3 100%)',
    position: isMobile ? 'fixed' : 'relative',
    left: isMobile && !isSidebarOpen ? '-280px' : '0',
    top: 0,
    height: '100vh',
    zIndex: 50,
    transition: 'left 0.3s ease-in-out',
    boxShadow: isMobile ? '2px 0 20px rgba(0,0,0,0.3)' : '2px 0 10px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginLeft: isMobile ? '0' : '0'
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

  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    padding: isMobile ? '1rem' : '2rem',
    overflowY: 'auto',
    background: '#f8fafc'
  };

  const welcomeCardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)',
    borderRadius: '20px',
    padding: isMobile ? '1.5rem' : '2rem',
    marginBottom: '1.5rem',
    color: 'white',
    boxShadow: '0 8px 32px rgba(76, 29, 149, 0.3)'
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
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

  const categoryCircleStyle = (color: string): React.CSSProperties => ({
    width: isMobile ? '80px' : '100px',
    height: isMobile ? '80px' : '100px',
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: isMobile ? '0.75rem' : '0.85rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease',
    padding: '0.5rem'
  });

  return (
    <div style={containerStyle}>
      {/* Sidebar Overlay para móvil */}
      <div 
        style={sidebarOverlayStyle}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Close button para móvil */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
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

        {/* Usuario Profile */}
        <div style={{padding: '2rem 1.5rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginRight: '1rem',
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
            }}>
              SA
            </div>
            <div>
              <div style={{color: 'white', fontWeight: 'bold', fontSize: '1.1rem'}}>
                Sergio Arboleda
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
        </div>

        {/* Menu Items */}
        <div style={{padding: '1rem 0', flex: 1}}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.875rem 1.5rem',
                  margin: '0.25rem 1rem',
                  borderRadius: '12px',
                  background: item.active ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                  color: item.active ? '#67e8f9' : 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}
                onClick={() => handleMenuItemClick(item.path)}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
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
          <img 
            src="/src/assets/logo/logo.png" 
            alt="CycleAI" 
            style={{
              height: '80px',
              width: 'auto',
              maxWidth: '200px',
              objectFit: 'contain',
              // Removemos el filtro problemático
              opacity: 0.95
            }}
            onError={(e) => {
              // Fallback si la imagen no carga
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.style.cssText = `
                display: flex;
                align-items: center;
                color: white;
                font-weight: bold;
                font-size: 1.3rem;
              `;
              fallback.innerHTML = `
                <div style="
                  width: 45px;
                  height: 45px;
                  background: linear-gradient(135deg, #06b6d4, #3b82f6);
                  border-radius: 12px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 0.75rem;
                  font-size: 1.2rem;
                ">C</div>
                <span>CycleAI</span>
              `;
              target.parentElement?.appendChild(fallback);
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.5rem',
                marginRight: isMobile ? '0.75rem' : '1rem',
                cursor: 'pointer',
                borderRadius: '8px'
              }}
            >
              <Menu size={24} color="#64748b" />
            </button>
            
            {!isMobile && (
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginRight: '2rem'}}>
                CycleAI
              </div>
            )}

            <div style={{position: 'relative', flex: isMobile ? 1 : 'none', maxWidth: isMobile ? 'none' : '300px'}}>
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
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchStyle}
                placeholder={isMobile ? "¿Qué buscas?" : "¿Qué buscas hoy?"}
              />
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '0.75rem' : '1rem'}}>
            <Filter size={20} color="#64748b" style={{cursor: 'pointer'}} />
            {!isMobile && <Bell size={20} color="#64748b" style={{cursor: 'pointer'}} />}
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              position: 'relative'
            }}>
              SA
              <div style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '12px',
                height: '12px',
                background: '#10b981',
                borderRadius: '50%',
                border: '2px solid white'
              }}></div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '8px'
              }}
            >
              <LogOut size={20} color="#64748b" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={contentAreaStyle}>
          {/* Welcome Card */}
          <div style={welcomeCardStyle}>
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '1.8rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              lineHeight: '1.2'
            }}>
              Buenos días, {currentUser.name.split(' ')[0]}
            </h2>
            
            <div style={{marginBottom: '1.5rem'}}>
              <h3 style={{
                fontSize: isMobile ? '1rem' : '1.2rem', 
                marginBottom: '1rem',
                fontWeight: '600',
                opacity: 0.9
              }}>
                Créditos Disponibles
              </h3>
              
              <div style={{
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                gap: '1rem', 
                marginBottom: '1rem'
              }}>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <BarChart3 size={18} style={{marginRight: '0.5rem'}} />
                    <span style={{fontSize: '0.9rem'}}>
                      Análisis {currentUser.analysisCredits}/{currentUser.maxAnalysisCredits}
                    </span>
                  </div>
                  <div style={progressBarStyle}>
                    <div style={progressFillStyle(72, '#10b981')}></div>
                  </div>
                </div>
                
                <div>
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <Brain size={18} style={{marginRight: '0.5rem'}} />
                    <span style={{fontSize: '0.9rem'}}>
                      IA: {currentUser.aiCredits}/{currentUser.maxAiCredits}
                    </span>
                  </div>
                  <div style={progressBarStyle}>
                    <div style={progressFillStyle(50, '#f59e0b')}></div>
                  </div>
                </div>
              </div>

              {!isMobile && (
                <button style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}>
                  Mejorar plan
                </button>
              )}
            </div>

            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '0.75rem' : '0',
              marginBottom: '1rem'
            }}>
              <div>
                <div style={{fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem'}}>
                  Nivel: {currentUser.level}
                </div>
                <div style={{fontSize: '0.85rem', opacity: 0.8}}>
                  Racha: {currentUser.streak} días 🔥😎
                </div>
              </div>
              <div style={{fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight: 'bold'}}>
                XP: {currentUser.xp} puntos
              </div>
            </div>

            <div style={progressBarStyle}>
              <div style={progressFillStyle(68, '#67e8f9')}></div>
            </div>
          </div>

          {/* Categorías Frecuentes */}
          <div style={cardStyle}>
            <h3 style={{
              fontSize: isMobile ? '1.15rem' : '1.3rem', 
              fontWeight: 'bold', 
              marginBottom: '1.25rem', 
              color: '#1e293b'
            }}>
              Categorías Frecuentes
            </h3>
            
            <div style={{
              display: 'grid', 
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
              gap: isMobile ? '1rem' : '1.5rem',
              justifyItems: 'center'
            }}>
              {frequentCategories.map((category, index) => (
                <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div 
                    style={categoryCircleStyle(category.color)}
                    onClick={() => navigate('/analysis', { state: { selectedCategory: category } })}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {category.shortName || category.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categorías Guardadas */}
          <div style={cardStyle}>
            <h3 style={{
              fontSize: isMobile ? '1.15rem' : '1.3rem', 
              fontWeight: 'bold', 
              marginBottom: '1.25rem', 
              color: '#1e293b'
            }}>
              Categorías Guardadas
            </h3>
            
            {savedCategories.map((category, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
                marginBottom: '0.75rem',
                background: '#f8fafc',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '1px solid #e2e8f0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <span style={{
                  fontWeight: '500', 
                  color: '#1e293b', 
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  {category.name}
                </span>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{
                    background: category.color,
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {category.analysisCount} análisis
                  </span>
                  <ChevronRight size={18} color="#64748b" />
                </div>
              </div>
            ))}
          </div>

          {/* Populares */}
          <div style={cardStyle}>
            <h3 style={{
              fontSize: isMobile ? '1.15rem' : '1.3rem', 
              fontWeight: 'bold', 
              marginBottom: '1.25rem', 
              color: '#1e293b'
            }}>
              Populares
            </h3>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: isMobile ? '1rem' : '1.25rem',
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              borderRadius: '12px',
              cursor: 'pointer',
              border: '1px solid #f59e0b',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{fontSize: '1.5rem', marginRight: '0.75rem'}}>🔥</span>
                <div>
                  <div style={{
                    fontWeight: 'bold', 
                    color: '#92400e', 
                    fontSize: isMobile ? '0.95rem' : '1rem'
                  }}>
                    AI + Robot + Agro
                  </div>
                  <div style={{fontSize: '0.85rem', color: '#b45309'}}>Hypecycle</div>
                </div>
              </div>
              <ChevronRight size={20} color="#92400e" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;