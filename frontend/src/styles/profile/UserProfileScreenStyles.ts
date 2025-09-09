// frontend/src/styles/profile/UserProfileScreenStyles.ts
import type { CSSProperties } from 'react';

export interface UserProfileScreenStyles {
  container: CSSProperties;
  header: CSSProperties;
  backButton: CSSProperties;
  backButtonHover: CSSProperties;
  headerActions: CSSProperties;
  editButton: CSSProperties;
  editButtonHover: CSSProperties;
  saveButton: CSSProperties;
  saveButtonHover: CSSProperties;
  cancelButton: CSSProperties;
  cancelButtonHover: CSSProperties;
  content: CSSProperties;
  card: CSSProperties;
  tabsContainer: CSSProperties;
  tab: (active: boolean) => CSSProperties;
  tabHover: CSSProperties;
  tabContent: CSSProperties;
  avatarSection: CSSProperties;
  avatarContainer: CSSProperties;
  avatarEditButton: CSSProperties;
  avatarEditButtonHover: CSSProperties;
  avatarGrid: CSSProperties;
  avatarOption: (isSelected: boolean) => CSSProperties;
  avatarOptionHover: CSSProperties;
  avatarImage: CSSProperties;
  userTitle: CSSProperties;
  userSubtitle: CSSProperties;
  formGrid: CSSProperties;
  formField: CSSProperties;
  formLabel: CSSProperties;
  formInput: (isEditing: boolean) => CSSProperties;
  formInputFocus: CSSProperties;
  formTextarea: (isEditing: boolean) => CSSProperties;
  passwordSection: CSSProperties;
  passwordButton: CSSProperties;
  passwordButtonHover: CSSProperties;
  passwordForm: CSSProperties;
  passwordGrid: CSSProperties;
  passwordUpdateButton: CSSProperties;
  subscriptionCard: CSSProperties;
  subscriptionHeader: CSSProperties;
  subscriptionBadge: CSSProperties;
  subscriptionFeatures: CSSProperties;
  subscriptionActions: CSSProperties;
  subscriptionButton: (variant: 'primary' | 'danger') => CSSProperties;
  subscriptionButtonHover: (variant: 'primary' | 'danger') => CSSProperties;
  paymentMethod: CSSProperties;
  paymentMethodContent: CSSProperties;
  paymentMethodButton: CSSProperties;
  billingHistory: CSSProperties;
  billingItem: CSSProperties;
  notificationsSection: CSSProperties;
  notificationItem: CSSProperties;
  notificationToggle: (active: boolean) => CSSProperties;
  notificationKnob: (active: boolean) => CSSProperties;
  languageSection: CSSProperties;
  languageGrid: CSSProperties;
  exportSection: CSSProperties;
  exportActions: CSSProperties;
  exportButton: (variant: 'primary' | 'secondary') => CSSProperties;
  exportButtonHover: CSSProperties;
  documentsSection: CSSProperties;
  documentItem: CSSProperties;
  documentItemHover: CSSProperties;
  documentIcon: CSSProperties;
  documentInfo: CSSProperties;
  documentName: CSSProperties;
  documentMeta: CSSProperties;
  documentDownload: CSSProperties;
  dangerZone: CSSProperties;
  dangerTitle: CSSProperties;
  dangerActions: CSSProperties;
  dangerButton: (variant: 'outline' | 'filled') => CSSProperties;
  dangerButtonHover: CSSProperties;
}

