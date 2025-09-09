// src/screens/profile/ProfileScreen.tsx - OPTIMIZADO
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Briefcase, Calendar, Settings, LogOut, Award, Users, BarChart } from 'lucide-react';
import UserAvatar from '../../components/common/UserAvatar';
import { 
  createProfileScreenStyles,
  calculateRanking,
  getStatColor
} from '../../styles/profile/ProfileScreenStyles';
import type { User } from '../../styles/profile/ProfileScreenStyles';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Crear estilos basados en si es móvil o no
  const styles = createProfileScreenStyles(isMobile);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Handlers
  const handleBackClick = () => {
    navigate('/menu');
  };

  const handleUserClick = (user: User) => {
    setCurrentUser(user);
  };

  const handleSettingsClick = () => {
    alert('Configuración en desarrollo');
  };

  const handleLogoutClick = () => {
    navigate('/login');
  };

  // Componentes
  const BackButton = () => (
    <div 
      style={{
        ...styles.backButton,
        ...(hoveredElement === 'back' ? styles.backButtonHover : {})
      }}
      onClick={handleBackClick}
      onMouseEnter={() => setHoveredElement('back')}
      onMouseLeave={() => setHoveredElement(null)}
    >
      <ArrowLeft size={20} />
      Volver al menú
    </div>
  );

  const UserProfileCard = () => {
    if (!currentUser) return null;

    const ranking = calculateRanking(currentUser.xp || 0);

    return (
      <div style={styles.card}>
        {/* Triángulos decorativos */}
        <div style={styles.decorativeTriangleLeft}></div>
        <div style={styles.decorativeTriangleRight}></div>

        <div style={styles.userInfo}>
          <UserAvatar 
            name={currentUser.name}
            avatar={currentUser.avatar}
            size="xl"
            showBorder={true}
            showStatus={true}
          />
          <div style={styles.userDetails}>
            <h1 style={styles.userName}>
              {currentUser.name}
            </h1>
            <p style={styles.userRole}>
              {currentUser.role}
            </p>
            <p style={styles.username}>
              @{currentUser.username}
            </p>
            <div style={styles.levelBadge}>
              {currentUser.level || 'Pro Member'}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <Award size={24} style={{...styles.statIcon, color: getStatColor('xp')}} />
            <div style={styles.statValue}>
              {currentUser.xp || 0}
            </div>
            <div style={styles.statLabel}>
              Puntos XP
            </div>
          </div>
          
          <div style={styles.statCard}>
            <BarChart size={24} style={{...styles.statIcon, color: getStatColor('analysis')}} />
            <div style={styles.statValue}>
              {currentUser.analysisCount || 0}
            </div>
            <div style={styles.statLabel}>
              Análisis Realizados
            </div>
          </div>
          
          <div style={styles.statCard}>
            <Users size={24} style={{...styles.statIcon, color: getStatColor('ranking')}} />
            <div style={styles.statValue}>
              #{ranking}
            </div>
            <div style={styles.statLabel}>
              Ranking Global
            </div>
          </div>
        </div>

        {/* Detalles del usuario */}
        <div style={styles.detailItem}>
          <Mail size={20} style={{...styles.detailIcon, color: '#06b6d4'}} />
          <span>{currentUser.email}</span>
        </div>

        <div style={styles.detailItem}>
          <Briefcase size={20} style={{...styles.detailIcon, color: '#8b5cf6'}} />
          <span>{currentUser.role}</span>
        </div>

        <div style={styles.detailItem}>
          <Calendar size={20} style={{...styles.detailIcon, color: '#10b981'}} />
          <span>Miembro desde {currentUser.joinDate || 'Enero 2024'}</span>
        </div>
      </div>
    );
  };

  const TeamSection = () => (
    <div style={styles.card}>
      <h2 style={styles.teamTitle}>
        <Users size={isMobile ? 24 : 28} style={{color: '#06b6d4'}} />
        Equipo CycleAI
      </h2>

      <div style={styles.teamGrid}>
        {allUsers.map((user, index) => (
          <div 
            key={user.id || index}
            style={{
              ...styles.teamMember,
              ...(hoveredElement === `team-${user.id}` ? styles.teamMemberHover : {})
            }}
            onMouseEnter={() => setHoveredElement(`team-${user.id}`)}
            onMouseLeave={() => setHoveredElement(null)}
            onClick={() => handleUserClick(user)}
          >
            <UserAvatar 
              name={user.name}
              avatar={user.avatar}
              size="md"
              showBorder={true}
              showStatus={user.isOnline}
            />
            <div style={styles.teamMemberInfo}>
              <div style={styles.teamMemberName}>
                {user.name}
              </div>
              <div style={styles.teamMemberRole}>
                {user.role}
              </div>
              <div style={styles.teamMemberStats}>
                {user.xp || 0} XP • {user.analysisCount || 0} análisis
              </div>
            </div>
            <div>
              {user.level && (
                <div style={styles.teamMemberBadge}>
                  {user.level}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ActionButtons = () => (
    <div style={styles.actionsContainer}>
      <button
        style={{
          ...styles.actionButton('settings'),
          ...(hoveredElement === 'settings' ? styles.actionButtonHover('settings') : {})
        }}
        onClick={handleSettingsClick}
        onMouseEnter={() => setHoveredElement('settings')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <Settings size={18} />
        Configuración
      </button>
      
      <button
        style={{
          ...styles.actionButton('logout'),
          ...(hoveredElement === 'logout' ? styles.actionButtonHover('logout') : {})
        }}
        onClick={handleLogoutClick}
        onMouseEnter={() => setHoveredElement('logout')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <LogOut size={18} />
        Cerrar Sesión
      </button>
    </div>
  );

  if (!currentUser) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={{color: 'white', textAlign: 'center', padding: '2rem'}}>
            Cargando...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <BackButton />
        <UserProfileCard />
        <TeamSection />
        <ActionButtons />
      </div>
    </div>
  );
};

export default ProfileScreen;