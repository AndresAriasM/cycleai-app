// frontend/src/components/analysis/InsightsPanel.tsx
import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface InsightsPanelProps {
  insights: string[];
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  const getInsightIcon = (insight: string) => {
    if (insight.includes('🚀') || insight.includes('📈')) return TrendingUp;
    if (insight.includes('⚠️') || insight.includes('⏳')) return AlertTriangle;
    if (insight.includes('✅') || insight.includes('🏆')) return CheckCircle;
    if (insight.includes('💡') || insight.includes('🔍')) return Lightbulb;
    return Info;
  };

  const getInsightColor = (insight: string) => {
    if (insight.includes('🚀') || insight.includes('✅')) return '#10b981';
    if (insight.includes('⚠️') || insight.includes('⏳')) return '#f59e0b';
    if (insight.includes('📉') || insight.includes('😔')) return '#ef4444';
    return '#3b82f6';
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
        <Lightbulb size={20} />
        Insights Clave
      </h3>
      
      <div style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        {insights.map((insight, index) => {
          const Icon = getInsightIcon(insight);
          const color = getInsightColor(insight);
          
          return (
            <div key={index} style={{
              padding: '1rem',
              background: `${color}10`,
              border: `1px solid ${color}30`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <div style={{
                background: color,
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '0.1rem'
              }}>
                <Icon size={14} />
              </div>
              <span style={{
                fontSize: '0.95rem',
                color: '#374151',
                lineHeight: '1.5'
              }}>
                {insight}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsPanel;