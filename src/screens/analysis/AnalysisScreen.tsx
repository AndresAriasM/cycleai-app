// src/screens/analysis/AnalysisScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft,
  Search,
  Filter,
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
  Play
} from 'lucide-react';

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
        ['metodo-mactun', 'analisis-stakeholders'].includes(cat.id)
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
      // Mostrar mensaje de próximamente
      alert('¡Esta funcionalidad estará disponible pronto!');
      return;
    }
    
    // Navegar a la pantalla específica del análisis
    navigate(`/analysis/${category.id}`, { state: { category } });
  };

  // Estilos
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle: React.CSSProperties = {
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    padding: isMobile ? '1rem' : '1.5rem 2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  };

  const contentStyle: React.CSSProperties = {
    padding: isMobile ? '1rem' : '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const searchBarStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '2px solid #e2e8f0',
    borderRadius: '50px',
    fontSize: '1rem',
    outline: 'none',
    background: '#f8fafc'
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return '#10b981';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzado': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: isMobile ? '1rem' : '1.5rem'
        }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button
              onClick={() => navigate('/menu')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.5rem',
                marginRight: '1rem',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                color: '#64748b'
              }}
            >
              <ArrowLeft size={24} />
            </button>
            
            <div>
              <h1 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: 0,
                lineHeight: '1.2'
              }}>
                Análisis Prospectivo
              </h1>
              <p style={{
                color: '#64748b',
                fontSize: isMobile ? '0.9rem' : '1rem',
                margin: '0.25rem 0 0 0'
              }}>
                Selecciona el tipo de análisis que deseas realizar
              </p>
            </div>
          </div>

          <div style={{display: 'flex', gap: '0.5rem'}}>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              style={{
                background: '#f1f5f9',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: '#64748b'
              }}
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid3X3 size={20} />}
            </button>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          alignItems: isMobile ? 'stretch' : 'center'
        }}>
          <div style={{position: 'relative', flex: 1}}>
            <Search size={20} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchBarStyle}
              placeholder="Buscar tipo de análisis..."
            />
          </div>

          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
            {[
              { key: 'all', label: 'Todos' },
              { key: 'popular', label: 'Populares' },
              { key: 'new', label: 'Nuevos' },
              { key: 'basic', label: 'Básicos' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                style={{
                  background: selectedFilter === filter.key ? '#4c1d95' : '#f1f5f9',
                  color: selectedFilter === filter.key ? 'white' : '#64748b',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
            borderRadius: '12px',
            border: `2px solid ${selectedCategory.color}20`
          }}>
            <p style={{
              color: '#0369a1',
              fontSize: '0.9rem',
              margin: 0,
              fontWeight: '500'
            }}>
              💡 Llegaste desde: <strong>{selectedCategory.name}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={contentStyle}>
        {viewMode === 'grid' ? (
          // Vista en grilla
          <div>
            {categoryGroups.map((group, groupIndex) => (
              <div key={groupIndex} style={{marginBottom: '2.5rem'}}>
                <h2 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {group.title}
                  <span style={{
                    background: '#e2e8f0',
                    color: '#64748b',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    marginLeft: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {group.categories.length}
                  </span>
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile 
                    ? '1fr' 
                    : 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {group.categories
                    .filter(cat => filteredCategories.includes(cat))
                    .map(category => {
                      const Icon = category.icon;
                      return (
                        <div
                          key={category.id}
                          style={{
                            ...cardStyle,
                            opacity: category.isComingSoon ? 0.7 : 1,
                            position: 'relative'
                          }}
                          onClick={() => handleCategorySelect(category)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          {category.isNew && (
                            <div style={{
                              position: 'absolute',
                              top: '1rem',
                              right: '1rem',
                              background: '#10b981',
                              color: 'white',
                              fontSize: '0.7rem',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '12px',
                              fontWeight: '600'
                            }}>
                              NUEVO
                            </div>
                          )}
                          
                          {category.isComingSoon && (
                            <div style={{
                              position: 'absolute',
                              top: '1rem',
                              right: '1rem',
                              background: '#f59e0b',
                              color: 'white',
                              fontSize: '0.7rem',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '12px',
                              fontWeight: '600'
                            }}>
                              PRÓXIMAMENTE
                            </div>
                          )}

                          <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '1rem'}}>
                            <div style={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '16px',
                              background: `linear-gradient(135deg, ${category.color}, ${category.color}CC)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '1rem',
                              boxShadow: `0 4px 12px ${category.color}30`
                            }}>
                              <Icon size={28} color="white" />
                            </div>

                            <div style={{flex: 1}}>
                              <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: '#1e293b',
                                margin: '0 0 0.5rem 0',
                                lineHeight: '1.3'
                              }}>
                                {category.name}
                              </h3>
                              
                              <p style={{
                                color: '#64748b',
                                fontSize: '0.9rem',
                                margin: '0 0 1rem 0',
                                lineHeight: '1.5'
                              }}>
                                {category.description}
                              </p>

                              <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                flexWrap: 'wrap',
                                alignItems: 'center'
                              }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  background: '#f1f5f9',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '8px',
                                  fontSize: '0.75rem',
                                  fontWeight: '500'
                                }}>
                                  <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: getDifficultyColor(category.difficulty),
                                    marginRight: '0.5rem'
                                  }}></div>
                                  {category.difficulty}
                                </div>

                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: '#64748b',
                                  fontSize: '0.75rem'
                                }}>
                                  <Clock size={14} style={{marginRight: '0.25rem'}} />
                                  {category.estimatedTime}
                                </div>

                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: '#64748b',
                                  fontSize: '0.75rem'
                                }}>
                                  <Star size={14} style={{marginRight: '0.25rem'}} />
                                  {category.popularity}%
                                </div>
                              </div>
                            </div>

                            <ChevronRight size={20} color="#cbd5e1" />
                          </div>

                          <div style={{
                            padding: '1rem',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            marginTop: '1rem'
                          }}>
                            <p style={{
                              color: '#475569',
                              fontSize: '0.85rem',
                              margin: '0',
                              lineHeight: '1.4'
                            }}>
                              {category.longDescription}
                            </p>
                          </div>

                          {!category.isComingSoon && (
                            <div style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              marginTop: '1rem'
                            }}>
                              <button style={{
                                background: category.color,
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
                              }}>
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
        ) : (
          // Vista en lista
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {filteredCategories.map(category => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  style={{
                    ...cardStyle,
                    padding: '1.25rem',
                    opacity: category.isComingSoon ? 0.7 : 1
                  }}
                  onClick={() => handleCategorySelect(category)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px -3px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: category.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={24} color="white" />
                    </div>

                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem'}}>
                        <h3 style={{
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          color: '#1e293b',
                          margin: 0
                        }}>
                          {category.name}
                        </h3>
                        
                        {category.isNew && (
                          <span style={{
                            background: '#10b981',
                            color: 'white',
                            fontSize: '0.7rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '10px',
                            fontWeight: '600'
                          }}>
                            NUEVO
                          </span>
                        )}
                        
                        {category.isComingSoon && (
                          <span style={{
                            background: '#f59e0b',
                            color: 'white',
                            fontSize: '0.7rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '10px',
                            fontWeight: '600'
                          }}>
                            PRÓXIMAMENTE
                          </span>
                        )}
                      </div>

                      <p style={{
                        color: '#64748b',
                        fontSize: '0.9rem',
                        margin: '0 0 0.75rem 0'
                      }}>
                        {category.description}
                      </p>

                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        fontSize: '0.8rem',
                        color: '#64748b'
                      }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: getDifficultyColor(category.difficulty)
                          }}></div>
                          {category.difficulty}
                        </div>
                        
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                          <Clock size={12} />
                          {category.estimatedTime}
                        </div>
                        
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                          <Star size={12} />
                          {category.popularity}%
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      {!category.isComingSoon && (
                        <button style={{
                          background: category.color,
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
                        }}>
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
        )}

        {filteredCategories.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#64748b'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              opacity: 0.5
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              No se encontraron resultados
            </h3>
            <p style={{fontSize: '0.9rem'}}>
              Intenta con otros términos de búsqueda o cambia los filtros
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              style={{
                background: '#4c1d95',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisScreen;