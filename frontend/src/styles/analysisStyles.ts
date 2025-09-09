// frontend/src/styles/analysisStyles.ts

import type { CSSProperties } from 'react';

// ===== GEOGRAPHIC DISTRIBUTION STYLES =====
export const geographicStyles = {
  // Container principal
  container: (isMobile: boolean): CSSProperties => ({
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    height: isMobile ? 'auto' : 'fit-content',
    maxHeight: isMobile ? '80vh' : 'none'
  }),

  // Header con gradiente
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1.5rem',
    color: 'white'
  } as CSSProperties,

  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem'
  } as CSSProperties,

  headerTitleText: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: 0
  } as CSSProperties,

  // Navegación por tabs (móvil)
  tabsContainer: {
    display: 'flex',
    gap: '0.5rem'
  } as CSSProperties,

  tabButton: (isActive: boolean): CSSProperties => ({
    background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    color: 'white',
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }),

  // Contenido principal
  content: (isMobile: boolean): CSSProperties => ({
    padding: '1.5rem',
    height: isMobile ? 'auto' : 'fit-content',
    overflowY: isMobile ? 'auto' : 'visible',
    maxHeight: isMobile ? '60vh' : 'none'
  }),

  // Top 3 países destacados (móvil)
  topCountriesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '0.75rem',
    marginBottom: '1.5rem'
  } as CSSProperties,

  topCountryCard: (isFirst: boolean): CSSProperties => ({
    textAlign: 'center',
    padding: '1rem 0.5rem',
    background: isFirst ? '#fef3c7' : '#f8fafc',
    borderRadius: '12px',
    border: isFirst ? '2px solid #f59e0b' : '1px solid #e2e8f0',
    position: 'relative'
  }),

  // Lista completa de países
  countriesListContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  } as CSSProperties,

  countryItem: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0.75rem' : '1rem',
    background: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  }),

  countryInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  } as CSSProperties,

  countryRank: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#9ca3af',
    minWidth: '16px'
  } as CSSProperties,

  countryFlag: {
    fontSize: '1.1rem'
  } as CSSProperties,

  countryName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151'
  } as CSSProperties,

  countrySentiment: (sentimentColor: string): CSSProperties => ({
    fontSize: '0.7rem',
    color: sentimentColor,
    fontWeight: '500'
  }),

  countryStats: {
    textAlign: 'right'
  } as CSSProperties,

  countryCount: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#1e293b'
  } as CSSProperties,

  countryPercentage: {
    fontSize: '0.7rem',
    color: '#64748b'
  } as CSSProperties,

  // Grid para estadísticas (móvil)
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem'
  } as CSSProperties,

  statCard: (borderColor: string, bgColor: string): CSSProperties => ({
    background: bgColor,
    padding: '1rem',
    borderRadius: '12px',
    textAlign: 'center',
    border: `1px solid ${borderColor}`
  }),

  statValue: (textColor: string): CSSProperties => ({
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: textColor,
    marginBottom: '0.25rem'
  }),

  statLabel: {
    fontSize: '0.8rem',
    color: '#64748b'
  } as CSSProperties,

  // Análisis insights
  insightContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  } as CSSProperties,

  insightCard: (borderColor: string, bgColor: string): CSSProperties => ({
    padding: '1rem',
    background: bgColor,
    borderRadius: '12px',
    border: `1px solid ${borderColor}`
  }),

  insightHeader: (iconColor: string): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: iconColor
  }),

  insightText: {
    fontSize: '0.85rem',
    color: '#374151',
    margin: 0,
    lineHeight: '1.4'
  } as CSSProperties,

  // Desktop specific styles
  desktopTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  desktopGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem'
  } as CSSProperties,

  desktopCountryList: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0'
  } as CSSProperties,

  desktopStatsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  } as CSSProperties,

  desktopStatsSummary: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0'
  } as CSSProperties,

  desktopStatsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  } as CSSProperties,

  desktopAnalysis: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0'
  } as CSSProperties
};

// Helper functions para colores de sentiment
export const getSentimentColor = (sentiment: number): string => {
  if (sentiment > 0.2) return '#10b981';
  if (sentiment > -0.2) return '#f59e0b';
  return '#ef4444';
};

export const getSentimentBg = (sentiment: number): string => {
  if (sentiment > 0.2) return '#f0fdf4';
  if (sentiment > -0.2) return '#fefce8';
  return '#fef2f2';
};

