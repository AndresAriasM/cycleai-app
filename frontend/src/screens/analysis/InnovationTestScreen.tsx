// src/screens/analysis/InnovationTestScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building, 
  CheckCircle, 
  Circle, 
  BarChart3, 
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Download,
  Share2,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Users,
  Leaf,
  Settings
} from 'lucide-react';

// Interfaces
interface InnovationAnswer {
  question_id: string;
  score: number; // 1-4 scale
}

interface InnovationQuestion {
  id: string;
  text: string;
  category: string;
}

interface InnovationModule {
  name: string;
  description: string;
  questions: InnovationQuestion[];
}

interface ModuleScore {
  module_name: string;
  score: number;
  max_score: number;
  percentage: number;
}

interface InnovationLevel {
  level: string;
  description: string;
  recommendations: string[];
}

interface InnovationTestResponse {
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

const InnovationTestScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'setup' | 'test' | 'results'>('setup');
  const [companyName, setCompanyName] = useState('');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<InnovationAnswer[]>([]);
  const [results, setResults] = useState<InnovationTestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Definición de módulos y preguntas
  const innovationModules: Record<string, InnovationModule> = {
    "modulo1": {
      name: "Alineamiento Estratégico",
      description: "Estudios de futuro, estrategia de innovación, modelo de gestión de innovación",
      questions: [
        {
          id: "m1_q1",
          text: "¿Su empresa ha realizado estudios de vigilancia tecnológica?",
          category: "vigilancia"
        },
        {
          id: "m1_q2", 
          text: "¿Su empresa ha desarrollado o participado en procesos de innovación abierta?",
          category: "innovacion_abierta"
        },
        {
          id: "m1_q3",
          text: "¿Su empresa cuenta con una unidad de I+D o I+D+i?",
          category: "unidad_id"
        },
        {
          id: "m1_q4",
          text: "¿Su empresa ha realizado estudios de futuro? (MICMAC - Escenarios, Delphi - Consulta anónima a expertos)",
          category: "estudios_futuro"
        },
        {
          id: "m1_q5",
          text: "¿Su empresa ha formulado o implementado una estrategia de innovación?",
          category: "estrategia_innovacion"
        },
        {
          id: "m1_q6",
          text: "Desde el punto de vista de la gestión de la Innovación su empresa cuenta con: Modelo de innovación, Modelo de gestión de innovación, Sistema de gestión de innovación",
          category: "modelo_gestion"
        }
      ]
    },
    "modulo2": {
      name: "Capacidades de Absorción",
      description: "Desarrollo de capacidades para adquirir y aplicar conocimiento externo",
      questions: [
        {
          id: "m2_q1",
          text: "¿Su empresa tiene establecido un plan para el desarrollo de las capacidades de absorción?",
          category: "plan_absorcion"
        },
        {
          id: "m2_q2",
          text: "¿Su empresa tiene un plan sistemático para identificar y adquirir conocimiento generado en el exterior?",
          category: "adquisicion_conocimiento"
        },
        {
          id: "m2_q3",
          text: "¿Su empresa tiene un plan sistemático para analizar, procesar, interpretar y comprender la información obtenida de fuentes externas?",
          category: "asimilacion_conocimiento"
        },
        {
          id: "m2_q4",
          text: "¿Su empresa tiene un plan sistemático para hacer la transferencia y la combinación del conocimiento previo con el nuevo conocimiento adquirido y asimilado?",
          category: "transformacion_conocimiento"
        },
        {
          id: "m2_q5",
          text: "¿Su empresa tiene un plan sistemático para la aplicación del nuevo conocimiento adquirido del medio?",
          category: "explotacion_conocimiento"
        }
      ]
    },
    "modulo3": {
      name: "Innovación Sostenible y Regenerativa", 
      description: "Innovación orientada a sostenibilidad y regeneratividad",
      questions: [
        {
          id: "m3_q1",
          text: "¿Su organización ha generado innovaciones sostenibles/sustentables/ecoinnovaciones?",
          category: "innovacion_sostenible"
        },
        {
          id: "m3_q2",
          text: "¿Su organización ha generado innovaciones regenerativas?",
          category: "innovacion_regenerativa"
        },
        {
          id: "m3_q3",
          text: "¿Su organización busca alinear innovaciones sostenibles y/o regenerativas con tecnologías convergentes (nano, bio, info, cogno)?",
          category: "tecnologias_convergentes"
        },
        {
          id: "m3_q4",
          text: "¿Su organización busca alinear innovaciones sostenibles y/o regenerativas a partir de Key Enabling Technologies - KET's?",
          category: "tecnologias_habilitadoras"
        },
        {
          id: "m3_q5",
          text: "¿Su organización busca alinear innovaciones sostenibles y/o regenerativas a partir de Tecnologías Transformativas?",
          category: "tecnologias_transformativas"
        },
        {
          id: "m3_q6",
          text: "¿Su organización participa en Innovación en la transformación urbana con fines de regeneratividad?",
          category: "transformacion_urbana"
        },
        {
          id: "m3_q7",
          text: "¿Su organización aplica, participa o promueve Innovación tecnológica para la regeneratividad?",
          category: "innovacion_tecnologica_regenerativa"
        },
        {
          id: "m3_q8",
          text: "¿Su organización participa con procesos de Innovación responsable para la regeneratividad?",
          category: "innovacion_responsable"
        },
        {
          id: "m3_q9",
          text: "¿Su organización genera, promueve la Innovación en modelos de negocio orientados a regeneratividad?",
          category: "modelos_negocio_regenerativos"
        }
      ]
    }
  };

