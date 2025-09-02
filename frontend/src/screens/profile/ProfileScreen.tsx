// src/screens/profile/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Briefcase, Calendar, Settings, LogOut, Award, Users, BarChart } from 'lucide-react';
import UserAvatar from '../../components/common/UserAvatar';

interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
  avatar?: string;
  email: string;
  joinDate?: string;
  level?: string;
  xp?: number;
  analysisCount?: number;
  isOnline?: boolean;
}

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Usuarios mock con datos completos
  const mockUsers: User[] = [
    { 
      id: '1', 
      username: 'sergio', 
      password: '123456', 
      name: 'Sergio Arboleda', 
      role: 'Director de Innovación',
      email: 'sergio@cycleai.com',
      joinDate: 'Enero 2024',
      level: 'Tech Analyst III',
      xp: 1250,
      analysisCount: 47,
      isOnline: true
    },
    { 
      id: '2', 
      username: 'maria', 
      password: '123456', 
      name: 'María González', 
      role: 'Analista Senior',
      email: 'maria@cycleai.com',
      joinDate: 'Febrero 2024',
      level: 'Senior Analyst II',
      xp: 980,
      analysisCount: 34,
      isOnline: true
    },
    { 
      id: '3', 
      username: 'carlos', 
      password: '123456', 
      name: 'Carlos Mendez', 
      role: 'Tech Lead',
      email: 'carlos@cycleai.com',
      joinDate: 'Marzo 2024',
      level: 'Lead Developer I',
      xp: 756,
      analysisCount: 28,
      isOnline: false
    },
    { 
      id: '4', 
      username: 'ana', 
      password: '123456', 
      name: 'Ana Rodríguez', 
      role: 'Data Scientist',
      email: 'ana@cycleai.com',
      joinDate: 'Abril 2024',
      level: 'Data Specialist III',
      xp: 1120,
      analysisCount: 52,
      isOnline: true
    },
    {
      id: '5',
      username: 'luis',
      password: '123456',
      name: 'Luis Fernando Castro',
      role: 'UX Designer',
      email: 'luis@cycleai.com',
      joinDate: 'Mayo 2024',
      level: 'Designer II',
      xp: 623,
      analysisCount: 19,
      isOnline: false
    },
    {
      id: '6',
      username: 'sofia',
      password: '123456',
      name: 'Sofía Martínez',
      role: 'Product Manager',
      email: 'sofia@cycleai.com',
      joinDate: 'Junio 2024',
      level: 'Product Lead I',
      xp: 892,
      analysisCount: 31,
      isOnline: true
    }
  ];

  useEffect(() => {
    // Cargar usuario actual (simulado)
    setCurrentUser(mockUsers[0]); // Sergio por defecto
    
    // Combinar usuarios mock con usuarios del localStorage
    const storedUsers = JSON.parse(localStorage.getItem('cycleai_users') || '[]');
    const combinedUsers = [...mockUsers, ...storedUsers];
    setAllUsers(combinedUsers);
  }, []);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const contentStyle: React.CSSProperties = {
    padding: '2rem 1rem',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(25px)',
    borderRadius: '24px',
    padding: '2rem',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    marginBottom: '2rem',
    position: 'relative'
  };

  const backButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '2rem',
    transition: 'color 0.3s ease'
  };

  const userInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '1.5rem',
    flexWrap: 'wrap'
  };

  const detailItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    marginBottom: '1rem',
    color: 'white',
    gap: '1rem'
  };

  const statCardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const userListItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    marginBottom: '0.5rem',
    color: 'white',
    gap: '1rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  if (!currentUser) return <div>Cargando...</div>;

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        
        {/* Header */}
        <div 
          style={backButtonStyle}
          onClick={() => navigate('/menu')}
          onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          <ArrowLeft size={20} style={{marginRight: '0.5rem'}} />
          Volver al menú
        </div>

        {/* Perfil Principal */}
        <div style={cardStyle}>
          {/* Triángulos decorativos */}
          <div style={{
            position: 'absolute', top: '-20px', left: '20px', width: '0', height: '0',
            borderLeft: '18px solid transparent', borderRight: '18px solid transparent',
            borderBottom: '25px solid rgba(6, 182, 212, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute', top: '-20px', right: '20px', width: '0', height: '0',
            borderLeft: '18px solid transparent', borderRight: '18px solid transparent',
            borderBottom: '25px solid rgba(139, 92, 246, 0.4)'
          }}></div>

          <div style={userInfoStyle}>
            <UserAvatar 
              name={currentUser.name}
              avatar={currentUser.avatar}
              size="xl"
              showBorder={true}
              showStatus={true}
            />
            <div style={{flex: 1}}>
              <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', margin: 0, marginBottom: '0.5rem'}}>
                {currentUser.name}
              </h1>
              <p style={{fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 0.5rem 0'}}>
                {currentUser.role}
              </p>
              <p style={{fontSize: '1rem', color: 'rgba(255, 255, 255, 0.5)', margin: 0}}>
                @{currentUser.username}
              </p>
              <div style={{
                background: 'rgba(6, 182, 212, 0.3)',
                color: '#67e8f9',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'inline-block',
                border: '1px solid rgba(103, 232, 249, 0.3)',
                marginTop: '0.75rem'
              }}>
                {currentUser.level || 'Pro Member'}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={statCardStyle}>
              <Award size={24} style={{color: '#f59e0b', marginBottom: '0.5rem'}} />
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'white'}}>
                {currentUser.xp || 0}
              </div>
              <div style={{fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)'}}>
                Puntos XP
              </div>
            </div>
            
            <div style={statCardStyle}>
              <BarChart size={24} style={{color: '#10b981', marginBottom: '0.5rem'}} />
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'white'}}>
                {currentUser.analysisCount || 0}
              </div>
              <div style={{fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)'}}>
                Análisis Realizados
              </div>
            </div>
            
            <div style={statCardStyle}>
              <Users size={24} style={{color: '#8b5cf6', marginBottom: '0.5rem'}} />
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'white'}}>
                #{Math.floor((currentUser.xp || 0) / 100) + 1}
              </div>
              <div style={{fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)'}}>
                Ranking Global
              </div>
            </div>
          </div>

          {/* Detalles del usuario */}
          <div style={detailItemStyle}>
            <Mail size={20} style={{color: '#06b6d4'}} />
            <span>{currentUser.email}</span>
          </div>

          <div style={detailItemStyle}>
            <Briefcase size={20} style={{color: '#8b5cf6'}} />
            <span>{currentUser.role}</span>
          </div>

          <div style={detailItemStyle}>
            <Calendar size={20} style={{color: '#10b981'}} />
            <span>Miembro desde {currentUser.joinDate || 'Enero 2024'}</span>
          </div>
        </div>

        {/* Equipo CycleAI */}
        <div style={cardStyle}>
          <h2 style={{fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
            <Users size={28} style={{marginRight: '0.75rem', color: '#06b6d4'}} />
            Equipo CycleAI
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '0.75rem'
          }}>
            {allUsers.map((user, index) => (
              <div 
                key={user.id || index}
                style={userListItemStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                onClick={() => setCurrentUser(user)}
              >
                <UserAvatar 
                  name={user.name}
                  avatar={user.avatar}
                  size="md"
                  showBorder={true}
                  showStatus={user.isOnline}
                />
                <div style={{flex: 1}}>
                  <div style={{fontWeight: '600', marginBottom: '0.25rem', fontSize: '1rem'}}>
                    {user.name}
                  </div>
                  <div style={{fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.25rem'}}>
                    {user.role}
                  </div>
                  <div style={{fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)'}}>
                    {user.xp || 0} XP • {user.analysisCount || 0} análisis
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {user.level && (
                    <div style={{
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#67e8f9',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      border: '1px solid rgba(103, 232, 249, 0.3)'
                    }}>
                      {user.level}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          <button
            onClick={() => alert('Configuración en desarrollo')}
            style={{
              flex: 1, 
              minWidth: '200px',
              padding: '1rem', 
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.3)', 
              borderRadius: '12px',
              color: 'white', 
              fontWeight: '600', 
              cursor: 'pointer',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Settings size={18} />
            Configuración
          </button>
          
          <button
            onClick={() => navigate('/login')}
            style={{
              flex: 1, 
              minWidth: '200px',
              padding: '1rem', 
              background: 'rgba(239, 68, 68, 0.2)',
              border: '2px solid rgba(239, 68, 68, 0.5)', 
              borderRadius: '12px',
              color: 'white', 
              fontWeight: '600', 
              cursor: 'pointer',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;