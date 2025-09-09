// src/screens/analysis/InnovationTestScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building, 
  CheckCircle, 
  Circle, 
  BarChart3, 
  Award,
  Target,
  Lightbulb,
  Download,
  Share2,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  Users,
  Leaf,
  Settings
} from 'lucide-react';
import { createInnovationTestStyles } from '../../styles/innovationTestStyles';

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Create styles with current mobile state
  const styles = createInnovationTestStyles({ isMobile });

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
      <div style={styles.textCenter}>
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
      <div style={styles.container}>
        <div style={styles.maxWidthContainer}>
          {/* Header */}
          <div style={styles.header}>
            <button
              onClick={() => navigate('/analysis')}
              style={styles.backButton}
            >
              <ArrowLeft size={24} />
            </button>
            
            <div>
              <h1 style={styles.headerTitle}>
                Test de Innovación Empresarial
              </h1>
              <p style={styles.headerSubtitle}>
                Cómo evaluar rápidamente su capacidad de innovación
              </p>
            </div>
          </div>

          {/* Setup Card */}
          <div style={styles.card}>
            <div style={styles.textCenter}>
              <div style={styles.setupIcon}>
                <Award size={40} color="white" />
              </div>
              <h2 style={styles.setupTitle}>
                Evalúe su Capacidad de Innovación
              </h2>
              <p style={styles.setupDescription}>
                Este test evalúa tres dimensiones clave de la innovación empresarial mediante preguntas estructuradas
              </p>
            </div>

            {/* Modules Overview */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={styles.modulesTitle}>
                Módulos de Evaluación:
              </h3>
              
              {Object.entries(innovationModules).map(([moduleKey, module]) => {
                const Icon = getModuleIcon(moduleKey);
                const color = getModuleColor(moduleKey);
                
                return (
                  <div key={moduleKey} style={styles.moduleItem(color)}>
                    <div style={styles.moduleIcon(color)}>
                      <Icon size={24} color="white" />
                    </div>
                    <div style={styles.moduleContent}>
                      <h4 style={styles.moduleTitle}>
                        {module.name}
                      </h4>
                      <p style={styles.moduleDescription}>
                        {module.description}
                      </p>
                    </div>
                    <div style={styles.moduleBadge(color)}>
                      {module.questions.length} preguntas
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Company Name Input */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={styles.formLabel}>
                Nombre de la empresa u organización:
              </label>
              <div style={styles.inputContainer}>
                <Building size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ingrese el nombre de su empresa"
                  style={styles.textInput}
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
              style={styles.primaryButton(!!companyName.trim())}
            >
              <Lightbulb size={20} />
              Comenzar Evaluación ({totalQuestions} preguntas)
            </button>

            <div style={styles.warningAlert}>
              <div style={styles.alertContent}>
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
      <div style={styles.container}>
        <div style={styles.maxWidthContainerLarge}>
          {/* Header with Progress */}
          <div style={styles.cardWithMargin}>
            <div style={styles.progressHeader}>
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
            <div style={styles.progressContainer}>
              <div style={styles.progressHeader}>
                <span style={styles.progressLabel}>
                  Progreso General
                </span>
                <span style={styles.progressValue}>
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <div style={styles.progressBar}>
                <div style={styles.progressFill(overallProgress, 'linear-gradient(135deg, #3b82f6, #1e40af)')}></div>
              </div>
            </div>

            {/* Module Progress */}
            <div>
              <div style={styles.progressHeader}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Módulo {currentModuleIndex + 1}: {currentModule[1].name}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>
                  {currentQuestionIndex + 1}/{currentModule[1].questions.length}
                </span>
              </div>
              <div style={styles.moduleProgressBar}>
                <div style={styles.moduleProgressFill(currentModuleProgress)}></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div style={styles.cardWithMargin}>
            {/* Module Info */}
            <div style={styles.moduleInfo(getModuleColor(`modulo${currentModuleIndex + 1}`))}>
              {(() => {
                const Icon = getModuleIcon(`modulo${currentModuleIndex + 1}`);
                return <Icon size={24} color={getModuleColor(`modulo${currentModuleIndex + 1}`)} />;
              })()}
              <div style={{ marginLeft: '1rem' }}>
                <div style={styles.moduleTitle}>
                  {currentModule[1].name}
                </div>
                <div style={styles.moduleDescription}>
                  {currentModule[1].description}
                </div>
              </div>
            </div>

            {/* Question */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={styles.questionNumber}>
                Pregunta {currentQuestionIndex + 1} de {currentModule[1].questions.length}
              </div>
              
              <h2 style={styles.questionText}>
                {currentQuestion.text}
              </h2>

              {/* Answer Options */}
              <div style={styles.answerGrid}>
                {[1, 2, 3, 4].map(score => (
                  <button
                    key={score}
                    onClick={() => handleAnswer(currentQuestion.id, score)}
                    style={styles.answerOption(currentAnswer === score)}
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
                    <div style={styles.answerContent}>
                      <div style={styles.answerHeader}>
                        <span style={styles.answerScore(currentAnswer === score)}>
                          {score}
                        </span>
                        <span style={styles.answerLabel(currentAnswer === score)}>
                          {getScaleLabel(score)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div style={styles.navigation}>
              <button
                onClick={handlePrevious}
                disabled={currentModuleIndex === 0 && currentQuestionIndex === 0}
                style={styles.navButton(!(currentModuleIndex === 0 && currentQuestionIndex === 0))}
              >
                Anterior
              </button>

              <div style={styles.navInfo}>
                {answers.length > 0 && (
                  <span>✓ {answers.length} respondidas</span>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                style={styles.navButton(
                  !!currentAnswer, 
                  currentModuleIndex === Object.keys(innovationModules).length - 1 && 
                  currentQuestionIndex === currentModule[1].questions.length - 1 ? 'success' : 'primary'
                )}
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
            <div style={styles.infoAlert}>
              <div style={styles.infoAlertContent}>
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
      <div style={styles.container}>
        <div style={styles.maxWidthContainerXL}>
          {/* Header */}
          <div style={styles.headerWithJustifyBetween}>
            <div>
              <h1 style={styles.headerTitle}>
                Resultados del Test de Innovación
              </h1>
              <p style={styles.headerSubtitle}>
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
                style={styles.actionButton}
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
                style={styles.actionButton}
                title="Compartir resultados"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Overall Score Card */}
          <div style={styles.overallScoreCard(getLevelColor(results.innovation_level.level))}>
            <div style={styles.overallScore(getLevelColor(results.innovation_level.level))}>
              {results.overall_percentage.toFixed(1)}%
            </div>
            
            <div style={styles.levelTitle}>
              {results.innovation_level.level}
            </div>
            
            <p style={styles.levelDescription}>
              {results.innovation_level.description}
            </p>
          </div>

          <div style={styles.resultsGrid}>
            {/* Spider Chart */}
            <div style={styles.card}>
              <h3 style={{
                ...styles.modulesTitle,
                textAlign: 'center'
              }}>
                Perfil de Innovación
              </h3>
              
              <SpiderChart data={results.module_scores} />
            </div>

            {/* Module Scores */}
            <div style={styles.card}>
              <h3 style={styles.modulesTitle}>
                Puntuación por Módulo
              </h3>
              
              {results.module_scores.map((moduleScore, index) => {
                const moduleKey = Object.keys(innovationModules)[index];
                const Icon = getModuleIcon(moduleKey);
                const color = getModuleColor(moduleKey);
                
                return (
                  <div key={index} style={styles.moduleScoreItem}>
                    <div style={styles.moduleScoreHeader}>
                      <div style={styles.moduleScoreIcon(color)}>
                        <Icon size={20} color="white" />
                      </div>
                      <div style={styles.moduleScoreContent}>
                        <div style={styles.moduleScoreTitle}>
                          {moduleScore.module_name}
                        </div>
                        <div style={styles.moduleScoreValues}>
                          <span style={styles.moduleScorePercentage(color)}>
                            {moduleScore.percentage.toFixed(1)}%
                          </span>
                          <span style={styles.moduleScorePoints}>
                            ({moduleScore.score}/{moduleScore.max_score} pts)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={styles.progressBar}>
                      <div style={styles.progressFill(moduleScore.percentage, color)}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div style={{...styles.card, marginTop: '2rem'}}>
            <h3 style={styles.recommendationsTitle}>
              <Lightbulb size={20} />
              Recomendaciones para Mejorar
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {results.innovation_level.recommendations.map((recommendation, index) => (
                <div key={index} style={styles.recommendationItem}>
                  <div style={styles.recommendationNumber}>
                    {index + 1}
                  </div>
                  <span style={styles.recommendationText}>
                    {recommendation}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={styles.actionsContainer}>
            <button
              onClick={() => {
                setCurrentStep('setup');
                setCompanyName('');
                setAnswers([]);
                setResults(null);
                setCurrentModuleIndex(0);
                setCurrentQuestionIndex(0);
              }}
              style={styles.secondaryButton}
            >
              <RefreshCw size={18} />
              Realizar Nuevo Test
            </button>
            
            <button
              onClick={() => navigate('/analysis')}
              style={{
                ...styles.primaryButton(true),
                width: 'auto',
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