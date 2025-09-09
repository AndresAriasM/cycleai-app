// src/screens/data/DataScreen.tsx - OPTIMIZADO
import React, { useState, useEffect } from 'react';
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
import { 
  createDataScreenStyles, 
  getStatColor, 
  isStorageLow 
} from '../../styles/data/DataScreenStyles';

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

interface ActivityItem {
  action: string;
  time: string;
  color: string;
}

const DataScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Crear estilos basados en si es móvil o no
  const styles = createDataScreenStyles(isMobile);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const activityItems: ActivityItem[] = [
    { action: 'Análisis Hypecycle completado', time: 'Hace 2 horas', color: '#3b82f6' },
    { action: 'Dataset "Agro-Tech" subido', time: 'Hace 5 horas', color: '#10b981' },
    { action: 'Matriz MICMAC ejecutada', time: 'Ayer', color: '#f59e0b' },
    { action: 'Perfil actualizado', time: 'Hace 3 días', color: '#8b5cf6' }
  ];

  // Cálculos
  const storagePercentage = (usageStats.storageUsed / usageStats.storageTotal) * 100;
  const storageLow = isStorageLow(usageStats.storageUsed, usageStats.storageTotal);

  // Estadísticas con configuración
  const statsConfig = [
    {
      label: 'Análisis Realizados',
      value: usageStats.analysisCompleted.toLocaleString(),
      color: getStatColor('analysis'),
      icon: BarChart3
    },
    {
      label: 'Tiempo Total',
      value: usageStats.totalTime,
      color: getStatColor('time'),
      icon: Clock
    },
    {
      label: 'Precisión Promedio',
      value: `${usageStats.averageAccuracy}%`,
      color: getStatColor('accuracy'),
      icon: Target
    },
    {
      label: 'Modelos Utilizados',
      value: usageStats.modelsUsed.toString(),
      color: getStatColor('models'),
      icon: Brain
    }
  ];

  const renderUsageStats = () => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>
        <BarChart3 size={isMobile ? 20 : 24} color="#3b82f6" />
        Resumen de Uso
      </h2>

      <div style={styles.statsGrid}>
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;
          let position: 'topRight' | 'bottomLeft' | 'bottomRight' | undefined;
          
          if (!isMobile) {
            if (index === 1) position = 'topRight';
            else if (index === 2) position = 'bottomLeft';
            else if (index === 3) position = 'bottomRight';
          }

          return (
            <div key={index} style={styles.statItem(isMobile, position)}>
              <div>
                <div style={styles.statLabel}>
                  {stat.label}
                </div>
                <div style={styles.statValue(stat.color)}>
                  {stat.value}
                </div>
              </div>
              <div style={styles.statIcon}>
                <Icon size={isMobile ? 28 : 32} color={stat.color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStorageInfo = () => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>
        <HardDrive size={isMobile ? 20 : 24} color="#06b6d4" />
        Almacenamiento
      </h2>

      <div style={{marginBottom: '1rem'}}>
        <div style={styles.storageInfo}>
          <span style={styles.statLabel}>
            {usageStats.storageUsed} GB de {usageStats.storageTotal} GB utilizados
          </span>
          <span style={styles.storagePercentage}>
            {storagePercentage.toFixed(1)}%
          </span>
        </div>
        <div style={styles.progressBar}>
          <div style={styles.progressFill(storagePercentage)}></div>
        </div>
      </div>

      <div style={styles.storageAlert}>
        {storageLow 
          ? '⚠️ Espacio de almacenamiento bajo. Considera liberar espacio o actualizar tu plan.'
          : `${((usageStats.storageTotal - usageStats.storageUsed) * 1024).toFixed(0)} MB disponibles • ${(100 - storagePercentage).toFixed(1)}% libre`
        }
      </div>
    </div>
  );

  const renderPersonalData = () => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>
        <User size={isMobile ? 20 : 24} color="#10b981" />
        Datos Personales
      </h2>

      <div style={styles.personalDataContainer}>
        <div style={styles.dataField}>
          <div style={styles.dataLabel}>
            Nombre completo
          </div>
          <div style={styles.dataValue}>
            {userData.name}
          </div>
        </div>

        <div style={styles.dataField}>
          <div style={styles.dataLabel}>
            Correo electrónico
          </div>
          <div style={styles.dataValueWithIcon}>
            <Mail size={16} color="#64748b" />
            {userData.email}
          </div>
        </div>

        <div style={{...styles.dataField, marginBottom: 0}}>
          <div style={styles.dataLabel}>
            Cargo
          </div>
          <div style={styles.dataValueWithIcon}>
            <Briefcase size={16} color="#64748b" />
            {userData.role}
          </div>
        </div>
      </div>

      {/* Botón para editar datos */}
      <div style={{ textAlign: isMobile ? 'left' : 'center' }}>
        <button 
          style={{
            ...styles.editButton,
            ...(isButtonHovered ? styles.editButtonHover : {})
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          {isMobile ? 'Editar Información' : 'Editar Información'}
        </button>
      </div>
    </div>
  );

  const renderRecentActivity = () => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>
        <Clock size={isMobile ? 20 : 24} color="#8b5cf6" />
        Actividad Reciente
      </h2>

      <div style={styles.activityGrid}>
        {activityItems.map((activity, index) => (
          <div key={index} style={styles.activityItem}>
            <div style={styles.activityInfo}>
              <div style={styles.activityIndicator(activity.color)}></div>
              <span style={styles.activityAction}>
                {activity.action}
              </span>
            </div>
            <span style={styles.activityTime}>
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout 
      title="Mis Datos"
      searchPlaceholder="Buscar en mis datos..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <h1 style={styles.pageTitle}>
        Mis datos
      </h1>

      {/* Resumen de Uso */}
      {renderUsageStats()}

      {/* Almacenamiento */}
      {renderStorageInfo()}

      {/* Datos Personales */}
      {renderPersonalData()}

      {/* Actividad Reciente */}
      {renderRecentActivity()}
    </MainLayout>
  );
};

export default DataScreen;