export const createUserProfileScreenStyles = (isMobile: boolean): UserProfileScreenStyles => ({
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  header: {
    padding: isMobile ? '1.5rem 1rem 1rem' : '2rem 1rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '900px',
    margin: '0 auto',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1rem' : '0'
  },

  backButton: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    gap: '0.5rem'
  },

  backButtonHover: {
    color: '#67e8f9'
  },

  headerActions: {
    display: 'flex',
    gap: isMobile ? '0.75rem' : '1rem',
    width: isMobile ? '100%' : 'auto',
    flexDirection: isMobile ? 'row' : 'row'
  },

  editButton: {
    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    border: 'none',
    color: 'white',
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
    fontSize: isMobile ? '0.85rem' : '1rem',
    flex: isMobile ? '1' : 'none',
    justifyContent: 'center'
  },

  editButtonHover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)'
  },

  saveButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    border: 'none',
    color: 'white',
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    fontSize: isMobile ? '0.85rem' : '1rem',
    flex: isMobile ? '1' : 'none',
    justifyContent: 'center'
  },

  saveButtonHover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)'
  },

  cancelButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: isMobile ? '0.85rem' : '1rem',
    flex: isMobile ? '1' : 'none',
    justifyContent: 'center'
  },

  cancelButtonHover: {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-1px)'
  },

  content: {
    padding: isMobile ? '0 1rem 2rem' : '0 1rem 2rem',
    maxWidth: '900px',
    margin: '0 auto'
  },

  card: {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(25px)',
    borderRadius: '24px',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    overflow: 'hidden'
  },

  tabsContainer: {
    display: 'flex',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: isMobile ? '1rem 1rem 0' : '1rem 2rem 0',
    gap: '0.5rem',
    flexWrap: 'wrap',
    overflowX: isMobile ? 'auto' : 'visible'
  },

  tab: (active: boolean) => ({
    padding: isMobile ? '0.75rem 1rem' : '1rem 2rem',
    background: active ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
    color: active ? '#67e8f9' : 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: isMobile ? '0.85rem' : '0.95rem',
    transition: 'all 0.3s ease',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap' as 'nowrap',
    minWidth: isMobile ? 'auto' : 'auto'
  }),

  tabHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white'
  },

  tabContent: {
    padding: 0
  },

  avatarSection: {
    textAlign: 'center' as 'center',
    marginBottom: isMobile ? '2rem' : '3rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: isMobile ? '1.5rem' : '2rem'
  },

  avatarContainer: {
    position: 'relative',
    display: 'inline-block'
  },

  avatarEditButton: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    background: '#06b6d4',
    border: 'none',
    borderRadius: '50%',
    width: isMobile ? '35px' : '40px',
    height: isMobile ? '35px' : '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
    transition: 'all 0.3s ease'
  },

  avatarEditButtonHover: {
    transform: 'scale(1.1)',
    boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)'
  },

  avatarGrid: {
    marginTop: '1.5rem',
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(60px, 1fr))' : 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '1rem',
    maxWidth: '400px',
    margin: '1.5rem auto 0'
  },

  avatarOption: (isSelected: boolean) => ({
    width: isMobile ? '50px' : '60px',
    height: isMobile ? '50px' : '60px',
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'pointer',
    border: isSelected ? '3px solid #06b6d4' : '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
  }),

  avatarOptionHover: {
    transform: 'scale(1.1)'
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover'
  },

  userTitle: {
    color: 'white',
    fontSize: isMobile ? '1.75rem' : '2rem',
    fontWeight: 'bold',
    margin: '1rem 0 0.5rem',
    textAlign: 'center' as 'center'
  },

  userSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: isMobile ? '1rem' : '1.1rem',
    textAlign: 'center' as 'center',
    margin: 0
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  },

  formField: {
    marginBottom: isMobile ? '1rem' : '0'
  },

  formLabel: {
    color: 'white',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  formInput: (isEditing: boolean) => ({
    width: '100%',
    padding: isMobile ? '0.75rem' : '0.875rem 1rem',
    background: isEditing ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: isEditing ? '#1e293b' : 'white',
    fontSize: isMobile ? '0.9rem' : '1rem',
    outline: 'none',
    cursor: isEditing ? 'text' : 'default',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box' as 'border-box'
  }),

  formInputFocus: {
    borderColor: '#06b6d4',
    boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.1)'
  },

  formTextarea: (isEditing: boolean) => ({
    width: '100%',
    padding: isMobile ? '0.75rem' : '0.875rem 1rem',
    background: isEditing ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: isEditing ? '#1e293b' : 'white',
    fontSize: isMobile ? '0.9rem' : '1rem',
    outline: 'none',
    cursor: isEditing ? 'text' : 'default',
    minHeight: isMobile ? '80px' : '100px',
    resize: 'vertical' as 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as 'border-box'
  }),

  passwordSection: {
    marginTop: isMobile ? '1.5rem' : '2rem'
  },

  passwordButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: isMobile ? '0.85rem' : '1rem'
  },

  passwordButtonHover: {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-1px)'
  },

  passwordForm: {
    marginTop: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: isMobile ? '1.25rem' : '1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },

  passwordGrid: {
    display: 'grid',
    gap: '1rem'
  },

  passwordUpdateButton: {
    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    border: 'none',
    color: 'white',
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: isMobile ? '0.85rem' : '1rem'
  },

  subscriptionCard: {
    background: 'rgba(6, 182, 212, 0.2)',
    border: '2px solid rgba(6, 182, 212, 0.4)',
    borderRadius: '16px',
    padding: isMobile ? '1.5rem' : '2rem',
    marginBottom: isMobile ? '1.5rem' : '2rem'
  },

  subscriptionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.5rem' : '0'
  },

  subscriptionBadge: {
    background: '#10b981',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '600'
  },

  subscriptionFeatures: {
    display: 'flex',
    gap: isMobile ? '0.75rem' : '1rem',
    flexWrap: 'wrap',
    marginBottom: '1.5rem'
  },

  subscriptionActions: {
    display: 'flex',
    gap: '1rem',
    flexDirection: isMobile ? 'column' : 'row'
  },

  subscriptionButton: (variant: 'primary' | 'danger') => ({
    background: variant === 'primary' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'transparent',
    border: variant === 'primary' 
      ? '2px solid rgba(255, 255, 255, 0.3)' 
      : '2px solid rgba(239, 68, 68, 0.5)',
    color: variant === 'primary' ? 'white' : '#f87171',
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    flex: isMobile ? '1' : 'none',
    fontSize: isMobile ? '0.85rem' : '1rem'
  }),

  subscriptionButtonHover: (variant: 'primary' | 'danger') => ({
    background: variant === 'primary' 
      ? 'rgba(255, 255, 255, 0.15)' 
      : 'rgba(239, 68, 68, 0.1)',
    transform: 'translateY(-1px)'
  }),

  paymentMethod: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: isMobile ? '1.5rem' : '2rem'
  },

  paymentMethodContent: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '1rem',
    borderRadius: '12px',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1rem' : '0'
  },

  paymentMethodButton: {
    background: 'none',
    border: 'none',
    color: '#06b6d4',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: isMobile ? '0.85rem' : '1rem'
  },

  billingHistory: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem'
  },

  billingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 0',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.5rem' : '0',
    textAlign: isMobile ? 'center' : 'left' as 'center' | 'left'
  },

  notificationsSection: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: isMobile ? '1.5rem' : '2rem'
  },

  notificationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    padding: '1rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1rem' : '0'
  },

  notificationToggle: (active: boolean) => ({
    width: isMobile ? '45px' : '50px',
    height: isMobile ? '25px' : '30px',
    background: active ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
    borderRadius: isMobile ? '12.5px' : '15px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s ease'
  }),

  notificationKnob: (active: boolean) => ({
    width: isMobile ? '21px' : '26px',
    height: isMobile ? '21px' : '26px',
    background: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: active ? (isMobile ? '22px' : '22px') : '2px',
    transition: 'all 0.3s ease'
  }),

  languageSection: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem'
  },

  languageGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },

  exportSection: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: isMobile ? '1.5rem' : '2rem'
  },

  exportActions: {
    display: 'flex',
    gap: '1rem',
    flexDirection: isMobile ? 'column' : 'row'
  },

  exportButton: (variant: 'primary' | 'secondary') => ({
    background: variant === 'primary' 
      ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
      : 'rgba(255, 255, 255, 0.1)',
    border: variant === 'primary' 
      ? 'none' 
      : '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: isMobile ? '1' : 'none',
    justifyContent: 'center',
    fontSize: isMobile ? '0.85rem' : '1rem'
  }),

  exportButtonHover: {
    transform: 'translateY(-1px)'
  },

  documentsSection: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: isMobile ? '1.5rem' : '2rem'
  },

  documentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    marginBottom: '0.75rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },

  documentItemHover: {
    background: 'rgba(255, 255, 255, 0.1)'
  },

  documentIcon: {
    width: '40px',
    height: '40px',
    background: 'rgba(6, 182, 212, 0.2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    flexShrink: 0
  },

  documentInfo: {
    flex: 1
  },

  documentName: {
    color: 'white',
    fontWeight: '600',
    marginBottom: '0.25rem',
    fontSize: isMobile ? '0.9rem' : '1rem'
  },

  documentMeta: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: isMobile ? '0.8rem' : '0.875rem'
  },

  documentDownload: {
    background: 'none',
    border: 'none',
    color: '#06b6d4',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '8px'
  },

  dangerZone: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '2px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem'
  },

  dangerTitle: {
    color: '#f87171',
    fontSize: isMobile ? '1rem' : '1.1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  dangerActions: {
    display: 'flex',
    gap: '1rem',
    flexDirection: isMobile ? 'column' : 'row'
  },

  dangerButton: (variant: 'outline' | 'filled') => ({
    background: variant === 'filled' 
      ? 'rgba(239, 68, 68, 0.2)' 
      : 'transparent',
    border: '2px solid rgba(239, 68, 68, 0.5)',
    color: '#f87171',
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    flex: isMobile ? '1' : 'none',
    fontSize: isMobile ? '0.85rem' : '1rem'
  }),

  dangerButtonHover: {
    background: 'rgba(239, 68, 68, 0.2)',
    transform: 'translateY(-1px)'
  }
});

// Interfaces para los datos
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  lastName: string;
  role: string;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string;
  joinDate: string;
  subscription: 'free' | 'pro' | 'enterprise';
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

export interface Passwords {
  current: string;
  new: string;
  confirm: string;
}

// Tipos para tabs
export type TabType = 'personal' | 'subscription' | 'preferences' | 'documents';

// Configuración de tabs
export const tabsConfig = [
  { key: 'personal' as const, label: 'Información Personal', icon: 'User' },
  { key: 'subscription' as const, label: 'Suscripción', icon: 'CreditCard' },
  { key: 'preferences' as const, label: 'Preferencias', icon: 'Bell' },
  { key: 'documents' as const, label: 'Documentos', icon: 'Download' }
];

// Funciones helper
export const getSubscriptionColor = (subscription: string): string => {
  const colors = {
    free: '#6b7280',
    pro: '#10b981',
    enterprise: '#8b5cf6'
  };
  return colors[subscription as keyof typeof colors] || colors.free;
};

export const getSubscriptionFeatures = (subscription: string): string[] => {
  const features = {
    free: ['100 créditos/mes', 'Análisis básicos', 'Soporte estándar'],
    pro: ['500 créditos/mes', '200 créditos IA/mes', 'Soporte prioritario'],
    enterprise: ['Créditos ilimitados', 'IA avanzada', 'Soporte 24/7']
  };
  return features[subscription as keyof typeof features] || features.free;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};