// frontend/src/components/analysis/GeographicDistribution.tsx
import React, { useState } from 'react';
import { Globe, MapPin, TrendingUp, ChevronRight, Award, BarChart3 } from 'lucide-react';

interface GeographicDistributionProps {
  newsResults: any[];
  isMobile: boolean;
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = ({ 
  newsResults, 
  isMobile 
}) => {
  const [activeView, setActiveView] = useState<'countries' | 'stats'>('countries');

  // Procesar datos geográficos
  const processGeographicData = () => {
    const countryData: Record<string, { count: number; sentiments: number[] }> = {};
    
    newsResults.forEach(result => {
      const country = result.country || 'Unknown';
      if (!countryData[country]) {
        countryData[country] = { count: 0, sentiments: [] };
      }
      countryData[country].count++;
      countryData[country].sentiments.push(result.sentiment || 0);
    });
    
    return Object.entries(countryData)
      .map(([country, data]) => ({
        country,
        count: data.count,
        avgSentiment: data.sentiments.reduce((a, b) => a + b, 0) / data.sentiments.length,
        percentage: (data.count / newsResults.length) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const geographicData = processGeographicData();

  const getCountryFlag = (country: string): string => {
    const flags: Record<string, string> = {
      'USA': '🇺🇸', 'UK': '🇬🇧', 'China': '🇨🇳', 'Japan': '🇯🇵',
      'Germany': '🇩🇪', 'France': '🇫🇷', 'Spain': '🇪🇸', 'Italy': '🇮🇹',
      'India': '🇮🇳', 'Brazil': '🇧🇷', 'Canada': '🇨🇦', 'Australia': '🇦🇺',
      'South Korea': '🇰🇷', 'Russia': '🇷🇺', 'Netherlands': '🇳🇱',
      'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Singapore': '🇸🇬',
      'Israel': '🇮🇱', 'Norway': '🇳🇴', 'Denmark': '🇩🇰', 'Finland': '🇫🇮',
      'Unknown': '🌐'
    };
    return flags[country] || '🏳️';
  };

  const getSentimentColor = (sentiment: number): string => {
    if (sentiment > 0.2) return '#10b981';
    if (sentiment > -0.2) return '#f59e0b';
    return '#ef4444';
  };

  const getSentimentBg = (sentiment: number): string => {
    if (sentiment > 0.2) return '#f0fdf4';
    if (sentiment > -0.2) return '#fefce8';
    return '#fef2f2';
  };

  const globalStats = {
    totalCountries: geographicData.length,
    topCountry: geographicData[0]?.country || 'N/A',
    avgSentiment: (geographicData.reduce((acc, item) => acc + item.avgSentiment, 0) / geographicData.length || 0),
    topConcentration: geographicData[0]?.percentage || 0,
    topThreeConcentration: geographicData.slice(0, 3).reduce((acc, item) => acc + item.percentage, 0)
  };

  if (isMobile) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        {/* Header con navegación */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <Globe size={24} />
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              margin: 0
            }}>
              Distribución Global
            </h3>
          </div>

          {/* Navegación por tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <button
              onClick={() => setActiveView('countries')}
              style={{
                background: activeView === 'countries' ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                color: 'white',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <MapPin size={16} />
              Países
            </button>
            <button
              onClick={() => setActiveView('stats')}
              style={{
                background: activeView === 'stats' ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                color: 'white',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <BarChart3 size={16} />
              Estadísticas
            </button>
          </div>
        </div>

        {/* Contenido dinámico */}
        <div style={{ padding: '1.5rem' }}>
          {activeView === 'countries' ? (
            <div>
              {/* Top 3 destacados */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                {geographicData.slice(0, 3).map((item, index) => (
                  <div key={item.country} style={{
                    textAlign: 'center',
                    padding: '1rem 0.5rem',
                    background: index === 0 ? '#fef3c7' : '#f8fafc',
                    borderRadius: '12px',
                    border: index === 0 ? '2px solid #f59e0b' : '1px solid #e2e8f0'
                  }}>
                    {index === 0 && (
                      <Award size={16} color="#f59e0b" style={{marginBottom: '0.25rem'}} />
                    )}
                    <div style={{fontSize: '1.5rem', marginBottom: '0.25rem'}}>
                      {getCountryFlag(item.country)}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.25rem'
                    }}>
                      {item.country}
                    </div>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: '#1e293b'
                    }}>
                      {item.count}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#64748b'
                    }}>
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Lista completa - compacta */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 0.5rem 0'
                }}>
                  Ranking Completo
                </h4>
                {geographicData.slice(3).map((item, index) => (
                  <div key={item.country} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#9ca3af',
                        minWidth: '16px'
                      }}>
                        #{index + 4}
                      </span>
                      <span style={{fontSize: '1.1rem'}}>
                        {getCountryFlag(item.country)}
                      </span>
                      <div>
                        <div style={{fontSize: '0.9rem', fontWeight: '600', color: '#374151'}}>
                          {item.country}
                        </div>
                        <div style={{
                          fontSize: '0.7rem',
                          color: getSentimentColor(item.avgSentiment),
                          fontWeight: '500'
                        }}>
                          {item.avgSentiment.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{textAlign: 'right'}}>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#1e293b'
                      }}>
                        {item.count}
                      </div>
                      <div style={{
                        fontSize: '0.7rem',
                        color: '#64748b'
                      }}>
                        {item.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Vista de estadísticas */
            <div>
              {/* Cards de estadísticas clave */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: '#f0f9ff',
                  padding: '1rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid #0ea5e9'
                }}>
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#0369a1',
                    marginBottom: '0.25rem'
                  }}>
                    {globalStats.totalCountries}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#64748b'
                  }}>
                    Países Activos
                  </div>
                </div>
                
                <div style={{
                  background: '#f0fdf4',
                  padding: '1rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid #22c55e'
                }}>
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#16a34a',
                    marginBottom: '0.25rem'
                  }}>
                    {globalStats.topConcentration.toFixed(0)}%
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#64748b'
                  }}>
                    Concentración Líder
                  </div>
                </div>
              </div>

              {/* Análisis detallado */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{
                  padding: '1rem',
                  background: '#f0f9ff',
                  borderRadius: '12px',
                  border: '1px solid #0ea5e9'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <TrendingUp size={16} color="#0369a1" />
                    <span style={{fontSize: '0.9rem', fontWeight: '600', color: '#0369a1'}}>
                      Liderazgo Global
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#374151',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    <strong>{globalStats.topCountry}</strong> domina las menciones con {geographicData[0]?.count} artículos ({globalStats.topConcentration.toFixed(1)}% del total)
                  </p>
                </div>
                
                <div style={{
                  padding: '1rem',
                  background: '#f0fdf4',
                  borderRadius: '12px',
                  border: '1px solid #22c55e'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <BarChart3 size={16} color="#16a34a" />
                    <span style={{fontSize: '0.9rem', fontWeight: '600', color: '#16a34a'}}>
                      Concentración
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#374151',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    Los top 3 países concentran el <strong>{globalStats.topThreeConcentration.toFixed(1)}%</strong> de todas las menciones
                  </p>
                </div>

                <div style={{
                  padding: '1rem',
                  background: getSentimentBg(globalStats.avgSentiment),
                  borderRadius: '12px',
                  border: `1px solid ${getSentimentColor(globalStats.avgSentiment)}`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: getSentimentColor(globalStats.avgSentiment)
                    }}></div>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: getSentimentColor(globalStats.avgSentiment)
                    }}>
                      Sentiment Promedio: {globalStats.avgSentiment.toFixed(2)}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#374151',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {geographicData.filter(item => item.avgSentiment > 0).length > geographicData.filter(item => item.avgSentiment < 0).length
                      ? 'Mayoría de países muestran sentiment positivo hacia la tecnología'
                      : 'Prevalece un sentiment cauteloso o negativo a nivel global'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Versión desktop (mantener diseño original pero mejorado)
  return (
    <div>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Globe size={20} />
        Distribución Geográfica
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
      }}>
        {/* Country List */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <MapPin size={16} />
            Top Países por Menciones
          </h4>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {geographicData.map((item, index) => (
              <div key={item.country} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: index === 0 ? '#fef3c7' : '#f8fafc',
                borderRadius: '8px',
                border: index === 0 ? '1px solid #f59e0b' : '1px solid #e2e8f0'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <span style={{fontSize: '1.2rem'}}>
                    {getCountryFlag(item.country)}
                  </span>
                  <div>
                    <div style={{fontWeight: '600', color: '#374151'}}>
                      {item.country}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: getSentimentColor(item.avgSentiment),
                      fontWeight: '500'
                    }}>
                      Sentiment: {item.avgSentiment.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div style={{textAlign: 'right'}}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#1e293b'
                  }}>
                    {item.count}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#64748b'
                  }}>
                    {item.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Summary Stats */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              Resumen Global
            </h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={{
                background: '#f0f9ff',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#0369a1'
                }}>
                  {globalStats.totalCountries}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#64748b'
                }}>
                  Países Activos
                </div>
              </div>
              
              <div style={{
                background: '#f0fdf4',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#16a34a'
                }}>
                  {globalStats.topCountry}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#64748b'
                }}>
                  País Líder
                </div>
              </div>
              
              <div style={{
                background: '#fefce8',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#ca8a04'
                }}>
                  {globalStats.avgSentiment.toFixed(2)}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#64748b'
                }}>
                  Sentiment Promedio
                </div>
              </div>
              
              <div style={{
                background: '#fdf2f8',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#be185d'
                }}>
                  {globalStats.topConcentration.toFixed(0)}%
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#64748b'
                }}>
                  Concentración Top
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <TrendingUp size={16} />
              Análisis Regional
            </h4>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontSize: '0.9rem',
              color: '#374151'
            }}>
              {geographicData.length > 0 && (
                <>
                  <div style={{
                    padding: '0.75rem',
                    background: '#f0f9ff',
                    borderRadius: '6px',
                    border: '1px solid #0ea5e9'
                  }}>
                    <strong>Concentración:</strong> Los top 3 países representan el {globalStats.topThreeConcentration.toFixed(1)}% de las menciones
                  </div>
                  
                  <div style={{
                    padding: '0.75rem',
                    background: '#f0fdf4',
                    borderRadius: '6px',
                    border: '1px solid #22c55e'
                  }}>
                    <strong>Liderazgo:</strong> {globalStats.topCountry} domina con {geographicData[0]?.count} menciones ({globalStats.topConcentration.toFixed(1)}%)
                  </div>
                  
                  <div style={{
                    padding: '0.75rem',
                    background: '#fefce8',
                    borderRadius: '6px',
                    border: '1px solid #eab308'
                  }}>
                    <strong>Sentiment:</strong> {
                      geographicData.filter(item => item.avgSentiment > 0).length > geographicData.filter(item => item.avgSentiment < 0).length
                        ? 'Mayoría de países con sentiment positivo'
                        : 'Mayoría de países con sentiment negativo'
                    }
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicDistribution;