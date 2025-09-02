// src/screens/support/SupportScreen.tsx - REFACTORIZADO
import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  BookOpen, 
  ChevronRight,
  Search,
  PlayCircle,
  Clock
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  action: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const SupportScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const isMobile = window.innerWidth < 768;

  // Mock data
  const supportOptions: SupportOption[] = [
    {
      id: 'chat',
      title: 'Chat en Vivo',
      description: 'Respuesta inmediata 24/7',
      icon: MessageCircle,
      color: '#3b82f6',
      action: 'chat'
    },
    {
      id: 'email',
      title: 'Email',
      description: 'support@cycleai.com',
      icon: Mail,
      color: '#10b981',
      action: 'email'
    },
    {
      id: 'phone',
      title: 'Teléfono',
      description: '+57 1 234-5678',
      icon: Phone,
      color: '#8b5cf6',
      action: 'phone'
    }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: '¿Cómo empiezo mi primer análisis?',
      answer: 'Para comenzar tu primer análisis, ve a la sección "Análisis" desde el menú principal. Selecciona el tipo de análisis que deseas realizar (como Hype Cycle), ingresa los términos de búsqueda relacionados con tu tecnología y haz clic en "Analizar". El sistema te guiará paso a paso para configurar los parámetros necesarios.',
      category: 'Primeros Pasos'
    },
    {
      id: '2',
      question: '¿Qué tipos de análisis están disponibles?',
      answer: 'CycleAI ofrece varios tipos de análisis incluyendo: Hype Cycle de Gartner, Matriz MICMAC, Curvas en S, Método MACTUN, Análisis de Tendencias, Matrices de Impacto, y Predicciones de Mercado. Cada tipo de análisis está diseñado para diferentes necesidades de investigación e innovación tecnológica.',
      category: 'Funcionalidades'
    },
    {
      id: '3',
      question: '¿Cómo puedo mejorar la precisión de mis análisis?',
      answer: 'Para mejorar la precisión: 1) Usa términos de búsqueda específicos y relevantes al sector, 2) Combina múltiples palabras clave con operadores AND/OR, 3) Ajusta el rango de años según tu necesidad, 4) Revisa y refina los resultados iterativamente, 5) Utiliza fuentes de datos confiables y actualizadas.',
      category: 'Mejores Prácticas'
    },
    {
      id: '4',
      question: '¿Puedo exportar mis resultados?',
      answer: 'Sí, puedes exportar tus análisis en varios formatos incluyendo PDF, Excel, PowerPoint y CSV. Ve a la sección de resultados y busca el botón "Exportar" en la esquina superior derecha. También puedes programar reportes automáticos periódicos.',
      category: 'Funcionalidades'
    },
    {
      id: '5',
      question: '¿Cómo gestiono mis créditos de análisis e IA?',
      answer: 'Tus créditos se muestran en el panel principal. Los créditos de análisis se renuevan mensualmente según tu plan. Para ver el detalle de consumo, ve a "Mis Datos" > "Resumen de Uso". Si necesitas más créditos, puedes actualizar tu plan desde el perfil de usuario.',
      category: 'Cuenta y Facturación'
    },
    {
      id: '6',
      question: '¿Puedo colaborar con mi equipo en los análisis?',
      answer: 'Con el plan Pro puedes compartir análisis con tu equipo y colaborar en tiempo real. Ve a "Gestión" > "Usuarios" para invitar miembros del equipo y asignar permisos. Los análisis compartidos aparecen en la sección "Compartidos conmigo".',
      category: 'Colaboración'
    }
  ];

  const handleSupportAction = (action: string) => {
    switch (action) {
      case 'chat':
        // En producción, abrir widget de chat
        alert('Iniciando chat en vivo...');
        break;
      case 'email':
        window.open('mailto:support@cycleai.com?subject=Consulta%20CycleAI&body=Hola,%20necesito%20ayuda%20con...');
        break;
      case 'phone':
        // En producción, abrir calendario de citas
        alert('Redirigiendo a programar llamada...');
        break;
      default:
        break;
    }
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePositiveFeedback = () => {
    alert('¡Gracias por tu feedback positivo! Nos alegra saber que pudimos ayudarte.');
  };

  const handleNegativeFeedback = () => {
    alert('Gracias por tu feedback. Trabajaremos para mejorar nuestra documentación y soporte.');
  };

  const handleFirstSteps = () => {
    // En producción, navegar a tutorial interactivo
    alert('Tutorial de primeros pasos en desarrollo');
  };

  const handleKnowledgeBase = () => {
    // En producción, abrir base de conocimientos
    alert('Base de conocimientos completa próximamente');
  };

  // Estilos
  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  };

  const supportOptionStyle = (color: string): React.CSSProperties => ({
    background: 'white',
    border: `2px solid ${color}20`,
    borderRadius: '12px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    height: '100%'
  });

  const faqItemStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    marginBottom: '0.75rem',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  };

  const faqQuestionStyle: React.CSSProperties = {
    padding: '1.25rem',
    cursor: 'pointer',
    background: '#f8fafc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    transition: 'background 0.3s ease'
  };

  const faqAnswerStyle: React.CSSProperties = {
    padding: '1.25rem',
    background: 'white',
    color: '#64748b',
    lineHeight: '1.7',
    borderTop: '1px solid #e2e8f0',
    fontSize: '0.95rem'
  };

  return (
    <MainLayout 
      title="Soporte"
      searchPlaceholder="Buscar ayuda..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <div style={{marginBottom: '2rem'}}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '2.5rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '0.75rem'
        }}>
          Centro de Soporte
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#64748b',
          lineHeight: '1.6',
          maxWidth: '600px'
        }}>
          Encuentra respuestas rápidas, contacta con nuestro equipo o explora recursos de ayuda para aprovechar al máximo CycleAI.
        </p>
      </div>

      {/* Opciones de Contacto */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '0.5rem'
        }}>
          Contacta con nosotros
        </h2>
        <p style={{
          color: '#64748b',
          marginBottom: '1.5rem',
          fontSize: '1rem'
        }}>
          Nuestro equipo está listo para ayudarte con cualquier pregunta o problema
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          {supportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                style={supportOptionStyle(option.color)}
                onClick={() => handleSupportAction(option.action)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 30px -5px ${option.color}40`;
                  e.currentTarget.style.borderColor = option.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = `${option.color}20`;
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${option.color}, ${option.color}dd)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: 'white',
                  boxShadow: `0 8px 20px -5px ${option.color}40`
                }}>
                  <Icon size={32} />
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '0.5rem'
                }}>
                  {option.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  margin: 0
                }}>
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recursos de Ayuda */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '1.5rem'
        }}>
          Recursos de Ayuda
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid #0ea5e9'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(14, 165, 233, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onClick={handleFirstSteps}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <PlayCircle size={24} />
              </div>
              <div>
                <h4 style={{fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', margin: 0}}>
                  Primeros Pasos
                </h4>
                <p style={{fontSize: '0.9rem', color: '#64748b', margin: '0.25rem 0 0 0'}}>
                  Tutorial interactivo para nuevos usuarios
                </p>
              </div>
            </div>
            <ChevronRight size={20} color="#64748b" />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid #22c55e'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onClick={handleKnowledgeBase}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <BookOpen size={24} />
              </div>
              <div>
                <h4 style={{fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', margin: 0}}>
                  Base de Conocimientos
                </h4>
                <p style={{fontSize: '0.9rem', color: '#64748b', margin: '0.25rem 0 0 0'}}>
                  Documentación completa y guías detalladas
                </p>
              </div>
            </div>
            <ChevronRight size={20} color="#64748b" />
          </div>
        </div>
      </div>

      {/* Preguntas Frecuentes */}
      <div style={cardStyle}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: 0,
              marginBottom: '0.25rem'
            }}>
              Preguntas Frecuentes
            </h2>
            <p style={{
              color: '#64748b',
              fontSize: '0.95rem',
              margin: 0
            }}>
              {filteredFAQs.length} de {faqs.length} preguntas
            </p>
          </div>
          
          <div style={{position: 'relative', minWidth: isMobile ? '100%' : '320px'}}>
            <Search size={20} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en preguntas frecuentes..."
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3.5rem',
                border: '2px solid #e2e8f0',
                borderRadius: '50px',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                background: '#f8fafc'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        <div>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div key={faq.id} style={{
                ...faqItemStyle,
                border: expandedFAQ === faq.id ? '2px solid #3b82f6' : '1px solid #e2e8f0'
              }}>
                <div
                  style={{
                    ...faqQuestionStyle,
                    background: expandedFAQ === faq.id ? '#f0f9ff' : '#f8fafc'
                  }}
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  onMouseEnter={(e) => {
                    if (expandedFAQ !== faq.id) {
                      e.currentTarget.style.background = '#f1f5f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (expandedFAQ !== faq.id) {
                      e.currentTarget.style.background = '#f8fafc';
                    }
                  }}
                >
                  <div style={{flex: 1}}>
                    <span style={{fontSize: '1.05rem'}}>{faq.question}</span>
                    <div style={{
                      marginTop: '0.5rem',
                      fontSize: '0.8rem',
                      color: '#3b82f6',
                      fontWeight: '500'
                    }}>
                      {faq.category}
                    </div>
                  </div>
                  <div style={{
                    transform: expandedFAQ === faq.id ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    marginLeft: '1rem'
                  }}>
                    <ChevronRight size={20} color={expandedFAQ === faq.id ? '#3b82f6' : '#64748b'} />
                  </div>
                </div>
                {expandedFAQ === faq.id && (
                  <div style={faqAnswerStyle}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#64748b'
            }}>
              <Search size={64} style={{margin: '0 auto 1.5rem', opacity: 0.5}} />
              <h3 style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151'}}>
                No se encontraron resultados
              </h3>
              <p style={{fontSize: '1rem'}}>
                Intenta con otros términos de búsqueda o contacta con soporte
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Información de Contacto */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          ...cardStyle,
          background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
          border: '1px solid #0ea5e9'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Clock size={22} color="#0ea5e9" />
            Horarios de Atención
          </h3>
          <div style={{color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6'}}>
            <div style={{marginBottom: '0.75rem'}}>
              <strong style={{color: '#1e293b'}}>Lunes a Viernes:</strong><br />
              8:00 AM - 6:00 PM (COT)
            </div>
            <div style={{marginBottom: '0.75rem'}}>
              <strong style={{color: '#1e293b'}}>Sábados:</strong><br />
              9:00 AM - 2:00 PM (COT)
            </div>
            <div>
              <strong style={{color: '#1e293b'}}>Chat en vivo:</strong><br />
              24/7 disponible
            </div>
          </div>
        </div>

        <div style={{
          ...cardStyle,
          background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
          border: '1px solid #22c55e'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <MessageCircle size={22} color="#22c55e" />
            Tiempo de Respuesta
          </h3>
          <div style={{color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6'}}>
            <div style={{marginBottom: '0.75rem'}}>
              <strong style={{color: '#1e293b'}}>Chat en vivo:</strong><br />
              Respuesta inmediata
            </div>
            <div style={{marginBottom: '0.75rem'}}>
              <strong style={{color: '#1e293b'}}>Email:</strong><br />
              2-4 horas hábiles
            </div>
            <div>
              <strong style={{color: '#1e293b'}}>Llamada:</strong><br />
              Cita programada disponible
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div style={cardStyle}>
        <div style={{textAlign: 'center'}}>
          <h2 style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            ¿Te fue útil esta información?
          </h2>
          <p style={{
            color: '#64748b',
            marginBottom: '2rem',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '0 auto 2rem'
          }}>
            Tu feedback nos ayuda a mejorar continuamente nuestro centro de soporte
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handlePositiveFeedback}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '0.875rem 2rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
              }}
            >
              👍 Sí, me ayudó
            </button>
            
            <button
              onClick={handleNegativeFeedback}
              style={{
                background: '#f8fafc',
                color: '#374151',
                border: '2px solid #e2e8f0',
                padding: '0.875rem 2rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              👎 Necesita mejoras
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SupportScreen;