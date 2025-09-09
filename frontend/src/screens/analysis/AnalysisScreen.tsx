// src/screens/analysis/AnalysisScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft,
  Search,
  Grid3X3,
  List,
  TrendingUp,
  Brain,
  BarChart3,
  Target,
  Lightbulb,
  Zap,
  Star,
  Clock,
  Users,
  ChevronRight,
  Play,
  Award
} from 'lucide-react';
import { createAnalysisScreenStyles, getDifficultyColor } from '../../styles/analysisScreenStyles';

// Interfaces
interface AnalysisCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  color: string;
  icon: React.ElementType;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  estimatedTime: string;
  popularity: number;
  isNew?: boolean;
  isComingSoon?: boolean;
  requirements?: string[];
  outputs?: string[];
}

interface CategoryGroup {
  title: string;
  categories: AnalysisCategory[];
}

const AnalysisScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'new' | 'basic'>('all');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Create styles with current mobile state
  const styles = createAnalysisScreenStyles({ isMobile });

  // Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Obtener categoría seleccionada desde el MenuScreen (si existe)
  const selectedCategory = location.state?.selectedCategory;

  // Definición de todas las categorías de análisis
  const analysisCategories: AnalysisCategory[] = [
    {
      id: 'hypecycle-gartner',
      name: 'Hypecycle de Gartner',
      shortName: 'Hypecycle',
      description: 'Análisis del ciclo de expectativas de tecnologías',
      longDescription: 'Evalúa tecnologías según su madurez y adopción en el mercado, identificando el momento óptimo para su implementación.',
      color: '#8b5cf6',
      icon: TrendingUp,
      difficulty: 'Intermedio',
      estimatedTime: '15-20 min',
      popularity: 95,
      requirements: ['Datos de mercado', 'Información tecnológica'],
      outputs: ['Gráfico de madurez', 'Recomendaciones de timing', 'Análisis de riesgos']
    },
    {
      id: 'matriz-micmac',
      name: 'Matriz MICMAC',
      shortName: 'MICMAC',
      description: 'Análisis estructural de variables y dependencias',
      longDescription: 'Identifica variables clave y sus interrelaciones para entender la estructura de un sistema complejo.',
      color: '#06b6d4',
      icon: Grid3X3,
      difficulty: 'Avanzado',
      estimatedTime: '25-30 min',
      popularity: 78,
      requirements: ['Variables del sistema', 'Relaciones entre variables'],
      outputs: ['Mapa de influencias', 'Variables estratégicas', 'Escenarios posibles']
    },
    {
      id: 'curvas-s',
      name: 'Curvas en S',
      shortName: 'Curvas S',
      description: 'Análisis de ciclos de vida tecnológicos',
      longDescription: 'Modela la evolución y sustitución de tecnologías a lo largo del tiempo mediante curvas sigmoidales.',
      color: '#3b82f6',
      icon: BarChart3,
      difficulty: 'Intermedio',
      estimatedTime: '20-25 min',
      popularity: 82,
      requirements: ['Datos históricos', 'Métricas de rendimiento'],
      outputs: ['Proyecciones de evolución', 'Puntos de inflexión', 'Ventanas de oportunidad']
    },
    {
      id: 'metodo-mactun',
      name: 'Método MACTUN',
      shortName: 'MACTUN',
      description: 'Análisis multicriterio para toma de decisiones',
      longDescription: 'Framework para evaluación y selección de alternativas considerando múltiples criterios y objetivos.',
      color: '#10b981',
      icon: Target,
      difficulty: 'Básico',
      estimatedTime: '10-15 min',
      popularity: 65,
      requirements: ['Criterios de evaluación', 'Alternativas a comparar'],
      outputs: ['Ranking de alternativas', 'Análisis de sensibilidad', 'Matriz de decisión']
    },
    {
      id: 'analisis-morfologico',
      name: 'Análisis Morfológico',
      shortName: 'Morfológico',
      description: 'Exploración sistemática de configuraciones',
      longDescription: 'Genera y evalúa todas las combinaciones posibles de elementos para identificar soluciones innovadoras.',
      color: '#f59e0b',
      icon: Lightbulb,
      difficulty: 'Intermedio',
      estimatedTime: '20-30 min',
      popularity: 71,
      isNew: true,
      requirements: ['Dimensiones del problema', 'Opciones por dimensión'],
      outputs: ['Espacio morfológico', 'Configuraciones viables', 'Soluciones emergentes']
    },
    {
      id: 'escenarios-futuros',
      name: 'Construcción de Escenarios',
      shortName: 'Escenarios',
      description: 'Desarrollo de futuros alternativos plausibles',
      longDescription: 'Crea narrativas coherentes sobre posibles futuros para mejorar la planificación estratégica.',
      color: '#ef4444',
      icon: Brain,
      difficulty: 'Avanzado',
      estimatedTime: '30-40 min',
      popularity: 88,
      requirements: ['Variables clave', 'Tendencias identificadas', 'Incertidumbres críticas'],
      outputs: ['Escenarios detallados', 'Implicaciones estratégicas', 'Señales de alerta']
    },
    {
      id: 'test-innovacion-empresarial',
      name: 'Test de Innovación Empresarial',
      shortName: 'Test Innovación',
      description: 'Evaluación rápida de capacidades de innovación empresarial',
      longDescription: 'Herramienta de autoevaluación que mide las capacidades de innovación de una empresa en tres dimensiones clave: alineamiento estratégico, capacidades de absorción e innovación sostenible.',
      color: '#f59e0b',
      icon: Award,
      difficulty: 'Básico',
      estimatedTime: '10-15 min',
      popularity: 87,
      isNew: true,
      requirements: ['Conocimiento organizacional', 'Procesos internos'],
      outputs: ['Diagnóstico de innovación', 'Gráfico de araña', 'Recomendaciones personalizadas', 'Nivel de madurez']
    },
    {
      id: 'analisis-stakeholders',
      name: 'Análisis de Stakeholders',
      shortName: 'Stakeholders',
      description: 'Mapeo de actores y sus influencias',
      longDescription: 'Identifica y analiza todos los actores relevantes y sus relaciones en un contexto específico.',
      color: '#8b5cf6',
      icon: Users,
      difficulty: 'Básico',
      estimatedTime: '15-20 min',
      popularity: 73,
      requirements: ['Lista de actores', 'Objetivos e intereses'],
      outputs: ['Mapa de stakeholders', 'Estrategias de engagement', 'Análisis de poder']
    },
    {
      id: 'roadmapping',
      name: 'Technology Roadmapping',
      shortName: 'Roadmap',
      description: 'Planificación estratégica de tecnologías',
      longDescription: 'Desarrolla hojas de ruta que conectan objetivos de negocio con capacidades tecnológicas.',
      color: '#06b6d4',
      icon: Zap,
      difficulty: 'Avanzado',
      estimatedTime: '35-45 min',
      popularity: 91,
      isComingSoon: true,
      requirements: ['Objetivos estratégicos', 'Inventario tecnológico'],
      outputs: ['Roadmap visual', 'Hitos críticos', 'Brechas tecnológicas']
    }
  ];

  // Agrupar categorías
  const categoryGroups: CategoryGroup[] = [
    {
      title: 'Análisis de Tecnologías',
      categories: analysisCategories.filter(cat => 
        ['hypecycle-gartner', 'curvas-s', 'roadmapping'].includes(cat.id)
      )
    },
    {
      title: 'Análisis Estructural',
      categories: analysisCategories.filter(cat => 
        ['matriz-micmac', 'analisis-morfologico'].includes(cat.id)
      )
    },
    {
      title: 'Toma de Decisiones',
      categories: analysisCategories.filter(cat => 
        ['metodo-mactun', 'analisis-stakeholders', 'test-innovacion-empresarial'].includes(cat.id)
      )
    },
    {
      title: 'Prospectiva Estratégica',
      categories: analysisCategories.filter(cat => 
        ['escenarios-futuros'].includes(cat.id)
      )
    }
  ];

  // Filtrar categorías
  const filteredCategories = analysisCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'popular' && category.popularity > 80) ||
                         (selectedFilter === 'new' && category.isNew) ||
                         (selectedFilter === 'basic' && category.difficulty === 'Básico');
    
    return matchesSearch && matchesFilter;
  });

  const handleCategorySelect = (category: AnalysisCategory) => {
    if (category.isComingSoon) {
      alert('¡Esta funcionalidad estará disponible pronto!');
      return;
    }
    
    if (category.id === 'hypecycle-gartner') {
      navigate('/hypecycle');
      return;
    }

    if (category.id === 'test-innovacion-empresarial') {
      navigate('/innovation-test');
      return;
    }
    
    // Navegar a la pantalla específica del análisis
    navigate(`/analysis/${category.id}`, { state: { category } });
  };

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    if (isEntering) {
      Object.assign(e.currentTarget.style, styles.cardHoverTransform);
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
  };

  const handleListHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    if (isEntering) {
      Object.assign(e.currentTarget.style, styles.listHoverTransform);
    } else {
      e.currentTarget.style.transform = 'translateX(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
  };

  const filterOptions = [
    { key: 'all', label: 'Todos' },
    { key: 'popular', label: 'Populares' },
    { key: 'new', label: 'Nuevos' },
    { key: 'basic', label: 'Básicos' }
  ];

  const renderGridView = () => (
    <div>
      {categoryGroups.map((group, groupIndex) => (
        <div key={groupIndex} style={styles.groupContainer}>
          <h2 style={styles.groupTitle}>
            {group.title}
            <span style={styles.groupBadge}>
              {group.categories.length}
            </span>
          </h2>

          <div style={styles.gridContainer}>
            {group.categories
              .filter(cat => filteredCategories.includes(cat))
              .map(category => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    style={{
                      ...styles.card,
                      ...(category.isComingSoon ? styles.cardDisabled : {})
                    }}
                    onClick={() => handleCategorySelect(category)}
                    onMouseEnter={(e) => handleCardHover(e, true)}
                    onMouseLeave={(e) => handleCardHover(e, false)}
                  >
                    {category.isNew && (
                      <div style={styles.newBadge}>
                        NUEVO
                      </div>
                    )}
                    
                    {category.isComingSoon && (
                      <div style={styles.comingSoonBadge}>
                        PRÓXIMAMENTE
                      </div>
                    )}

                    <div style={styles.cardHeader}>
                      <div style={styles.categoryIcon(category.color)}>
                        <Icon size={28} color="white" />
                      </div>

                      <div style={styles.cardContent}>
                        <h3 style={styles.cardTitle}>
                          {category.name}
                        </h3>
                        
                        <p style={styles.cardDescription}>
                          {category.description}
                        </p>

                        <div style={styles.metaContainer}>
                          <div style={styles.difficultyDot(getDifficultyColor(category.difficulty))}>
                            <div style={styles.difficultyDot(getDifficultyColor(category.difficulty))}></div>
                            {category.difficulty}
                          </div>

                          <div style={styles.metaItem}>
                            <Clock size={14} style={{marginRight: '0.25rem'}} />
                            {category.estimatedTime}
                          </div>

                          <div style={styles.metaItem}>
                            <Star size={14} style={{marginRight: '0.25rem'}} />
                            {category.popularity}%
                          </div>
                        </div>
                      </div>

                      <ChevronRight size={20} color="#cbd5e1" />
                    </div>

                    <div style={styles.longDescription}>
                      <p style={styles.longDescriptionText}>
                        {category.longDescription}
                      </p>
                    </div>

                    {!category.isComingSoon && (
                      <div style={styles.actionButtonContainer}>
                        <button style={styles.actionButton(category.color)}>
                          <Play size={16} />
                          Comenzar Análisis
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div style={styles.listContainer}>
      {filteredCategories.map(category => {
        const Icon = category.icon;
        return (
          <div
            key={category.id}
            style={{
              ...styles.card,
              ...styles.listCard,
              ...(category.isComingSoon ? styles.cardDisabled : {})
            }}
            onClick={() => handleCategorySelect(category)}
            onMouseEnter={(e) => handleListHover(e, true)}
            onMouseLeave={(e) => handleListHover(e, false)}
          >
            <div style={styles.listCardContent}>
              <div style={styles.listIcon(category.color)}>
                <Icon size={24} color="white" />
              </div>

              <div style={styles.listContent}>
                <div style={styles.listHeader}>
                  <h3 style={styles.listTitle}>
                    {category.name}
                  </h3>
                  
                  {category.isNew && (
                    <span style={styles.listBadge('#10b981')}>
                      NUEVO
                    </span>
                  )}
                  
                  {category.isComingSoon && (
                    <span style={styles.listBadge('#f59e0b')}>
                      PRÓXIMAMENTE
                    </span>
                  )}
                </div>

                <p style={styles.listDescription}>
                  {category.description}
                </p>

                <div style={styles.listMeta}>
                  <div style={styles.listMetaItem}>
                    <div style={styles.difficultyDot(getDifficultyColor(category.difficulty))}></div>
                    {category.difficulty}
                  </div>
                  
                  <div style={styles.listMetaItem}>
                    <Clock size={12} />
                    {category.estimatedTime}
                  </div>
                  
                  <div style={styles.listMetaItem}>
                    <Star size={12} />
                    {category.popularity}%
                  </div>
                </div>
              </div>

              <div style={styles.listActions}>
                {!category.isComingSoon && (
                  <button style={styles.listActionButton(category.color)}>
                    <Play size={14} />
                    Comenzar
                  </button>
                )}
                <ChevronRight size={20} color="#cbd5e1" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderEmptyState = () => (
    <div style={styles.emptyState}>
      <div style={styles.emptyStateIcon}>
        🔍
      </div>
      <h3 style={styles.emptyStateTitle}>
        No se encontraron resultados
      </h3>
      <p style={styles.emptyStateDescription}>
        Intenta con otros términos de búsqueda o cambia los filtros
      </p>
      <button
        onClick={() => {
          setSearchQuery('');
          setSelectedFilter('all');
        }}
        style={styles.emptyStateButton}
      >
        Limpiar filtros
      </button>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <button
              onClick={() => navigate('/menu')}
              style={styles.backButton}
            >
              <ArrowLeft size={24} />
            </button>
            
            <div>
              <h1 style={styles.headerTitle}>
                Análisis Prospectivo
              </h1>
              <p style={styles.headerSubtitle}>
                Selecciona el tipo de análisis que deseas realizar
              </p>
            </div>
          </div>

          <div style={styles.headerActions}>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              style={styles.viewModeButton}
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid3X3 size={20} />}
            </button>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div style={styles.searchFilterContainer}>
          <div style={styles.searchContainer}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
              placeholder="Buscar tipo de análisis..."
            />
          </div>

          <div style={styles.filterContainer}>
            {filterOptions.map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                style={styles.filterButton(selectedFilter === filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div style={styles.selectedCategoryBanner(selectedCategory.color)}>
            <p style={styles.selectedCategoryText}>
              💡 Llegaste desde: <strong>{selectedCategory.name}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={styles.content}>
        {filteredCategories.length === 0 ? 
          renderEmptyState() : 
          (viewMode === 'grid' ? renderGridView() : renderListView())
        }
      </div>
    </div>
  );
};

export default AnalysisScreen;