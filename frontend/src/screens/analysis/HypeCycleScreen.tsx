// frontend/src/screens/analysis/HypeCycleScreen.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Search, Globe, TrendingUp, BarChart3, MapPin, Clock, Eye, Download, Share2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as HypeService from '../../services/hypecycleService';
import HypeCycleChart from '../../components/analysis/HypeCycleChart';
import NewsResultsTable from '../../components/analysis/NewsResultsTable';
import GeographicDistribution from '../../components/analysis/GeographicDistribution';
import YearlyTrendsChart from '../../components/analysis/YearlyTrendsChart';
import InsightsPanel from '../../components/analysis/InsightsPanel';

type SearchTerm = HypeService.SearchTerm;
type HypeCycleResponse = HypeService.HypeCycleResponse;
const hypecycleService = HypeService.hypecycleService;

const HypeCycleScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] = useState<SearchTerm[]>([
    { value: '', operator: 'AND', exact_match: false }
  ]);
  const [minYear, setMinYear] = useState(2015);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<HypeCycleResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'geographic' | 'news'>('overview');
  const [backendHealth, setBackendHealth] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Verificar salud del backend al cargar
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    const health = await hypecycleService.checkHealth();
    setBackendHealth(health);
  };

  const addSearchTerm = () => {
    setSearchTerms([...searchTerms, { value: '', operator: 'AND', exact_match: false }]);
  };

  const removeSearchTerm = (index: number) => {
    if (searchTerms.length > 1) {
      setSearchTerms(searchTerms.filter((_, i) => i !== index));
    }
  };

  const updateSearchTerm = (index: number, field: keyof SearchTerm, value: any) => {
    const updated = [...searchTerms];
    updated[index] = { ...updated[index], [field]: value };
    setSearchTerms(updated);
  };

  const buildPreviewQuery = () => {
    return searchTerms
      .filter(term => term.value.trim())
      .map((term, index) => {
        const value = term.exact_match ? `"${term.value}"` : term.value;
        if (index === 0) return value;
        return `${term.operator} ${value}`;
      })
      .join(' ');
  };

  const handleAnalyze = async () => {
    const validTerms = searchTerms.filter(term => term.value.trim());
    
    if (validTerms.length === 0) {
      setError('Añade al menos un término de búsqueda');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const result = await hypecycleService.analyzeHypeCycle({
        search_terms: validTerms,
        min_year: minYear
      });

      setResults(result);
      setActiveTab('overview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      await checkBackendHealth(); // Verificar conexión si hay error
    } finally {
      setLoading(false);
    }
  };

  const handleTestAnalyze = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const result = await hypecycleService.testAnalyze();
      setResults(result);
      setActiveTab('overview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en conexión');
      await checkBackendHealth();
    } finally {
      setLoading(false);
    }
  };

  const handleExportResults = () => {
    if (!results) return;
    
    const exportData = {
      analysis: {
        phase: results.phase,
        confidence: results.confidence,
        total_mentions: results.total_mentions
      },
      insights: results.insights,
      query: buildPreviewQuery(),
      timestamp: new Date().toISOString(),
      news_count: results.news_results.length
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hypecycle-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'overview': return TrendingUp;
      case 'details': return BarChart3;
      case 'geographic': return MapPin;
      case 'news': return Eye;
      default: return TrendingUp;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      paddingBottom: isMobile ? '2rem' : '0'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: isMobile ? '1rem' : '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: isMobile ? '1rem' : '1.5rem'
        }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button
              onClick={() => navigate('/analysis')}
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
                fontSize: isMobile ? '1.4rem' : '1.8rem',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: 0,
                lineHeight: '1.2'
              }}>
                Análisis Hype Cycle
              </h1>
              <p style={{
                color: '#64748b',
                fontSize: isMobile ? '0.9rem' : '1rem',
                margin: '0.25rem 0 0 0'
              }}>
                Analiza el estado de madurez de tecnologías usando SERPAPI
              </p>
            </div>
          </div>

          {/* Status del backend */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            background: backendHealth === true ? '#dcfce7' : backendHealth === false ? '#fee2e2' : '#fef3c7',
            border: `1px solid ${backendHealth === true ? '#16a34a' : backendHealth === false ? '#dc2626' : '#d97706'}`
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: backendHealth === true ? '#16a34a' : backendHealth === false ? '#dc2626' : '#d97706'
            }}></div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '600',
              color: backendHealth === true ? '#16a34a' : backendHealth === false ? '#dc2626' : '#d97706'
            }}>
              {backendHealth === true ? 'Conectado' : backendHealth === false ? 'Desconectado' : 'Verificando...'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ 
        padding: isMobile ? '1rem' : '2rem', 
        maxWidth: '1400px', 
        margin: '0 auto' 
      }}>
        {/* Query Builder Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '1.5rem' : '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              fontWeight: 'bold',
              color: '#1e293b',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Search size={20} />
              Construir Ecuación de Búsqueda
            </h2>

            {results && (
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button
                  onClick={handleExportResults}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Exportar resultados"
                >
                  <Download size={16} />
                </button>
                <button
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Compartir análisis"
                >
                  <Share2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Search Terms Builder */}
          {searchTerms.map((term, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: isMobile 
                ? '1fr' 
                : '2fr 120px 100px 50px',
              gap: isMobile ? '0.75rem' : '1rem',
              marginBottom: '1rem',
              padding: '1rem',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <input
                type="text"
                value={term.value}
                onChange={(e) => updateSearchTerm(index, 'value', e.target.value)}
                placeholder="ej: artificial intelligence, blockchain, quantum computing"
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: isMobile ? '16px' : '1rem',
                  width: '100%',
                  background: 'white'
                }}
              />
              
              <div style={{
                display: isMobile ? 'flex' : 'contents',
                gap: isMobile ? '0.5rem' : '0',
                alignItems: 'center'
              }}>
                <select
                  value={term.operator}
                  onChange={(e) => updateSearchTerm(index, 'operator', e.target.value)}
                  style={{
                    padding: isMobile ? '0.5rem' : '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: isMobile ? '14px' : '1rem',
                    flex: isMobile ? '1' : 'none',
                    background: 'white'
                  }}
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                  <option value="NOT">NOT</option>
                </select>

                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  whiteSpace: 'nowrap',
                  flex: isMobile ? '1' : 'none',
                  color: '#374151',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={term.exact_match}
                    onChange={(e) => updateSearchTerm(index, 'exact_match', e.target.checked)}
                    style={{cursor: 'pointer'}}
                  />
                  Exacto
                </label>

                <button
                  onClick={() => removeSearchTerm(index)}
                  disabled={searchTerms.length === 1}
                  style={{
                    background: searchTerms.length === 1 ? '#f1f5f9' : '#fee2e2',
                    border: 'none',
                    padding: isMobile ? '0.5rem' : '0.5rem',
                    borderRadius: '6px',
                    cursor: searchTerms.length === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Eliminar término"
                >
                  <Trash2 size={16} color={searchTerms.length === 1 ? '#cbd5e1' : '#ef4444'} />
                </button>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem', 
            marginTop: '1rem',
            alignItems: isMobile ? 'stretch' : 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem'}}>
              <button
                onClick={addSearchTerm}
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                  border: 'none',
                  color: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(14, 165, 233, 0.3)'
                }}
              >
                <Plus size={16} />
                Añadir término
              </button>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                fontSize: isMobile ? '0.9rem' : '1rem',
                background: '#f8fafc',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <Clock size={16} color="#64748b" />
                <label style={{color: '#374151', fontWeight: '500'}}>Desde año:</label>
                <input
                  type="number"
                  value={minYear}
                  onChange={(e) => setMinYear(parseInt(e.target.value))}
                  min={2010}
                  max={2024}
                  style={{
                    padding: '0.5rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '6px',
                    width: '80px',
                    fontSize: isMobile ? '16px' : '1rem',
                    background: 'white'
                  }}
                />
              </div>
            </div>

            <button
              onClick={checkBackendHealth}
              disabled={loading}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                color: '#475569',
                padding: '0.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Verificar conexión"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          {/* Preview */}
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: '#f8fafc', 
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#374151',
              margin: '0 0 0.5rem 0',
              fontWeight: '600'
            }}>
              Vista previa de la consulta:
            </h4>
            <code style={{ 
              display: 'block', 
              marginTop: '0.5rem', 
              padding: '0.75rem', 
              background: 'white', 
              borderRadius: '8px',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              wordBreak: 'break-all',
              overflowWrap: 'break-word',
              color: '#1e293b',
              border: '1px solid #e2e8f0',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            }}>
              {buildPreviewQuery() || 'Añade términos para ver la consulta'}
            </code>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem', 
            marginTop: '1.5rem' 
          }}>
            <button
              onClick={handleAnalyze}
              disabled={loading || searchTerms.filter(t => t.value.trim()).length === 0 || backendHealth === false}
              style={{
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #4c1d95, #3730a3)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 'bold',
                cursor: loading || backendHealth === false ? 'not-allowed' : 'pointer',
                flex: isMobile ? 'none' : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(76, 29, 149, 0.3)',
                opacity: backendHealth === false ? 0.5 : 1
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={20} style={{animation: 'spin 1s linear infinite'}} />
                  Analizando...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Analizar Hype Cycle
                </>
              )}
            </button>

            <button
              onClick={handleTestAnalyze}
              disabled={loading}
              style={{
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(5, 150, 105, 0.3)'
              }}
            >
              <Globe size={20} />
              Datos de Prueba
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            fontSize: isMobile ? '0.9rem' : '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              background: '#dc2626',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              !
            </div>
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* Phase Result Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                background: `${hypecycleService.getPhaseColor(results.phase)}15`,
                border: `2px solid ${hypecycleService.getPhaseColor(results.phase)}`,
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  fontSize: isMobile ? '1.5rem' : '2rem',
                  fontWeight: 'bold',
                  color: hypecycleService.getPhaseColor(results.phase),
                  marginBottom: '1rem'
                }}>
                  {results.phase}
                </div>
                
                <div style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: '#374151',
                  marginBottom: '1rem'
                }}>
                  {hypecycleService.getPhaseDescription(results.phase)}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{
                      fontSize: isMobile ? '1.2rem' : '1.5rem',
                      fontWeight: 'bold',
                      color: hypecycleService.getConfidenceColor(results.confidence)
                    }}>
                      {(results.confidence * 100).toFixed(0)}%
                    </div>
                    <div style={{fontSize: '0.9rem', color: '#6b7280'}}>
                      Confianza {hypecycleService.getConfidenceLabel(results.confidence)}
                    </div>
                  </div>
                  
                  <div style={{textAlign: 'center'}}>
                    <div style={{
                      fontSize: isMobile ? '1.2rem' : '1.5rem',
                      fontWeight: 'bold',
                      color: '#1e293b'
                    }}>
                      {results.total_mentions.toLocaleString()}
                    </div>
                    <div style={{fontSize: '0.9rem', color: '#6b7280'}}>
                      Menciones Totales
                    </div>
                  </div>
                  
                  <div style={{textAlign: 'center'}}>
                    <div style={{
                      fontSize: isMobile ? '1.2rem' : '1.5rem',
                      fontWeight: 'bold',
                      color: '#1e293b'
                    }}>
                      {results.news_results.length}
                    </div>
                    <div style={{fontSize: '0.9rem', color: '#6b7280'}}>
                      Artículos Analizados
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{
                display: 'flex',
                borderBottom: '2px solid #f1f5f9',
                marginBottom: '2rem',
                overflowX: 'auto'
              }}>
                {[
                  { key: 'overview', label: 'Resumen', icon: TrendingUp },
                  { key: 'details', label: 'Detalles', icon: BarChart3 },
                  { key: 'geographic', label: 'Geográfico', icon: MapPin },
                  { key: 'news', label: 'Noticias', icon: Eye }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '1rem 1.5rem',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: activeTab === tab.key ? hypecycleService.getPhaseColor(results.phase) : '#64748b',
                        borderBottom: activeTab === tab.key ? `3px solid ${hypecycleService.getPhaseColor(results.phase)}` : '3px solid transparent',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        minWidth: 'max-content'
                      }}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'overview' && (
                  <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                    <InsightsPanel insights={results.insights} />
                    <HypeCycleChart 
                      chartData={results.chart_data} 
                      currentPhase={results.phase}
                      isMobile={isMobile}
                    />
                  </div>
                )}

                {activeTab === 'details' && (
                  <YearlyTrendsChart 
                    chartData={results.chart_data}
                    isMobile={isMobile}
                  />
                )}

                {activeTab === 'geographic' && (
                  <GeographicDistribution 
                    newsResults={results.news_results}
                    isMobile={isMobile}
                  />
                )}

                {activeTab === 'news' && (
                  <NewsResultsTable 
                    newsResults={results.news_results}
                    isMobile={isMobile}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HypeCycleScreen;