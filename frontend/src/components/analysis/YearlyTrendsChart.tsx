// frontend/src/components/analysis/YearlyTrendsChart.tsx
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Activity,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { yearlyTrendsStyles } from '../../styles/analysisStyles';

interface YearlyTrendsChartProps {
  chartData: any;
  isMobile: boolean;
}

type MobileView = 'chart' | 'stats' | 'insights';

const YearlyTrendsChart: React.FC<YearlyTrendsChartProps> = ({ 
  chartData, 
  isMobile 
}) => {
  const [activeView, setActiveView] = useState<MobileView>('chart');
  
  const yearlyMentions = chartData.yearly_mentions || {};
  const yearlySentiment = chartData.yearly_sentiment || {};
  
  const years = Object.keys(yearlyMentions).sort();
  const maxMentions = Math.max(...Object.values(yearlyMentions) as number[]);

  // Calcular insights y tendencias
  const insights = useMemo(() => {
    if (years.length < 2) return [];
    
    const insights = [];
    const currentYear = years[years.length - 1];
    const previousYear = years[years.length - 2];
    
    const currentMentions = yearlyMentions[currentYear] || 0;
    const previousMentions = yearlyMentions[previousYear] || 0;
    const mentionsChange = ((currentMentions - previousMentions) / previousMentions) * 100;
    
    const currentSentiment = yearlySentiment[currentYear] || 0;
    const previousSentiment = yearlySentiment[previousYear] || 0;
    const sentimentChange = currentSentiment - previousSentiment;
    
    // Insight de menciones
    if (mentionsChange > 20) {
      insights.push({
        type: 'positive',
        icon: TrendingUp,
        title: 'Crecimiento Acelerado',
        text: `Las menciones aumentaron ${mentionsChange.toFixed(1)}% respecto al año anterior, indicando mayor interés mediático.`
      });
    } else if (mentionsChange < -20) {
      insights.push({
        type: 'warning',
        icon: TrendingUp,
        title: 'Declive en Menciones',
        text: `Las menciones disminuyeron ${Math.abs(mentionsChange).toFixed(1)}% respecto al año anterior.`
      });
    } else {
      insights.push({
        type: 'neutral',
        icon: Minus,
        title: 'Crecimiento Estable',
        text: `Las menciones se mantienen relativamente estables con un cambio del ${mentionsChange.toFixed(1)}%.`
      });
    }
    
    // Insight de sentiment
    if (sentimentChange > 0.2) {
      insights.push({
        type: 'positive',
        icon: ArrowUp,
        title: 'Mejora en Percepción',
        text: `El sentiment promedio mejoró significativamente (+${sentimentChange.toFixed(2)}) indicando una percepción más positiva.`
      });
    } else if (sentimentChange < -0.2) {
      insights.push({
        type: 'warning',
        icon: ArrowDown,
        title: 'Deterioro en Percepción',
        text: `El sentiment promedio empeoró (${sentimentChange.toFixed(2)}) sugiriendo mayor escepticismo.`
      });
    }
    
    return insights;
  }, [years, yearlyMentions, yearlySentiment]);

  // Generar coordenadas para el gráfico
  const generatePath = (data: Record<string, number>, max: number, isNormalized = false) => {
    if (years.length === 0) return '';
    
    const points = years.map((year, index) => {
      const x = (index / Math.max(years.length - 1, 1)) * 80 + 10;
      const value = data[year] || 0;
      const y = isNormalized 
        ? 80 - ((value + 1) / 2) * 60  // Normalizar sentiment de -1,1 a 0,1
        : 80 - (value / max) * 60;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const mentionsPath = generatePath(yearlyMentions, maxMentions);
  const sentimentPath = generatePath(yearlySentiment, 1, true);

  const getSentimentColor = (sentiment: number): string => {
    if (sentiment > 0.2) return '#10b981';
    if (sentiment > -0.2) return '#f59e0b';
    return '#ef4444';
  };

  const getInsightColor = (type: string): string => {
    switch (type) {
      case 'positive': return '#10b981';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  };

  const getInsightBg = (type: string): string => {
    switch (type) {
      case 'positive': return '#f0fdf4';
      case 'warning': return '#fefce8';
      default: return '#f0f9ff';
    }
  };

  // Estadísticas del resumen
  const summaryStats = useMemo(() => {
    const totalMentions = Object.values(yearlyMentions).reduce((a: number, b: any) => a + (b || 0), 0);
    const avgSentiment = years.length > 0 ? Object.values(yearlySentiment).reduce((a: number, b: any) => a + (b || 0), 0) / years.length : 0;
    const peakYear = years.reduce((peak, year) => 
      yearlyMentions[year] > yearlyMentions[peak] ? year : peak, years[0]);
    const bestSentimentYear = years.reduce((best, year) => 
      yearlySentiment[year] > yearlySentiment[best] ? year : best, years[0]);
    
    return {
      totalMentions,
      avgSentiment,
      peakYear,
      bestSentimentYear,
      yearsTracked: years.length
    };
  }, [years, yearlyMentions, yearlySentiment]);

  if (isMobile) {
    return (
      <div style={yearlyTrendsStyles.container}>
        {/* Header móvil */}
        <div style={yearlyTrendsStyles.mobileHeader}>
          <h3 style={yearlyTrendsStyles.mobileTitle}>
            <Activity size={20} />
            Tendencias Anuales
          </h3>
          <div style={yearlyTrendsStyles.mobileSubtitle}>
            Análisis de {years.length} años de datos
          </div>
        </div>

        {/* Tabs móvil */}
        <div style={yearlyTrendsStyles.mobileTabs}>
          <button
            onClick={() => setActiveView('chart')}
            style={yearlyTrendsStyles.mobileTab(activeView === 'chart')}
          >
            <BarChart3 size={16} />
            Gráfico
          </button>
          <button
            onClick={() => setActiveView('stats')}
            style={yearlyTrendsStyles.mobileTab(activeView === 'stats')}
          >
            <Calendar size={16} />
            Datos
          </button>
          <button
            onClick={() => setActiveView('insights')}
            style={yearlyTrendsStyles.mobileTab(activeView === 'insights')}
          >
            <TrendingUp size={16} />
            Insights
          </button>
        </div>

        {/* Contenido de tabs */}
        <div style={yearlyTrendsStyles.mobileTabContent}>
          {activeView === 'chart' && (
            <div>
              {/* Gráfico */}
              <svg 
                viewBox="0 0 100 100" 
                style={yearlyTrendsStyles.svgContainer(isMobile)}
              >
                {/* Grid */}
                <defs>
                  <pattern id="trendGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" strokeWidth="0.5"/>
                  </pattern>
                  <linearGradient id="mentionsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <rect width="100" height="100" fill="url(#trendGrid)" />
                
                {/* Mentions line */}
                {mentionsPath && (
                  <path
                    d={mentionsPath}
                    fill="none"
                    stroke="url(#mentionsGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                
                {/* Sentiment line */}
                {sentimentPath && (
                  <path
                    d={sentimentPath}
                    fill="none"
                    stroke="url(#sentimentGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="4,4"
                  />
                )}
                
                {/* Data points */}
                {years.map((year, index) => {
                  const x = (index / Math.max(years.length - 1, 1)) * 80 + 10;
                  const mentionsY = 80 - ((yearlyMentions[year] || 0) / maxMentions) * 60;
                  const sentimentY = 80 - ((yearlySentiment[year] || 0) + 1) / 2 * 60;
                  
                  return (
                    <g key={year}>
                      <circle cx={x} cy={mentionsY} r="3" fill="#3b82f6" stroke="white" strokeWidth="2" />
                      <circle cx={x} cy={sentimentY} r="3" fill="#10b981" stroke="white" strokeWidth="2" />
                      <text x={x} y="95" textAnchor="middle" fontSize="2.5" fill="#64748b">
                        {year}
                      </text>
                    </g>
                  );
                })}
                
                {/* Y-axis labels */}
                <text x="5" y="15" fontSize="2.5" fill="#64748b">Alto</text>
                <text x="5" y="85" fontSize="2.5" fill="#64748b">Bajo</text>
              </svg>
              
              {/* Leyenda */}
              <div style={yearlyTrendsStyles.legend}>
                <div style={yearlyTrendsStyles.legendItem}>
                  <div style={yearlyTrendsStyles.legendLine('#3b82f6')}></div>
                  <span style={yearlyTrendsStyles.legendLabel}>Menciones</span>
                </div>
                <div style={yearlyTrendsStyles.legendItem}>
                  <div style={yearlyTrendsStyles.legendLine('#10b981', true)}></div>
                  <span style={yearlyTrendsStyles.legendLabel}>Sentiment</span>
                </div>
              </div>
            </div>
          )}

          {activeView === 'stats' && (
            <div>
              {/* Resumen rápido */}
              <div style={yearlyTrendsStyles.mobileSummaryGrid}>
                <div style={yearlyTrendsStyles.summaryCard('#3b82f6', '#f0f9ff')}>
                  <div style={yearlyTrendsStyles.summaryValue('#3b82f6')}>
                    {(summaryStats.totalMentions || 0).toLocaleString()}
                  </div>
                  <div style={yearlyTrendsStyles.summaryLabel}>Total Menciones</div>
                </div>
                <div style={yearlyTrendsStyles.summaryCard('#10b981', '#f0fdf4')}>
                  <div style={yearlyTrendsStyles.summaryValue('#10b981')}>
                    {summaryStats.avgSentiment.toFixed(2)}
                  </div>
                  <div style={yearlyTrendsStyles.summaryLabel}>Sentiment Promedio</div>
                </div>
                <div style={yearlyTrendsStyles.summaryCard('#8b5cf6', '#faf5ff')}>
                  <div style={yearlyTrendsStyles.summaryValue('#8b5cf6')}>
                    {summaryStats.peakYear}
                  </div>
                  <div style={yearlyTrendsStyles.summaryLabel}>Año Pico</div>
                </div>
                <div style={yearlyTrendsStyles.summaryCard('#f59e0b', '#fefce8')}>
                  <div style={yearlyTrendsStyles.summaryValue('#f59e0b')}>
                    {summaryStats.bestSentimentYear}
                  </div>
                  <div style={yearlyTrendsStyles.summaryLabel}>Mejor Sentiment</div>
                </div>
              </div>

              {/* Lista de años */}
              <div style={yearlyTrendsStyles.yearsList}>
                {years.map(year => (
                  <div 
                    key={year} 
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      transition: 'background 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onTouchStart={(e) => e.currentTarget.style.background = '#f1f5f9'}
                    onTouchEnd={(e) => e.currentTarget.style.background = '#f8fafc'}
                  >
                    <span style={yearlyTrendsStyles.yearLabel}>{year}</span>
                    <div style={yearlyTrendsStyles.yearStats}>
                      <span style={yearlyTrendsStyles.yearMentions}>
                        {yearlyMentions[year]?.toLocaleString()} menciones
                      </span>
                      <span style={yearlyTrendsStyles.yearSentiment(getSentimentColor(yearlySentiment[year] || 0))}>
                        Sentiment: {(yearlySentiment[year] || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'insights' && (
            <div style={yearlyTrendsStyles.trendsInsights}>
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div 
                    key={index} 
                    style={yearlyTrendsStyles.insightCard(
                      getInsightColor(insight.type), 
                      getInsightBg(insight.type)
                    )}
                  >
                    <div style={yearlyTrendsStyles.insightHeader(getInsightColor(insight.type))}>
                      <Icon size={16} />
                      <span>{insight.title}</span>
                    </div>
                    <p style={yearlyTrendsStyles.insightText}>
                      {insight.text}
                    </p>
                  </div>
                );
              })}
              
              {insights.length === 0 && (
                <div style={yearlyTrendsStyles.emptyState}>
                  <div style={yearlyTrendsStyles.emptyIcon}>📊</div>
                  <div style={yearlyTrendsStyles.emptyTitle}>
                    Datos insuficientes
                  </div>
                  <div style={yearlyTrendsStyles.emptyDescription}>
                    Se necesitan al menos 2 años de datos para generar insights
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Versión desktop mejorada
  return (
    <div style={yearlyTrendsStyles.container}>
      <h3 style={yearlyTrendsStyles.title}>
        Tendencias Anuales
      </h3>
      
      <div style={yearlyTrendsStyles.mainGrid(isMobile)}>
        {/* Chart */}
        <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: isMobile ? '1rem' : '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            gridColumn: isMobile ? '1' : '1 / 3'
          }}>
          <svg 
            viewBox="0 0 100 100" 
            style={yearlyTrendsStyles.svgContainer(isMobile)}
          >
            {/* Grid */}
            <defs>
              <pattern id="detailGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#detailGrid)" />
            
            {/* Mentions line */}
            {mentionsPath && (
              <path
                d={mentionsPath}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            
            {/* Sentiment line */}
            {sentimentPath && (
              <path
                d={sentimentPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5,5"
              />
            )}
            
            {/* Data points */}
            {years.map((year, index) => {
              const x = (index / Math.max(years.length - 1, 1)) * 80 + 10;
              const mentionsY = 80 - ((yearlyMentions[year] || 0) / maxMentions) * 60;
              const sentimentY = 80 - ((yearlySentiment[year] || 0) + 1) / 2 * 60;
              
              return (
                <g key={year}>
                  <circle cx={x} cy={mentionsY} r="3" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx={x} cy={sentimentY} r="3" fill="#10b981" stroke="white" strokeWidth="2" />
                  <text x={x} y="95" textAnchor="middle" fontSize="2.5" fill="#64748b">
                    {year}
                  </text>
                </g>
              );
            })}
            
            {/* Y-axis labels */}
            <text x="5" y="15" fontSize="2.5" fill="#64748b">Alto</text>
            <text x="5" y="85" fontSize="2.5" fill="#64748b">Bajo</text>
          </svg>
          
          {/* Legend */}
          <div style={yearlyTrendsStyles.legend}>
            <div style={yearlyTrendsStyles.legendItem}>
              <div style={yearlyTrendsStyles.legendLine('#3b82f6')}></div>
              <span style={yearlyTrendsStyles.legendLabel}>Menciones</span>
            </div>
            <div style={yearlyTrendsStyles.legendItem}>
              <div style={yearlyTrendsStyles.legendLine('#10b981', true)}></div>
              <span style={yearlyTrendsStyles.legendLabel}>Sentimiento</span>
            </div>
          </div>
        </div>
        
        {/* Stats Table */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          gridColumn: isMobile ? '1' : '3'
        }}>
          <div style={yearlyTrendsStyles.statsCard}>
            <h4 style={yearlyTrendsStyles.statsTitle}>
              Estadísticas por Año
            </h4>
            
            <div style={yearlyTrendsStyles.yearsList}>
              {years.map(year => (
                <div 
                  key={year} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    transition: 'background 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
                >
                  <span style={yearlyTrendsStyles.yearLabel}>{year}</span>
                  <div style={yearlyTrendsStyles.yearStats}>
                    <span style={yearlyTrendsStyles.yearMentions}>
                      {yearlyMentions[year]?.toLocaleString()} menciones
                    </span>
                    <span style={yearlyTrendsStyles.yearSentiment(getSentimentColor(yearlySentiment[year] || 0))}>
                      Sentiment: {(yearlySentiment[year] || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights Card */}
          {insights.length > 0 && (
            <div style={yearlyTrendsStyles.statsCard}>
              <h4 style={yearlyTrendsStyles.statsTitle}>
                Análisis de Tendencias
              </h4>
              
              <div style={yearlyTrendsStyles.trendsInsights}>
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <div 
                      key={index} 
                      style={yearlyTrendsStyles.insightCard(
                        getInsightColor(insight.type), 
                        getInsightBg(insight.type)
                      )}
                    >
                      <div style={yearlyTrendsStyles.insightHeader(getInsightColor(insight.type))}>
                        <Icon size={14} />
                        <span>{insight.title}</span>
                      </div>
                      <p style={yearlyTrendsStyles.insightText}>
                        {insight.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary Stats Card */}
          <div style={yearlyTrendsStyles.statsCard}>
            <h4 style={yearlyTrendsStyles.statsTitle}>
              Resumen General
            </h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={yearlyTrendsStyles.summaryCard('#3b82f6', '#f0f9ff')}>
                <div style={yearlyTrendsStyles.summaryValue('#3b82f6')}>
                  {summaryStats.totalMentions > 0 ? summaryStats.totalMentions.toLocaleString() : '0'}
                </div>
                <div style={yearlyTrendsStyles.summaryLabel}>Total</div>
              </div>
              
              <div style={yearlyTrendsStyles.summaryCard('#10b981', '#f0fdf4')}>
                <div style={yearlyTrendsStyles.summaryValue('#10b981')}>
                  {summaryStats.avgSentiment.toFixed(2)}
                </div>
                <div style={yearlyTrendsStyles.summaryLabel}>Promedio</div>
              </div>
              
              <div style={yearlyTrendsStyles.summaryCard('#8b5cf6', '#faf5ff')}>
                <div style={yearlyTrendsStyles.summaryValue('#8b5cf6')}>
                  {summaryStats.peakYear}
                </div>
                <div style={yearlyTrendsStyles.summaryLabel}>Año Pico</div>
              </div>
              
              <div style={yearlyTrendsStyles.summaryCard('#f59e0b', '#fefce8')}>
                <div style={yearlyTrendsStyles.summaryValue('#f59e0b')}>
                  {summaryStats.yearsTracked}
                </div>
                <div style={yearlyTrendsStyles.summaryLabel}>Años</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state para desktop */}
      {years.length === 0 && (
        <div style={yearlyTrendsStyles.emptyState}>
          <div style={yearlyTrendsStyles.emptyIcon}>📊</div>
          <div style={yearlyTrendsStyles.emptyTitle}>
            No hay datos de tendencias anuales
          </div>
          <div style={yearlyTrendsStyles.emptyDescription}>
            Los datos se mostrarán aquí una vez que se complete el análisis
          </div>
        </div>
      )}
    </div>
  );
};

export default YearlyTrendsChart;