// Helper function para flags de países
export const getCountryFlag = (country: string): string => {
  const flags: Record<string, string> = {
    'USA': '🇺🇸', 'UK': '🇬🇧', 'China': '🇨🇳', 'Japan': '🇯🇵',
    'Germany': '🇩🇪', 'France': '🇫🇷', 'Spain': '🇪🇸', 'Italy': '🇮🇹',
    'India': '🇮🇳', 'Brazil': '🇧🇷', 'Canada': '🇨🇦', 'Australia': '🇦🇺',
    'South Korea': '🇰🇷', 'Russia': '🇷🇺', 'Netherlands': '🇳🇱',
    'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Singapore': '🇸🇬',
    'Israel': '🇮🇱', 'Norway': '🇳🇴', 'Denmark': '🇩🇰', 'Finland': '🇫🇮',
    'Unknown': '🌐'
  };
  return flags[country] || '🏳️';
};

// ===== HYPE CYCLE CHART STYLES =====
export const hypeCycleStyles = {
  // Container principal
  container: {
    marginBottom: '2rem'
  } as CSSProperties,

  // Título
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem',
    textAlign: 'center'
  } as CSSProperties,

  // Card principal del gráfico
  chartCard: (isMobile: boolean): CSSProperties => ({
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderRadius: '16px',
    padding: isMobile ? '1.5rem' : '2rem',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  }),

  // SVG container
  svgContainer: (isMobile: boolean): CSSProperties => ({
    width: '100%',
    height: isMobile ? '280px' : '400px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem'
  }),

  // Descripción de la fase actual
  currentPhaseDescription: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#64748b',
    marginTop: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '12px',
    border: '1px solid rgba(139, 92, 246, 0.2)'
  } as CSSProperties,

  // Título de la fase actual
  currentPhaseTitle: {
    color: '#8b5cf6',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '0.5rem'
  } as CSSProperties,

  // Información adicional sobre las fases (móvil)
  phaseInfoCard: (isMobile: boolean): CSSProperties => ({
    background: 'white',
    borderRadius: '12px',
    padding: '1rem',
    marginTop: '1rem',
    border: '1px solid #e2e8f0',
    display: isMobile ? 'block' : 'none'
  }),

  phaseInfoTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  phasesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  } as CSSProperties,

  phaseItem: (isActive: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '8px',
    background: isActive ? '#f3f4f6' : 'transparent',
    border: isActive ? '1px solid #8b5cf6' : '1px solid transparent',
    fontSize: '0.8rem'
  }),

  phaseCircle: (isActive: boolean): CSSProperties => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: isActive ? '#8b5cf6' : '#d1d5db',
    flexShrink: 0
  }),

  phaseName: (isActive: boolean): CSSProperties => ({
    color: isActive ? '#8b5cf6' : '#64748b',
    fontWeight: isActive ? '600' : '400'
  })
};

// ===== INSIGHTS PANEL STYLES =====
export const insightsPanelStyles = {
  // Container principal
  container: {
    marginBottom: '2rem'
  } as CSSProperties,

  // Título
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  // Grid de insights
  insightsGrid: (isMobile: boolean): CSSProperties => ({
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))'
  }),

  // Card individual de insight
  insightCard: (color: string, isMobile: boolean): CSSProperties => ({
    padding: isMobile ? '1rem' : '1.25rem',
    background: `${color}08`,
    border: `1px solid ${color}25`,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  }),

  // Hover effect overlay
  hoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.1)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  } as CSSProperties,

  // Ícono del insight
  iconContainer: (color: string): CSSProperties => ({
    background: color,
    color: 'white',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '0.1rem',
    boxShadow: `0 4px 12px ${color}40`
  }),

  // Texto del insight
  insightText: (isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    color: '#374151',
    lineHeight: '1.6',
    margin: 0,
    flex: 1
  }),

  // Indicador de categoría
  categoryIndicator: (color: string): CSSProperties => ({
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: color,
    opacity: 0.6
  }),

  // Vista compacta para móvil
  compactView: {
    maxHeight: '70vh',
    overflowY: 'auto'
  } as CSSProperties,

  // Header para vista móvil
  mobileHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1rem',
    borderRadius: '12px 12px 0 0',
    marginBottom: '1rem'
  } as CSSProperties,

  mobileTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  mobileSubtitle: {
    fontSize: '0.85rem',
    opacity: 0.9,
    marginTop: '0.25rem'
  } as CSSProperties,

  // Categorías de insights
  categoryFilter: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    justifyContent: isMobile ? 'center' : 'flex-start'
  }),

  categoryButton: (isActive: boolean, color: string): CSSProperties => ({
    background: isActive ? color : 'transparent',
    color: isActive ? 'white' : color,
    border: `1px solid ${color}`,
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }),

  // Stats de insights
  insightsStats: (isMobile: boolean): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  }),

  statItem: {
    textAlign: 'center'
  } as CSSProperties,

  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b'
  } as CSSProperties,

  statLabel: {
    fontSize: '0.75rem',
    color: '#64748b',
    marginTop: '0.25rem'
  } as CSSProperties
};

