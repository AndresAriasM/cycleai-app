// src/screens/support/SupportScreen.tsx - OPTIMIZADO
import React, { useState, useEffect } from 'react';
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
import { 
  createSupportScreenStyles,
  filterFAQs,
  getSupportOptionColor,
  resourcesConfig,
  infoConfig
} from '../../styles/support/SupportScreenStyles';
import type { 
  SupportOption, 
  FAQ 
} from '../../styles/support/SupportScreenStyles';

const SupportScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Crear estilos basados en si es móvil o no
  const styles = createSupportScreenStyles(isMobile);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock data
  const supportOptions: SupportOption[] = [
    {
      id: 'chat',
      title: 'Chat en Vivo',
      description: 'Respuesta inmediata 24/7',
      icon: MessageCircle,
      color: getSupportOptionColor('chat'),
      action: 'chat'
    },
    {
      id: 'email',
      title: 'Email',
      description: 'support@cycleai.com',
      icon: Mail,
      color: getSupportOptionColor('email'),
      action: 'email'
    },
    {
      id: 'phone',
      title: 'Teléfono',
      description: '+57 1 234-5678',
      icon: Phone,
      color: getSupportOptionColor('phone'),
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

  // Filtrar FAQs
  const filteredFAQs = filterFAQs(faqs, searchQuery);

  // Handlers
  const handleSupportAction = (action: string) => {
    switch (action) {
      case 'chat':
        alert('Iniciando chat en vivo...');
        break;
      case 'email':
        window.open('mailto:support@cycleai.com?subject=Consulta%20CycleAI&body=Hola,%20necesito%20ayuda%20con...');
        break;
      case 'phone':
        alert('Redirigiendo a programar llamada...');
        break;
      default:
        break;
    }
  };

  const handleResourceClick = (resourceId: string) => {
    switch (resourceId) {
      case 'tutorial':
        alert('Tutorial de primeros pasos en desarrollo');
        break;
      case 'knowledge':
        alert('Base de conocimientos completa próximamente');
        break;
      default:
        break;
    }
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    if (type === 'positive') {
      alert('¡Gracias por tu feedback positivo! Nos alegra saber que pudimos ayudarte.');
    } else {
      alert('Gracias por tu feedback. Trabajaremos para mejorar nuestra documentación y soporte.');
    }
  };

  // Componentes
  const PageHeader = () => (
    <div style={styles.pageHeader}>
      <h1 style={styles.pageTitle}>
        Centro de Soporte
      </h1>
      <p style={styles.pageDescription}>
        Encuentra respuestas rápidas, contacta con nuestro equipo o explora recursos de ayuda para aprovechar al máximo CycleAI.
      </p>
    </div>
  );

  const ContactOptions = () => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>
        Contacta con nosotros
      </h2>
      <p style={styles.cardDescription}>
        Nuestro equipo está listo para ayudarte con cualquier pregunta o problema
      </p>

      <div style={styles.contactGrid}>
        {supportOptions.map((option) => {
          const Icon = option.icon;
          const isHovered = hoveredElement === `support-${option.id}`;
          
          return (
            <div
              key={option.id}
              style={{
                ...styles.supportOption,
                borderColor: isHovered ? option.color : `${option.color}20`,
                ...(isHovered ? styles.supportOptionHover : {}),
                boxShadow: isHovered ? `0 12px 30px -5px ${option.color}40` : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => handleSupportAction(option.action)}
              onMouseEnter={() => setHoveredElement(`support-${option.id}`)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div style={styles.supportIcon(option.color)}>
                <Icon size={isMobile ? 28 : 32} />
              </div>
              <h3 style={styles.supportOptionTitle}>
                {option.title}
              </h3>
              <p style={styles.supportOptionDescription}>
                {option.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const HelpResources = () => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>
        Recursos de Ayuda
      </h2>

      <div style={styles.resourcesGrid}>
        {resourcesConfig.map((resource) => {
          const iconMap = { PlayCircle, BookOpen };
          const Icon = iconMap[resource.icon as keyof typeof iconMap];
          const isHovered = hoveredElement === `resource-${resource.id}`;
          
          return (
            <div
              key={resource.id}
              style={{
                ...styles.resourceItem(resource.gradientColors, resource.borderColor),
                ...(isHovered ? styles.resourceItemHover : {}),
                boxShadow: isHovered ? `0 8px 25px ${resource.borderColor}30` : 'none'
              }}
              onClick={() => handleResourceClick(resource.id)}
              onMouseEnter={() => setHoveredElement(`resource-${resource.id}`)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div style={styles.resourceContent}>
                <div style={styles.resourceIcon(resource.iconGradient)}>
                  <Icon size={24} />
                </div>
                <div style={styles.resourceInfo}>
                  <h4 style={styles.resourceTitle}>
                    {resource.title}
                  </h4>
                  <p style={styles.resourceDescription}>
                    {resource.description}
                  </p>
                </div>
              </div>
              <ChevronRight size={20} color="#64748b" />
            </div>
          );
        })}
      </div>
    </div>
  );

  const FrequentlyAskedQuestions = () => (
    <div style={styles.card}>
      <div style={styles.faqHeader}>
        <div style={styles.faqHeaderContent}>
          <h2 style={styles.faqTitle}>
            Preguntas Frecuentes
          </h2>
          <p style={styles.faqCount}>
            {filteredFAQs.length} de {faqs.length} preguntas
          </p>
        </div>
        
        <div style={styles.faqSearchContainer}>
          <Search size={20} style={{
            position: 'absolute',
            left: isMobile ? '0.75rem' : '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
          }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en preguntas frecuentes..."
            style={styles.faqSearchInput}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>
      </div>

      <div style={styles.faqList}>
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedFAQ === faq.id;
            const isHovered = hoveredElement === `faq-${faq.id}`;
            
            return (
              <div key={faq.id} style={styles.faqItem(isExpanded)}>
                <div
                  style={{
                    ...styles.faqQuestion(isExpanded),
                    ...(isHovered && !isExpanded ? styles.faqQuestionHover(isExpanded) : {})
                  }}
                  onClick={() => setExpandedFAQ(isExpanded ? null : faq.id)}
                  onMouseEnter={() => setHoveredElement(`faq-${faq.id}`)}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div style={styles.faqQuestionContent}>
                    <span style={{ fontSize: isMobile ? '0.95rem' : '1.05rem' }}>
                      {faq.question}
                    </span>
                    <div style={styles.faqCategory}>
                      {faq.category}
                    </div>
                  </div>
                  <div style={styles.faqChevron(isExpanded)}>
                    <ChevronRight size={20} color={isExpanded ? '#3b82f6' : '#64748b'} />
                  </div>
                </div>
                {isExpanded && (
                  <div style={styles.faqAnswer}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div style={styles.emptyState}>
            <Search size={64} style={styles.emptyStateIcon} />
            <h3 style={styles.emptyStateTitle}>
              No se encontraron resultados
            </h3>
            <p style={styles.emptyStateDescription}>
              Intenta con otros términos de búsqueda o contacta con soporte
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const ContactInformation = () => (
    <div style={styles.infoGrid}>
      {infoConfig.map((info) => {
        const iconMap = { Clock, MessageCircle };
        const Icon = iconMap[info.icon as keyof typeof iconMap];
        
        return (
          <div
            key={info.id}
            style={styles.infoCard(info.gradientColors, info.borderColor)}
          >
            <h3 style={styles.infoTitle}>
              <Icon size={22} color={info.iconColor} />
              {info.title}
            </h3>
            <div style={styles.infoContent}>
              {info.items.map((item, index) => (
                <div key={index} style={styles.infoItem}>
                  <span style={styles.infoLabel}>{item.label}</span>
                  <br />
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const FeedbackSection = () => (
    <div style={styles.card}>
      <div style={styles.feedbackSection}>
        <h2 style={styles.feedbackTitle}>
          ¿Te fue útil esta información?
        </h2>
        <p style={styles.feedbackDescription}>
          Tu feedback nos ayuda a mejorar continuamente nuestro centro de soporte
        </p>
        
        <div style={styles.feedbackButtons}>
          <button
            style={{
              ...styles.feedbackButton('positive'),
              ...(hoveredElement === 'feedback-positive' ? styles.feedbackButtonHover('positive') : {})
            }}
            onClick={() => handleFeedback('positive')}
            onMouseEnter={() => setHoveredElement('feedback-positive')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            👍 Sí, me ayudó
          </button>
          
          <button
            style={{
              ...styles.feedbackButton('negative'),
              ...(hoveredElement === 'feedback-negative' ? styles.feedbackButtonHover('negative') : {})
            }}
            onClick={() => handleFeedback('negative')}
            onMouseEnter={() => setHoveredElement('feedback-negative')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            👎 Necesita mejoras
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout 
      title="Soporte"
      searchPlaceholder="Buscar ayuda..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <PageHeader />
      <ContactOptions />
      <HelpResources />
      <FrequentlyAskedQuestions />
      <ContactInformation />
      <FeedbackSection />
    </MainLayout>
  );
};

export default SupportScreen;