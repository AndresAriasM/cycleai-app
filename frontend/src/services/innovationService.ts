// frontend/src/services/innovationService.ts
export interface InnovationAnswer {
    question_id: string;
    score: number; // 1-4 scale
  }
  
  export interface InnovationQuestion {
    id: string;
    text: string;
    category: string;
  }
  
  export interface InnovationModule {
    name: string;
    description: string;
    questions: InnovationQuestion[];
  }
  
  export interface InnovationTestRequest {
    company_name: string;
    answers: InnovationAnswer[];
  }
  
  export interface ModuleScore {
    module_name: string;
    score: number;
    max_score: number;
    percentage: number;
  }
  
  export interface InnovationLevel {
    level: string;
    description: string;
    recommendations: string[];
  }
  
  export interface InnovationTestResponse {
    success: boolean;
    company_name: string;
    total_score: number;
    max_total_score: number;
    overall_percentage: number;
    module_scores: ModuleScore[];
    innovation_level: InnovationLevel;
    chart_data: {
      modules: string[];
      scores: number[];
      company_name: string;
      overall_percentage: number;
    };
  }
  
  export interface InnovationQuestionsResponse {
    success: boolean;
    modules: Record<string, InnovationModule>;
  }
  
  class InnovationService {
    private baseURL = 'http://localhost:8000';
  
    async getQuestions(): Promise<InnovationQuestionsResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/innovation/questions`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudieron obtener las preguntas`);
        }
        
        return await response.json();
      } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
          throw new Error('No se puede conectar al servidor. Verifica que el backend esté ejecutándose.');
        }
        throw error;
      }
    }
  
    async analyzeTest(request: InnovationTestRequest): Promise<InnovationTestResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/innovation/analyze`, {
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
  
    async getTestData(): Promise<InnovationTestResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/innovation/test`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pueden obtener datos de prueba`);
        }
        
        return await response.json();
      } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
          throw new Error('Backend no disponible. Verifica que esté ejecutándose en puerto 8000.');
        }
        throw error;
      }
    }
  
    // Utilities
    getLevelColor(level: string): string {
      if (level.includes('Altamente Innovadora')) return '#10b981';
      if (level.includes('Innovadora Sólida')) return '#3b82f6';
      if (level.includes('Potencial de Innovación')) return '#f59e0b';
      if (level.includes('Desarrollo Innovador')) return '#ef4444';
      return '#6b7280';
    }
  
    getLevelIcon(level: string): string {
      if (level.includes('Altamente Innovadora')) return '🏆';
      if (level.includes('Innovadora Sólida')) return '⭐';
      if (level.includes('Potencial de Innovación')) return '📈';
      if (level.includes('Desarrollo Innovador')) return '🔧';
      return '⚠️';
    }
  
    getScoreLabel(percentage: number): string {
      if (percentage >= 85) return 'Excelente';
      if (percentage >= 70) return 'Bueno';
      if (percentage >= 55) return 'Regular';
      if (percentage >= 40) return 'Bajo';
      return 'Crítico';
    }
  
    getScoreColor(percentage: number): string {
      if (percentage >= 85) return '#10b981';
      if (percentage >= 70) return '#3b82f6';
      if (percentage >= 55) return '#f59e0b';
      if (percentage >= 40) return '#ef4444';
      return '#6b7280';
    }
  
    getScaleLabel(score: number): string {
      switch (score) {
        case 1: return 'No se aplica';
        case 2: return 'Se aplica parcialmente';
        case 3: return 'Se aplica considerablemente';
        case 4: return 'Se aplica completamente';
        default: return 'Sin respuesta';
      }
    }
  
    validateAnswers(answers: InnovationAnswer[], totalQuestions: number): string | null {
      if (answers.length === 0) {
        return 'Debe responder al menos una pregunta';
      }
  
      if (answers.length < totalQuestions) {
        return `Faltan ${totalQuestions - answers.length} preguntas por responder`;
      }
  
      const invalidAnswers = answers.filter(a => a.score < 1 || a.score > 4);
      if (invalidAnswers.length > 0) {
        return 'Todas las respuestas deben estar entre 1 y 4';
      }
  
      return null;
    }
  
    calculateModuleProgress(answers: InnovationAnswer[], modulePrefix: string): number {
      const moduleAnswers = answers.filter(a => a.question_id.startsWith(modulePrefix));
      return moduleAnswers.length;
    }
  
    getTotalQuestions(modules: Record<string, InnovationModule>): number {
      return Object.values(modules).reduce((total, module) => total + module.questions.length, 0);
    }
  }
  
  export const innovationService = new InnovationService();