// ===== NEWS RESULTS TABLE STYLES =====
export const newsTableStyles = {
  // Container principal
  container: {
    marginBottom: '2rem'
  } as CSSProperties,

  // Título
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  // Card de filtros
  filtersCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0',
    marginBottom: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  } as CSSProperties,

  // Grid de filtros
  filtersGrid: (isMobile: boolean): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
    gap: '1rem',
    alignItems: 'end'
  }),

  // Label de filtro
  filterLabel: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  } as CSSProperties,

  // Input de búsqueda
  searchInputContainer: {
    position: 'relative'
  } as CSSProperties,

  searchInput: {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  } as CSSProperties,

  searchIcon: {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  } as CSSProperties,

  // Select inputs
  selectInput: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    background: 'white',
    cursor: 'pointer'
  } as CSSProperties,

  // Botón limpiar filtros
  clearButton: {
    background: '#f3f4f6',
    border: '1px solid #d1d5db',
    color: '#374151',
    padding: '0.75rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  } as CSSProperties,

  // Card principal de resultados
  resultsCard: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  } as CSSProperties,

  // Header de ordenamiento (desktop)
  sortHeader: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 1fr 1fr 80px',
    gap: '1rem',
    padding: '1rem 1.5rem',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  } as CSSProperties,

  sortButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.9rem',
    padding: '0.25rem',
    borderRadius: '4px',
    transition: 'background 0.2s ease'
  } as CSSProperties,

  /*
  // Items de noticias
  newsItem: (isMobile: boolean, isLast: boolean): CSSProperties => ({
    borderBottom: !isLast ? '1px solid #f1f5f9' : 'none',
    transition: 'background 0.2s ease'
  }),
  */

  newsItemContent: (isMobile: boolean): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '3fr 1fr 1fr 1fr 80px',
    gap: '1rem',
    padding: '1.5rem',
    alignItems: 'flex-start'
  }),

  // Información del artículo
  articleInfo: {
    minWidth: 0 // Para permitir text overflow
  } as CSSProperties,

  articleTitle: (isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.5rem',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: isMobile ? 2 : 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }),

  articleSnippet: (isMobile: boolean): CSSProperties => ({
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '0.75rem',
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: isMobile ? 2 : 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }),

  articleSource: {
    fontSize: '0.8rem',
    color: '#9ca3af'
  } as CSSProperties,

  // Meta info para móvil
  mobileMetaGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
    marginTop: '0.75rem'
  } as CSSProperties,

  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: '#64748b'
  } as CSSProperties,

  // Botones de acción móvil
  mobileActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.75rem'
  } as CSSProperties,

  actionButton: (variant: 'primary' | 'secondary'): CSSProperties => ({
    background: variant === 'primary' ? '#3b82f6' : '#f3f4f6',
    color: variant === 'primary' ? 'white' : '#374151',
    border: variant === 'primary' ? 'none' : '1px solid #d1d5db',
    padding: '0.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.8rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  }),

  // Desktop meta info
  desktopMeta: {
    fontSize: '0.9rem',
    color: '#64748b'
  } as CSSProperties,

  // Sentiment indicator
  sentimentContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  sentimentDot: (color: string): CSSProperties => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: color
  }),

  sentimentValue: (color: string): CSSProperties => ({
    fontSize: '0.85rem',
    color: color,
    fontWeight: '500'
  }),

  // Contenido expandido
  expandedContent: {
    padding: '1rem 1.5rem 1.5rem',
    background: '#f8fafc',
    borderTop: '1px solid #f1f5f9'
  } as CSSProperties,

  expandedText: {
    fontSize: '0.9rem',
    color: '#374151',
    lineHeight: '1.6',
    margin: '0',
    marginBottom: '1rem'
  } as CSSProperties,

  // Keywords
  keywordsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem'
  } as CSSProperties,

  keywordTag: {
    background: '#e2e8f0',
    color: '#475569',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '500'
  } as CSSProperties,

  // Empty state
  emptyState: {
    padding: '3rem',
    textAlign: 'center',
    color: '#64748b'
  } as CSSProperties,

  emptyIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
    opacity: 0.5
  } as CSSProperties,

  emptyTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  } as CSSProperties,

  emptyDescription: {
    fontSize: '0.9rem'
  } as CSSProperties,

  // Paginación
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem'
  } as CSSProperties,

  paginationButton: (isActive: boolean, isDisabled: boolean): CSSProperties => ({
    background: isActive ? '#3b82f6' : isDisabled ? '#f3f4f6' : 'white',
    border: '1px solid #d1d5db',
    color: isActive ? 'white' : isDisabled ? '#9ca3af' : '#374151',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    minWidth: '40px',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  }),

  // Summary
  resultsSummary: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#64748b'
  } as CSSProperties,

  // Loading state
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    color: '#64748b'
  } as CSSProperties,

  loadingSpinner: {
    width: '24px',
    height: '24px',
    border: '2px solid #e2e8f0',
    borderTop: '2px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '0.75rem'
  } as CSSProperties
};

