// frontend/src/services/hypecycleService.ts
export interface SearchTerm {
  value: string;
  operator: 'AND' | 'OR' | 'NOT';
  exact_match: boolean;
}

export interface HypeCycleRequest {
  search_terms: SearchTerm[];
  min_year: number;
}

export interface NewsResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
  date: string;
  year: number;
  sentiment: number;
  country?: string;
  keywords: string[];
}

export interface InflectionPoint {
  year: number;
  mentions: number;
  sentiment: number;
}

export interface HypeCycleAnalysis {
  phase: string;
  confidence: number;
  yearly_stats: Array<{
    year: number;
    mention_count: number;
    sentiment_mean: number;
    sentiment_std: number;
    mention_change?: number;
    sentiment_change?: number;
  }>;
  inflection_points: {
    innovation_trigger?: InflectionPoint;
    peak?: InflectionPoint;
    trough?: InflectionPoint;
  };
  metrics: {
    total_mentions: number;
    years_analyzed: number;
    peak_mentions: number;
    avg_sentiment: number;
  };
}

export interface HypeCycleResponse {
  success: boolean;
  phase: string;
  confidence: number;
  total_mentions: number;
  insights: string[];
  chart_data: {
    yearly_mentions: Record<string, number>;
    yearly_sentiment: Record<string, number>;
    phase_position: { x: number; y: number };
    total_mentions: number;
    inflection_points: {
      innovation_trigger?: InflectionPoint;
      peak?: InflectionPoint;
      trough?: InflectionPoint;
    };
  };
  news_results: NewsResult[];
  analysis?: HypeCycleAnalysis;
}

class HypeCycleService {
  private baseURL = 'http://127.0.0.1:8000';

  async analyzeHypeCycle(request: HypeCycleRequest): Promise<HypeCycleResponse> {
    try {
      const response = await fetch(`${this.baseURL}/api/hypecycle/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('No se puede conectar al servidor. Verifica que el backend esté ejecutándose.');
      }
      throw error;
    }
  }

  async testAnalyze(): Promise<HypeCycleResponse> {
    try {
      const response = await fetch(`${this.baseURL}/api/test`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se puede conectar al backend`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Backend no disponible. Verifica que esté ejecutándose en puerto 8000.');
      }
      throw error;
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/api/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  // Utilities
  getPhaseColor(phase: string): string {
    const colors = {
      'Pre-Innovation Trigger': '#6b7280',
      'Innovation Trigger': '#10b981',
      'Peak of Inflated Expectations': '#ef4444',
      'Trough of Disillusionment': '#f59e0b',
      'Slope of Enlightenment': '#3b82f6',
      'Plateau of Productivity': '#8b5cf6'
    };
    return colors[phase as keyof typeof colors] || '#6b7280';
  }

  getPhaseDescription(phase: string): string {
    const descriptions = {
      'Pre-Innovation Trigger': 'La tecnología aún no ha generado interés significativo en los medios.',
      'Innovation Trigger': 'Primeras menciones y descubrimientos que generan interés inicial.',
      'Peak of Inflated Expectations': 'Máximo nivel de expectativas, a menudo exageradas.',
      'Trough of Disillusionment': 'Las expectativas se desinflan y se revelan las limitaciones.',
      'Slope of Enlightenment': 'Comprensión gradual de beneficios reales y aplicaciones.',
      'Plateau of Productivity': 'Adopción generalizada con beneficios demostrados.'
    };
    return descriptions[phase as keyof typeof descriptions] || 'Fase no identificada.';
  }

  getConfidenceLabel(confidence: number): string {
    if (confidence >= 0.8) return 'Alta';
    if (confidence >= 0.6) return 'Moderada';
    if (confidence >= 0.4) return 'Baja';
    return 'Muy Baja';
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 0.8) return '#10b981';
    if (confidence >= 0.6) return '#f59e0b';
    if (confidence >= 0.4) return '#ef4444';
    return '#6b7280';
  }

  formatSentiment(sentiment: number): string {
    if (sentiment > 0.3) return 'Muy Positivo';
    if (sentiment > 0.1) return 'Positivo';
    if (sentiment > -0.1) return 'Neutral';
    if (sentiment > -0.3) return 'Negativo';
    return 'Muy Negativo';
  }

  getSentimentColor(sentiment: number): string {
    if (sentiment > 0.3) return '#10b981';
    if (sentiment > 0.1) return '#84cc16';
    if (sentiment > -0.1) return '#6b7280';
    if (sentiment > -0.3) return '#f59e0b';
    return '#ef4444';
  }
}

export const hypecycleService = new HypeCycleService();