// src/screens/management/ManagementScreen.tsx - OPTIMIZADO
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Server, 
  FolderOpen, 
  Plus, 
  Edit3, 
  Trash2
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { 
  createManagementScreenStyles, 
  getStatusText
} from '../../styles/management/ManagementScreenStyles';
import type { 
  TabType, 
  CategoryStatus
} from '../../styles/management/ManagementScreenStyles';

interface Category {
  id: string;
  name: string;
  analysisCount: number;
  createdDate: string;
  status: CategoryStatus;
}

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ElementType;
}

const ManagementScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('categories');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Estados para hover effects
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Crear estilos basados en si es móvil o no
  const styles = createManagementScreenStyles(isMobile);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configuración de tabs
  const tabs: TabConfig[] = [
    { id: 'categories', label: 'Categorías', icon: FolderOpen },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'system', label: 'Sistema', icon: Server }
  ];

  // Mock data
  const categories: Category[] = [
    {
      id: '1',
      name: 'Tecnologías Agrícolas',
      analysisCount: 47,
      createdDate: '12 Jul 2025',
      status: 'active'
    },
    {
      id: '2',
      name: 'Energías Renovables',
      analysisCount: 23,
      createdDate: '5 Jul 2025',
      status: 'active'
    },
    {
      id: '3',
      name: 'Inteligencia Artificial',
      analysisCount: 89,
      createdDate: '1 Jul 2025',
      status: 'active'
    },
    {
      id: '4',
      name: 'Blockchain y Fintech',
      analysisCount: 12,
      createdDate: '28 Jun 2025',
      status: 'inactive'
    }
  ];

  // Handlers
  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      console.log('Crear categoría:', { name: newCategoryName, description: newCategoryDescription });
      setNewCategoryName('');
      setNewCategoryDescription('');
      setShowCreateForm(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      console.log('Eliminar categoría:', categoryId);
    }
  };

  const handleEditCategory = (categoryId: string) => {
    console.log('Editar categoría:', categoryId);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setNewCategoryName('');
    setNewCategoryDescription('');
  };

  // Componentes de formulario
  const FormInput: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    required?: boolean;
    type?: 'input' | 'textarea';
  }> = ({ label, value, onChange, placeholder, required = false, type = 'input' }) => (
    <div style={styles.formField}>
      <label style={styles.formLabel}>
        {label} {required && '*'}
      </label>
      {type === 'input' ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={styles.formInput}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={styles.formTextarea}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      )}
    </div>
  );

  // Tab Components
  const CategoriesTab = () => (
    <div>
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>
          Mis Categorías ({categories.length})
        </h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            ...styles.createButton,
            ...(hoveredButton === 'create' ? styles.createButtonHover : {})
          }}
          onMouseEnter={() => setHoveredButton('create')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <Plus size={18} />
          {isMobile ? 'Crear' : 'Crear Nueva Categoría'}
        </button>
      </div>

      {/* Create Category Form */}
      {showCreateForm && (
        <div style={styles.createForm}>
          <h4 style={styles.createFormTitle}>
            <Plus size={20} />
            Crear Nueva Categoría
          </h4>
          
          <FormInput
            label="Nombre de la categoría"
            value={newCategoryName}
            onChange={setNewCategoryName}
            placeholder="Ej: Blockchain en Agricultura"
            required
          />

          <FormInput
            label="Descripción (opcional)"
            value={newCategoryDescription}
            onChange={setNewCategoryDescription}
            placeholder="Describe el enfoque y alcance de esta categoría..."
            type="textarea"
          />

          <div style={styles.formActions}>
            <button
              onClick={handleCancelCreate}
              style={{
                ...styles.cancelButton,
                ...(hoveredButton === 'cancel' ? styles.cancelButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('cancel')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateCategory}
              disabled={!newCategoryName.trim()}
              style={{
                ...styles.submitButton(!!newCategoryName.trim()),
                ...(hoveredButton === 'submit' && newCategoryName.trim() ? styles.submitButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('submit')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Crear Categoría
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              style={{
                ...styles.categoryItem,
                ...(hoveredCategory === category.id ? styles.categoryItemHover : {})
              }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div style={styles.categoryInfo}>
                <div style={styles.categoryHeader}>
                  <h4 style={styles.categoryTitle}>
                    {category.name}
                  </h4>
                  <div style={styles.statusIndicator(category.status)}></div>
                  <span style={styles.statusLabel(category.status)}>
                    {getStatusText(category.status)}
                  </span>
                </div>
                <div style={styles.categoryMeta}>
                  <span style={styles.categoryMetaItem}>
                    <FolderOpen size={14} />
                    {category.analysisCount} análisis
                  </span>
                  <span>•</span>
                  <span>Creada: {category.createdDate}</span>
                </div>
              </div>
              
              <div style={styles.categoryActions}>
                <button
                  onClick={() => handleEditCategory(category.id)}
                  style={{
                    ...styles.actionButton('edit'),
                    ...(hoveredButton === `edit-${category.id}` ? styles.actionButtonHover('edit') : {})
                  }}
                  onMouseEnter={() => setHoveredButton(`edit-${category.id}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  title="Editar categoría"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  style={{
                    ...styles.actionButton('delete'),
                    ...(hoveredButton === `delete-${category.id}` ? styles.actionButtonHover('delete') : {})
                  }}
                  onMouseEnter={() => setHoveredButton(`delete-${category.id}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  title="Eliminar categoría"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <FolderOpen size={48} style={styles.emptyStateIcon} />
            <h3 style={styles.emptyStateTitle}>
              No hay categorías creadas
            </h3>
            <p style={styles.emptyStateDescription}>
              Crea tu primera categoría para organizar tus análisis
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              style={styles.emptyStateButton}
            >
              Crear Primera Categoría
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const UsersTab = () => (
    <div style={styles.comingSoonContainer}>
      <Users size={64} style={styles.comingSoonIcon} />
      <h3 style={styles.comingSoonTitle}>
        Gestión de Usuarios
      </h3>
      <p style={styles.comingSoonDescription}>
        Administra permisos, roles y accesos de los usuarios de tu organización
      </p>
      <div style={styles.comingSoonInfo}>
        <p style={styles.comingSoonText}>
          <strong>Próximamente:</strong> Invitar usuarios, asignar roles, gestionar equipos y configurar permisos granulares.
        </p>
      </div>
    </div>
  );

  const SystemTab = () => (
    <div style={styles.comingSoonContainer}>
      <Server size={64} style={styles.comingSoonIcon} />
      <h3 style={styles.comingSoonTitle}>
        Configuración del Sistema
      </h3>
      <p style={styles.comingSoonDescription}>
        Ajusta configuraciones avanzadas, integraciones y parámetros del sistema
      </p>
      <div style={styles.comingSoonInfo}>
        <p style={styles.comingSoonText}>
          <strong>Próximamente:</strong> APIs, webhooks, backups automáticos, configuración de seguridad y logs del sistema.
        </p>
      </div>
    </div>
  );

  return (
    <MainLayout 
      title="Gestión"
      searchPlaceholder="Buscar en gestión..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <h1 style={styles.pageTitle}>
        Gestión
      </h1>

      {/* Main Card */}
      <div style={styles.card}>
        {/* Tabs */}
        <div style={styles.tabsContainer}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tabButton(activeTab === tab.id),
                  ...(hoveredButton === `tab-${tab.id}` && activeTab !== tab.id ? styles.tabButtonHover : {})
                }}
                onMouseEnter={() => setHoveredButton(`tab-${tab.id}`)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'categories' && <CategoriesTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'system' && <SystemTab />}
      </div>
    </MainLayout>
  );
};

export default ManagementScreen;