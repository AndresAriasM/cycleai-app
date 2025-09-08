// src/screens/config/ConfigScreen.tsx
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
  //Search,
  Filter,
  LogOut,
  Bell,
  X,
  Palette, 
  Moon, 
  Sun, 
  Monitor, 
  Globe, 
  Lock, 
  Download, 
  //Upload,
  Trash2,
  RefreshCw,
  Save,
  Eye,
  //EyeOff,
  Smartphone,
  //Laptop,
  //Tablet,
  Volume2,
  //VolumeX,
  //Wifi,
  Battery,
  HardDrive,
  Shield
} from 'lucide-react';
import UserAvatar from '../../components/common/UserAvatar';

interface ConfigSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    desktop: boolean;
    sound: boolean;
    email: boolean;
    push: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReports: boolean;
    usageData: boolean;
  };
  performance: {
    animations: boolean;
    autoSave: boolean;
    preloadData: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    reduceMotion: boolean;
  };
}

interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
}

const ConfigScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'privacy' | 'performance' | 'accessibility'>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    name: 'Sergio Arboleda',
    role: 'Dir Innovación',
    avatar: '/src/assets/users/sergio.jpg'
  };

  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Inicio', path: '/menu' },
    { icon: BarChart3, label: 'Análisis', path: '/analysis' },
    { icon: Database, label: 'Mis datos', path: '/data' },
    { icon: Settings, label: 'Gestión', path: '/management' },
    { icon: Brain, label: 'Inteligencia Artificial', path: '/ai-tools' },
    { icon: Cog, label: 'Configuración', path: '/config', active: true },
    { icon: HelpCircle, label: 'Soporte', path: '/support' }
  ];

  const [settings, setSettings] = useState<ConfigSettings>({
    theme: 'system',
    language: 'es',
    timezone: 'America/Bogota',
    notifications: {
      desktop: true,
      sound: true,
      email: true,
      push: false
    },
    privacy: {
      analytics: true,
      crashReports: true,
      usageData: false
    },
    performance: {
      animations: true,
      autoSave: true,
      preloadData: false
    },
    accessibility: {
      fontSize: 'medium',
      highContrast: false,
      reduceMotion: false
    }
  });

  const updateSetting = (section: keyof ConfigSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('cycleai_config', JSON.stringify(settings));
      setHasChanges(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres restablecer todas las configuraciones?')) {
      setSettings({
        theme: 'system',
        language: 'es',
        timezone: 'America/Bogota',
        notifications: {
          desktop: true,
          sound: true,
          email: true,
          push: false
        },
        privacy: {
          analytics: true,
          crashReports: true,
          usageData: false
        },
        performance: {
          animations: true,
          autoSave: true,
          preloadData: false
        },
        accessibility: {
          fontSize: 'medium',
          highContrast: false,
          reduceMotion: false
        }
      });
      setHasChanges(true);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleMenuItemClick = (path: string) => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    navigate(path);
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  // Estilos (mantienen los del MenuScreen)
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

  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    padding: isMobile ? '1rem' : '2rem',
    overflowY: 'auto',
    background: '#f8fafc'
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '1rem 1.5rem',
    background: active ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
    color: active ? '#0891b2' : '#64748b',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: '140px',
    justifyContent: 'flex-start'
  });

  const sectionStyle: React.CSSProperties = {
    background: '#f8fafc',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    border: '1px solid #e2e8f0'
  };

  const settingItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderBottom: '1px solid #e2e8f0'
  };

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    width: '50px',
    height: '28px',
    background: active ? '#10b981' : '#d1d5db',
    borderRadius: '14px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s ease'
  });

  const toggleKnobStyle = (active: boolean): React.CSSProperties => ({
    width: '24px',
    height: '24px',
    background: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: active ? '24px' : '2px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  });

  const selectStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    color: '#1e293b',
    fontSize: '0.9rem',
    outline: 'none',
    minWidth: '120px'
  };

  /*const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    color: '#1e293b',
    fontSize: '1rem',
    outline: 'none'
  };*/

  // Renderizar tabs (adaptados al tema claro)
  const renderGeneralTab = () => (
    <div>
      <div style={sectionStyle}>
        <h4 style={{ color: '#1e293b', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Palette size={20} />
          Apariencia
        </h4>
        
        <div style={settingItemStyle}>
          <div>
            <div style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>Tema</div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Personaliza la apariencia de la interfaz</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { key: 'light', label: 'Claro', icon: Sun },
              { key: 'dark', label: 'Oscuro', icon: Moon },
              { key: 'system', label: 'Sistema', icon: Monitor }
            ].map((theme) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.key}
                  onClick={() => updateSetting('theme', 'theme', theme.key)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: settings.theme === theme.key ? 'rgba(6, 182, 212, 0.1)' : 'white',
                    border: `2px solid ${settings.theme === theme.key ? '#06b6d4' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    color: settings.theme === theme.key ? '#0891b2' : '#64748b',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontWeight: '600'
                  }}
                >
                  <Icon size={16} />
                  {theme.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h4 style={{ color: '#1e293b', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={20} />
          Idioma y Región
        </h4>
        
        <div style={settingItemStyle}>
          <div>
            <div style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>Idioma</div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Idioma de la interfaz</div>
          </div>
          <select 
            value={settings.language} 
            onChange={(e) => updateSetting('language', 'language', e.target.value)}
            style={selectStyle}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div style={{...settingItemStyle, borderBottom: 'none'}}>
          <div>
            <div style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>Zona Horaria</div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Tu zona horaria local</div>
          </div>
          <select 
            value={settings.timezone} 
            onChange={(e) => updateSetting('timezone', 'timezone', e.target.value)}
            style={selectStyle}
          >
            <option value="America/Bogota">Bogotá (UTC-5)</option>
            <option value="America/Mexico_City">Ciudad de México (UTC-6)</option>
            <option value="America/New_York">Nueva York (UTC-4)</option>
            <option value="Europe/Madrid">Madrid (UTC+1)</option>
            <option value="Europe/London">Londres (UTC+0)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div>
      <div style={sectionStyle}>
        <h4 style={{ color: '#1e293b', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={20} />
          Configuración de Notificaciones
        </h4>
        
        {[
          { key: 'desktop', label: 'Notificaciones de escritorio', description: 'Recibe notificaciones en tu navegador', icon: Monitor },
          { key: 'sound', label: 'Sonidos', description: 'Reproduce sonidos para las notificaciones', icon: Volume2 },
          { key: 'email', label: 'Notificaciones por email', description: 'Recibe actualizaciones importantes por correo', icon: Bell },
          { key: 'push', label: 'Notificaciones push', description: 'Notificaciones móviles (requiere configuración)', icon: Smartphone }
        ].map((item, index, array) => {
          const Icon = item.icon;
          return (
            <div key={item.key} style={{...settingItemStyle, borderBottom: index === array.length - 1 ? 'none' : '1px solid #e2e8f0'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} color="#06b6d4" />
                </div>
                <div>
                  <div style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{item.description}</div>
                </div>
              </div>
              <div
                onClick={() => updateSetting('notifications', item.key, !settings.notifications[item.key as keyof typeof settings.notifications])}
                style={toggleStyle(settings.notifications[item.key as keyof typeof settings.notifications])}
              >
                <div style={toggleKnobStyle(settings.notifications[item.key as keyof typeof settings.notifications])} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div>
      <div style={sectionStyle}>
        <h4 style={{ color: '#1e293b', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={20} />
          Privacidad y Datos
        </h4>
        
        {[
          { key: 'analytics', label: 'Análisis de uso', description: 'Ayúdanos a mejorar compartiendo datos anónimos de uso', icon: Database },
          { key: 'crashReports', label: 'Reportes de errores', description: 'Envía automáticamente reportes cuando ocurren errores', icon: RefreshCw },
          { key: 'usageData', label: 'Datos de rendimiento', description: 'Comparte información sobre el rendimiento de la aplicación', icon: HardDrive }
        ].map((item, index, array) => {
          const Icon = item.icon;
          return (
            <div key={item.key} style={{...settingItemStyle, borderBottom: index === array.length - 1 ? 'none' : '1px solid #e2e8f0'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} color="#8b5cf6" />
                </div>
                <div>
                  <div style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{item.description}</div>
                </div>
              </div>
              <div
                onClick={() => updateSetting('privacy', item.key, !settings.privacy[item.key as keyof typeof settings.privacy])}
                style={toggleStyle(settings.privacy[item.key as keyof typeof settings.privacy])}
              >
                <div style={toggleKnobStyle(settings.privacy[item.key as keyof typeof settings.privacy])} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        ...sectionStyle,
        background: 'rgba(239, 68, 68, 0.05)',
        border: '2px solid rgba(239, 68, 68, 0.2)'
      }}>
        <h4 style={{ color: '#dc2626', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Trash2 size={20} />
          Zona de Peligro
        </h4>
        
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          <button style={{
            background: 'transparent',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            color: '#dc2626',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Download size={18} />
            Exportar mis datos
          </button>
          
          <button style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            color: '#dc2626',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Trash2 size={18} />
            Eliminar todos los datos
          </button>
        </div>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div>
      <div style={sectionStyle}>
        <h4 style={{ color: '#1e293b', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Battery size={20} />
          Rendimiento
        </h4>
        
        {[
          { key: 'animations', label: 'Animaciones', description: 'Activa las transiciones y animaciones suaves', icon: RefreshCw },
          { key: 'autoSave', label: 'Guardado automático', description: 'Guarda automáticamente tus cambios cada 30 segundos', icon: Save },
          { key: 'preloadData', label: 'Precarga de datos', description: 'Carga datos en segundo plano para mayor velocidad', icon: Download }
        ].map((item, index, array) => {
          const Icon = item.icon;
          return (
            <div key={item.key} style={{...settingItemStyle, borderBottom: index === array.length - 1 ? 'none' : '1px solid #e2e8f0'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} color="#10b981" />
                </div>
                <div>
                  <div style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{item.description}</div>
                </div>
              </div>
              <div
                onClick={() => updateSetting('performance', item.key, !settings.performance[item.key as keyof typeof settings.performance])}
                style={toggleStyle(settings.performance[item.key as keyof typeof settings.performance])}
              >
                <div style={toggleKnobStyle(settings.performance[item.key as keyof typeof settings.performance])} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAccessibilityTab = () => (
    <div>
      <div style={sectionStyle}>
        <h4 style={{ color: '#1e293b', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Eye size={20} />
          Accesibilidad
        </h4>
        
        <div style={settingItemStyle}>
          <div>
            <div style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>Tamaño de fuente</div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Ajusta el tamaño del texto en la interfaz</div>
          </div>
          <select 
            value={settings.accessibility.fontSize} 
            onChange={(e) => updateSetting('accessibility', 'fontSize', e.target.value)}
            style={selectStyle}
          >
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </div>

        <div style={settingItemStyle}>
          <div>
            <div style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>Alto contraste</div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Mejora la legibilidad con colores de alto contraste</div>
          </div>
          <div
            onClick={() => updateSetting('accessibility', 'highContrast', !settings.accessibility.highContrast)}
            style={toggleStyle(settings.accessibility.highContrast)}
          >
            <div style={toggleKnobStyle(settings.accessibility.highContrast)} />
          </div>
        </div>

        <div style={{...settingItemStyle, borderBottom: 'none'}}>
          <div>
            <div style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>Reducir movimiento</div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Minimiza animaciones y transiciones</div>
          </div>
          <div
            onClick={() => updateSetting('accessibility', 'reduceMotion', !settings.accessibility.reduceMotion)}
            style={toggleStyle(settings.accessibility.reduceMotion)}
          >
            <div style={toggleKnobStyle(settings.accessibility.reduceMotion)} />
          </div>
        </div>
      </div>
    </div>
  );

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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.3rem'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.75rem',
              fontSize: '1.2rem'
            }}>
              C
            </div>
            <span>CycleAI</span>
          </div>
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
            
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b'}}>
              Configuración
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '0.75rem' : '1rem'}}>
            <Filter size={20} color="#64748b" style={{cursor: 'pointer'}} />
            {!isMobile && <Bell size={20} color="#64748b" style={{cursor: 'pointer'}} />}
            
            <div onClick={handleProfileClick} style={{cursor: 'pointer'}}>
              <UserAvatar 
                name={currentUser.name}
                avatar={currentUser.avatar}
                size="sm"
                showBorder={true}
                showStatus={true}
              />
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
          <div style={cardStyle}>
            {/* Header del card */}
            <div style={{ 
              padding: '2rem 2rem 1rem', 
              borderBottom: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h1 style={{ 
                  color: '#1e293b', 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Settings size={28} color="#06b6d4" />
                  Configuración del Sistema
                </h1>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.95rem', 
                  margin: '0.5rem 0 0',
                  lineHeight: '1.5'
                }}>
                  Personaliza CycleAI según tus preferencias y necesidades.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleReset}
                  style={{
                    background: 'white',
                    border: '2px solid #e2e8f0',
                    color: '#64748b',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <RefreshCw size={18} />
                  Restablecer
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || isLoading}
                  style={{
                    background: hasChanges && !isLoading 
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                      : '#9ca3af',
                    border: 'none',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    cursor: hasChanges && !isLoading ? 'pointer' : 'not-allowed',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: hasChanges && !isLoading ? 1 : 0.6
                  }}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={18} style={{animation: 'spin 1s linear infinite'}} />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Guardar cambios
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              padding: '1rem 2rem 0',
              gap: '0.5rem',
              flexWrap: 'wrap',
              borderBottom: '1px solid #e2e8f0'
            }}>
              {[
                { key: 'general', label: 'General', icon: Settings },
                { key: 'notifications', label: 'Notificaciones', icon: Bell },
                { key: 'privacy', label: 'Privacidad', icon: Lock },
                { key: 'performance', label: 'Rendimiento', icon: Battery },
                { key: 'accessibility', label: 'Accesibilidad', icon: Eye }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    style={tabStyle(activeTab === tab.key)}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.key) {
                        e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)';
                        e.currentTarget.style.color = '#0891b2';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.key) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#64748b';
                      }
                    }}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div style={{ padding: '2rem' }}>
              {activeTab === 'general' && renderGeneralTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'privacy' && renderPrivacyTab()}
              {activeTab === 'performance' && renderPerformanceTab()}
              {activeTab === 'accessibility' && renderAccessibilityTab()}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ConfigScreen;