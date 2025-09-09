// frontend/src/styles/hypeCycleScreenStyles.ts

import type { CSSProperties } from 'react';

// ===== HYPECYCLE SCREEN STYLES =====
export const hypeCycleScreenStyles = {
  // Container principal
  container: (isMobile: boolean): CSSProperties => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    paddingBottom: isMobile ? '2rem' : '0'
  }),

  // Header
  header: (isMobile: boolean): CSSProperties => ({
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    padding: isMobile ? '1rem' : '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }),

  headerContent: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: isMobile ? '1rem' : '1.5rem'
  }),

  backButton: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    marginRight: '1rem',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    color: '#64748b',
    transition: 'background 0.2s ease'
  } as CSSProperties,

  headerTitle: (isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? '1.4rem' : '1.8rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
    lineHeight: '1.2'
  }),

  headerSubtitle: (isMobile: boolean): CSSProperties => ({
    color: '#64748b',
    fontSize: isMobile ? '0.9rem' : '1rem',
    margin: '0.25rem 0 0 0'
  }),

  // Status del backend
  statusIndicator: (status: boolean | null): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    background: status === true ? '#dcfce7' : status === false ? '#fee2e2' : '#fef3c7',
    border: `1px solid ${status === true ? '#16a34a' : status === false ? '#dc2626' : '#d97706'}`
  }),

  statusDot: (status: boolean | null): CSSProperties => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: status === true ? '#16a34a' : status === false ? '#dc2626' : '#d97706'
  }),

  statusText: (status: boolean | null): CSSProperties => ({
    fontSize: '0.8rem',
    fontWeight: '600',
    color: status === true ? '#16a34a' : status === false ? '#dc2626' : '#d97706'
  }),

  // Content area
  contentArea: (isMobile: boolean): CSSProperties => ({
    padding: isMobile ? '1rem' : '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
  }),

  // Query Builder Card
  queryCard: (isMobile: boolean): CSSProperties => ({
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.5rem' : '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    border: '1px solid #e2e8f0'
  }),

  queryHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem'
  } as CSSProperties,

  queryTitle: (isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? '1.1rem' : '1.3rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }),

  // Export buttons
  exportButtons: {
    display: 'flex',
    gap: '0.5rem'
  } as CSSProperties,

  exportButton: {
    background: '#f1f5f9',
    border: '1px solid #cbd5e1',
    color: '#475569',
    padding: '0.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  } as CSSProperties,

  // Search term builder
  searchTermContainer: (isMobile: boolean): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '2fr 120px 100px 50px',
    gap: isMobile ? '0.75rem' : '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  }),

  searchInput: (isMobile: boolean): CSSProperties => ({
    padding: '0.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: isMobile ? '16px' : '1rem',
    width: '100%',
    background: 'white',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  }),

  searchControls: (isMobile: boolean): CSSProperties => ({
    display: isMobile ? 'flex' : 'contents',
    gap: isMobile ? '0.5rem' : '0',
    alignItems: 'center'
  }),

  selectInput: (isMobile: boolean): CSSProperties => ({
    padding: isMobile ? '0.5rem' : '0.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: isMobile ? '14px' : '1rem',
    flex: isMobile ? '1' : 'none',
    background: 'white',
    cursor: 'pointer',
    outline: 'none'
  }),

  exactMatchLabel: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: isMobile ? '0.9rem' : '1rem',
    whiteSpace: 'nowrap',
    flex: isMobile ? '1' : 'none',
    color: '#374151',
    cursor: 'pointer'
  }),

  removeButton: (canRemove: boolean, isMobile: boolean): CSSProperties => ({
    background: canRemove ? '#fee2e2' : '#f1f5f9',
    border: 'none',
    padding: isMobile ? '0.5rem' : '0.5rem',
    borderRadius: '6px',
    cursor: canRemove ? 'pointer' : 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  }),

  // Controls section
  controlsSection: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '1rem',
    marginTop: '1rem',
    alignItems: isMobile ? 'stretch' : 'center',
    justifyContent: 'space-between'
  }),

  controlsLeft: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '1rem'
  }),

  addTermButton: {
    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(14, 165, 233, 0.3)',
    transition: 'all 0.2s ease'
  } as CSSProperties,

  yearControl: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: isMobile ? '0.9rem' : '1rem',
    background: '#f8fafc',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  }),

  yearInput: (isMobile: boolean): CSSProperties => ({
    padding: '0.5rem',
    border: '2px solid #e2e8f0',
    borderRadius: '6px',
    width: '80px',
    fontSize: isMobile ? '16px' : '1rem',
    background: 'white',
    outline: 'none'
  }),

  refreshButton: {
    background: '#f1f5f9',
    border: '1px solid #cbd5e1',
    color: '#475569',
    padding: '0.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  } as CSSProperties,

  // Preview section
  previewSection: {
    marginTop: '1.5rem',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  } as CSSProperties,

  previewTitle: (isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? '0.9rem' : '1rem',
    color: '#374151',
    margin: '0 0 0.5rem 0',
    fontWeight: '600'
  }),

  previewCode: (isMobile: boolean): CSSProperties => ({
    display: 'block',
    marginTop: '0.5rem',
    padding: '0.75rem',
    background: 'white',
    borderRadius: '8px',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    color: '#1e293b',
    border: '1px solid #e2e8f0',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  }),

  // Action buttons
  actionButtons: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '1rem',
    marginTop: '1.5rem'
  }),

  analyzeButton: (loading: boolean, disabled: boolean, isMobile: boolean): CSSProperties => ({
    background: loading ? '#94a3b8' : 'linear-gradient(135deg, #4c1d95, #3730a3)',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: 'bold',
    cursor: loading || disabled ? 'not-allowed' : 'pointer',
    flex: isMobile ? 'none' : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: loading ? 'none' : '0 4px 12px rgba(76, 29, 149, 0.3)',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease'
  }),

  testButton: (loading: boolean): CSSProperties => ({
    background: loading ? '#94a3b8' : 'linear-gradient(135deg, #059669, #047857)',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: loading ? 'none' : '0 4px 12px rgba(5, 150, 105, 0.3)',
    transition: 'all 0.2s ease'
  }),

  // Error display
  errorContainer: (isMobile: boolean): CSSProperties => ({
    background: '#fee2e2',
    border: '1px solid #fca5a5',
    color: '#dc2626',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    fontSize: isMobile ? '0.9rem' : '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  }),

  errorIcon: {
    background: '#dc2626',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    flexShrink: 0
  } as CSSProperties,

  // Results section
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  } as CSSProperties,

  // Phase result card
  phaseCard: (isMobile: boolean): CSSProperties => ({
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.5rem' : '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    scrollMarginTop: '100px' // Para el scroll automático
  }),

  phaseHighlight: (phaseColor: string): CSSProperties => ({
    background: `${phaseColor}15`,
    border: `2px solid ${phaseColor}`,
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '2rem'
  }),

  phaseTitle: (phaseColor: string, isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? '1.5rem' : '2rem',
    fontWeight: 'bold',
    color: phaseColor,
    marginBottom: '1rem'
  }),

  phaseDescription: (isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? '0.9rem' : '1rem',
    color: '#374151',
    marginBottom: '1rem'
  }),

  phaseStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap'
  } as CSSProperties,

  statItem: {
    textAlign: 'center'
  } as CSSProperties,

  statValue: (color: string, isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    fontWeight: 'bold',
    color: color
  }),

  statLabel: {
    fontSize: '0.9rem',
    color: '#6b7280'
  } as CSSProperties,

  // Tabs
  tabsContainer: (isMobile: boolean): CSSProperties => ({
    display: isMobile ? 'grid' : 'flex',
    gridTemplateColumns: isMobile ? '1fr 1fr' : 'none',
    gap: isMobile ? '0.5rem' : '0',
    borderBottom: isMobile ? 'none' : '2px solid #f1f5f9',
    marginBottom: '2rem',
    overflowX: isMobile ? 'visible' : 'auto',
    padding: isMobile ? '1rem' : '0',
    background: isMobile ? '#f8fafc' : 'transparent',
    borderRadius: isMobile ? '12px' : '0'
  }),

  tabButton: (isActive: boolean, phaseColor: string, isMobile: boolean): CSSProperties => ({
    background: isMobile ? (isActive ? 'white' : 'transparent') : 'none',
    border: isMobile ? '1px solid #e2e8f0' : 'none',
    padding: isMobile ? '0.75rem' : '1rem 1.5rem',
    cursor: 'pointer',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '600',
    color: isActive ? phaseColor : '#64748b',
    borderBottom: !isMobile ? (isActive ? `3px solid ${phaseColor}` : '3px solid transparent') : 'none',
    borderRadius: isMobile ? '8px' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    minWidth: 'max-content',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  }),

  // Tab content
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  } as CSSProperties,

  // Loading spinner keyframes
  spinKeyframes: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `
};