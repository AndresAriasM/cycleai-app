// frontend/src/screens/analysis/HypeCycleScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Plus, Trash2, Search, Globe, TrendingUp, BarChart3, MapPin, Clock, Eye, Download, Share2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as HypeService from '../../services/hypecycleService';
import HypeCycleChart from '../../components/analysis/HypeCycleChart';
import NewsResultsTable from '../../components/analysis/NewsResultsTable';
import GeographicDistribution from '../../components/analysis/GeographicDistribution';
import YearlyTrendsChart from '../../components/analysis/YearlyTrendsChart';
import InsightsPanel from '../../components/analysis/InsightsPanel';
import { hypeCycleScreenStyles } from '../../styles/hypeCycleScreenStyles';

type SearchTerm = HypeService.SearchTerm;
type HypeCycleResponse = HypeService.HypeCycleResponse;
const hypecycleService = HypeService.hypecycleService;

const HypeCycleScreen: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  
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
    checkBackendHealth();
  }, []);

  // Scroll automático a resultados cuando aparecen
  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, [results]);

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
      await checkBackendHealth();
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

  const handleTabChange = (tab: 'overview' | 'details' | 'geographic' | 'news') => {
    setActiveTab(tab);
    // Pequeño delay para asegurar que el contenido se renderice antes del scroll
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }
    }, 100);
  };

  const tabs = [
    { key: 'overview' as const, label: isMobile ? 'Resumen' : 'Resumen', icon: TrendingUp },
    { key: 'details' as const, label: isMobile ? 'Detalles' : 'Detalles', icon: BarChart3 },
    { key: 'geographic' as const, label: isMobile ? 'Mapa' : 'Geográfico', icon: MapPin },
    { key: 'news' as const, label: isMobile ? 'Noticias' : 'Noticias', icon: Eye }
  ];

  return (
    <div style={hypeCycleScreenStyles.container(isMobile)}>
      {/* Header */}
      <div style={hypeCycleScreenStyles.header(isMobile)}>
        <div style={hypeCycleScreenStyles.headerContent(isMobile)}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button
              onClick={() => navigate('/analysis')}
              style={hypeCycleScreenStyles.backButton}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              <ArrowLeft size={24} />
            </button>
            
            <div>
              <h1 style={hypeCycleScreenStyles.headerTitle(isMobile)}>
                Análisis Hype Cycle
              </h1>
              <p style={hypeCycleScreenStyles.headerSubtitle(isMobile)}>
                Analiza el estado de madurez de tecnologías usando SERPAPI
              </p>
            </div>
          </div>

          {/* Status del backend */}
          <div style={hypeCycleScreenStyles.statusIndicator(backendHealth)}>
            <div style={hypeCycleScreenStyles.statusDot(backendHealth)}></div>
            <span style={hypeCycleScreenStyles.statusText(backendHealth)}>
              {backendHealth === true ? 'Conectado' : backendHealth === false ? 'Desconectado' : 'Verificando...'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={hypeCycleScreenStyles.contentArea(isMobile)}>
        {/* Query Builder Card */}
        <div style={hypeCycleScreenStyles.queryCard(isMobile)}>
          <div style={hypeCycleScreenStyles.queryHeader}>
            <h2 style={hypeCycleScreenStyles.queryTitle(isMobile)}>
              <Search size={20} />
              Construir Ecuación de Búsqueda
            </h2>

            {results && (
              <div style={hypeCycleScreenStyles.exportButtons}>
                <button
                  onClick={handleExportResults}
                  style={hypeCycleScreenStyles.exportButton}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f1f5f9'}
                  title="Exportar resultados"
                >
                  <Download size={16} />
                </button>
                <button
                  style={hypeCycleScreenStyles.exportButton}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f1f5f9'}
                  title="Compartir análisis"
                >
                  <Share2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Search Terms Builder */}
          {searchTerms.map((term, index) => (
            <div key={index} style={hypeCycleScreenStyles.searchTermContainer(isMobile)}>
              <input
                type="text"
                value={term.value}
                onChange={(e) => updateSearchTerm(index, 'value', e.target.value)}
                placeholder="ej: artificial intelligence, blockchain, quantum computing"
                style={hypeCycleScreenStyles.searchInput(isMobile)}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
              
              <div style={hypeCycleScreenStyles.searchControls(isMobile)}>
                <select
                  value={term.operator}
                  onChange={(e) => updateSearchTerm(index, 'operator', e.target.value)}
                  style={hypeCycleScreenStyles.selectInput(isMobile)}
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                  <option value="NOT">NOT</option>
                </select>

                <label style={hypeCycleScreenStyles.exactMatchLabel(isMobile)}>
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
                  style={hypeCycleScreenStyles.removeButton(searchTerms.length > 1, isMobile)}
                  title="Eliminar término"
                >
                  <Trash2 size={16} color={searchTerms.length === 1 ? '#cbd5e1' : '#ef4444'} />
                </button>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div style={hypeCycleScreenStyles.controlsSection(isMobile)}>
            <div style={hypeCycleScreenStyles.controlsLeft(isMobile)}>
              <button
                onClick={addSearchTerm}
                style={hypeCycleScreenStyles.addTermButton}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Plus size={16} />
                Añadir término
              </button>

              <div style={hypeCycleScreenStyles.yearControl(isMobile)}>
                <Clock size={16} color="#64748b" />
                <label style={{color: '#374151', fontWeight: '500'}}>Desde año:</label>
                <input
                  type="number"
                  value={minYear}
                  onChange={(e) => setMinYear(parseInt(e.target.value))}
                  min={2010}
                  max={2024}
                  style={hypeCycleScreenStyles.yearInput(isMobile)}
                />
              </div>
            </div>

            <button
              onClick={checkBackendHealth}
              disabled={loading}
              style={hypeCycleScreenStyles.refreshButton}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f1f5f9'}
              title="Verificar conexión"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          {/* Preview */}
          <div style={hypeCycleScreenStyles.previewSection}>
            <h4 style={hypeCycleScreenStyles.previewTitle(isMobile)}>
              Vista previa de la consulta:
            </h4>
            <code style={hypeCycleScreenStyles.previewCode(isMobile)}>
              {buildPreviewQuery() || 'Añade términos para ver la consulta'}
            </code>
          </div>

          {/* Action Buttons */}
          <div style={hypeCycleScreenStyles.actionButtons(isMobile)}>
            <button
              onClick={handleAnalyze}
              disabled={loading || searchTerms.filter(t => t.value.trim()).length === 0 || backendHealth === false}
              style={hypeCycleScreenStyles.analyzeButton(
                loading, 
                searchTerms.filter(t => t.value.trim()).length === 0 || backendHealth === false,
                isMobile
              )}
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
              style={hypeCycleScreenStyles.testButton(loading)}
            >
              <Globe size={20} />
              Datos de Prueba
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={hypeCycleScreenStyles.errorContainer(isMobile)}>
            <div style={hypeCycleScreenStyles.errorIcon}>
              !
            </div>
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div ref={resultsRef} style={hypeCycleScreenStyles.resultsContainer}>
            {/* Phase Result Card */}
            <div style={hypeCycleScreenStyles.phaseCard(isMobile)}>
              <div style={hypeCycleScreenStyles.phaseHighlight(hypecycleService.getPhaseColor(results.phase))}>
                <div style={hypeCycleScreenStyles.phaseTitle(hypecycleService.getPhaseColor(results.phase), isMobile)}>
                  {results.phase}
                </div>
                
                <div style={hypeCycleScreenStyles.phaseDescription(isMobile)}>
                  {hypecycleService.getPhaseDescription(results.phase)}
                </div>

                <div style={hypeCycleScreenStyles.phaseStats}>
                  <div style={hypeCycleScreenStyles.statItem}>
                    <div style={hypeCycleScreenStyles.statValue(
                      hypecycleService.getConfidenceColor(results.confidence), 
                      isMobile
                    )}>
                      {(results.confidence * 100).toFixed(0)}%
                    </div>
                    <div style={hypeCycleScreenStyles.statLabel}>
                      Confianza {hypecycleService.getConfidenceLabel(results.confidence)}
                    </div>
                  </div>
                  
                  <div style={hypeCycleScreenStyles.statItem}>
                    <div style={hypeCycleScreenStyles.statValue('#1e293b', isMobile)}>
                      {results.total_mentions.toLocaleString()}
                    </div>
                    <div style={hypeCycleScreenStyles.statLabel}>
                      Menciones Totales
                    </div>
                  </div>
                  
                  <div style={hypeCycleScreenStyles.statItem}>
                    <div style={hypeCycleScreenStyles.statValue('#1e293b', isMobile)}>
                      {results.news_results.length}
                    </div>
                    <div style={hypeCycleScreenStyles.statLabel}>
                      Artículos Analizados
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={hypeCycleScreenStyles.tabsContainer(isMobile)}>
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => handleTabChange(tab.key)}
                      style={hypeCycleScreenStyles.tabButton(
                        activeTab === tab.key, 
                        hypecycleService.getPhaseColor(results.phase),
                        isMobile
                      )}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div style={hypeCycleScreenStyles.tabContent}>
                {activeTab === 'overview' && (
                  <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                    <InsightsPanel insights={results.insights} isMobile={isMobile} />
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

      <style>{hypeCycleScreenStyles.spinKeyframes}</style>
    </div>
  );
};

export default HypeCycleScreen;