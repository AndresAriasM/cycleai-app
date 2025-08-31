// frontend/src/components/analysis/YearlyTrendsChart.tsx
import React from 'react';

interface YearlyTrendsChartProps {
  chartData: any;
  isMobile: boolean;
}

const YearlyTrendsChart: React.FC<YearlyTrendsChartProps> = ({ 
  chartData, 
  isMobile 
}) => {
  const yearlyMentions = chartData.yearly_mentions || {};
  const yearlySentiment = chartData.yearly_sentiment || {};
  
  const years = Object.keys(yearlyMentions).sort();
  const maxMentions = Math.max(...Object.values(yearlyMentions) as number[]);
  
  // Generar coordenadas para el gráfico
  const generatePath = (data: Record<string, number>, max: number) => {
    if (years.length === 0) return '';
    
    const points = years.map((year, index) => {
      const x = (index / Math.max(years.length - 1, 1)) * 80 + 10;
      const y = 80 - ((data[year] || 0) / max) * 60;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const mentionsPath = generatePath(yearlyMentions, maxMentions);
  const sentimentPath = generatePath(yearlySentiment, 1); // Sentiment normalizado a 1

  return (
    <div>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '1rem'
      }}>
        Tendencias Anuales
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: '2rem'
      }}>
        {/* Chart */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <svg 
            viewBox="0 0 100 100" 
            style={{
              width: '100%',
              height: isMobile ? '250px' : '300px',
              background: 'white',
              borderRadius: '8px'
            }}
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
                strokeWidth="2"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="3,3"
              />
            )}
            
            {/* Data points */}
            {years.map((year, index) => {
              const x = (index / Math.max(years.length - 1, 1)) * 80 + 10;
              const mentionsY = 80 - ((yearlyMentions[year] || 0) / maxMentions) * 60;
              const sentimentY = 80 - ((yearlySentiment[year] || 0) + 1) / 2 * 60; // Normalize sentiment from -1,1 to 0,1
              
              return (
                <g key={year}>
                  <circle cx={x} cy={mentionsY} r="2" fill="#3b82f6" stroke="white" strokeWidth="1" />
                  <circle cx={x} cy={sentimentY} r="2" fill="#10b981" stroke="white" strokeWidth="1" />
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <div style={{
                width: '16px',
                height: '2px',
                background: '#3b82f6'
              }}></div>
              <span style={{fontSize: '0.9rem', color: '#64748b'}}>Menciones</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <div style={{
                width: '16px',
                height: '2px',
                background: '#10b981',
                borderTop: '2px dashed #10b981'
              }}></div>
              <span style={{fontSize: '0.9rem', color: '#64748b'}}>Sentimiento</span>
            </div>
          </div>
        </div>
        
        {/* Stats Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
          alignSelf: 'flex-start'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Estadísticas por Año
          </h4>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {years.map(year => (
              <div key={year} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                background: '#f8fafc',
                borderRadius: '6px'
              }}>
                <span style={{fontWeight: '600', color: '#374151'}}>{year}</span>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  fontSize: '0.85rem'
                }}>
                  <span style={{color: '#3b82f6'}}>
                    {yearlyMentions[year]?.toLocaleString()} menciones
                  </span>
                  <span style={{color: '#10b981'}}>
                    Sentiment: {(yearlySentiment[year] || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlyTrendsChart;