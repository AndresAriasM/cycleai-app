// frontend/src/components/analysis/GeographicDistribution.tsx
import React from 'react';
import { Globe, MapPin, TrendingUp } from 'lucide-react';

interface GeographicDistributionProps {
  newsResults: any[];
  isMobile: boolean;
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = ({ 
  newsResults, 
  isMobile 
}) => {
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
      .slice(0, 10); // Top 10 countries
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
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
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
                  {geographicData.length}
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
                  {geographicData[0]?.country || 'N/A'}
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
                  {(geographicData.reduce((acc, item) => acc + item.avgSentiment, 0) / geographicData.length || 0).toFixed(2)}
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
                  {((geographicData[0]?.percentage || 0)).toFixed(0)}%
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
                    <strong>Concentración:</strong> Los top 3 países representan el {
                      geographicData.slice(0, 3).reduce((acc, item) => acc + item.percentage, 0).toFixed(1)
                    }% de las menciones
                  </div>
                  
                  <div style={{
                    padding: '0.75rem',
                    background: '#f0fdf4',
                    borderRadius: '6px',
                    border: '1px solid #22c55e'
                  }}>
                    <strong>Liderazgo:</strong> {geographicData[0]?.country} domina con {geographicData[0]?.count} menciones ({geographicData[0]?.percentage.toFixed(1)}%)
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