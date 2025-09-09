// frontend/src/styles/data/DataScreenStyles.ts
import type { CSSProperties } from 'react';

export interface DataScreenStyles {
  pageTitle: CSSProperties;
  card: CSSProperties;
  cardTitle: CSSProperties;
  statsGrid: CSSProperties;
  statItem: (isMobile: boolean, position?: 'topRight' | 'bottomLeft' | 'bottomRight') => CSSProperties;
  statLabel: CSSProperties;
  statValue: (color: string) => CSSProperties;
  statIcon: CSSProperties;
  storageInfo: CSSProperties;
  storagePercentage: CSSProperties;
  progressBar: CSSProperties;
  progressFill: (percentage: number) => CSSProperties;
  storageAlert: CSSProperties;
  personalDataContainer: CSSProperties;
  dataField: CSSProperties;
  dataLabel: CSSProperties;
  dataValue: CSSProperties;
  dataValueWithIcon: CSSProperties;
  editButton: CSSProperties;
  editButtonHover: CSSProperties;
  activityGrid: CSSProperties;
  activityItem: CSSProperties;
  activityIndicator: (color: string) => CSSProperties;
  activityInfo: CSSProperties;
  activityAction: CSSProperties;
  activityTime: CSSProperties;
}

export const createDataScreenStyles = (isMobile: boolean): DataScreenStyles => ({
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

  cardTitle: {
    fontSize: isMobile ? '1.1rem' : '1.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: '0'
  },

  statItem: (isMobile: boolean, position?: 'topRight' | 'bottomLeft' | 'bottomRight') => {
    const baseBorder = '1px solid #f1f5f9';
    let borderStyles: Partial<CSSProperties> = {};

    if (!isMobile) {
      switch (position) {
        case 'topRight':
          borderStyles = { borderBottom: baseBorder };
          break;
        case 'bottomLeft':
          borderStyles = { 
            borderRight: baseBorder, 
            borderTop: baseBorder 
          };
          break;
        case 'bottomRight':
          borderStyles = { borderTop: baseBorder };
          break;
        default: // topLeft
          borderStyles = { 
            borderRight: baseBorder, 
            borderBottom: baseBorder 
          };
      }
    } else {
      borderStyles = { borderBottom: baseBorder };
    }

    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '1rem 0' : '1rem',
      ...borderStyles
    };
  },

  statLabel: {
    color: '#64748b',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    marginBottom: '0.25rem'
  },

  statValue: (color: string) => ({
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: 'bold',
    color: color
  }),

  statIcon: {
    flexShrink: 0,
    marginLeft: isMobile ? '0.5rem' : '1rem'
  },

  storageInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.25rem' : '0'
  },

  storagePercentage: {
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    fontWeight: '600',
    color: '#3b82f6'
  },

  progressBar: {
    width: '100%',
    height: isMobile ? '6px' : '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '0.5rem'
  },

  progressFill: (percentage: number) => ({
    width: `${percentage}%`,
    height: '100%',
    background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
    borderRadius: '4px',
    transition: 'width 0.5s ease'
  }),

  storageAlert: {
    background: '#f8fafc',
    padding: isMobile ? '0.875rem' : '1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    color: '#64748b',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    lineHeight: '1.4'
  },

  personalDataContainer: {
    background: '#f8fafc',
    padding: isMobile ? '1.25rem' : '1.5rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  },

  dataField: {
    marginBottom: '1rem'
  },

  dataLabel: {
    color: '#64748b',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    marginBottom: '0.25rem'
  },

  dataValue: {
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: '600',
    color: '#1e293b'
  },

  dataValueWithIcon: {
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  editButton: {
    background: 'linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)',
    color: 'white',
    border: 'none',
    padding: isMobile ? '0.625rem 1.5rem' : '0.75rem 2rem',
    borderRadius: '50px',
    fontSize: isMobile ? '0.875rem' : '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(76, 29, 149, 0.3)',
    marginTop: '1.5rem',
    width: isMobile ? '100%' : 'auto'
  },

  editButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(76, 29, 149, 0.4)'
  },

  activityGrid: {
    display: 'grid',
    gap: isMobile ? '0.625rem' : '0.75rem'
  },

  activityItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    padding: isMobile ? '0.75rem' : '0.875rem 1rem',
    background: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.5rem' : '0'
  },

  activityIndicator: (color: string) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: color,
    flexShrink: 0
  }),

  activityInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1
  },

  activityAction: {
    color: '#1e293b',
    fontWeight: '500',
    fontSize: isMobile ? '0.9rem' : '0.95rem'
  },

  activityTime: {
    color: '#64748b',
    fontSize: isMobile ? '0.8rem' : '0.85rem',
    flexShrink: 0
  }
});

// Funciones auxiliares para obtener colores de estadísticas
export const getStatColor = (statType: 'analysis' | 'time' | 'accuracy' | 'models') => {
  const colors = {
    analysis: '#3b82f6',
    time: '#10b981',
    accuracy: '#f59e0b',
    models: '#8b5cf6'
  };
  return colors[statType];
};

// Función para determinar si el almacenamiento está bajo
export const isStorageLow = (used: number, total: number) => {
  return (used / total) * 100 >= 80;
};