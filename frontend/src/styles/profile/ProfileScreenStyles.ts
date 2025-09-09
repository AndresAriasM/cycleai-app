// frontend/src/styles/profile/ProfileScreenStyles.ts
import type { CSSProperties } from 'react';

export interface ProfileScreenStyles {
  container: CSSProperties;
  content: CSSProperties;
  backButton: CSSProperties;
  backButtonHover: CSSProperties;
  card: CSSProperties;
  decorativeTriangleLeft: CSSProperties;
  decorativeTriangleRight: CSSProperties;
  userInfo: CSSProperties;
  userDetails: CSSProperties;
  userName: CSSProperties;
  userRole: CSSProperties;
  username: CSSProperties;
  levelBadge: CSSProperties;
  statsGrid: CSSProperties;
  statCard: CSSProperties;
  statIcon: CSSProperties;
  statValue: CSSProperties;
  statLabel: CSSProperties;
  detailItem: CSSProperties;
  detailIcon: CSSProperties;
  teamSection: CSSProperties;
  teamTitle: CSSProperties;
  teamGrid: CSSProperties;
  teamMember: CSSProperties;
  teamMemberHover: CSSProperties;
  teamMemberInfo: CSSProperties;
  teamMemberName: CSSProperties;
  teamMemberRole: CSSProperties;
  teamMemberStats: CSSProperties;
  teamMemberBadge: CSSProperties;
  actionsContainer: CSSProperties;
  actionButton: (variant: 'settings' | 'logout') => CSSProperties;
  actionButtonHover: (variant: 'settings' | 'logout') => CSSProperties;
}

