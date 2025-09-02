// src/screens/menu/MenuScreen.tsx - REFACTORIZADO
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Brain, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

interface User {
  id: string;
  name: string;
  role: string;
  level: string;
  xp: number;
  maxXp: number;
  streak: number;
  analysisCredits: number;
  maxAnalysisCredits: number;
  aiCredits: number;
  maxAiCredits: number;
  avatar?: string;
}

interface Category {
  name: string;
  shortName?: string;
  analysisCount: number;
  color: string;
  isFrequent?: boolean;
}

const MenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = window.innerWidth < 768;

  // Mock data con avatar realista
  const currentUser: User = {
    id: '1',
    name: 'Sergio Arboleda',
    role: 'Dir Innovación',
    level: 'Tech Analyst III',
    xp: 340,
    maxXp: 500,
    streak: 5,
    analysisCredits: 362,
    maxAnalysisCredits: 500,
    aiCredits: 101,
    maxAiCredits: 200,
    avatar: '/src/assets/users/sergio.jpg'
  };

  const frequentCategories: Category[] = [
    { name: 'Hypecycle Gartner', shortName: 'Hypecycle', analysisCount: 0, color: '#8b5cf6', isFrequent: true },
    { name: 'Matriz MICMAC', shortName: 'MICMAC', analysisCount: 0, color: '#06b6d4', isFrequent: true },
    { name: 'Curvas en S', shortName: 'Curvas', analysisCount: 0, color: '#3b82f6', isFrequent: true },
    { name: 'Método MACTUN', shortName: 'MACTUN', analysisCount: 0, color: '#10b981', isFrequent: true }
  ];

  const savedCategories: Category[] = [
    { name: 'Agroindustry', analysisCount: 4, color: '#f59e0b' },
    { name: 'Artificial Intelligence', analysisCount: 16, color: '#ef4444' },
    { name: 'Education', analysisCount: 7, color: '#8b5cf6' }
  ];

  const welcomeCardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)',
    borderRadius: '20px',
    padding: isMobile ? '1.5rem' : '2rem',
    marginBottom: '1.5rem',
    color: 'white',
    boxShadow: '0 8px 32px rgba(76, 29, 149, 0.3)'
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  };

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '3px',
    overflow: 'hidden'
  };

  const progressFillStyle = (progress: number, color: string): React.CSSProperties => ({
    width: `${progress}%`,
    height: '100%',
    backgroundColor: color,
    borderRadius: '3px',
    transition: 'width 0.5s ease'
  });

  const categoryCircleStyle = (color: string): React.CSSProperties => ({
    width: isMobile ? '80px' : '100px',
    height: isMobile ? '80px' : '100px',
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: isMobile ? '0.75rem' : '0.85rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease',
    padding: '0.5rem'
  });

  return (
    <MainLayout 
      title="CycleAI"
      searchPlaceholder="¿Qué buscas hoy?"
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {/* Welcome Card */}
      <div style={welcomeCardStyle}>
        <h2 style={{
          fontSize: isMobile ? '1.5rem' : '1.8rem', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          lineHeight: '1.2'
        }}>
          Buenos días, {currentUser.name.split(' ')[0]}
        </h2>
        
        <div style={{marginBottom: '1.5rem'}}>
          <h3 style={{
            fontSize: isMobile ? '1rem' : '1.2rem', 
            marginBottom: '1rem',
            fontWeight: '600',
            opacity: 0.9
          }}>
            Créditos Disponibles
          </h3>
          
          <div style={{
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
            gap: '1rem', 
            marginBottom: '1rem'
          }}>
            <div>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <BarChart3 size={18} style={{marginRight: '0.5rem'}} />
                <span style={{fontSize: '0.9rem'}}>
                  Análisis {currentUser.analysisCredits}/{currentUser.maxAnalysisCredits}
                </span>
              </div>
              <div style={progressBarStyle}>
                <div style={progressFillStyle(72, '#10b981')}></div>
              </div>
            </div>
            
            <div>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <Brain size={18} style={{marginRight: '0.5rem'}} />
                <span style={{fontSize: '0.9rem'}}>
                  IA: {currentUser.aiCredits}/{currentUser.maxAiCredits}
                </span>
              </div>
              <div style={progressBarStyle}>
                <div style={progressFillStyle(50, '#f59e0b')}></div>
              </div>
            </div>
          </div>

          {!isMobile && (
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '0.6rem 1.25rem',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}>
              Mejorar plan
            </button>
          )}
        </div>

        <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.75rem' : '0',
          marginBottom: '1rem'
        }}>
          <div>
            <div style={{fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem'}}>
              Nivel: {currentUser.level}
            </div>
            <div style={{fontSize: '0.85rem', opacity: 0.8}}>
              Racha: {currentUser.streak} días 🔥😎
            </div>
          </div>
          <div style={{fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight: 'bold'}}>
            XP: {currentUser.xp} puntos
          </div>
        </div>

        <div style={progressBarStyle}>
          <div style={progressFillStyle(68, '#67e8f9')}></div>
        </div>
      </div>

      {/* Categorías Frecuentes */}
      <div style={cardStyle}>
        <h3 style={{
          fontSize: isMobile ? '1.15rem' : '1.3rem', 
          fontWeight: 'bold', 
          marginBottom: '1.25rem', 
          color: '#1e293b'
        }}>
          Categorías Frecuentes
        </h3>
        
        <div style={{
          display: 'grid', 
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
          gap: isMobile ? '1rem' : '1.5rem',
          justifyItems: 'center'
        }}>
          {frequentCategories.map((category, index) => (
            <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div 
                style={categoryCircleStyle(category.color)}
                onClick={() => navigate('/analysis', { state: { selectedCategory: category } })}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {category.shortName || category.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categorías Guardadas */}
      <div style={cardStyle}>
        <h3 style={{
          fontSize: isMobile ? '1.15rem' : '1.3rem', 
          fontWeight: 'bold', 
          marginBottom: '1.25rem', 
          color: '#1e293b'
        }}>
          Categorías Guardadas
        </h3>
        
        {savedCategories.map((category, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
            marginBottom: '0.75rem',
            background: '#f8fafc',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            border: '1px solid #e2e8f0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e2e8f0';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <span style={{
              fontWeight: '500', 
              color: '#1e293b', 
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>
              {category.name}
            </span>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <span style={{
                background: category.color,
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {category.analysisCount} análisis
              </span>
              <ChevronRight size={18} color="#64748b" />
            </div>
          </div>
        ))}
      </div>

      {/* Populares */}
      <div style={cardStyle}>
        <h3 style={{
          fontSize: isMobile ? '1.15rem' : '1.3rem', 
          fontWeight: 'bold', 
          marginBottom: '1.25rem', 
          color: '#1e293b'
        }}>
          Populares
        </h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '1rem' : '1.25rem',
          background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
          borderRadius: '12px',
          cursor: 'pointer',
          border: '1px solid #f59e0b',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{fontSize: '1.5rem', marginRight: '0.75rem'}}>🔥</span>
            <div>
              <div style={{
                fontWeight: 'bold', 
                color: '#92400e', 
                fontSize: isMobile ? '0.95rem' : '1rem'
              }}>
                AI + Robot + Agro
              </div>
              <div style={{fontSize: '0.85rem', color: '#b45309'}}>Hypecycle</div>
            </div>
          </div>
          <ChevronRight size={20} color="#92400e" />
        </div>
      </div>
    </MainLayout>
  );
};

export default MenuScreen;