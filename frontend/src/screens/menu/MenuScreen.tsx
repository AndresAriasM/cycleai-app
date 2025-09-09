// src/screens/menu/MenuScreen.tsx - OPTIMIZADO
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Brain, 
  ChevronRight
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { 
  createMenuScreenStyles,
  calculateProgress,
  getGreeting
} from '../../styles/menu/MenuScreenStyles';
import type { 
  User, 
  Category 
} from '../../styles/menu/MenuScreenStyles';

const MenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Crear estilos basados en si es móvil o no
  const styles = createMenuScreenStyles(isMobile);

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
    avatar: '/src/assets/users/sergio.jpg'
  };

  const frequentCategories: Category[] = [
    { name: 'Hypecycle Gartner', shortName: 'Hypecycle', analysisCount: 0, color: '#8b5cf6', isFrequent: true },
    { name: 'Matriz MICMAC', shortName: 'MICMAC', analysisCount: 0, color: '#06b6d4', isFrequent: true },
    { name: 'Curvas en S', shortName: 'Curvas', analysisCount: 0, color: '#3b82f6', isFrequent: true },
    { name: 'Método MACTUN', shortName: 'MACTUN', analysisCount: 0, color: '#10b981', isFrequent: true }
  ];

  const savedCategories: Category[] = [
    { name: 'Agroindustry', analysisCount: 4, color: '#f59e0b' },
    { name: 'Artificial Intelligence', analysisCount: 16, color: '#ef4444' },
    { name: 'Education', analysisCount: 7, color: '#8b5cf6' }
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
        Categorías Frecuentes
      </h3>
      
      <div style={styles.categoriesGrid}>
        {frequentCategories.map((category, index) => (
          <div key={index} style={styles.categoryContainer}>
            <div 
              style={{
                ...styles.categoryCircle(category.color),
                ...(hoveredElement === `category-${index}` ? styles.categoryCircleHover : {})
              }}
              onClick={() => handleCategoryClick(category)}
              onMouseEnter={() => setHoveredElement(`category-${index}`)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              {category.shortName || category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SavedCategories = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>
        Categorías Guardadas
      </h3>
      
      <div style={styles.savedCategoriesList}>
        {savedCategories.map((category, index) => (
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
            <span style={styles.savedCategoryName}>
              {category.name}
            </span>
            <div style={styles.savedCategoryActions}>
              <span style={styles.savedCategoryBadge(category.color)}>
                {category.analysisCount} análisis
              </span>
              <ChevronRight size={18} color="#64748b" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PopularSection = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>
        Populares
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
              Hypecycle
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