// src/screens/config/ConfigScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
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
  Shield,
  Bell,
  Settings
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

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

const ConfigScreen: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'privacy' | 'performance' | 'accessibility'>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Estilos
  const styles = {
    card: {
      background: 'white',
      borderRadius: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    } as React.CSSProperties,

    cardHeader: {
      padding: isMobile ? '1.5rem 1.5rem 1rem' : '2rem 2rem 1rem',
      borderBottom: '1px solid #e2e8f0',
      background: '#f8fafc',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? '1rem' : '0'
    } as React.CSSProperties,

    cardTitle: {
      color: '#1e293b',
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: 'bold',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    } as React.CSSProperties,

    cardDescription: {
      color: '#64748b',
      fontSize: '0.95rem',
      margin: '0.5rem 0 0',
      lineHeight: '1.5'
    } as React.CSSProperties,

    cardActions: {
      display: 'flex',
      gap: isMobile ? '0.75rem' : '1rem',
      flexDirection: isMobile ? 'row' : 'row',
      width: isMobile ? '100%' : 'auto'
    } as React.CSSProperties,

    resetButton: {
      background: 'white',
      border: '2px solid #e2e8f0',
      color: '#64748b',
      padding: isMobile ? '0.625rem 1rem' : '0.75rem 1.5rem',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: isMobile ? '0.875rem' : '1rem',
      flex: isMobile ? 1 : 'none'
    } as React.CSSProperties,

    saveButton: (hasChanges: boolean, isLoading: boolean) => ({
      background: hasChanges && !isLoading 
        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
        : '#9ca3af',
      border: 'none',
      color: 'white',
      padding: isMobile ? '0.625rem 1rem' : '0.75rem 1.5rem',
      borderRadius: '12px',
      cursor: hasChanges && !isLoading ? 'pointer' : 'not-allowed',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      opacity: hasChanges && !isLoading ? 1 : 0.6,
      fontSize: isMobile ? '0.875rem' : '1rem',
      flex: isMobile ? 1 : 'none'
    } as React.CSSProperties),

    tabsContainer: {
      display: 'flex',
      padding: isMobile ? '0.75rem 1rem 0' : '1rem 2rem 0',
      gap: '0.5rem',
      flexWrap: 'wrap',
      borderBottom: '1px solid #e2e8f0',
      overflowX: isMobile ? 'auto' : 'visible'
    } as React.CSSProperties,

    tab: (active: boolean) => ({
      padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
      background: active ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
      color: active ? '#0891b2' : '#64748b',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: isMobile ? '0.875rem' : '0.95rem',
      transition: 'all 0.3s ease',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      minWidth: isMobile ? '120px' : '140px',
      justifyContent: 'flex-start',
      whiteSpace: 'nowrap'
    } as React.CSSProperties),

    tabContent: {
      padding: isMobile ? '1.5rem' : '2rem'
    } as React.CSSProperties,

    section: {
      background: '#f8fafc',
      borderRadius: '16px',
      padding: isMobile ? '1.25rem' : '1.5rem',
      marginBottom: '1.5rem',
      border: '1px solid #e2e8f0'
    } as React.CSSProperties,

    sectionTitle: {
      color: '#1e293b',
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    } as React.CSSProperties,

    settingItem: (isLast = false) => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      padding: '1rem 0',
      borderBottom: isLast ? 'none' : '1px solid #e2e8f0',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '1rem' : '0'
    } as React.CSSProperties),

    settingInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flex: 1
    } as React.CSSProperties,

    settingLabel: {
      color: '#1e293b',
      fontWeight: '600',
      marginBottom: '0.25rem',
      fontSize: isMobile ? '0.95rem' : '1rem'
    } as React.CSSProperties,

    settingDescription: {
      color: '#64748b',
      fontSize: isMobile ? '0.8rem' : '0.875rem',
      lineHeight: '1.4'
    } as React.CSSProperties,

    themeButtons: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    } as React.CSSProperties,

    themeButton: (active: boolean) => ({
      padding: isMobile ? '0.5rem 0.75rem' : '0.5rem 1rem',
      background: active ? 'rgba(6, 182, 212, 0.1)' : 'white',
      border: `2px solid ${active ? '#06b6d4' : '#e2e8f0'}`,
      borderRadius: '8px',
      color: active ? '#0891b2' : '#64748b',
      cursor: 'pointer',
      fontSize: isMobile ? '0.8rem' : '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontWeight: '600'
    } as React.CSSProperties),

    select: {
      padding: isMobile ? '0.5rem 0.75rem' : '0.5rem 1rem',
      background: 'white',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      color: '#1e293b',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      outline: 'none',
      minWidth: isMobile ? '100px' : '120px'
    } as React.CSSProperties,

    toggle: (active: boolean) => ({
      width: isMobile ? '45px' : '50px',
      height: isMobile ? '25px' : '28px',
      background: active ? '#10b981' : '#d1d5db',
      borderRadius: isMobile ? '12.5px' : '14px',
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.3s ease'
    } as React.CSSProperties),

    toggleKnob: (active: boolean) => ({
      width: isMobile ? '21px' : '24px',
      height: isMobile ? '21px' : '24px',
      background: 'white',
      borderRadius: '50%',
      position: 'absolute',
      top: '2px',
      left: active ? (isMobile ? '22px' : '24px') : '2px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    } as React.CSSProperties),

    iconContainer: (color: string) => ({
      width: '40px',
      height: '40px',
      background: `${color}1A`,
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    } as React.CSSProperties),

    dangerZone: {
      background: 'rgba(239, 68, 68, 0.05)',
      border: '2px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '16px',
      padding: isMobile ? '1.25rem' : '1.5rem',
      marginBottom: '1.5rem'
    } as React.CSSProperties,

    dangerTitle: {
      color: '#dc2626',
      fontSize: isMobile ? '1rem' : '1.1rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    } as React.CSSProperties,

    dangerActions: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      flexDirection: isMobile ? 'column' : 'row'
    } as React.CSSProperties,

    dangerButton: (variant: 'outline' | 'filled') => ({
      background: variant === 'filled' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
      border: '2px solid rgba(239, 68, 68, 0.3)',
      color: '#dc2626',
      padding: isMobile ? '0.625rem 1rem' : '0.75rem 1.5rem',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: isMobile ? '0.875rem' : '1rem',
      flex: isMobile ? 1 : 'none'
    } as React.CSSProperties)
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
          { key: 'analytics', label: 'Análisis de uso', description: 'Ayúdanos a mejorar compartiendo datos anónimos de uso', icon: Eye },
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
    <MainLayout title="Configuración">
      <div style={styles.card}>
        {/* Header del card */}
        <div style={styles.cardHeader}>
          <div>
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

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </MainLayout>
  );
};

export default ConfigScreen;