// ===== YEARLY TRENDS CHART STYLES =====
export const yearlyTrendsStyles = {
  // Container principal
  container: {
    marginBottom: '2rem'
  } as CSSProperties,

  // Título
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem'
  } as CSSProperties,

  // Grid principal
  mainGrid: (isMobile: boolean): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
    gap: '2rem'
  }),

  /*
  // Card del gráfico
  chartCard: (isMobile: boolean): CSSProperties => ({
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  }),
  */

  // SVG container
  svgContainer: (isMobile: boolean): CSSProperties => ({
    width: '100%',
    height: isMobile ? '220px' : '300px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem'
  }),

  // Leyenda
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '1rem',
    flexWrap: 'wrap'
  } as CSSProperties,

  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  legendLine: (color: string, isDashed?: boolean): CSSProperties => ({
    width: '20px',
    height: '3px',
    background: color,
    borderRadius: '1px',
    ...(isDashed && {
      background: 'transparent',
      borderTop: `3px dashed ${color}`
    })
  }),

  legendLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '500'
  } as CSSProperties,

  /*
  // Container de estadísticas
  statsContainer: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }),
  */

  // Card de estadísticas
  statsCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0',
    alignSelf: 'flex-start'
  } as CSSProperties,

  statsTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem'
  } as CSSProperties,

  // Lista de años
  yearsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  } as CSSProperties,

  /*
  yearItem: (isMobile: boolean): CSSProperties => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    background: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease'
  }),
  */

  yearLabel: {
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.95rem'
  } as CSSProperties,

  yearStats: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontSize: '0.85rem'
  } as CSSProperties,

  yearMentions: {
    color: '#3b82f6',
    fontWeight: '600',
    marginBottom: '0.25rem'
  } as CSSProperties,

  yearSentiment: (sentimentColor: string): CSSProperties => ({
    color: sentimentColor,
    fontWeight: '500'
  }),

  // Vista móvil compacta
  mobileHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1rem',
    borderRadius: '12px 12px 0 0',
    marginBottom: '0'
  } as CSSProperties,

  mobileTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  mobileSubtitle: {
    fontSize: '0.85rem',
    opacity: 0.9,
    marginTop: '0.25rem'
  } as CSSProperties,

  // Tabs para móvil
  mobileTabs: {
    display: 'flex',
    background: '#f8fafc',
    borderRadius: '0 0 12px 12px',
    padding: '0.5rem',
    gap: '0.5rem'
  } as CSSProperties,

  mobileTab: (isActive: boolean): CSSProperties => ({
    flex: 1,
    padding: '0.75rem',
    background: isActive ? 'white' : 'transparent',
    color: isActive ? '#1e293b' : '#64748b',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }),

  // Contenido de tabs móvil
  mobileTabContent: {
    padding: '1rem',
    background: 'white',
    borderRadius: '0 0 12px 12px'
  } as CSSProperties,

  // Grid de resumen móvil
  mobileSummaryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem'
  } as CSSProperties,

  summaryCard: (color: string, bgColor: string): CSSProperties => ({
    background: bgColor,
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
    border: `1px solid ${color}30`
  }),

  summaryValue: (color: string): CSSProperties => ({
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: color,
    marginBottom: '0.25rem'
  }),

  summaryLabel: {
    fontSize: '0.75rem',
    color: '#64748b'
  } as CSSProperties,

  // Insights de tendencias
  trendsInsights: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  } as CSSProperties,

  insightCard: (color: string, bgColor: string): CSSProperties => ({
    padding: '0.75rem',
    background: bgColor,
    borderRadius: '8px',
    border: `1px solid ${color}30`
  }),

  insightHeader: (color: string): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: color
  }),

  insightText: {
    fontSize: '0.8rem',
    color: '#374151',
    margin: 0,
    lineHeight: '1.4'
  } as CSSProperties,

  // Estado vacío
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
    color: '#64748b'
  } as CSSProperties,

  emptyIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
    opacity: 0.5
  } as CSSProperties,

  emptyTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  } as CSSProperties,

  emptyDescription: {
    fontSize: '0.9rem'
  } as CSSProperties
};