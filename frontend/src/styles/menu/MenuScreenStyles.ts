// frontend/src/styles/menu/MenuScreenStyles.ts
import type { CSSProperties } from 'react';

export interface MenuScreenStyles {
  welcomeCard: CSSProperties;
  welcomeTitle: CSSProperties;
  creditsSection: CSSProperties;
  creditsTitle: CSSProperties;
  creditsGrid: CSSProperties;
  creditItem: CSSProperties;
  creditLabel: CSSProperties;
  progressBar: CSSProperties;
  progressFill: (progress: number, color: string) => CSSProperties;
  upgradeButton: CSSProperties;
  upgradeButtonHover: CSSProperties;
  userStats: CSSProperties;
  userStatsLeft: CSSProperties;
  userStatsRight: CSSProperties;
  userLevel: CSSProperties;
  userStreak: CSSProperties;
  userXp: CSSProperties;
  xpProgressBar: CSSProperties;
  card: CSSProperties;
  cardTitle: CSSProperties;
  categoriesGrid: CSSProperties;
  categoryContainer: CSSProperties;
  categoryCircle: (color: string) => CSSProperties;
  categoryCircleHover: CSSProperties;
  savedCategoriesList: CSSProperties;
  savedCategoryItem: CSSProperties;
  savedCategoryItemHover: CSSProperties;
  savedCategoryName: CSSProperties;
  savedCategoryActions: CSSProperties;
  savedCategoryBadge: (color: string) => CSSProperties;
  popularItem: CSSProperties;
  popularItemHover: CSSProperties;
  popularContent: CSSProperties;
  popularIcon: CSSProperties;
  popularInfo: CSSProperties;
  popularTitle: CSSProperties;
  popularSubtitle: CSSProperties;
}

export const createMenuScreenStyles = (isMobile: boolean): MenuScreenStyles => ({
  welcomeCard: {
    background: 'linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)',
    borderRadius: '20px',
    padding: isMobile ? '1.5rem' : '2rem',
    marginBottom: '1.5rem',
    color: 'white',
    boxShadow: '0 8px 32px rgba(76, 29, 149, 0.3)'
  },

  welcomeTitle: {
    fontSize: isMobile ? '1.5rem' : '1.8rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    lineHeight: '1.2'
  },

  creditsSection: {
    marginBottom: '1.5rem'
  },

  creditsTitle: {
    fontSize: isMobile ? '1rem' : '1.2rem',
    marginBottom: '1rem',
    fontWeight: '600',
    opacity: 0.9
  },

  creditsGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '1rem'
  },

  creditItem: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '0.5rem'
  },

  creditLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: isMobile ? '0.85rem' : '0.9rem'
  },

  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '3px',
    overflow: 'hidden'
  },

  progressFill: (progress: number, color: string) => ({
    width: `${progress}%`,
    height: '100%',
    backgroundColor: color,
    borderRadius: '3px',
    transition: 'width 0.5s ease'
  }),

  upgradeButton: {
    background: 'rgba(255,255,255,0.2)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'white',
    padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.25rem',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    transition: 'all 0.3s ease',
    width: isMobile ? '100%' : 'auto',
    marginTop: isMobile ? '1rem' : '0'
  },

  upgradeButtonHover: {
    background: 'rgba(255,255,255,0.3)',
    transform: 'translateY(-1px)'
  },

  userStats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.75rem' : '0',
    marginBottom: '1rem'
  },

  userStatsLeft: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '0.25rem'
  },

  userStatsRight: {
    textAlign: isMobile ? 'left' : 'right' as 'left' | 'right'
  },

  userLevel: {
    fontSize: isMobile ? '0.8rem' : '0.85rem',
    opacity: 0.8,
    marginBottom: '0.25rem'
  },

  userStreak: {
    fontSize: isMobile ? '0.8rem' : '0.85rem',
    opacity: 0.8
  },

  userXp: {
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    fontWeight: 'bold'
  },

  xpProgressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '3px',
    overflow: 'hidden'
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
    fontSize: isMobile ? '1.15rem' : '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1.25rem',
    color: '#1e293b'
  },

  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? '1rem' : '1.5rem',
    justifyItems: 'center'
  },

  categoryContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center'
  },

  categoryCircle: (color: string) => ({
    width: isMobile ? '80px' : '100px',
    height: isMobile ? '80px' : '100px',
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center' as 'center',
    fontSize: isMobile ? '0.75rem' : '0.85rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease',
    padding: '0.5rem'
  }),

  categoryCircleHover: {
    transform: 'scale(1.05)'
  },

  savedCategoriesList: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '0.75rem'
  },

  savedCategoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
    background: '#f8fafc',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #e2e8f0'
  },

  savedCategoryItemHover: {
    background: '#e2e8f0',
    transform: 'translateY(-1px)'
  },

  savedCategoryName: {
    fontWeight: '500',
    color: '#1e293b',
    fontSize: isMobile ? '0.9rem' : '1rem'
  },

  savedCategoryActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  savedCategoryBadge: (color: string) => ({
    background: color,
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: isMobile ? '0.75rem' : '0.8rem',
    fontWeight: '600'
  }),

  popularItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '1rem' : '1.25rem',
    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    borderRadius: '12px',
    cursor: 'pointer',
    border: '1px solid #f59e0b',
    transition: 'transform 0.2s ease'
  },

  popularItemHover: {
    transform: 'translateY(-2px)'
  },

  popularContent: {
    display: 'flex',
    alignItems: 'center'
  },

  popularIcon: {
    fontSize: '1.5rem',
    marginRight: '0.75rem'
  },

  popularInfo: {
    display: 'flex',
    flexDirection: 'column' as 'column'
  },

  popularTitle: {
    fontWeight: 'bold',
    color: '#92400e',
    fontSize: isMobile ? '0.95rem' : '1rem'
  },

  popularSubtitle: {
    fontSize: isMobile ? '0.8rem' : '0.85rem',
    color: '#b45309'
  }
});

// Interfaces para los datos
export interface User {
  id: string;
  name: string;
  role: string;
  level: string;
  xp: number;
  maxXp: number;
  streak: number;
  analysisCredits: number;
  maxAnalysisCredits: number;
  aiCredits: number;
  maxAiCredits: number;
  avatar?: string;
}

export interface Category {
  name: string;
  shortName?: string;
  analysisCount: number;
  color: string;
  isFrequent?: boolean;
}

// Funciones helper
export const calculateProgress = (current: number, max: number): number => {
  return Math.round((current / max) * 100);
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
};