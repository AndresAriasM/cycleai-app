export interface SearchTerm {
    value: string;
    operator: 'AND' | 'OR' | 'NOT';
    exact_match: boolean;
  }
  
  export interface HypeCycleRequest {
    search_terms: SearchTerm[];
    min_year: number;
  }
  
  export interface HypeCycleResponse {
    success: boolean;
    phase: string;
    confidence: number;
    total_mentions: number;
    insights: string[];
    chart_data: {
      yearly_mentions: Record<number, number>;
      phase_position: { x: number; y: number };
      total_mentions: number;
    };
  }
  
  class HypeCycleService {
    private baseURL = 'http://localhost:8000';
  
    async analyzeHypeCycle(request: HypeCycleRequest): Promise<HypeCycleResponse> {
      const response = await fetch(`${this.baseURL}/api/hypecycle/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error en análisis');
      }
  
      return await response.json();
    }
  
    // Para testing sin API key
    async testAnalyze(): Promise<HypeCycleResponse> {
      const response = await fetch(`${this.baseURL}/api/test`);
      if (!response.ok) {
        throw new Error('Error en conexión con backend');
      }
      return await response.json();
    }
  }
  
  export const hypecycleService = new HypeCycleService();