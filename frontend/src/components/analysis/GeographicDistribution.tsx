// frontend/src/components/analysis/GeographicDistribution.tsx
import React, { useState } from 'react';
import { Globe, MapPin, TrendingUp, BarChart3, Award } from 'lucide-react';
import { 
  geographicStyles, 
  getSentimentColor, 
  getSentimentBg, 
  getCountryFlag 
} from '../../styles/analysisStyles';

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

  const globalStats = {
    totalCountries: geographicData.length,
    topCountry: geographicData[0]?.country || 'N/A',
    avgSentiment: (geographicData.reduce((acc, item) => acc + item.avgSentiment, 0) / geographicData.length || 0),
    topConcentration: geographicData[0]?.percentage || 0,
    topThreeConcentration: geographicData.slice(0, 3).reduce((acc, item) => acc + item.percentage, 0)
  };

  if (isMobile) {
    return (
      <div style={geographicStyles.container(isMobile)}>
        {/* Header con navegación */}
        <div style={geographicStyles.header}>
          <div style={geographicStyles.headerTitle}>
            <Globe size={24} />
            <h3 style={geographicStyles.headerTitleText}>
              Distribución Global
            </h3>
          </div>

          {/* Navegación por tabs */}
          <div style={geographicStyles.tabsContainer}>
            <button
              onClick={() => setActiveView('countries')}
              style={geographicStyles.tabButton(activeView === 'countries')}
            >
              <MapPin size={16} />
              Países
            </button>
            <button
              onClick={() => setActiveView('stats')}
              style={geographicStyles.tabButton(activeView === 'stats')}
            >
              <BarChart3 size={16} />
              Estadísticas
            </button>
          </div>
        </div>

        {/* Contenido dinámico */}
        <div style={geographicStyles.content(isMobile)}>
          {activeView === 'countries' ? (
            <div>
              {/* Top 3 destacados */}
              <div style={geographicStyles.topCountriesGrid}>
                {geographicData.slice(0, 3).map((item, index) => (
                  <div key={item.country} style={geographicStyles.topCountryCard(index === 0)}>
                    {index === 0 && (
                      <Award size={16} color="#f59e0b" style={{marginBottom: '0.25rem'}} />
                    )}
                    <div style={{fontSize: '1.5rem', marginBottom: '0.25rem'}}>
                      {getCountryFlag(item.country)}
                    </div>
                    <div style={geographicStyles.countryName}>
                      {item.country}
                    </div>
                    <div style={geographicStyles.countryCount}>
                      {item.count}
                    </div>
                    <div style={geographicStyles.countryPercentage}>
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Lista completa - compacta */}
              <div style={geographicStyles.countriesListContainer}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 0.5rem 0'
                }}>
                  Ranking Completo
                </h4>
                {geographicData.slice(3).map((item, index) => (
                  <div key={item.country} style={geographicStyles.countryItem(isMobile)}>
                    <div style={geographicStyles.countryInfo}>
                      <span style={geographicStyles.countryRank}>
                        #{index + 4}
                      </span>
                      <span style={geographicStyles.countryFlag}>
                        {getCountryFlag(item.country)}
                      </span>
                      <div>
                        <div style={geographicStyles.countryName}>
                          {item.country}
                        </div>
                        <div style={geographicStyles.countrySentiment(getSentimentColor(item.avgSentiment))}>
                          {item.avgSentiment.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div style={geographicStyles.countryStats}>
                      <div style={geographicStyles.countryCount}>
                        {item.count}
                      </div>
                      <div style={geographicStyles.countryPercentage}>
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
              <div style={geographicStyles.statsGrid}>
                <div style={geographicStyles.statCard('#0ea5e9', '#f0f9ff')}>
                  <div style={geographicStyles.statValue('#0369a1')}>
                    {globalStats.totalCountries}
                  </div>
                  <div style={geographicStyles.statLabel}>
                    Países Activos
                  </div>
                </div>
                
                <div style={geographicStyles.statCard('#22c55e', '#f0fdf4')}>
                  <div style={geographicStyles.statValue('#16a34a')}>
                    {globalStats.topConcentration.toFixed(0)}%
                  </div>
                  <div style={geographicStyles.statLabel}>
                    Concentración Líder
                  </div>
                </div>
              </div>

              {/* Análisis detallado */}
              <div style={geographicStyles.insightContainer}>
                <div style={geographicStyles.insightCard('#0ea5e9', '#f0f9ff')}>
                  <div style={geographicStyles.insightHeader('#0369a1')}>
                    <TrendingUp size={16} />
                    <span>Liderazgo Global</span>
                  </div>
                  <p style={geographicStyles.insightText}>
                    <strong>{globalStats.topCountry}</strong> domina las menciones con {geographicData[0]?.count} artículos ({globalStats.topConcentration.toFixed(1)}% del total)
                  </p>
                </div>
                
                <div style={geographicStyles.insightCard('#22c55e', '#f0fdf4')}>
                  <div style={geographicStyles.insightHeader('#16a34a')}>
                    <BarChart3 size={16} />
                    <span>Concentración</span>
                  </div>
                  <p style={geographicStyles.insightText}>
                    Los top 3 países concentran el <strong>{globalStats.topThreeConcentration.toFixed(1)}%</strong> de todas las menciones
                  </p>
                </div>

                <div style={geographicStyles.insightCard(
                  getSentimentColor(globalStats.avgSentiment), 
                  getSentimentBg(globalStats.avgSentiment)
                )}>
                  <div style={geographicStyles.insightHeader(getSentimentColor(globalStats.avgSentiment))}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: getSentimentColor(globalStats.avgSentiment)
                    }}></div>
                    <span>Sentiment Promedio: {globalStats.avgSentiment.toFixed(2)}</span>
                  </div>
                  <p style={geographicStyles.insightText}>
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

  // Versión desktop mejorada
  return (
    <div>
      <h3 style={geographicStyles.desktopTitle}>
        <Globe size={20} />
        Distribución Geográfica
      </h3>
      
      <div style={geographicStyles.desktopGrid}>
        {/* Country List */}
        <div style={geographicStyles.desktopCountryList}>
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
          
          <div style={geographicStyles.countriesListContainer}>
            {geographicData.map((item, index) => (
              <div key={item.country} style={{
                ...geographicStyles.countryItem(isMobile),
                background: index === 0 ? '#fef3c7' : '#f8fafc',
                border: index === 0 ? '1px solid #f59e0b' : '1px solid #e2e8f0'
              }}>
                <div style={geographicStyles.countryInfo}>
                  <span style={{fontSize: '1.2rem'}}>
                    {getCountryFlag(item.country)}
                  </span>
                  <div>
                    <div style={{fontWeight: '600', color: '#374151'}}>
                      {item.country}
                    </div>
                    <div style={geographicStyles.countrySentiment(getSentimentColor(item.avgSentiment))}>
                      Sentiment: {item.avgSentiment.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div style={geographicStyles.countryStats}>
                  <div style={geographicStyles.countryCount}>
                    {item.count}
                  </div>
                  <div style={geographicStyles.countryPercentage}>
                    {item.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Summary Stats */}
        <div style={geographicStyles.desktopStatsContainer}>
          <div style={geographicStyles.desktopStatsSummary}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              Resumen Global
            </h4>
            
            <div style={geographicStyles.desktopStatsGrid}>
              <div style={geographicStyles.statCard('transparent', '#f0f9ff')}>
                <div style={geographicStyles.statValue('#0369a1')}>
                  {globalStats.totalCountries}
                </div>
                <div style={geographicStyles.statLabel}>
                  Países Activos
                </div>
              </div>
              
              <div style={geographicStyles.statCard('transparent', '#f0fdf4')}>
                <div style={geographicStyles.statValue('#16a34a')}>
                  {globalStats.topCountry}
                </div>
                <div style={geographicStyles.statLabel}>
                  País Líder
                </div>
              </div>
              
              <div style={geographicStyles.statCard('transparent', '#fefce8')}>
                <div style={geographicStyles.statValue('#ca8a04')}>
                  {globalStats.avgSentiment.toFixed(2)}
                </div>
                <div style={geographicStyles.statLabel}>
                  Sentiment Promedio
                </div>
              </div>
              
              <div style={geographicStyles.statCard('transparent', '#fdf2f8')}>
                <div style={geographicStyles.statValue('#be185d')}>
                  {globalStats.topConcentration.toFixed(0)}%
                </div>
                <div style={geographicStyles.statLabel}>
                  Concentración Top
                </div>
              </div>
            </div>
          </div>
          
          <div style={geographicStyles.desktopAnalysis}>
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
                  <div style={geographicStyles.insightCard('#0ea5e9', '#f0f9ff')}>
                    <strong>Concentración:</strong> Los top 3 países representan el {globalStats.topThreeConcentration.toFixed(1)}% de las menciones
                  </div>
                  
                  <div style={geographicStyles.insightCard('#22c55e', '#f0fdf4')}>
                    <strong>Liderazgo:</strong> {globalStats.topCountry} domina con {geographicData[0]?.count} menciones ({globalStats.topConcentration.toFixed(1)}%)
                  </div>
                  
                  <div style={geographicStyles.insightCard('#eab308', '#fefce8')}>
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