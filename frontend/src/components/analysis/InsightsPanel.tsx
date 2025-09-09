// frontend/src/components/analysis/InsightsPanel.tsx
import React, { useState, useMemo } from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Target,
  Zap,
  Shield
} from 'lucide-react';
import { insightsPanelStyles } from '../../styles/analysisStyles';

interface InsightsPanelProps {
  insights: string[];
  isMobile?: boolean;
}

type InsightCategory = 'all' | 'positive' | 'warning' | 'neutral' | 'achievement';

const InsightsPanel: React.FC<InsightsPanelProps> = ({ 
  insights, 
  isMobile = false 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory>('all');
  const [hoveredInsight, setHoveredInsight] = useState<number | null>(null);

  const getInsightIcon = (insight: string) => {
    if (insight.includes('🚀') || insight.includes('📈')) return TrendingUp;
    if (insight.includes('⚠️') || insight.includes('⏳')) return AlertTriangle;
    if (insight.includes('✅') || insight.includes('🏆')) return CheckCircle;
    if (insight.includes('💡') || insight.includes('🔍')) return Lightbulb;
    if (insight.includes('🎯') || insight.includes('🔥')) return Target;
    if (insight.includes('⚡') || insight.includes('💪')) return Zap;
    if (insight.includes('🛡️') || insight.includes('🔒')) return Shield;
    return Info;
  };

  const getInsightColor = (insight: string): string => {
    if (insight.includes('🚀') || insight.includes('✅') || insight.includes('📈')) return '#10b981';
    if (insight.includes('⚠️') || insight.includes('⏳')) return '#f59e0b';
    if (insight.includes('📉') || insight.includes('😔')) return '#ef4444';
    if (insight.includes('🎯') || insight.includes('🔥')) return '#8b5cf6';
    if (insight.includes('⚡') || insight.includes('💪')) return '#06b6d4';
    return '#3b82f6';
  };

  const getInsightCategory = (insight: string): InsightCategory => {
    if (insight.includes('🚀') || insight.includes('✅') || insight.includes('📈')) return 'positive';
    if (insight.includes('⚠️') || insight.includes('⏳')) return 'warning';
    if (insight.includes('🏆') || insight.includes('💪')) return 'achievement';
    return 'neutral';
  };

  const categorizedInsights = useMemo(() => {
    return insights.map((insight, index) => ({
      id: index,
      text: insight,
      icon: getInsightIcon(insight),
      color: getInsightColor(insight),
      category: getInsightCategory(insight)
    }));
  }, [insights]);

  const filteredInsights = useMemo(() => {
    if (selectedCategory === 'all') return categorizedInsights;
    return categorizedInsights.filter(insight => insight.category === selectedCategory);
  }, [categorizedInsights, selectedCategory]);

  const insightStats = useMemo(() => {
    const stats = {
      total: categorizedInsights.length,
      positive: categorizedInsights.filter(i => i.category === 'positive').length,
      warning: categorizedInsights.filter(i => i.category === 'warning').length,
      achievement: categorizedInsights.filter(i => i.category === 'achievement').length
    };
    return stats;
  }, [categorizedInsights]);

  const categories = [
    { key: 'all' as InsightCategory, label: 'Todos', color: '#64748b' },
    { key: 'positive' as InsightCategory, label: 'Positivos', color: '#10b981' },
    { key: 'warning' as InsightCategory, label: 'Alertas', color: '#f59e0b' },
    { key: 'achievement' as InsightCategory, label: 'Logros', color: '#8b5cf6' }
  ];

  if (isMobile) {
    return (
      <div style={insightsPanelStyles.container}>
        {/* Header móvil */}
        <div style={insightsPanelStyles.mobileHeader}>
          <h3 style={insightsPanelStyles.mobileTitle}>
            <Lightbulb size={20} />
            Insights Clave
          </h3>
          <div style={insightsPanelStyles.mobileSubtitle}>
            {filteredInsights.length} insight{filteredInsights.length !== 1 ? 's' : ''} encontrado{filteredInsights.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Stats compactas */}
        <div style={insightsPanelStyles.insightsStats(isMobile)}>
          <div style={insightsPanelStyles.statItem}>
            <div style={{...insightsPanelStyles.statValue, color: '#64748b'}}>
              {insightStats.total}
            </div>
            <div style={insightsPanelStyles.statLabel}>Total</div>
          </div>
          <div style={insightsPanelStyles.statItem}>
            <div style={{...insightsPanelStyles.statValue, color: '#10b981'}}>
              {insightStats.positive}
            </div>
            <div style={insightsPanelStyles.statLabel}>Positivos</div>
          </div>
          <div style={insightsPanelStyles.statItem}>
            <div style={{...insightsPanelStyles.statValue, color: '#f59e0b'}}>
              {insightStats.warning}
            </div>
            <div style={insightsPanelStyles.statLabel}>Alertas</div>
          </div>
          <div style={insightsPanelStyles.statItem}>
            <div style={{...insightsPanelStyles.statValue, color: '#8b5cf6'}}>
              {insightStats.achievement}
            </div>
            <div style={insightsPanelStyles.statLabel}>Logros</div>
          </div>
        </div>

        {/* Filtros de categoría */}
        <div style={insightsPanelStyles.categoryFilter(isMobile)}>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              style={insightsPanelStyles.categoryButton(
                selectedCategory === category.key, 
                category.color
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Lista de insights - scrolleable */}
        <div style={{
          ...insightsPanelStyles.insightsGrid(isMobile),
          ...insightsPanelStyles.compactView
        }}>
          {filteredInsights.map((insight) => {
            const Icon = insight.icon;
            
            return (
              <div 
                key={insight.id} 
                style={insightsPanelStyles.insightCard(insight.color, isMobile)}
                onTouchStart={() => setHoveredInsight(insight.id)}
                onTouchEnd={() => setHoveredInsight(null)}
              >
                <div style={insightsPanelStyles.iconContainer(insight.color)}>
                  <Icon size={16} />
                </div>
                <span style={insightsPanelStyles.insightText(isMobile)}>
                  {insight.text}
                </span>
                <div style={insightsPanelStyles.categoryIndicator(insight.color)} />
                
                {hoveredInsight === insight.id && (
                  <div style={insightsPanelStyles.hoverOverlay} />
                )}
              </div>
            );
          })}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredInsights.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#64748b'
          }}>
            <Info size={32} style={{opacity: 0.5, marginBottom: '1rem'}} />
            <div style={{fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem'}}>
              No hay insights en esta categoría
            </div>
            <div style={{fontSize: '0.9rem'}}>
              Selecciona otra categoría para ver más insights
            </div>
          </div>
        )}
      </div>
    );
  }

  // Versión desktop mejorada
  return (
    <div style={insightsPanelStyles.container}>
      <h3 style={insightsPanelStyles.title}>
        <Lightbulb size={20} />
        Insights Clave
      </h3>
      
      {/* Stats header para desktop */}
      <div style={insightsPanelStyles.insightsStats(isMobile)}>
        <div style={insightsPanelStyles.statItem}>
          <div style={{...insightsPanelStyles.statValue, color: '#64748b'}}>
            {insightStats.total}
          </div>
          <div style={insightsPanelStyles.statLabel}>Total Insights</div>
        </div>
        <div style={insightsPanelStyles.statItem}>
          <div style={{...insightsPanelStyles.statValue, color: '#10b981'}}>
            {insightStats.positive}
          </div>
          <div style={insightsPanelStyles.statLabel}>Positivos</div>
        </div>
        <div style={insightsPanelStyles.statItem}>
          <div style={{...insightsPanelStyles.statValue, color: '#f59e0b'}}>
            {insightStats.warning}
          </div>
          <div style={insightsPanelStyles.statLabel}>Alertas</div>
        </div>
        <div style={insightsPanelStyles.statItem}>
          <div style={{...insightsPanelStyles.statValue, color: '#8b5cf6'}}>
            {insightStats.achievement}
          </div>
          <div style={insightsPanelStyles.statLabel}>Logros</div>
        </div>
      </div>

      {/* Filtros de categoría */}
      <div style={insightsPanelStyles.categoryFilter(isMobile)}>
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            style={insightsPanelStyles.categoryButton(
              selectedCategory === category.key, 
              category.color
            )}
            onMouseEnter={(e) => {
              if (selectedCategory !== category.key) {
                e.currentTarget.style.background = `${category.color}15`;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category.key) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Grid de insights */}
      <div style={insightsPanelStyles.insightsGrid(isMobile)}>
        {filteredInsights.map((insight) => {
          const Icon = insight.icon;
          
          return (
            <div 
              key={insight.id} 
              style={insightsPanelStyles.insightCard(insight.color, isMobile)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${insight.color}20`;
                const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              <div style={insightsPanelStyles.iconContainer(insight.color)}>
                <Icon size={16} />
              </div>
              <span style={insightsPanelStyles.insightText(isMobile)}>
                {insight.text}
              </span>
              <div style={insightsPanelStyles.categoryIndicator(insight.color)} />
              <div 
                className="hover-overlay"
                style={insightsPanelStyles.hoverOverlay} 
              />
            </div>
          );
        })}
      </div>

      {/* Mensaje si no hay resultados */}
      {filteredInsights.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#64748b'
        }}>
          <Info size={48} style={{opacity: 0.5, marginBottom: '1rem'}} />
          <div style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem'}}>
            No hay insights en esta categoría
          </div>
          <div style={{fontSize: '0.9rem'}}>
            Selecciona otra categoría para ver más insights
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPanel;