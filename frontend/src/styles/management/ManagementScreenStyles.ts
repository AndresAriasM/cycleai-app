// frontend/src/styles/management/ManagementScreenStyles.ts
import type { CSSProperties } from 'react';

export interface ManagementScreenStyles {
  pageTitle: CSSProperties;
  card: CSSProperties;
  tabsContainer: CSSProperties;
  tabButton: (isActive: boolean) => CSSProperties;
  tabButtonHover: CSSProperties;
  sectionHeader: CSSProperties;
  sectionTitle: CSSProperties;
  createButton: CSSProperties;
  createButtonHover: CSSProperties;
  createForm: CSSProperties;
  createFormTitle: CSSProperties;
  formField: CSSProperties;
  formLabel: CSSProperties;
  formInput: CSSProperties;
  formInputFocus: CSSProperties;
  formTextarea: CSSProperties;
  formActions: CSSProperties;
  cancelButton: CSSProperties;
  cancelButtonHover: CSSProperties;
  submitButton: (enabled: boolean) => CSSProperties;
  submitButtonHover: CSSProperties;
  categoryItem: CSSProperties;
  categoryItemHover: CSSProperties;
  categoryInfo: CSSProperties;
  categoryHeader: CSSProperties;
  categoryTitle: CSSProperties;
  statusIndicator: (status: 'active' | 'inactive') => CSSProperties;
  statusLabel: (status: 'active' | 'inactive') => CSSProperties;
  categoryMeta: CSSProperties;
  categoryMetaItem: CSSProperties;
  categoryActions: CSSProperties;
  actionButton: (variant: 'edit' | 'delete') => CSSProperties;
  actionButtonHover: (variant: 'edit' | 'delete') => CSSProperties;
  emptyState: CSSProperties;
  emptyStateIcon: CSSProperties;
  emptyStateTitle: CSSProperties;
  emptyStateDescription: CSSProperties;
  emptyStateButton: CSSProperties;
  comingSoonContainer: CSSProperties;
  comingSoonIcon: CSSProperties;
  comingSoonTitle: CSSProperties;
  comingSoonDescription: CSSProperties;
  comingSoonInfo: CSSProperties;
  comingSoonText: CSSProperties;
}

