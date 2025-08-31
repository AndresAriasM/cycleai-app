import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as HypeService from '../../services/hypecycleService';
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

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      .map(term => {
        const value = term.exact_match ? `"${term.value}"` : term.value;
        return value;
      })
      .join(` ${searchTerms[0]?.operator || 'AND'} `);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en conexión');
    } finally {
      setLoading(false);
    }
  };

  const getPhaseColor = (phase: string) => {
    const colors = {
      'Innovation Trigger': '#10b981',
      'Peak of Inflated Expectations': '#ef4444',
      'Trough of Disillusionment': '#f59e0b',
      'Slope of Enlightenment': '#3b82f6',
      'Plateau of Productivity': '#8b5cf6',
      'Pre-Innovation Trigger': '#6b7280'
    };
    return colors[phase as keyof typeof colors] || '#6b7280';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc',
      paddingBottom: isMobile ? '2rem' : '0'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: isMobile ? '1rem' : '1rem 2rem'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: isMobile ? '0.5rem' : '1rem'
        }}>
          <button
            onClick={() => navigate('/analysis')}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              borderRadius: '8px'
            }}
          >
            <ArrowLeft size={24} color="#64748b" />
          </button>
          <div>
            <h1 style={{ 
              fontSize: isMobile ? '1.4rem' : '1.8rem', 
              fontWeight: 'bold', 
              margin: 0 
            }}>
              Análisis Hype Cycle
            </h1>
            <p style={{ 
              color: '#64748b', 
              margin: '0.25rem 0 0 0',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>
              Analiza el estado de madurez de tecnologías
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ 
        padding: isMobile ? '1rem' : '2rem', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '1.5rem' : '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '1.1rem' : '1.3rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem' 
          }}>
            Construir Ecuación de Búsqueda
          </h2>

          {/* Search Terms - Layout responsivo */}
          {searchTerms.map((term, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: isMobile 
                ? '1fr' 
                : '2fr 100px 80px 40px',
              gap: isMobile ? '0.75rem' : '1rem',
              marginBottom: '1rem'
            }}>
              {/* Input principal */}
              <input
                type="text"
                value={term.value}
                onChange={(e) => updateSearchTerm(index, 'value', e.target.value)}
                placeholder="ej: artificial intelligence"
                style={{
                  padding: isMobile ? '0.75rem' : '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: isMobile ? '16px' : '1rem', // 16px evita zoom en iOS
                  width: '100%'
                }}
              />
              
              {/* Controles en móvil - Layout horizontal */}
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
                    flex: isMobile ? '1' : 'none'
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
                  flex: isMobile ? '1' : 'none'
                }}>
                  <input
                    type="checkbox"
                    checked={term.exact_match}
                    onChange={(e) => updateSearchTerm(index, 'exact_match', e.target.checked)}
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
                    cursor: searchTerms.length === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Trash2 size={16} color={searchTerms.length === 1 ? '#cbd5e1' : '#ef4444'} />
                </button>
              </div>
            </div>
          ))}

          {/* Controles inferiores */}
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem', 
            marginTop: '1rem',
            alignItems: isMobile ? 'stretch' : 'center'
          }}>
            <button
              onClick={addSearchTerm}
              style={{
                background: '#f0f9ff',
                border: '2px solid #0ea5e9',
                color: '#0ea5e9',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}
            >
              <Plus size={16} />
              Añadir término
            </button>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>
              <label>Año mínimo:</label>
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
                  fontSize: isMobile ? '16px' : '1rem'
                }}
              />
            </div>
          </div>

          {/* Preview */}
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: '#f8fafc', 
            borderRadius: '8px' 
          }}>
            <h4 style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Vista previa de la consulta:</h4>
            <code style={{ 
              display: 'block', 
              marginTop: '0.5rem', 
              padding: '0.5rem', 
              background: 'white', 
              borderRadius: '4px',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              wordBreak: 'break-all',
              overflowWrap: 'break-word'
            }}>
              {buildPreviewQuery() || 'Añade términos para ver la consulta'}
            </code>
          </div>

          {/* Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem', 
            marginTop: '1.5rem' 
          }}>
            <button
              onClick={handleAnalyze}
              disabled={loading || searchTerms.filter(t => t.value.trim()).length === 0}
              style={{
                background: loading ? '#94a3b8' : '#4c1d95',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                flex: isMobile ? 'none' : 1
              }}
            >
              {loading ? 'Analizando...' : '🔍 Analizar Hype Cycle'}
            </button>

            <button
              onClick={handleTestAnalyze}
              disabled={loading}
              style={{
                background: '#059669',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              🧪 Test (Sin API)
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}>
            ❌ {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: isMobile ? '1.5rem' : '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem' 
            }}>
              Resultados del Análisis
            </h2>

            {/* Main Result */}
            <div style={{
              background: `${getPhaseColor(results.phase)}10`,
              border: `2px solid ${getPhaseColor(results.phase)}`,
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                fontWeight: 'bold',
                color: getPhaseColor(results.phase),
                margin: '0 0 0.5rem 0'
              }}>
                {results.phase}
              </h3>
              <p style={{ 
                margin: '0', 
                color: '#374151',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}>
                Confianza: {(results.confidence * 100).toFixed(0)}% | 
                Total menciones: {results.total_mentions}
              </p>
            </div>

            {/* Insights */}
            <div>
              <h4 style={{ 
                marginBottom: '1rem',
                fontSize: isMobile ? '1rem' : '1.1rem'
              }}>💡 Insights:</h4>
              {results.insights.map((insight, index) => (
                <div key={index} style={{
                  padding: '0.75rem',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  {insight}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HypeCycleScreen;