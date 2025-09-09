// frontend/src/styles/analysisScreenStyles.ts
import type { CSSProperties } from 'react';

interface StylesConfig {
  isMobile: boolean;
}

export const createAnalysisScreenStyles = ({ isMobile }: StylesConfig) => ({
  // Container Styles
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  } as CSSProperties,

  // Header Styles
  header: {
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    padding: isMobile ? '1rem' : '1.5rem 2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  } as CSSProperties,

  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: isMobile ? '1rem' : '1.5rem'
  } as CSSProperties,

  headerLeft: {
    display: 'flex',
    alignItems: 'center'
  } as CSSProperties,

  backButton: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    marginRight: '1rem',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    color: '#64748b'
  } as CSSProperties,

  headerTitle: {
    fontSize: isMobile ? '1.5rem' : '2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
    lineHeight: '1.2'
  } as CSSProperties,

  headerSubtitle: {
    color: '#64748b',
    fontSize: isMobile ? '0.9rem' : '1rem',
    margin: '0.25rem 0 0 0'
  } as CSSProperties,

  headerActions: {
    display: 'flex',
    gap: '0.5rem'
  } as CSSProperties,

  viewModeButton: {
    background: '#f1f5f9',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#64748b'
  } as CSSProperties,

  // Search and Filter Styles
  searchFilterContainer: {
    display: 'flex',
    flexDirection: isMobile ? 'column' as const : 'row' as const,
    gap: '1rem',
    alignItems: isMobile ? 'stretch' : 'center'
  } as CSSProperties,

  searchContainer: {
    position: 'relative',
    flex: 1
  } as CSSProperties,

  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  } as CSSProperties,

  searchInput: {
    width: '100%',
    maxWidth: '400px',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '2px solid #e2e8f0',
    borderRadius: '50px',
    fontSize: '1rem',
    outline: 'none',
    background: '#f8fafc'
  } as CSSProperties,

  filterContainer: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap' as const
  } as CSSProperties,

  filterButton: (isActive: boolean) => ({
    background: isActive ? '#4c1d95' : '#f1f5f9',
    color: isActive ? 'white' : '#64748b',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  } as CSSProperties),

  selectedCategoryBanner: (color: string) => ({
    marginTop: '1rem',
    padding: '0.75rem 1rem',
    background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
    borderRadius: '12px',
    border: `2px solid ${color}20`
  } as CSSProperties),

  selectedCategoryText: {
    color: '#0369a1',
    fontSize: '0.9rem',
    margin: 0,
    fontWeight: '500'
  } as CSSProperties,

  // Content Styles
  content: {
    padding: isMobile ? '1rem' : '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  } as CSSProperties,

  // Group Styles
  groupContainer: {
    marginBottom: '2.5rem'
  } as CSSProperties,

  groupTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center'
  } as CSSProperties,

  groupBadge: {
    background: '#e2e8f0',
    color: '#64748b',
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    marginLeft: '0.75rem',
    fontWeight: '600'
  } as CSSProperties,

  // Grid Layout
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: isMobile 
      ? '1fr' 
      : 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem'
  } as CSSProperties,

  // Card Styles
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative'
  } as CSSProperties,

  cardDisabled: {
    opacity: 0.7
  } as CSSProperties,

  // Badge Styles
  newBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#10b981',
    color: 'white',
    fontSize: '0.7rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontWeight: '600'
  } as CSSProperties,

  comingSoonBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#f59e0b',
    color: 'white',
    fontSize: '0.7rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontWeight: '600'
  } as CSSProperties,

  // Card Content
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  } as CSSProperties,

  categoryIcon: (color: string) => ({
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    background: `linear-gradient(135deg, ${color}, ${color}CC)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    boxShadow: `0 4px 12px ${color}30`
  } as CSSProperties),

  cardContent: {
    flex: 1
  } as CSSProperties,

  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
    lineHeight: '1.3'
  } as CSSProperties,

  cardDescription: {
    color: '#64748b',
    fontSize: '0.9rem',
    margin: '0 0 1rem 0',
    lineHeight: '1.5'
  } as CSSProperties,

  // Card Meta Information
  metaContainer: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap' as const,
    alignItems: 'center'
  } as CSSProperties,

  difficultyBadge: (color: string) => ({
    display: 'flex',
    alignItems: 'center',
    background: '#f1f5f9',
    padding: '0.25rem 0.5rem',
    borderRadius: '8px',
    fontSize: '0.75rem',
    fontWeight: '500'
  } as CSSProperties),

  difficultyDot: (color: string) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: color,
    marginRight: '0.5rem'
  } as CSSProperties),

  metaItem: {
    display: 'flex',
    alignItems: 'center',
    color: '#64748b',
    fontSize: '0.75rem'
  } as CSSProperties,

  // Long Description
  longDescription: {
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '12px',
    marginTop: '1rem'
  } as CSSProperties,

  longDescriptionText: {
    color: '#475569',
    fontSize: '0.85rem',
    margin: '0',
    lineHeight: '1.4'
  } as CSSProperties,

  // Action Button
  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem'
  } as CSSProperties,

  actionButton: (color: string) => ({
    background: color,
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'transform 0.2s ease'
  } as CSSProperties),

  // List View Styles
  listContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem'
  } as CSSProperties,

  listCard: {
    padding: '1.25rem'
  } as CSSProperties,

  listCardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  } as CSSProperties,

  listIcon: (color: string) => ({
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  } as CSSProperties),

  listContent: {
    flex: 1
  } as CSSProperties,

  listHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.25rem'
  } as CSSProperties,

  listTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0
  } as CSSProperties,

  listBadge: (background: string) => ({
    background,
    color: 'white',
    fontSize: '0.7rem',
    padding: '0.2rem 0.5rem',
    borderRadius: '10px',
    fontWeight: '600'
  } as CSSProperties),

  listDescription: {
    color: '#64748b',
    fontSize: '0.9rem',
    margin: '0 0 0.75rem 0'
  } as CSSProperties,

  listMeta: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    fontSize: '0.8rem',
    color: '#64748b'
  } as CSSProperties,

  listMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  } as CSSProperties,

  listActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  } as CSSProperties,

  listActionButton: (color: string) => ({
    background: color,
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties),

  // Empty State
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem 1rem',
    color: '#64748b'
  } as CSSProperties,

  emptyStateIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    opacity: 0.5
  } as CSSProperties,

  emptyStateTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  } as CSSProperties,

  emptyStateDescription: {
    fontSize: '0.9rem'
  } as CSSProperties,

  emptyStateButton: {
    background: '#4c1d95',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1rem'
  } as CSSProperties,

  // Hover Effects
  cardHoverTransform: {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
  } as CSSProperties,

  listHoverTransform: {
    transform: 'translateX(4px)',
    boxShadow: '0 8px 25px -3px rgba(0, 0, 0, 0.1)'
  } as CSSProperties,

  // Utility Classes
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  } as CSSProperties,

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  } as CSSProperties,

  flexStart: {
    display: 'flex',
    alignItems: 'flex-start'
  } as CSSProperties,

  // Responsive Helpers
  hideOnMobile: isMobile ? { display: 'none' } : {} as CSSProperties,
  showOnMobile: !isMobile ? { display: 'none' } : {} as CSSProperties,

  // Animation Keyframes (for spin effect)
  spinAnimation: {
    animation: 'spin 1s linear infinite'
  } as CSSProperties
});

// Helper function for difficulty colors
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Básico': return '#10b981';
    case 'Intermedio': return '#f59e0b';
    case 'Avanzado': return '#ef4444';
    default: return '#64748b';
  }
};