export const createManagementScreenStyles = (isMobile: boolean): ManagementScreenStyles => ({
  pageTitle: {
    fontSize: isMobile ? '1.8rem' : '2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '2rem'
  },

  card: {
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  },

  tabsContainer: {
    display: 'flex',
    marginBottom: '2rem',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '1rem',
    flexWrap: 'wrap',
    gap: isMobile ? '0.5rem' : '0'
  },

  tabButton: (isActive: boolean) => ({
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    border: 'none',
    background: isActive ? '#3b82f6' : '#e2e8f0',
    color: isActive ? 'white' : '#64748b',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    marginRight: isMobile ? '0' : '0.5rem',
    marginBottom: isMobile ? '0.5rem' : '0',
    flex: isMobile ? '1' : 'none',
    justifyContent: 'center'
  }),

  tabButtonHover: {
    background: '#f3f4f6',
    transform: 'translateY(-1px)'
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    marginBottom: '1.5rem',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1rem' : '0'
  },

  sectionTitle: {
    fontSize: isMobile ? '1.1rem' : '1.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0
  },

  createButton: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: 'white',
    border: 'none',
    padding: isMobile ? '0.625rem 1rem' : '0.75rem 1.25rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
    width: isMobile ? '100%' : 'auto',
    justifyContent: 'center'
  },

  createButtonHover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
  },

  createForm: {
    background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
    border: '2px solid #0ea5e9',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)'
  },

  createFormTitle: {
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  formField: {
    marginBottom: '1rem'
  },

  formLabel: {
    display: 'block',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  },

  formInput: {
    width: '100%',
    padding: isMobile ? '0.625rem' : '0.75rem',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontSize: isMobile ? '0.9rem' : '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    background: 'white',
    boxSizing: 'border-box' as 'border-box'
  },

  formInputFocus: {
    borderColor: '#3b82f6'
  },

  formTextarea: {
    width: '100%',
    padding: isMobile ? '0.625rem' : '0.75rem',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontSize: isMobile ? '0.9rem' : '1rem',
    outline: 'none',
    resize: 'vertical' as 'vertical',
    minHeight: isMobile ? '70px' : '80px',
    background: 'white',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as 'border-box'
  },

  formActions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
    flexDirection: isMobile ? 'column' : 'row'
  },

  cancelButton: {
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    padding: isMobile ? '0.625rem 1rem' : '0.75rem 1.25rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    flex: isMobile ? '1' : 'none'
  },

  cancelButtonHover: {
    background: '#e5e7eb'
  },

  submitButton: (enabled: boolean) => ({
    background: enabled ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : '#9ca3af',
    color: 'white',
    border: 'none',
    padding: isMobile ? '0.625rem 1rem' : '0.75rem 1.25rem',
    borderRadius: '8px',
    cursor: enabled ? 'pointer' : 'not-allowed',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    flex: isMobile ? '1' : 'none'
  }),

  submitButtonHover: {
    transform: 'translateY(-1px)'
  },

  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    padding: isMobile ? '1rem 0.75rem' : '1rem',
    marginBottom: '0.75rem',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1rem' : '0'
  },

  categoryItemHover: {
    background: '#e2e8f0',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },

  categoryInfo: {
    flex: 1
  },

  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },

  categoryTitle: {
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0
  },

  statusIndicator: (status: 'active' | 'inactive') => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: status === 'active' ? '#10b981' : '#f59e0b',
    marginLeft: isMobile ? '0' : '0.75rem'
  }),

  statusLabel: (status: 'active' | 'inactive') => ({
    marginLeft: '0.5rem',
    fontSize: '0.75rem',
    color: status === 'active' ? '#10b981' : '#f59e0b',
    fontWeight: '600'
  }),

  categoryMeta: {
    display: 'flex',
    gap: isMobile ? '0.75rem' : '1rem',
    fontSize: isMobile ? '0.8rem' : '0.85rem',
    color: '#64748b',
    flexWrap: 'wrap',
    alignItems: 'center'
  },

  categoryMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },

  categoryActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'flex-end' : 'flex-start'
  },

  actionButton: (variant: 'edit' | 'delete') => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '6px',
    color: variant === 'edit' ? '#64748b' : '#ef4444',
    transition: 'all 0.3s ease'
  }),

  actionButtonHover: (variant: 'edit' | 'delete') => ({
    background: variant === 'edit' ? '#e2e8f0' : '#fee2e2',
    color: variant === 'edit' ? '#3b82f6' : '#dc2626'
  }),

  emptyState: {
    textAlign: 'center' as 'center',
    padding: isMobile ? '2rem 1rem' : '3rem 1rem',
    color: '#64748b'
  },

  emptyStateIcon: {
    margin: '0 auto 1rem',
    opacity: 0.5
  },

  emptyStateTitle: {
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  },

  emptyStateDescription: {
    fontSize: isMobile ? '0.9rem' : '1rem',
    marginBottom: '1.5rem'
  },

  emptyStateButton: {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: isMobile ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    fontWeight: '600'
  },

  comingSoonContainer: {
    textAlign: 'center' as 'center',
    padding: isMobile ? '2rem 1rem' : '3rem 1rem',
    color: '#64748b'
  },

  comingSoonIcon: {
    margin: '0 auto 1.5rem',
    opacity: 0.5
  },

  comingSoonTitle: {
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#374151'
  },

  comingSoonDescription: {
    fontSize: isMobile ? '1rem' : '1.1rem',
    marginBottom: '1rem',
    maxWidth: '400px',
    margin: '0 auto 1.5rem'
  },

  comingSoonInfo: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    display: 'inline-block',
    textAlign: 'left' as 'left',
    maxWidth: isMobile ? '100%' : 'none'
  },

  comingSoonText: {
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.5'
  }
});

// Tipos para mejor tipado
export type TabType = 'categories' | 'users' | 'system';
export type CategoryStatus = 'active' | 'inactive';

// Configuración de tabs
export const tabsConfig = [
  { id: 'categories' as const, label: 'Categorías', icon: 'FolderOpen' },
  { id: 'users' as const, label: 'Usuarios', icon: 'Users' },
  { id: 'system' as const, label: 'Sistema', icon: 'Server' }
];

// Función helper para obtener el texto del status
export const getStatusText = (status: CategoryStatus): string => {
  return status === 'active' ? 'ACTIVA' : 'INACTIVA';
};