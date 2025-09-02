// src/screens/data/DataScreen.tsx - REFACTORIZADO
import React, { useState } from 'react';
import { 
  BarChart3, 
  Clock, 
  Target, 
  Brain, 
  HardDrive,
  User,
  Mail,
  Briefcase
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

interface UsageStats {
  analysisCompleted: number;
  totalTime: string;
  averageAccuracy: number;
  modelsUsed: number;
  storageUsed: number;
  storageTotal: number;
}

interface UserData {
  name: string;
  email: string;
  role: string;
}

const DataScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = window.innerWidth < 768;

  // Mock data
  const usageStats: UsageStats = {
    analysisCompleted: 1247,
    totalTime: "47h 32min",
    averageAccuracy: 94.2,
    modelsUsed: 8,
    storageUsed: 2.4,
    storageTotal: 5.0
  };

  const userData: UserData = {
    name: "Sergio Arboleda",
    email: "sarboleda@cycleai.com",
    role: "Director de Innovación"
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    padding: isMobile ? '1.25rem' : '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  };

  const statItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderBottom: '1px solid #f1f5f9'
  };

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '0.5rem'
  };

  const progressFillStyle = (percentage: number): React.CSSProperties => ({
    width: `${percentage}%`,
    height: '100%',
    background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
    borderRadius: '4px',
    transition: 'width 0.5s ease'
  });

  const storagePercentage = (usageStats.storageUsed / usageStats.storageTotal) * 100;

  return (
    <MainLayout 
      title="Mis Datos"
      searchPlaceholder="Buscar en mis datos..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <h1 style={{
        fontSize: isMobile ? '1.8rem' : '2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '2rem'
      }}>
        Mis datos
      </h1>

      {/* Resumen de Uso */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <BarChart3 size={24} color="#3b82f6" />
          Resumen de Uso
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '0'
        }}>
          <div style={{...statItemStyle, borderRight: isMobile ? 'none' : '1px solid #f1f5f9'}}>
            <div>
              <div style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem'}}>
                Análisis Realizados
              </div>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6'}}>
                {usageStats.analysisCompleted.toLocaleString()}
              </div>
            </div>
            <BarChart3 size={32} color="#3b82f6" />
          </div>

          <div style={{...statItemStyle, paddingLeft: isMobile ? '0' : '1rem'}}>
            <div>
              <div style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem'}}>
                Tiempo Total
              </div>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981'}}>
                {usageStats.totalTime}
              </div>
            </div>
            <Clock size={32} color="#10b981" />
          </div>

          <div style={{...statItemStyle, borderRight: isMobile ? 'none' : '1px solid #f1f5f9', borderTop: '1px solid #f1f5f9'}}>
            <div>
              <div style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem'}}>
                Precisión Promedio
              </div>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b'}}>
                {usageStats.averageAccuracy}%
              </div>
            </div>
            <Target size={32} color="#f59e0b" />
          </div>

          <div style={{...statItemStyle, paddingLeft: isMobile ? '0' : '1rem', borderTop: '1px solid #f1f5f9', borderBottom: 'none'}}>
            <div>
              <div style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem'}}>
                Modelos Utilizados
              </div>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6'}}>
                {usageStats.modelsUsed}
              </div>
            </div>
            <Brain size={32} color="#8b5cf6" />
          </div>
        </div>
      </div>

      {/* Almacenamiento */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <HardDrive size={24} color="#06b6d4" />
          Almacenamiento
        </h2>

        <div style={{marginBottom: '1rem'}}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{color: '#64748b', fontSize: '0.95rem'}}>
              {usageStats.storageUsed} GB de {usageStats.storageTotal} GB utilizados
            </span>
            <span style={{fontSize: '0.9rem', fontWeight: '600', color: '#3b82f6'}}>
              {storagePercentage.toFixed(1)}%
            </span>
          </div>
          <div style={progressBarStyle}>
            <div style={progressFillStyle(storagePercentage)}></div>
          </div>
        </div>

        <div style={{
          background: '#f8fafc',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{color: '#64748b', fontSize: '0.9rem'}}>
            {storagePercentage < 80 
              ? `${((usageStats.storageTotal - usageStats.storageUsed) * 1024).toFixed(0)} MB disponibles • ${(100 - storagePercentage).toFixed(1)}% libre`
              : '⚠️ Espacio de almacenamiento bajo. Considera liberar espacio o actualizar tu plan.'
            }
          </div>
        </div>
      </div>

      {/* Datos Personales */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <User size={24} color="#10b981" />
          Datos Personales
        </h2>

        <div style={{
          background: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{marginBottom: '1rem'}}>
            <div style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem'}}>
              Nombre completo
            </div>
            <div style={{fontSize: '1.1rem', fontWeight: '600', color: '#1e293b'}}>
              {userData.name}
            </div>
          </div>

          <div style={{marginBottom: '1rem'}}>
            <div style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem'}}>
              Correo electrónico
            </div>
            <div style={{fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Mail size={16} color="#64748b" />
              {userData.email}
            </div>
          </div>

          <div>
            <div style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem'}}>
              Cargo
            </div>
            <div style={{fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Briefcase size={16} color="#64748b" />
              {userData.role}
            </div>
          </div>
        </div>

        {/* Botón para editar datos */}
        <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
          <button style={{
            background: 'linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 2rem',
            borderRadius: '50px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(76, 29, 149, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(76, 29, 149, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 29, 149, 0.3)';
          }}
          >
            Editar Información
          </button>
        </div>
      </div>

      {/* Sección adicional: Actividad reciente */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Clock size={24} color="#8b5cf6" />
          Actividad Reciente
        </h2>

        <div style={{
          display: 'grid',
          gap: '0.75rem'
        }}>
          {[
            { action: 'Análisis Hypecycle completado', time: 'Hace 2 horas', color: '#3b82f6' },
            { action: 'Dataset "Agro-Tech" subido', time: 'Hace 5 horas', color: '#10b981' },
            { action: 'Matriz MICMAC ejecutada', time: 'Ayer', color: '#f59e0b' },
            { action: 'Perfil actualizado', time: 'Hace 3 días', color: '#8b5cf6' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.875rem 1rem',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: activity.color
                }}></div>
                <span style={{color: '#1e293b', fontWeight: '500', fontSize: '0.95rem'}}>
                  {activity.action}
                </span>
              </div>
              <span style={{color: '#64748b', fontSize: '0.85rem'}}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DataScreen;