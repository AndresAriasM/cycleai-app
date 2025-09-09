// frontend/src/styles/support/SupportScreenStyles.ts
import type { CSSProperties } from 'react';

export interface SupportScreenStyles {
  pageHeader: CSSProperties;
  pageTitle: CSSProperties;
  pageDescription: CSSProperties;
  card: CSSProperties;
  cardTitle: CSSProperties;
  cardDescription: CSSProperties;
  contactGrid: CSSProperties;
  supportOption: CSSProperties;
  supportOptionHover: CSSProperties;
  supportIcon: (color: string) => CSSProperties;
  supportOptionTitle: CSSProperties;
  supportOptionDescription: CSSProperties;
  resourcesGrid: CSSProperties;
  resourceItem: (gradientColors: string, borderColor: string) => CSSProperties;
  resourceItemHover: CSSProperties;
  resourceContent: CSSProperties;
  resourceIcon: (gradient: string) => CSSProperties;
  resourceInfo: CSSProperties;
  resourceTitle: CSSProperties;
  resourceDescription: CSSProperties;
  faqHeader: CSSProperties;
  faqHeaderContent: CSSProperties;
  faqTitle: CSSProperties;
  faqCount: CSSProperties;
  faqSearchContainer: CSSProperties;
  faqSearchInput: CSSProperties;
  faqSearchInputFocus: CSSProperties;
  faqList: CSSProperties;
  faqItem: (isExpanded: boolean) => CSSProperties;
  faqQuestion: (isExpanded: boolean) => CSSProperties;
  faqQuestionHover: (isExpanded: boolean) => CSSProperties;
  faqQuestionContent: CSSProperties;
  faqCategory: CSSProperties;
  faqChevron: (isExpanded: boolean) => CSSProperties;
  faqAnswer: CSSProperties;
  emptyState: CSSProperties;
  emptyStateIcon: CSSProperties;
  emptyStateTitle: CSSProperties;
  emptyStateDescription: CSSProperties;
  infoGrid: CSSProperties;
  infoCard: (gradientColors: string, borderColor: string) => CSSProperties;
  infoTitle: CSSProperties;
  infoContent: CSSProperties;
  infoItem: CSSProperties;
  infoLabel: CSSProperties;
  feedbackSection: CSSProperties;
  feedbackTitle: CSSProperties;
  feedbackDescription: CSSProperties;
  feedbackButtons: CSSProperties;
  feedbackButton: (variant: 'positive' | 'negative') => CSSProperties;
  feedbackButtonHover: (variant: 'positive' | 'negative') => CSSProperties;
}

