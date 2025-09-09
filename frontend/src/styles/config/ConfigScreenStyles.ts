// frontend/src/styles/config/ConfigScreenStyles.ts
import type { CSSProperties } from 'react';

export interface ConfigScreenStyles {
  container: CSSProperties;
  sidebarOverlay: CSSProperties;
  sidebar: CSSProperties;
  mobileCloseButton: CSSProperties;
  userProfile: CSSProperties;
  userProfileHover: CSSProperties;
  userInfo: CSSProperties;
  userName: CSSProperties;
  userRole: CSSProperties;
  proBadge: CSSProperties;
  menuContainer: CSSProperties;
  menuItem: (active: boolean) => CSSProperties;
  logoFooter: CSSProperties;
  logoContainer: CSSProperties;
  logoIcon: CSSProperties;
  mainContent: CSSProperties;
  header: CSSProperties;
  menuButton: CSSProperties;
  headerTitle: CSSProperties;
  headerActions: CSSProperties;
  headerIcon: CSSProperties;
  contentArea: CSSProperties;
  card: CSSProperties;
  cardHeader: CSSProperties;
  cardHeaderContent: CSSProperties;
  cardTitle: CSSProperties;
  cardDescription: CSSProperties;
  cardActions: CSSProperties;
  resetButton: CSSProperties;
  saveButton: (hasChanges: boolean, isLoading: boolean) => CSSProperties;
  tabsContainer: CSSProperties;
  tab: (active: boolean) => CSSProperties;
  tabContent: CSSProperties;
  section: CSSProperties;
  sectionTitle: CSSProperties;
  settingItem: (isLast?: boolean) => CSSProperties;
  settingInfo: CSSProperties;
  settingLabel: CSSProperties;
  settingDescription: CSSProperties;
  settingControl: CSSProperties;
  themeButtons: CSSProperties;
  themeButton: (active: boolean) => CSSProperties;
  select: CSSProperties;
  toggle: (active: boolean) => CSSProperties;
  toggleKnob: (active: boolean) => CSSProperties;
  iconContainer: (color: string) => CSSProperties;
  dangerZone: CSSProperties;
  dangerTitle: CSSProperties;
  dangerActions: CSSProperties;
  dangerButton: (variant: 'outline' | 'filled') => CSSProperties;
}

export const createConfigScreenStyles = (isMobile: boolean): ConfigScreenStyles => ({
  container: {
    height: '100vh',
    display: 'flex',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#f8fafc',
    position: 'relative'
  },

  sidebarOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
    display: isMobile ? 'block' : 'none'
  },

  sidebar: {
    width: '280px',
    background: 'linear-gradient(180deg, #4c1d95 0%, #3730a3 100%)',
    position: isMobile ? 'fixed' : 'relative',
    top: 0,
    height: '100vh',
    zIndex: 50,
    transition: 'left 0.3s ease-in-out',
    boxShadow: isMobile ? '2px 0 20px rgba(0,0,0,0.3)' : '2px 0 10px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },

  mobileCloseButton: {
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
  },

  userProfile: {
    padding: '2rem 1.5rem 1.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  },

  userProfileHover: {
    background: 'rgba(255, 255, 255, 0.1)'
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },

  userName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginLeft: '1rem'
  },

  userRole: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.9rem',
    marginBottom: '0.25rem',
    marginLeft: '1rem'
  },

  proBadge: {
    background: 'rgba(6, 182, 212, 0.3)',
    color: '#67e8f9',
    padding: '0.25rem 0.75rem',
    borderRadius: '15px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'inline-block',
    border: '1px solid rgba(103, 232, 249, 0.3)',
    marginLeft: '1rem'
  },

  menuContainer: {
    padding: '1rem 0',
    flex: 1
  },

  menuItem: (active: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.875rem 1.5rem',
    margin: '0.25rem 1rem',
    borderRadius: '12px',
    background: active ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
    color: active ? '#67e8f9' : 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
    fontWeight: '500',
    ':hover': !active ? {
      background: 'rgba(255,255,255,0.1)',
      color: 'white'
    } : {}
  }),

  logoFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.3rem'
  },

  logoIcon: {
    width: '45px',
    height: '45px',
    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.75rem',
    fontSize: '1.2rem'
  },

  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },

  header: {
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
  },

  menuButton: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    marginRight: isMobile ? '0.75rem' : '1rem',
    cursor: 'pointer',
    borderRadius: '8px'
  },

  headerTitle: {
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },

  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '0.75rem' : '1rem'
  },

  headerIcon: {
    cursor: 'pointer'
  },

  contentArea: {
    flex: 1,
    padding: isMobile ? '1rem' : '2rem',
    overflowY: 'auto',
    background: '#f8fafc'
  },

  card: {
    background: 'white',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },

  cardHeader: {
    padding: isMobile ? '1.5rem 1.5rem 1rem' : '2rem 2rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    background: '#f8fafc',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: isMobile ? '1rem' : '0'
  },

  cardHeaderContent: {
    flex: 1
  },

  cardTitle: {
    color: '#1e293b',
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: 'bold',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },

  cardDescription: {
    color: '#64748b',
    fontSize: '0.95rem',
    margin: '0.5rem 0 0',
    lineHeight: '1.5'
  },

  cardActions: {
    display: 'flex',
    gap: isMobile ? '0.75rem' : '1rem',
    flexDirection: isMobile ? 'row' : 'row',
    width: isMobile ? '100%' : 'auto'
  },

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
  },

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
  }),

  tabsContainer: {
    display: 'flex',
    padding: isMobile ? '0.75rem 1rem 0' : '1rem 2rem 0',
    gap: '0.5rem',
    flexWrap: 'wrap',
    borderBottom: '1px solid #e2e8f0',
    overflowX: isMobile ? 'auto' : 'visible'
  },

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
  }),

  tabContent: {
    padding: isMobile ? '1.5rem' : '2rem'
  },

  section: {
    background: '#f8fafc',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem',
    border: '1px solid #e2e8f0'
  },

  sectionTitle: {
    color: '#1e293b',
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  settingItem: (isLast = false) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    padding: '1rem 0',
    borderBottom: isLast ? 'none' : '1px solid #e2e8f0',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1rem' : '0'
  }),

  settingInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1
  },

  settingLabel: {
    color: '#1e293b',
    fontWeight: '600',
    marginBottom: '0.25rem',
    fontSize: isMobile ? '0.95rem' : '1rem'
  },

  settingDescription: {
    color: '#64748b',
    fontSize: isMobile ? '0.8rem' : '0.875rem',
    lineHeight: '1.4'
  },

  settingControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  themeButtons: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },

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
  }),

  select: {
    padding: isMobile ? '0.5rem 0.75rem' : '0.5rem 1rem',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    color: '#1e293b',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    outline: 'none',
    minWidth: isMobile ? '100px' : '120px'
  },

  toggle: (active: boolean) => ({
    width: isMobile ? '45px' : '50px',
    height: isMobile ? '25px' : '28px',
    background: active ? '#10b981' : '#d1d5db',
    borderRadius: isMobile ? '12.5px' : '14px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s ease'
  }),

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
  }),

  iconContainer: (color: string) => ({
    width: '40px',
    height: '40px',
    background: `${color}1A`, // 10% opacity
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),

  dangerZone: {
    background: 'rgba(239, 68, 68, 0.05)',
    border: '2px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem'
  },

  dangerTitle: {
    color: '#dc2626',
    fontSize: isMobile ? '1rem' : '1.1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  dangerActions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    flexDirection: isMobile ? 'column' : 'row'
  },

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
  })
});

// Estilos para animaciones CSS
export const configScreenKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;