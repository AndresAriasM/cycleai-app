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
  Trash2,
  RefreshCw,
  Save,
  Eye,
  Smartphone,
  Volume2,
  Battery,
  HardDrive,
  Shield
} from 'lucide-react';
import UserAvatar from '../../components/common/UserAvatar';
import { createConfigScreenStyles, configScreenKeyframes } from '../../styles/config/ConfigScreenStyles';

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

  // Crear estilos basados en si es móvil o no
  const styles = createConfigScreenStyles(isMobile);

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

  // Renderizar tabs
  const renderGeneralTab = () => (
    <div>
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
          <Palette size={20} />
          Apariencia
        </h4>
        
        <div style={styles.settingItem()}>
          <div style={styles.settingInfo}>
            <div>
              <div style={styles.settingLabel}>Tema</div>
              <div style={styles.settingDescription}>Personaliza la apariencia de la interfaz</div>
            </div>
          </div>
          <div style={styles.themeButtons}>
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
                  style={styles.themeButton(settings.theme === theme.key)}
                >
                  <Icon size={16} />
                  {theme.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
          <Globe size={20} />
          Idioma y Región
        </h4>
        
        <div style={styles.settingItem()}>
          <div style={styles.settingInfo}>
            <div>
              <div style={styles.settingLabel}>Idioma</div>
              <div style={styles.settingDescription}>Idioma de la interfaz</div>
            </div>
          </div>
          <select 
            value={settings.language} 
            onChange={(e) => updateSetting('language', 'language', e.target.value)}
            style={styles.select}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div style={styles.settingItem(true)}>
          <div style={styles.settingInfo}>
            <div>
              <div style={styles.settingLabel}>Zona Horaria</div>
              <div style={styles.settingDescription}>Tu zona horaria local</div>
            </div>
          </div>
          <select 
            value={settings.timezone} 
            onChange={(e) => updateSetting('timezone', 'timezone', e.target.value)}
            style={styles.select}
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
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
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
            <div key={item.key} style={styles.settingItem(index === array.length - 1)}>
              <div style={styles.settingInfo}>
                <div style={styles.iconContainer('#06b6d4')}>
                  <Icon size={20} color="#06b6d4" />
                </div>
                <div>
                  <div style={styles.settingLabel}>{item.label}</div>
                  <div style={styles.settingDescription}>{item.description}</div>
                </div>
              </div>
              <div
                onClick={() => updateSetting('notifications', item.key, !settings.notifications[item.key as keyof typeof settings.notifications])}
                style={styles.toggle(settings.notifications[item.key as keyof typeof settings.notifications])}
              >
                <div style={styles.toggleKnob(settings.notifications[item.key as keyof typeof settings.notifications])} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div>
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
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
            <div key={item.key} style={styles.settingItem(index === array.length - 1)}>
              <div style={styles.settingInfo}>
                <div style={styles.iconContainer('#8b5cf6')}>
                  <Icon size={20} color="#8b5cf6" />
                </div>
                <div>
                  <div style={styles.settingLabel}>{item.label}</div>
                  <div style={styles.settingDescription}>{item.description}</div>
                </div>
              </div>
              <div
                onClick={() => updateSetting('privacy', item.key, !settings.privacy[item.key as keyof typeof settings.privacy])}
                style={styles.toggle(settings.privacy[item.key as keyof typeof settings.privacy])}
              >
                <div style={styles.toggleKnob(settings.privacy[item.key as keyof typeof settings.privacy])} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.dangerZone}>
        <h4 style={styles.dangerTitle}>
          <Trash2 size={20} />
          Zona de Peligro
        </h4>
        
        <div style={styles.dangerActions}>
          <button style={styles.dangerButton('outline')}>
            <Download size={18} />
            Exportar mis datos
          </button>
          
          <button style={styles.dangerButton('filled')}>
            <Trash2 size={18} />
            Eliminar todos los datos
          </button>
        </div>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div>
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
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
            <div key={item.key} style={styles.settingItem(index === array.length - 1)}>
              <div style={styles.settingInfo}>
                <div style={styles.iconContainer('#10b981')}>
                  <Icon size={20} color="#10b981" />
                </div>
                <div>
                  <div style={styles.settingLabel}>{item.label}</div>
                  <div style={styles.settingDescription}>{item.description}</div>
                </div>
              </div>
              <div
                onClick={() => updateSetting('performance', item.key, !settings.performance[item.key as keyof typeof settings.performance])}
                style={styles.toggle(settings.performance[item.key as keyof typeof settings.performance])}
              >
                <div style={styles.toggleKnob(settings.performance[item.key as keyof typeof settings.performance])} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAccessibilityTab = () => (
    <div>
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
          <Eye size={20} />
          Accesibilidad
        </h4>
        
        <div style={styles.settingItem()}>
          <div style={styles.settingInfo}>
            <div>
              <div style={styles.settingLabel}>Tamaño de fuente</div>
              <div style={styles.settingDescription}>Ajusta el tamaño del texto en la interfaz</div>
            </div>
          </div>
          <select 
            value={settings.accessibility.fontSize} 
            onChange={(e) => updateSetting('accessibility', 'fontSize', e.target.value)}
            style={styles.select}
          >
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </div>

        <div style={styles.settingItem()}>
          <div style={styles.settingInfo}>
            <div>
              <div style={styles.settingLabel}>Alto contraste</div>
              <div style={styles.settingDescription}>Mejora la legibilidad con colores de alto contraste</div>
            </div>
          </div>
          <div
            onClick={() => updateSetting('accessibility', 'highContrast', !settings.accessibility.highContrast)}
            style={styles.toggle(settings.accessibility.highContrast)}
          >
            <div style={styles.toggleKnob(settings.accessibility.highContrast)} />
          </div>
        </div>

        <div style={styles.settingItem(true)}>
          <div style={styles.settingInfo}>
            <div>
              <div style={styles.settingLabel}>Reducir movimiento</div>
              <div style={styles.settingDescription}>Minimiza animaciones y transiciones</div>
            </div>
          </div>
          <div
            onClick={() => updateSetting('accessibility', 'reduceMotion', !settings.accessibility.reduceMotion)}
            style={styles.toggle(settings.accessibility.reduceMotion)}
          >
            <div style={styles.toggleKnob(settings.accessibility.reduceMotion)} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Sidebar Overlay para móvil */}
      {isMobile && isSidebarOpen && (
        <div 
          style={styles.sidebarOverlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        left: isMobile && !isSidebarOpen ? '-280px' : '0'
      }}>
        {/* Close button para móvil */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            style={styles.mobileCloseButton}
          >
            <X size={20} color="white" />
          </button>
        )}

        {/* Usuario Profile - CLICKEABLE */}
        <div 
          style={styles.userProfile}
          onClick={handleProfileClick}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div style={styles.userInfo}>
            <UserAvatar 
              name={currentUser.name}
              avatar={currentUser.avatar}
              size="lg"
              showBorder={true}
              showStatus={true}
            />
            <div>
              <div style={styles.userName}>
                {currentUser.name}
              </div>
              <div style={styles.userRole}>
                {currentUser.role}
              </div>
              <div style={styles.proBadge}>
                Pro
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={styles.menuItem(item.active || false)}
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
        <div style={styles.logoFooter}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>
              C
            </div>
            <span>CycleAI</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={styles.menuButton}
            >
              <Menu size={24} color="#64748b" />
            </button>
            Configuración
          </div>

          <div style={styles.headerActions}>
            <Filter size={20} color="#64748b" style={styles.headerIcon} />
            {!isMobile && <Bell size={20} color="#64748b" style={styles.headerIcon} />}
            
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
              style={{...styles.menuButton, marginRight: 0}}
            >
              <LogOut size={20} color="#64748b" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          <div style={styles.card}>
            {/* Header del card */}
            <div style={styles.cardHeader}>
              <div style={styles.cardHeaderContent}>
                <h1 style={styles.cardTitle}>
                  <Settings size={28} color="#06b6d4" />
                  Configuración del Sistema
                </h1>
                <p style={styles.cardDescription}>
                  Personaliza CycleAI según tus preferencias y necesidades.
                </p>
              </div>

              <div style={styles.cardActions}>
                <button
                  onClick={handleReset}
                  style={styles.resetButton}
                >
                  <RefreshCw size={18} />
                  {isMobile ? 'Reset' : 'Restablecer'}
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || isLoading}
                  style={styles.saveButton(hasChanges, isLoading)}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={18} style={{animation: 'spin 1s linear infinite'}} />
                      {isMobile ? 'Guardando...' : 'Guardando...'}
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {isMobile ? 'Guardar' : 'Guardar cambios'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={styles.tabsContainer}>
              {[
                { key: 'general', label: 'General', icon: Settings },
                { key: 'notifications', label: isMobile ? 'Notif.' : 'Notificaciones', icon: Bell },
                { key: 'privacy', label: 'Privacidad', icon: Lock },
                { key: 'performance', label: isMobile ? 'Rendim.' : 'Rendimiento', icon: Battery },
                { key: 'accessibility', label: isMobile ? 'Acceso' : 'Accesibilidad', icon: Eye }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    style={styles.tab(activeTab === tab.key)}
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
            <div style={styles.tabContent}>
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
        {configScreenKeyframes}
      </style>
    </div>
  );
};

export default ConfigScreen;