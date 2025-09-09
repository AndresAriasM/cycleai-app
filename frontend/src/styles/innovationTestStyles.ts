// frontend/src/styles/innovationTestStyles.ts
import type { CSSProperties } from 'react';

interface StylesConfig {
  isMobile: boolean;
}

export const createInnovationTestStyles = ({ isMobile }: StylesConfig) => ({
  // Container Styles
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    padding: isMobile ? '1rem' : '2rem'
  } as CSSProperties,

  maxWidthContainer: {
    maxWidth: '600px',
    margin: '0 auto'
  } as CSSProperties,

  maxWidthContainerLarge: {
    maxWidth: '800px',
    margin: '0 auto'
  } as CSSProperties,

  maxWidthContainerXL: {
    maxWidth: '1000px',
    margin: '0 auto'
  } as CSSProperties,

  // Header Styles
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem'
  } as CSSProperties,

  headerWithJustifyBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem'
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
    margin: 0
  } as CSSProperties,

  headerSubtitle: {
    color: '#64748b',
    fontSize: '1rem',
    margin: '0.5rem 0 0 0'
  } as CSSProperties,

  // Card Styles
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.5rem' : '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  } as CSSProperties,

  cardWithMargin: {
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.5rem' : '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    marginBottom: '1rem'
  } as CSSProperties,

  // Setup Screen Styles
  setupIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
  } as CSSProperties,

  setupTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.5rem'
  } as CSSProperties,

  setupDescription: {
    color: '#64748b',
    fontSize: '1rem',
    lineHeight: '1.6'
  } as CSSProperties,

  modulesTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem'
  } as CSSProperties,

  moduleItem: (color: string) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    background: `${color}10`,
    border: `1px solid ${color}30`,
    borderRadius: '12px',
    marginBottom: '1rem'
  } as CSSProperties),

  moduleIcon: (color: string) => ({
    width: '50px',
    height: '50px',
    background: color,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem'
  } as CSSProperties),

  moduleContent: {
    flex: 1
  } as CSSProperties,

  moduleTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.25rem'
  } as CSSProperties,

  moduleDescription: {
    fontSize: '0.9rem',
    color: '#64748b',
    margin: 0
  } as CSSProperties,

  moduleBadge: (color: string) => ({
    background: color,
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600'
  } as CSSProperties),

  // Form Styles
  formLabel: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  } as CSSProperties,

  inputContainer: {
    position: 'relative'
  } as CSSProperties,

  inputIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  } as CSSProperties,

  textInput: {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 3rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  } as CSSProperties,

  // Button Styles
  primaryButton: (enabled: boolean) => ({
    width: '100%',
    background: enabled 
      ? 'linear-gradient(135deg, #3b82f6, #1e40af)' 
      : '#94a3b8',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: enabled ? 'pointer' : 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: enabled 
      ? '0 4px 12px rgba(59, 130, 246, 0.3)' 
      : 'none'
  } as CSSProperties),

  secondaryButton: {
    background: 'white',
    border: '2px solid #e2e8f0',
    color: '#374151',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  actionButton: {
    background: '#f1f5f9',
    border: '1px solid #cbd5e1',
    color: '#475569',
    padding: '0.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  } as CSSProperties,

  // Alert Styles
  warningAlert: {
    marginTop: '1rem',
    padding: '1rem',
    background: '#fef3c7',
    borderRadius: '12px',
    border: '1px solid #f59e0b'
  } as CSSProperties,

  alertContent: {
    display: 'flex',
    alignItems: 'center',
    color: '#92400e',
    fontSize: '0.9rem'
  } as CSSProperties,

  infoAlert: {
    background: '#fef3c7',
    borderRadius: '12px',
    padding: '1rem',
    border: '1px solid #f59e0b',
    marginBottom: '1rem'
  } as CSSProperties,

  infoAlertContent: {
    display: 'flex',
    alignItems: 'flex-start',
    color: '#92400e',
    fontSize: '0.9rem'
  } as CSSProperties,

  // Progress Styles
  progressContainer: {
    marginBottom: '1rem'
  } as CSSProperties,

  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  } as CSSProperties,

  progressLabel: {
    fontSize: '0.9rem',
    color: '#374151',
    fontWeight: '500'
  } as CSSProperties,

  progressValue: {
    fontSize: '0.9rem',
    color: '#3b82f6',
    fontWeight: '600'
  } as CSSProperties,

  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden'
  } as CSSProperties,

  progressFill: (width: number, color = '#3b82f6') => ({
    width: `${width}%`,
    height: '100%',
    background: color.includes('gradient') ? color : `linear-gradient(135deg, ${color}, ${color})`,
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  } as CSSProperties),

  moduleProgressBar: {
    width: '100%',
    height: '4px',
    background: '#e2e8f0',
    borderRadius: '2px',
    overflow: 'hidden'
  } as CSSProperties,

  moduleProgressFill: (width: number) => ({
    width: `${width}%`,
    height: '100%',
    background: '#10b981',
    borderRadius: '2px',
    transition: 'width 0.3s ease'
  } as CSSProperties),

  // Question Styles
  moduleInfo: (color: string) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    padding: '1rem',
    background: `${color}10`,
    borderRadius: '12px',
    border: `1px solid ${color}30`
  } as CSSProperties),

  questionNumber: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '0.5rem',
    fontWeight: '500'
  } as CSSProperties,

  questionText: {
    fontSize: isMobile ? '1.1rem' : '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: '1.5',
    marginBottom: '1.5rem'
  } as CSSProperties,

  answerGrid: {
    display: 'grid',
    gap: '0.75rem'
  } as CSSProperties,

  answerOption: (isSelected: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    background: isSelected ? '#dbeafe' : '#f8fafc',
    border: `2px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left' as const
  } as CSSProperties),

  answerContent: {
    flex: 1
  } as CSSProperties,

  answerHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.25rem'
  } as CSSProperties,

  answerScore: (isSelected: boolean) => ({
    background: isSelected ? '#3b82f6' : '#6b7280',
    color: 'white',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginRight: '0.75rem'
  } as CSSProperties),

  answerLabel: (isSelected: boolean) => ({
    fontSize: '1rem',
    fontWeight: '600',
    color: isSelected ? '#1e40af' : '#374151'
  } as CSSProperties),

  // Navigation Styles
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  } as CSSProperties,

  navButton: (enabled: boolean, variant: 'default' | 'primary' | 'success' = 'default') => {
    const variants = {
      default: {
        background: enabled ? 'white' : '#f1f5f9',
        border: '2px solid #e2e8f0',
        color: enabled ? '#374151' : '#9ca3af'
      },
      primary: {
        background: enabled ? 'linear-gradient(135deg, #3b82f6, #1e40af)' : '#94a3b8',
        border: 'none',
        color: 'white'
      },
      success: {
        background: enabled ? 'linear-gradient(135deg, #10b981, #047857)' : '#94a3b8',
        border: 'none',
        color: 'white'
      }
    };

    return {
      ...variants[variant],
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: enabled ? 'pointer' : 'not-allowed',
      fontSize: '0.9rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    } as CSSProperties;
  },

  navInfo: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '500'
  } as CSSProperties,

  // Results Styles
  overallScoreCard: (color: string) => ({
    background: `linear-gradient(135deg, ${color}15, ${color}05)`,
    border: `2px solid ${color}`,
    borderRadius: '20px',
    padding: isMobile ? '1.5rem' : '2rem',
    marginBottom: '2rem',
    textAlign: 'center' as const
  } as CSSProperties),

  overallScore: (color: string) => ({
    fontSize: isMobile ? '2.5rem' : '3rem',
    fontWeight: 'bold',
    color: color,
    marginBottom: '1rem'
  } as CSSProperties),

  levelTitle: {
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.5rem'
  } as CSSProperties,

  levelDescription: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto'
  } as CSSProperties,

  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '2rem'
  } as CSSProperties,

  moduleScoreItem: {
    marginBottom: '1.5rem',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  } as CSSProperties,

  moduleScoreHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.75rem'
  } as CSSProperties,

  moduleScoreIcon: (color: string) => ({
    width: '40px',
    height: '40px',
    background: color,
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem'
  } as CSSProperties),

  moduleScoreContent: {
    flex: 1
  } as CSSProperties,

  moduleScoreTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.25rem'
  } as CSSProperties,

  moduleScoreValues: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  } as CSSProperties,

  moduleScorePercentage: (color: string) => ({
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: color
  } as CSSProperties),

  moduleScorePoints: {
    fontSize: '0.9rem',
    color: '#64748b'
  } as CSSProperties,

  // Recommendations Styles
  recommendationsTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  recommendationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '1rem',
    background: '#f0f9ff',
    border: '1px solid #0ea5e9',
    borderRadius: '12px',
    gap: '0.75rem'
  } as CSSProperties,

  recommendationNumber: {
    background: '#0ea5e9',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    flexShrink: 0,
    marginTop: '0.1rem'
  } as CSSProperties,

  recommendationText: {
    fontSize: '0.95rem',
    color: '#0c4a6e',
    lineHeight: '1.5'
  } as CSSProperties,

  // Actions Styles
  actionsContainer: {
    display: 'flex',
    flexDirection: isMobile ? 'column' as const : 'row' as const,
    gap: '1rem',
    marginTop: '2rem',
    justifyContent: 'center'
  } as CSSProperties,

  // Utility Styles
  flexCenter: {
    display: 'flex',
    alignItems: 'center'
  } as CSSProperties,

  textCenter: {
    textAlign: 'center' as const
  } as CSSProperties,

  hidden: {
    display: 'none'
  } as CSSProperties,

  // Responsive adjustments
  responsive: {
    marginLeft: isMobile ? '0' : '1rem',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    padding: isMobile ? '0.5rem' : '1rem'
  } as CSSProperties
});