export const createSupportScreenStyles = (isMobile: boolean): SupportScreenStyles => ({
  pageHeader: {
    marginBottom: '2rem'
  },

  pageTitle: {
    fontSize: isMobile ? '2rem' : '2.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.75rem'
  },

  pageDescription: {
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    color: '#64748b',
    lineHeight: '1.6',
    maxWidth: '600px'
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
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },

  cardDescription: {
    color: '#64748b',
    marginBottom: '1.5rem',
    fontSize: isMobile ? '0.9rem' : '1rem'
  },

  contactGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: '1.5rem'
  },

  supportOption: {
    background: 'white',
    borderRadius: '12px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center' as 'center',
    height: '100%',
    border: '2px solid transparent'
  },

  supportOptionHover: {
    transform: 'translateY(-4px)'
  },

  supportIcon: (color: string) => ({
    width: isMobile ? '60px' : '70px',
    height: isMobile ? '60px' : '70px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${color}, ${color}dd)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem',
    color: 'white',
    boxShadow: `0 8px 20px -5px ${color}40`
  }),

  supportOptionTitle: {
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },

  supportOptionDescription: {
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    color: '#64748b',
    margin: 0
  },

  resourcesGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: '1rem'
  },

  resourceItem: (gradientColors: string, borderColor: string) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '1rem' : '1.25rem',
    background: `linear-gradient(135deg, ${gradientColors})`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: `1px solid ${borderColor}`
  }),

  resourceItemHover: {
    transform: 'translateY(-2px)'
  },

  resourceContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },

  resourceIcon: (gradient: string) => ({
    width: isMobile ? '45px' : '50px',
    height: isMobile ? '45px' : '50px',
    borderRadius: '12px',
    background: `linear-gradient(135deg, ${gradient})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0
  }),

  resourceInfo: {
    flex: 1
  },

  resourceTitle: {
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0
  },

  resourceDescription: {
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    color: '#64748b',
    margin: '0.25rem 0 0 0'
  },

  faqHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    marginBottom: '1.5rem',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '1rem'
  },

  faqHeaderContent: {
    flex: 1
  },

  faqTitle: {
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
    marginBottom: '0.25rem'
  },

  faqCount: {
    color: '#64748b',
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    margin: 0
  },

  faqSearchContainer: {
    position: 'relative',
    minWidth: isMobile ? '100%' : '320px'
  },

  faqSearchInput: {
    width: '100%',
    padding: isMobile ? '0.75rem 1rem 0.75rem 3rem' : '0.875rem 1rem 0.875rem 3.5rem',
    border: '2px solid #e2e8f0',
    borderRadius: '50px',
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    background: '#f8fafc',
    boxSizing: 'border-box' as 'border-box'
  },

  faqSearchInputFocus: {
    borderColor: '#3b82f6'
  },

  faqList: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '0.75rem'
  },

  faqItem: (isExpanded: boolean) => ({
    border: isExpanded ? '2px solid #3b82f6' : '1px solid #e2e8f0',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  }),

  faqQuestion: (isExpanded: boolean) => ({
    padding: isMobile ? '1rem' : '1.25rem',
    cursor: 'pointer',
    background: isExpanded ? '#f0f9ff' : '#f8fafc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    fontSize: isMobile ? '0.95rem' : '1rem',
    fontWeight: '600',
    color: '#1e293b',
    transition: 'background 0.3s ease',
    gap: '1rem'
  }),

  faqQuestionHover: (isExpanded: boolean) => ({
    background: isExpanded ? '#f0f9ff' : '#f1f5f9'
  }),

  faqQuestionContent: {
    flex: 1
  },

  faqCategory: {
    marginTop: '0.5rem',
    fontSize: isMobile ? '0.75rem' : '0.8rem',
    color: '#3b82f6',
    fontWeight: '500'
  },

  faqChevron: (isExpanded: boolean) => ({
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
    flexShrink: 0
  }),

  faqAnswer: {
    padding: isMobile ? '1rem' : '1.25rem',
    background: 'white',
    color: '#64748b',
    lineHeight: '1.7',
    borderTop: '1px solid #e2e8f0',
    fontSize: isMobile ? '0.9rem' : '0.95rem'
  },

  emptyState: {
    textAlign: 'center' as 'center',
    padding: isMobile ? '2rem 1rem' : '3rem 1rem',
    color: '#64748b'
  },

  emptyStateIcon: {
    margin: '0 auto 1.5rem',
    opacity: 0.5
  },

  emptyStateTitle: {
    fontSize: isMobile ? '1.2rem' : '1.3rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  },

  emptyStateDescription: {
    fontSize: isMobile ? '0.9rem' : '1rem'
  },

  infoGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },

  infoCard: (gradientColors: string, borderColor: string) => ({
    background: `linear-gradient(135deg, ${gradientColors})`,
    border: `1px solid ${borderColor}`,
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem'
  }),

  infoTitle: {
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  infoContent: {
    color: '#64748b',
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    lineHeight: '1.6'
  },

  infoItem: {
    marginBottom: '0.75rem'
  },

  infoLabel: {
    color: '#1e293b',
    fontWeight: '600'
  },

  feedbackSection: {
    textAlign: 'center' as 'center'
  },

  feedbackTitle: {
    fontSize: isMobile ? '1.2rem' : '1.3rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },

  feedbackDescription: {
    color: '#64748b',
    marginBottom: '2rem',
    fontSize: isMobile ? '0.9rem' : '1rem',
    maxWidth: '500px',
    margin: '0 auto 2rem'
  },

  feedbackButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexDirection: isMobile ? 'column' : 'row'
  },

  feedbackButton: (variant: 'positive' | 'negative') => ({
    background: variant === 'positive' 
      ? 'linear-gradient(135deg, #10b981, #059669)' 
      : '#f8fafc',
    color: variant === 'positive' ? 'white' : '#374151',
    border: variant === 'positive' ? 'none' : '2px solid #e2e8f0',
    padding: isMobile ? '0.75rem 1.5rem' : '0.875rem 2rem',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: variant === 'positive' ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
    flex: isMobile ? '1' : 'none'
  }),

  feedbackButtonHover: (variant: 'positive' | 'negative') => ({
    transform: 'translateY(-2px)',
    boxShadow: variant === 'positive' 
      ? '0 6px 20px rgba(16, 185, 129, 0.4)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    background: variant === 'negative' ? '#f1f5f9' : undefined,
    borderColor: variant === 'negative' ? '#d1d5db' : undefined
  })
});

// Interfaces para los datos
export interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  action: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Configuración de recursos
export const resourcesConfig = [
  {
    id: 'tutorial',
    title: 'Primeros Pasos',
    description: 'Tutorial interactivo para nuevos usuarios',
    icon: 'PlayCircle',
    gradientColors: '#f0f9ff, #e0f2fe',
    borderColor: '#0ea5e9',
    iconGradient: '#3b82f6, #1d4ed8'
  },
  {
    id: 'knowledge',
    title: 'Base de Conocimientos',
    description: 'Documentación completa y guías detalladas',
    icon: 'BookOpen',
    gradientColors: '#f0fdf4, #dcfce7',
    borderColor: '#22c55e',
    iconGradient: '#10b981, #059669'
  }
];

// Configuración de información
export const infoConfig = [
  {
    id: 'schedule',
    title: 'Horarios de Atención',
    icon: 'Clock',
    iconColor: '#0ea5e9',
    gradientColors: '#f0f9ff, #e0f2fe',
    borderColor: '#0ea5e9',
    items: [
      { label: 'Lunes a Viernes:', value: '8:00 AM - 6:00 PM (COT)' },
      { label: 'Sábados:', value: '9:00 AM - 2:00 PM (COT)' },
      { label: 'Chat en vivo:', value: '24/7 disponible' }
    ]
  },
  {
    id: 'response',
    title: 'Tiempo de Respuesta',
    icon: 'MessageCircle',
    iconColor: '#22c55e',
    gradientColors: '#f0fdf4, #dcfce7',
    borderColor: '#22c55e',
    items: [
      { label: 'Chat en vivo:', value: 'Respuesta inmediata' },
      { label: 'Email:', value: '2-4 horas hábiles' },
      { label: 'Llamada:', value: 'Cita programada disponible' }
    ]
  }
];

// Funciones helper
export const filterFAQs = (faqs: FAQ[], query: string): FAQ[] => {
  if (!query.trim()) return faqs;
  
  const lowercaseQuery = query.toLowerCase();
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(lowercaseQuery) ||
    faq.answer.toLowerCase().includes(lowercaseQuery) ||
    faq.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getSupportOptionColor = (optionId: string): string => {
  const colors = {
    chat: '#3b82f6',
    email: '#10b981',
    phone: '#8b5cf6'
  };
  return colors[optionId as keyof typeof colors] || '#64748b';
};