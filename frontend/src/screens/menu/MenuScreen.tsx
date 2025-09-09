// src/screens/menu/MenuScreen.tsx - VERSION MEJORADA
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Brain, 
  ChevronRight,
  TrendingUp,
  Zap,
  Target,
  GitBranch,
  Activity,
  Layers,
  Cpu,
  Network
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { 
  calculateProgress,
  getGreeting
} from '../../styles/menu/MenuScreenStyles';

interface User {
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

interface Category {
  name: string;
  shortName?: string;
  analysisCount: number;
  color: string;
  isFrequent?: boolean;
  icon?: React.ElementType;
  description?: string;
}

const MenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock data
  const currentUser: User = {
    id: '1',
    name: 'Sergio Arboleda',
    role: 'Dir Innovación',
    level: 'Tech Analyst III',
    xp: 340,
    maxXp: 500,
    streak: 5,
    analysisCredits: 362,
    maxAnalysisCredits: 500,
    aiCredits: 101,
    maxAiCredits: 200,
    avatar: '/assets/users/sergio.jpg'
  };

  // Categorías frecuentes mejoradas con iconos y descripciones
  const frequentCategories: Category[] = [
    { 
      name: 'Gartner Hype Cycle', 
      shortName: 'Hype Cycle', 
      analysisCount: 0, 
      color: 'linear-gradient(135deg, #8b5cf6, #a855f7)', 
      isFrequent: true,
      icon: TrendingUp,
      description: 'Análisis de madurez tecnológica'
    },
    { 
      name: 'Matriz MICMAC', 
      shortName: 'MICMAC', 
      analysisCount: 0, 
      color: 'linear-gradient(135deg, #06b6d4, #0891b2)', 
      isFrequent: true,
      icon: Layers,
      description: 'Análisis estructural de sistemas'
    },
    { 
      name: 'Curvas en S', 
      shortName: 'Curvas S', 
      analysisCount: 0, 
      color: 'linear-gradient(135deg, #3b82f6, #2563eb)', 
      isFrequent: true,
      icon: Activity,
      description: 'Evolución tecnológica'
    },
    { 
      name: 'Método MACTUN', 
      shortName: 'MACTUN', 
      analysisCount: 0, 
      color: 'linear-gradient(135deg, #10b981, #059669)', 
      isFrequent: true,
      icon: Target,
      description: 'Análisis de factibilidad'
    },
    { 
      name: 'Análisis STEEP', 
      shortName: 'STEEP', 
      analysisCount: 0, 
      color: 'linear-gradient(135deg, #f59e0b, #d97706)', 
      isFrequent: true,
      icon: GitBranch,
      description: 'Factores del entorno'
    },
    { 
      name: 'Roadmap Tecnológico', 
      shortName: 'Roadmap', 
      analysisCount: 0, 
      color: 'linear-gradient(135deg, #ef4444, #dc2626)', 
      isFrequent: true,
      icon: Network,
      description: 'Planificación estratégica'
    }
  ];

  const savedCategories: Category[] = [
    { name: 'Agroindustria', analysisCount: 4, color: '#f59e0b', icon: Cpu },
    { name: 'Inteligencia Artificial', analysisCount: 16, color: '#ef4444', icon: Brain },
    { name: 'Educación Digital', analysisCount: 7, color: '#8b5cf6', icon: Zap }
  ];

  // Cálculos
  const analysisProgress = calculateProgress(currentUser.analysisCredits, currentUser.maxAnalysisCredits);
  const aiProgress = calculateProgress(currentUser.aiCredits, currentUser.maxAiCredits);
  const xpProgress = calculateProgress(currentUser.xp, currentUser.maxXp);
  const greeting = getGreeting();
  const firstName = currentUser.name.split(' ')[0];

  // Handlers
  const handleCategoryClick = (category: Category) => {
    navigate('/analysis', { state: { selectedCategory: category } });
  };

  const handleSavedCategoryClick = (category: Category) => {
    navigate('/data', { state: { selectedCategory: category } });
  };

  const handlePopularClick = () => {
    navigate('/analysis', { state: { 
      selectedCategory: { 
        name: 'AI + Robot + Agro', 
        type: 'hypecycle' 
      } 
    }});
  };

  // Estilos mejorados
  const styles = {
    welcomeCard: {
      background: 'linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)',
      borderRadius: '20px',
      padding: isMobile ? '1.5rem' : '2rem',
      marginBottom: '1.5rem',
      color: 'white',
      boxShadow: '0 8px 32px rgba(76, 29, 149, 0.3)'
    } as React.CSSProperties,

    welcomeTitle: {
      fontSize: isMobile ? '1.5rem' : '1.8rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      lineHeight: '1.2'
    } as React.CSSProperties,

    creditsSection: {
      marginBottom: '1.5rem'
    } as React.CSSProperties,

    creditsTitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      marginBottom: '1rem',
      fontWeight: '600',
      opacity: 0.9
    } as React.CSSProperties,

    creditsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '1rem',
      marginBottom: '1rem'
    } as React.CSSProperties,

    creditItem: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '0.5rem'
    } as React.CSSProperties,

    creditLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: isMobile ? '0.85rem' : '0.9rem'
    } as React.CSSProperties,

    progressBar: {
      width: '100%',
      height: '6px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '3px',
      overflow: 'hidden'
    } as React.CSSProperties,

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
    } as React.CSSProperties,

    upgradeButtonHover: {
      background: 'rgba(255,255,255,0.3)',
      transform: 'translateY(-1px)'
    } as React.CSSProperties,

    userStats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '0.75rem' : '0',
      marginBottom: '1rem'
    } as React.CSSProperties,

    userStatsLeft: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '0.25rem'
    } as React.CSSProperties,

    userStatsRight: {
      textAlign: isMobile ? 'left' : 'right' as 'left' | 'right'
    } as React.CSSProperties,

    userLevel: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      opacity: 0.8,
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    userStreak: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      opacity: 0.8
    } as React.CSSProperties,

    userXp: {
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      fontWeight: 'bold'
    } as React.CSSProperties,

    xpProgressBar: {
      width: '100%',
      height: '6px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '3px',
      overflow: 'hidden'
    } as React.CSSProperties,

    card: {
      background: 'white',
      borderRadius: '16px',
      padding: isMobile ? '1.25rem' : '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    } as React.CSSProperties,

    cardTitle: {
      fontSize: isMobile ? '1.15rem' : '1.3rem',
      fontWeight: 'bold',
      marginBottom: '1.25rem',
      color: '#1e293b'
    } as React.CSSProperties,

    // Nuevos estilos para categorías profesionales
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem'
    } as React.CSSProperties,

    categoryCard: (color: string) => ({
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: `2px solid ${color}20`, // Usa el color con transparencia para el borde
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    } as React.CSSProperties),

    categoryCardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      borderColor: '#e2e8f0'
    } as React.CSSProperties,

    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    } as React.CSSProperties,

    categoryIcon: (color: string) => ({
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      marginBottom: '1rem'
    } as React.CSSProperties),

    categoryName: {
      fontSize: isMobile ? '0.95rem' : '1.1rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '0.5rem',
      lineHeight: '1.3'
    } as React.CSSProperties,

    categoryDescription: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      color: '#64748b',
      lineHeight: '1.4',
      marginBottom: '1rem'
    } as React.CSSProperties,

    categoryFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    } as React.CSSProperties,

    categoryStatus: {
      fontSize: '0.75rem',
      color: '#10b981',
      fontWeight: '600',
      background: '#ecfdf5',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px'
    } as React.CSSProperties,

    savedCategoriesList: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '0.75rem'
    } as React.CSSProperties,

    savedCategoryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '1rem' : '1.25rem',
      background: '#f8fafc',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid #e2e8f0'
    } as React.CSSProperties,

    savedCategoryItemHover: {
      background: '#e2e8f0',
      transform: 'translateY(-1px)'
    } as React.CSSProperties,

    savedCategoryContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flex: 1
    } as React.CSSProperties,

    savedCategoryIconWrapper: (color: string) => ({
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    } as React.CSSProperties),

    savedCategoryInfo: {
      flex: 1
    } as React.CSSProperties,

    savedCategoryName: {
      fontWeight: '600',
      color: '#1e293b',
      fontSize: isMobile ? '0.95rem' : '1rem',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    savedCategoryMeta: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      color: '#64748b'
    } as React.CSSProperties,

    savedCategoryActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    } as React.CSSProperties,

    savedCategoryBadge: (color: string) => ({
      background: color,
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: isMobile ? '0.75rem' : '0.8rem',
      fontWeight: '600'
    } as React.CSSProperties),

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
    } as React.CSSProperties,

    popularItemHover: {
      transform: 'translateY(-2px)'
    } as React.CSSProperties,

    popularContent: {
      display: 'flex',
      alignItems: 'center'
    } as React.CSSProperties,

    popularIcon: {
      fontSize: '1.5rem',
      marginRight: '0.75rem'
    } as React.CSSProperties,

    popularInfo: {
      display: 'flex',
      flexDirection: 'column' as 'column'
    } as React.CSSProperties,

    popularTitle: {
      fontWeight: 'bold',
      color: '#92400e',
      fontSize: isMobile ? '0.95rem' : '1rem'
    } as React.CSSProperties,

    popularSubtitle: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      color: '#b45309'
    } as React.CSSProperties
  };

  // Componentes
  const WelcomeCard = () => (
    <div style={styles.welcomeCard}>
      <h2 style={styles.welcomeTitle}>
        {greeting}, {firstName}
      </h2>
      
      <div style={styles.creditsSection}>
        <h3 style={styles.creditsTitle}>
          Créditos Disponibles
        </h3>
        
        <div style={styles.creditsGrid}>
          <div style={styles.creditItem}>
            <div style={styles.creditLabel}>
              <BarChart3 size={18} />
              <span>
                Análisis {currentUser.analysisCredits}/{currentUser.maxAnalysisCredits}
              </span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(analysisProgress, '#10b981')}></div>
            </div>
          </div>
          
          <div style={styles.creditItem}>
            <div style={styles.creditLabel}>
              <Brain size={18} />
              <span>
                IA: {currentUser.aiCredits}/{currentUser.maxAiCredits}
              </span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(aiProgress, '#f59e0b')}></div>
            </div>
          </div>
        </div>

        <button 
          style={{
            ...styles.upgradeButton,
            ...(hoveredElement === 'upgrade' ? styles.upgradeButtonHover : {})
          }}
          onMouseEnter={() => setHoveredElement('upgrade')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          Mejorar plan
        </button>
      </div>

      <div style={styles.userStats}>
        <div style={styles.userStatsLeft}>
          <div style={styles.userLevel}>
            Nivel: {currentUser.level}
          </div>
          <div style={styles.userStreak}>
            Racha: {currentUser.streak} días 🔥😎
          </div>
        </div>
        <div style={styles.userStatsRight}>
          <div style={styles.userXp}>
            XP: {currentUser.xp} puntos
          </div>
        </div>
      </div>

      <div style={styles.xpProgressBar}>
        <div style={styles.progressFill(xpProgress, '#67e8f9')}></div>
      </div>
    </div>
  );

  const FrequentCategories = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>
        Herramientas de Análisis
      </h3>
      
      <div style={styles.categoriesGrid}>
        {frequentCategories.map((category, index) => {
          const Icon = category.icon || BarChart3;
          return (
            <div 
              key={index}
              style={{
                ...styles.categoryCard(category.color),
                ...(hoveredElement === `category-${index}` ? styles.categoryCardHover : {})
              }}
              onClick={() => handleCategoryClick(category)}
              onMouseEnter={() => setHoveredElement(`category-${index}`)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div style={styles.categoryIcon(category.color)}>
                <Icon size={24} />
              </div>
              
              <div style={styles.categoryName}>
                {category.shortName || category.name}
              </div>
              
              <div style={styles.categoryDescription}>
                {category.description}
              </div>
              
              <div style={styles.categoryFooter}>
                <div style={styles.categoryStatus}>
                  Disponible
                </div>
                <ChevronRight size={16} color="#64748b" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const SavedCategories = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>
        Proyectos Guardados
      </h3>
      
      <div style={styles.savedCategoriesList}>
        {savedCategories.map((category, index) => {
          const Icon = category.icon || BarChart3;
          return (
            <div 
              key={index} 
              style={{
                ...styles.savedCategoryItem,
                ...(hoveredElement === `saved-${index}` ? styles.savedCategoryItemHover : {})
              }}
              onClick={() => handleSavedCategoryClick(category)}
              onMouseEnter={() => setHoveredElement(`saved-${index}`)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div style={styles.savedCategoryContent}>
                <div style={styles.savedCategoryIconWrapper(category.color)}>
                  <Icon size={20} />
                </div>
                <div style={styles.savedCategoryInfo}>
                  <div style={styles.savedCategoryName}>
                    {category.name}
                  </div>
                  <div style={styles.savedCategoryMeta}>
                    Último acceso: hace 2 días
                  </div>
                </div>
              </div>
              <div style={styles.savedCategoryActions}>
                <span style={styles.savedCategoryBadge(category.color)}>
                  {category.analysisCount} análisis
                </span>
                <ChevronRight size={18} color="#64748b" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const PopularSection = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>
        Tendencias Populares
      </h3>
      
      <div 
        style={{
          ...styles.popularItem,
          ...(hoveredElement === 'popular' ? styles.popularItemHover : {})
        }}
        onClick={handlePopularClick}
        onMouseEnter={() => setHoveredElement('popular')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <div style={styles.popularContent}>
          <span style={styles.popularIcon}>🔥</span>
          <div style={styles.popularInfo}>
            <div style={styles.popularTitle}>
              AI + Robot + Agro
            </div>
            <div style={styles.popularSubtitle}>
              Análisis Hypecycle - +127% esta semana
            </div>
          </div>
        </div>
        <ChevronRight size={20} color="#92400e" />
      </div>
    </div>
  );

  return (
    <MainLayout 
      title="CycleAI"
      searchPlaceholder="¿Qué buscas hoy?"
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <WelcomeCard />
      <FrequentCategories />
      <SavedCategories />
      <PopularSection />
    </MainLayout>
  );
};

export default MenuScreen;