export const createProfileScreenStyles = (isMobile: boolean): ProfileScreenStyles => ({
  container: {
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  content: {
    padding: isMobile ? '1.5rem 1rem' : '2rem 1rem',
    maxWidth: isMobile ? '100%' : '800px',
    margin: '0 auto'
  },

  backButton: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: isMobile ? '1.5rem' : '2rem',
    transition: 'color 0.3s ease',
    gap: '0.5rem'
  },

  backButtonHover: {
    color: '#67e8f9'
  },

  card: {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(25px)',
    borderRadius: isMobile ? '20px' : '24px',
    padding: isMobile ? '1.5rem' : '2rem',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    marginBottom: isMobile ? '1.5rem' : '2rem',
    position: 'relative'
  },

  decorativeTriangleLeft: {
    position: 'absolute',
    top: '-20px',
    left: '20px',
    width: '0',
    height: '0',
    borderLeft: '18px solid transparent',
    borderRight: '18px solid transparent',
    borderBottom: '25px solid rgba(6, 182, 212, 0.4)',
    display: isMobile ? 'none' : 'block'
  },

  decorativeTriangleRight: {
    position: 'absolute',
    top: '-20px',
    right: '20px',
    width: '0',
    height: '0',
    borderLeft: '18px solid transparent',
    borderRight: '18px solid transparent',
    borderBottom: '25px solid rgba(139, 92, 246, 0.4)',
    display: isMobile ? 'none' : 'block'
  },

  userInfo: {
    display: 'flex',
    alignItems: isMobile ? 'flex-start' : 'center',
    marginBottom: isMobile ? '1.5rem' : '2rem',
    gap: isMobile ? '1rem' : '1.5rem',
    flexDirection: isMobile ? 'column' : 'row',
    textAlign: isMobile ? 'center' : 'left' as 'center' | 'left'
  },

  userDetails: {
    flex: 1,
    width: isMobile ? '100%' : 'auto'
  },

  userName: {
    fontSize: isMobile ? '2rem' : '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
    marginBottom: '0.5rem',
    lineHeight: '1.2'
  },

  userRole: {
    fontSize: isMobile ? '1rem' : '1.2rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0 0 0.5rem 0'
  },

  username: {
    fontSize: isMobile ? '0.9rem' : '1rem',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
    marginBottom: '0.75rem'
  },

  levelBadge: {
    background: 'rgba(6, 182, 212, 0.3)',
    color: '#67e8f9',
    padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: isMobile ? '0.8rem' : '0.875rem',
    fontWeight: '600',
    display: 'inline-block',
    border: '1px solid rgba(103, 232, 249, 0.3)',
    marginTop: '0.75rem'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: isMobile ? '0.75rem' : '1rem',
    marginBottom: isMobile ? '1.5rem' : '2rem'
  },

  statCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    textAlign: 'center' as 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  statIcon: {
    marginBottom: '0.5rem'
  },

  statValue: {
    fontSize: isMobile ? '1.75rem' : '2rem',
    fontWeight: 'bold',
    color: 'white',
    margin: '0.5rem 0'
  },

  statLabel: {
    fontSize: isMobile ? '0.8rem' : '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)'
  },

  detailItem: {
    display: 'flex',
    alignItems: 'center',
    padding: isMobile ? '0.875rem' : '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    marginBottom: isMobile ? '0.75rem' : '1rem',
    color: 'white',
    gap: isMobile ? '0.75rem' : '1rem',
    fontSize: isMobile ? '0.9rem' : '1rem'
  },

  detailIcon: {
    flexShrink: 0
  },

  teamSection: {
    marginBottom: 0
  },

  teamTitle: {
    fontSize: isMobile ? '1.5rem' : '1.8rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: isMobile ? '1.25rem' : '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },

  teamGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: isMobile ? '0.5rem' : '0.75rem'
  },

  teamMember: {
    display: 'flex',
    alignItems: 'center',
    padding: isMobile ? '0.875rem' : '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    color: 'white',
    gap: isMobile ? '0.75rem' : '1rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },

  teamMemberHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(4px)'
  },

  teamMemberInfo: {
    flex: 1
  },

  teamMemberName: {
    fontWeight: '600',
    marginBottom: '0.25rem',
    fontSize: isMobile ? '0.9rem' : '1rem'
  },

  teamMemberRole: {
    fontSize: isMobile ? '0.8rem' : '0.875rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '0.25rem'
  },

  teamMemberStats: {
    fontSize: isMobile ? '0.7rem' : '0.75rem',
    color: 'rgba(255, 255, 255, 0.4)'
  },

  teamMemberBadge: {
    background: 'rgba(16, 185, 129, 0.2)',
    color: '#67e8f9',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: isMobile ? '0.7rem' : '0.75rem',
    fontWeight: '600',
    border: '1px solid rgba(103, 232, 249, 0.3)'
  },

  actionsContainer: {
    display: 'flex',
    gap: isMobile ? '0.75rem' : '1rem',
    flexDirection: isMobile ? 'column' : 'row'
  },

  actionButton: (variant: 'settings' | 'logout') => ({
    flex: 1,
    minWidth: isMobile ? '100%' : '200px',
    padding: isMobile ? '0.875rem' : '1rem',
    background: variant === 'logout' 
      ? 'rgba(239, 68, 68, 0.2)' 
      : 'rgba(255, 255, 255, 0.1)',
    border: variant === 'logout' 
      ? '2px solid rgba(239, 68, 68, 0.5)' 
      : '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    fontSize: isMobile ? '0.9rem' : '1rem'
  }),

  actionButtonHover: (variant: 'settings' | 'logout') => ({
    background: variant === 'logout' 
      ? 'rgba(239, 68, 68, 0.3)' 
      : 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-2px)'
  })
});

// Interfaces para los datos
export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
  avatar?: string;
  email: string;
  joinDate?: string;
  level?: string;
  xp?: number;
  analysisCount?: number;
  isOnline?: boolean;
}

// Funciones helper
export const calculateRanking = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

export const getStatColor = (type: 'xp' | 'analysis' | 'ranking') => {
  const colors = {
    xp: '#f59e0b',
    analysis: '#10b981',
    ranking: '#8b5cf6'
  };
  return colors[type];
};