  // Obtener todas las preguntas
  const allQuestions = Object.values(innovationModules).flatMap(module => module.questions);
  const totalQuestions = allQuestions.length;

  // Helpers
  const getModuleIcon = (moduleKey: string) => {
    switch (moduleKey) {
      case 'modulo1': return Settings;
      case 'modulo2': return Users;
      case 'modulo3': return Leaf;
      default: return Target;
    }
  };

  const getModuleColor = (moduleKey: string) => {
    switch (moduleKey) {
      case 'modulo1': return '#3b82f6';
      case 'modulo2': return '#10b981';
      case 'modulo3': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getScaleLabel = (score: number) => {
    switch (score) {
      case 1: return 'No se aplica';
      case 2: return 'Se aplica parcialmente';
      case 3: return 'Se aplica considerablemente';
      case 4: return 'Se aplica completamente';
      default: return 'Sin respuesta';
    }
  };

  const determineInnovationLevel = (percentage: number): InnovationLevel => {
    if (percentage >= 85) {
      return {
        level: "Empresa Altamente Innovadora",
        description: "Su empresa demuestra un excelente nivel de madurez en innovación con capacidades avanzadas en todos los aspectos evaluados.",
        recommendations: [
          "Mantener el liderazgo en innovación mediante inversión continua en I+D+i",
          "Desarrollar programas de mentoría para otras empresas del sector",
          "Explorar tecnologías emergentes y disruptivas",
          "Fortalecer alianzas estratégicas internacionales para innovación"
        ]
      };
    } else if (percentage >= 70) {
      return {
        level: "Empresa Innovadora Sólida",
        description: "Su empresa tiene una base sólida de innovación con buenas prácticas implementadas, aunque con oportunidades de mejora específicas.",
        recommendations: [
          "Identificar y fortalecer las áreas con menor puntuación",
          "Implementar sistemas de gestión de conocimiento más robustos",
          "Aumentar la colaboración con centros de investigación",
          "Desarrollar capacidades en tecnologías sostenibles y regenerativas"
        ]
      };
    } else if (percentage >= 55) {
      return {
        level: "Empresa con Potencial de Innovación",
        description: "Su empresa muestra potencial innovador pero necesita desarrollar capacidades más estructuradas y sistemáticas.",
        recommendations: [
          "Establecer una unidad formal de I+D+i",
          "Desarrollar una estrategia de innovación clara y documentada",
          "Implementar procesos de vigilancia tecnológica",
          "Capacitar al personal en metodologías de innovación",
          "Establecer alianzas con universidades y centros de investigación"
        ]
      };
    } else if (percentage >= 40) {
      return {
        level: "Empresa en Desarrollo Innovador",
        description: "Su empresa está en las etapas iniciales del desarrollo de capacidades de innovación y requiere inversión significativa en este aspecto.",
        recommendations: [
          "Crear un plan estratégico de innovación a mediano plazo",
          "Designar recursos específicos para actividades de I+D",
          "Realizar estudios de vigilancia tecnológica básicos",
          "Establecer procesos para capturar ideas de empleados",
          "Participar en redes de innovación del sector"
        ]
      };
    } else {
      return {
        level: "Empresa con Necesidad Crítica de Innovación",
        description: "Su empresa requiere una transformación fundamental en sus capacidades de innovación para mantenerse competitiva.",
        recommendations: [
          "Realizar un diagnóstico completo de capacidades actuales",
          "Desarrollar una cultura organizacional que fomente la innovación",
          "Establecer metas específicas y medibles para innovación",
          "Buscar asesoría externa especializada en gestión de innovación",
          "Considerar alianzas estratégicas para acceder a capacidades de innovación",
          "Implementar programas de formación en innovación para todo el personal"
        ]
      };
    }
  };

  const calculateResults = (): InnovationTestResponse => {
    // Organizar respuestas por módulo
    const answersByModule: Record<string, number[]> = {};
    for (const answer of answers) {
      const moduleId = answer.question_id.split('_')[0];  // m1, m2, m3
      const moduleKey = `modulo${moduleId[1]}`;  // modulo1, modulo2, modulo3
      
      if (!answersByModule[moduleKey]) {
        answersByModule[moduleKey] = [];
      }
      answersByModule[moduleKey].push(answer.score);
    }

    // Calcular scores por módulo
    const moduleScores: ModuleScore[] = [];
    let totalScore = 0;
    let maxTotalScore = 0;

    for (const [moduleKey, moduleData] of Object.entries(innovationModules)) {
      const scores = answersByModule[moduleKey] || [];
      const moduleScore = scores.reduce((sum, score) => sum + score, 0);
      const moduleMaxScore = moduleData.questions.length * 4;
      const modulePercentage = (moduleScore / moduleMaxScore) * 100;

      moduleScores.push({
        module_name: moduleData.name,
        score: moduleScore,
        max_score: moduleMaxScore,
        percentage: modulePercentage
      });

      totalScore += moduleScore;
      maxTotalScore += moduleMaxScore;
    }

    const overallPercentage = (totalScore / maxTotalScore) * 100;
    const innovationLevel = determineInnovationLevel(overallPercentage);

    return {
      success: true,
      company_name: companyName,
      total_score: totalScore,
      max_total_score: maxTotalScore,
      overall_percentage: overallPercentage,
      module_scores: moduleScores,
      innovation_level: innovationLevel,
      chart_data: {
        modules: moduleScores.map(s => s.module_name),
        scores: moduleScores.map(s => s.percentage),
        company_name: companyName,
        overall_percentage: overallPercentage
      }
    };
  };

  const handleAnswer = (questionId: string, score: number) => {
    const newAnswers = answers.filter(a => a.question_id !== questionId);
    newAnswers.push({ question_id: questionId, score });
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const currentModule = Object.entries(innovationModules)[currentModuleIndex];
    if (currentQuestionIndex < currentModule[1].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentModuleIndex < Object.keys(innovationModules).length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Finalizar test
      setLoading(true);
      setTimeout(() => {
        const calculatedResults = calculateResults();
        setResults(calculatedResults);
        setCurrentStep('results');
        setLoading(false);
      }, 1000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentModuleIndex > 0) {
      const prevModule = Object.entries(innovationModules)[currentModuleIndex - 1];
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentQuestionIndex(prevModule[1].questions.length - 1);
    }
  };

  const getProgressPercentage = () => {
    const totalAnswered = answers.length;
    return (totalAnswered / totalQuestions) * 100;
  };

  const getCurrentQuestion = () => {
    const currentModule = Object.entries(innovationModules)[currentModuleIndex];
    return currentModule[1].questions[currentQuestionIndex];
  };

  const getCurrentAnswer = (questionId: string) => {
    return answers.find(a => a.question_id === questionId)?.score;
  };

  const getLevelColor = (level: string) => {
    if (level.includes('Altamente Innovadora')) return '#10b981';
    if (level.includes('Innovadora Sólida')) return '#3b82f6';
    if (level.includes('Potencial de Innovación')) return '#f59e0b';
    if (level.includes('Desarrollo Innovador')) return '#ef4444';
    return '#6b7280';
  };

  const SpiderChart: React.FC<{ data: ModuleScore[] }> = ({ data }) => {
    const size = isMobile ? 250 : 300;
    const center = size / 2;
    const radius = center - 40;
    
    const angles = data.map((_, i) => (i * 2 * Math.PI) / data.length - Math.PI / 2);
    
    const points = data.map((item, i) => {
      const angle = angles[i];
      const value = (item.percentage / 100) * radius;
      return {
        x: center + Math.cos(angle) * value,
        y: center + Math.sin(angle) * value
      };
    });

    const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <svg width={size} height={size} style={{ background: '#f8fafc', borderRadius: '12px' }}>
          {/* Grid circles */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map(level => (
            <circle
              key={level}
              cx={center}
              cy={center}
              r={radius * level}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}
          
          {/* Grid lines */}
          {angles.map((angle, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + Math.cos(angle) * radius}
              y2={center + Math.sin(angle) * radius}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}
          
          {/* Data area */}
          <path
            d={pathData}
            fill="rgba(59, 130, 246, 0.3)"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          
          {/* Data points */}
          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#3b82f6"
            />
          ))}
          
          {/* Labels */}
          {data.map((item, i) => {
            const angle = angles[i];
            const labelRadius = radius + 25;
            const x = center + Math.cos(angle) * labelRadius;
            const y = center + Math.sin(angle) * labelRadius;
            
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize={isMobile ? "10" : "12"}
                fill="#374151"
                dominantBaseline="central"
              >
                {item.module_name.split(' ')[0]}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  // Setup Step
  if (currentStep === 'setup') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: isMobile ? '1rem' : '2rem'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => navigate('/analysis')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.5rem',
                marginRight: '1rem',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                color: '#64748b'
              }}
            >
              <ArrowLeft size={24} />
            </button>
            
            <div>
              <h1 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: 0
              }}>
                Test de Innovación Empresarial
              </h1>
              <p style={{
                color: '#64748b',
                fontSize: '1rem',
                margin: '0.5rem 0 0 0'
              }}>
                Cómo evaluar rápidamente su capacidad de innovación
              </p>
            </div>
          </div>

          {/* Setup Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: isMobile ? '1.5rem' : '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
              }}>
                <Award size={40} color="white" />
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '0.5rem'
              }}>
                Evalúe su Capacidad de Innovación
              </h2>
              <p style={{
                color: '#64748b',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                Este test evalúa tres dimensiones clave de la innovación empresarial mediante preguntas estructuradas
              </p>
            </div>

            {/* Modules Overview */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                Módulos de Evaluación:
              </h3>
              
              {Object.entries(innovationModules).map(([moduleKey, module], index) => {
                const Icon = getModuleIcon(moduleKey);
                const color = getModuleColor(moduleKey);
                
                return (
                  <div key={moduleKey} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    background: `${color}10`,
                    border: `1px solid ${color}30`,
                    borderRadius: '12px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: color,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <Icon size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '0.25rem'
                      }}>
                        {module.name}
                      </h4>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#64748b',
                        margin: 0
                      }}>
                        {module.description}
                      </p>
                    </div>
                    <div style={{
                      background: color,
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {module.questions.length} preguntas
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Company Name Input */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Nombre de la empresa u organización:
              </label>
              <div style={{ position: 'relative' }}>
                <Building size={20} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ingrese el nombre de su empresa"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 3rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={() => {
                if (companyName.trim()) {
                  setCurrentStep('test');
                }
              }}
              disabled={!companyName.trim()}
              style={{
                width: '100%',
                background: companyName.trim() 
                  ? 'linear-gradient(135deg, #3b82f6, #1e40af)' 
                  : '#94a3b8',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: companyName.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: companyName.trim() 
                  ? '0 4px 12px rgba(59, 130, 246, 0.3)' 
                  : 'none'
              }}
            >
              <Lightbulb size={20} />
              Comenzar Evaluación ({totalQuestions} preguntas)
            </button>

            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: '#fef3c7',
              borderRadius: '12px',
              border: '1px solid #f59e0b'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: '#92400e',
                fontSize: '0.9rem'
              }}>
                <AlertCircle size={16} style={{ marginRight: '0.5rem' }} />
                <strong>Tiempo estimado:</strong> 10-15 minutos
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test Step
  if (currentStep === 'test') {
    const currentModule = Object.entries(innovationModules)[currentModuleIndex];
    const currentQuestion = getCurrentQuestion();
    const currentAnswer = getCurrentAnswer(currentQuestion.id);
    const currentModuleProgress = (currentQuestionIndex + 1) / currentModule[1].questions.length * 100;
    const overallProgress = getProgressPercentage();

    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: isMobile ? '1rem' : '2rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header with Progress */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <h1 style={{
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: 0
              }}>
                Test de Innovación - {companyName}
              </h1>
              
              <div style={{
                fontSize: '0.9rem',
                color: '#64748b'
              }}>
                {answers.length} de {totalQuestions} respondidas
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '0.9rem', color: '#374151', fontWeight: '500' }}>
                  Progreso General
                </span>
                <span style={{ fontSize: '0.9rem', color: '#3b82f6', fontWeight: '600' }}>
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${overallProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>

            {/* Module Progress */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Módulo {currentModuleIndex + 1}: {currentModule[1].name}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>
                  {currentQuestionIndex + 1}/{currentModule[1].questions.length}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '4px',
                background: '#e2e8f0',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${currentModuleProgress}%`,
                  height: '100%',
                  background: '#10b981',
                  borderRadius: '2px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: isMobile ? '1.5rem' : '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            marginBottom: '1rem'
          }}>
            {/* Module Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem',
              padding: '1rem',
              background: `${getModuleColor(`modulo${currentModuleIndex + 1}`)}10`,
              borderRadius: '12px',
              border: `1px solid ${getModuleColor(`modulo${currentModuleIndex + 1}`)}30`
            }}>
              {(() => {
                const Icon = getModuleIcon(`modulo${currentModuleIndex + 1}`);
                return <Icon size={24} color={getModuleColor(`modulo${currentModuleIndex + 1}`)} />;
              })()}
              <div style={{ marginLeft: '1rem' }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '0.25rem'
                }}>
                  {currentModule[1].name}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#64748b'
                }}>
                  {currentModule[1].description}
                </div>
              </div>
            </div>

            {/* Question */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                fontSize: '0.9rem',
                color: '#64748b',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Pregunta {currentQuestionIndex + 1} de {currentModule[1].questions.length}
              </div>
              
              <h2 style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                fontWeight: '600',
                color: '#1e293b',
                lineHeight: '1.5',
                marginBottom: '1.5rem'
              }}>
                {currentQuestion.text}
              </h2>

              {/* Answer Options */}
              <div style={{
                display: 'grid',
                gap: '0.75rem'
              }}>
                {[1, 2, 3, 4].map(score => (
                  <button
                    key={score}
                    onClick={() => handleAnswer(currentQuestion.id, score)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 1.5rem',
                      background: currentAnswer === score ? '#dbeafe' : '#f8fafc',
                      border: `2px solid ${currentAnswer === score ? '#3b82f6' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (currentAnswer !== score) {
                        e.currentTarget.style.background = '#f1f5f9';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentAnswer !== score) {
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }
                    }}
                  >
                    <div style={{ marginRight: '1rem' }}>
                      {currentAnswer === score ? 
                        <CheckCircle size={20} color="#3b82f6" /> : 
                        <Circle size={20} color="#9ca3af" />
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '0.25rem'
                      }}>
                        <span style={{
                          background: currentAnswer === score ? '#3b82f6' : '#6b7280',
                          color: 'white',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          marginRight: '0.75rem'
                        }}>
                          {score}
                        </span>
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: currentAnswer === score ? '#1e40af' : '#374151'
                        }}>
                          {getScaleLabel(score)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={handlePrevious}
                disabled={currentModuleIndex === 0 && currentQuestionIndex === 0}
                style={{
                  background: (currentModuleIndex === 0 && currentQuestionIndex === 0) ? '#f1f5f9' : 'white',
                  border: '2px solid #e2e8f0',
                  color: (currentModuleIndex === 0 && currentQuestionIndex === 0) ? '#9ca3af' : '#374151',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: (currentModuleIndex === 0 && currentQuestionIndex === 0) ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                Anterior
              </button>

              <div style={{
                fontSize: '0.9rem',
                color: '#64748b',
                fontWeight: '500'
              }}>
                {answers.length > 0 && (
                  <span>✓ {answers.length} respondidas</span>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                style={{
                  background: currentAnswer 
                    ? (currentModuleIndex === Object.keys(innovationModules).length - 1 && 
                       currentQuestionIndex === currentModule[1].questions.length - 1
                      ? 'linear-gradient(135deg, #10b981, #047857)' 
                      : 'linear-gradient(135deg, #3b82f6, #1e40af)')
                    : '#94a3b8',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: currentAnswer ? 'pointer' : 'not-allowed',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    Calculando...
                  </>
                ) : currentModuleIndex === Object.keys(innovationModules).length - 1 && 
                    currentQuestionIndex === currentModule[1].questions.length - 1 ? (
                  <>
                    <Target size={16} />
                    Finalizar Test
                  </>
                ) : (
                  <>
                    Siguiente
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Additional Info */}
          {currentModuleIndex === 1 && currentQuestionIndex === 0 && (
            <div style={{
              background: '#fef3c7',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid #f59e0b',
              marginBottom: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                color: '#92400e',
                fontSize: '0.9rem'
              }}>
                <AlertCircle size={16} style={{ marginRight: '0.5rem', marginTop: '0.1rem', flexShrink: 0 }} />
                <div>
                  <strong>Nota sobre Capacidades de Absorción:</strong> Las capacidades de absorción son las capacidades que tiene la organización para realizar los procesos de Adquisición (identificar y adquirir conocimiento generado en el exterior), Asimilación (analizar, procesar, interpretar y comprender la información obtenida de fuentes externas), Transformación (hacer la transferencia y la combinación del conocimiento previo y del nuevo conocimiento adquirido y asimilado) y la Explotación del conocimiento externo.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Results Step
  if (currentStep === 'results' && results) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: isMobile ? '1rem' : '2rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: 0
              }}>
                Resultados del Test de Innovación
              </h1>
              <p style={{
                color: '#64748b',
                fontSize: '1rem',
                margin: '0.5rem 0 0 0'
              }}>
                {results.company_name}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  const exportData = {
                    company: results.company_name,
                    overall_score: results.overall_percentage,
                    level: results.innovation_level.level,
                    module_scores: results.module_scores,
                    recommendations: results.innovation_level.recommendations,
                    timestamp: new Date().toISOString()
                  };
                  
                  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `innovation-test-${results.company_name}-${Date.now()}.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Exportar resultados"
              >
                <Download size={16} />
              </button>
              
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Resultados Test de Innovación',
                      text: `${results.company_name} obtuvo ${results.overall_percentage.toFixed(1)}% en el Test de Innovación Empresarial`,
                      url: window.location.href
                    });
                  }
                }}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Compartir resultados"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Overall Score Card */}
          <div style={{
            background: `linear-gradient(135deg, ${getLevelColor(results.innovation_level.level)}15, ${getLevelColor(results.innovation_level.level)}05)`,
            border: `2px solid ${getLevelColor(results.innovation_level.level)}`,
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: isMobile ? '2.5rem' : '3rem',
              fontWeight: 'bold',
              color: getLevelColor(results.innovation_level.level),
              marginBottom: '1rem'
            }}>
              {results.overall_percentage.toFixed(1)}%
            </div>
            
            <div style={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              {results.innovation_level.level}
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {results.innovation_level.description}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem'
          }}>
            {/* Spider Chart */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Perfil de Innovación
              </h3>
              
              <SpiderChart data={results.module_scores} />
            </div>

            {/* Module Scores */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '1.5rem'
              }}>
                Puntuación por Módulo
              </h3>
              
              {results.module_scores.map((moduleScore, index) => {
                const moduleKey = Object.keys(innovationModules)[index];
                const Icon = getModuleIcon(moduleKey);
                const color = getModuleColor(moduleKey);
                
                return (
                  <div key={index} style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: color,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem'
                      }}>
                        <Icon size={20} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '0.25rem'
                        }}>
                          {moduleScore.module_name}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}>
                          <span style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: color
                          }}>
                            {moduleScore.percentage.toFixed(1)}%
                          </span>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#64748b'
                          }}>
                            ({moduleScore.score}/{moduleScore.max_score} pts)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#e2e8f0',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${moduleScore.percentage}%`,
                        height: '100%',
                        background: color,
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: isMobile ? '1.5rem' : '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            marginTop: '2rem'
          }}>
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
              Recomendaciones para Mejorar
            </h3>
            
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {results.innovation_level.recommendations.map((recommendation, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '1rem',
                  background: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  borderRadius: '12px',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    background: '#0ea5e9',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    marginTop: '0.1rem'
                  }}>
                    {index + 1}
                  </div>
                  <span style={{
                    fontSize: '0.95rem',
                    color: '#0c4a6e',
                    lineHeight: '1.5'
                  }}>
                    {recommendation}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem',
            marginTop: '2rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => {
                setCurrentStep('setup');
                setCompanyName('');
                setAnswers([]);
                setResults(null);
                setCurrentModuleIndex(0);
                setCurrentQuestionIndex(0);
              }}
              style={{
                background: 'white',
                border: '2px solid #e2e8f0',
                color: '#374151',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <RefreshCw size={18} />
              Realizar Nuevo Test
            </button>
            
            <button
              onClick={() => navigate('/analysis')}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              <BarChart3 size={18} />
              Otros Análisis
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InnovationTestScreen;