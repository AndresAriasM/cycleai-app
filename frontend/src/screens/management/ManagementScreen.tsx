// src/screens/management/ManagementScreen.tsx - REFACTORIZADO
import React, { useState } from 'react';
import { 
  //Settings, 
  Users, 
  Server, 
  FolderOpen, 
  Plus, 
  Edit3, 
  Trash2
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

interface Category {
  id: string;
  name: string;
  analysisCount: number;
  createdDate: string;
  status: 'active' | 'inactive';
}

const ManagementScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('categories');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const isMobile = window.innerWidth < 768;

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

  const tabs = [
    { id: 'categories', label: 'Categorías', icon: FolderOpen },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'system', label: 'Sistema', icon: Server }
  ];

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      // Aquí iría la lógica para crear la categoría
      console.log('Crear categoría:', { name: newCategoryName, description: newCategoryDescription });
      setNewCategoryName('');
      setNewCategoryDescription('');
      setShowCreateForm(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      // Aquí iría la lógica para eliminar
      console.log('Eliminar categoría:', categoryId);
    }
  };

  const handleEditCategory = (categoryId: string) => {
    console.log('Editar categoría:', categoryId);
    // Aquí podrías abrir un modal de edición o navegar a una página de edición
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

  const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    background: isActive ? '#3b82f6' : '#e2e8f0',
    color: isActive ? 'white' : '#64748b',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    marginRight: '0.5rem',
    marginBottom: isMobile ? '0.5rem' : '0'
  });

  const categoryItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    marginBottom: '0.75rem',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease'
  };

  // Tab Content Components
  const CategoriesTab = () => (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', margin: 0}}>
          Mis Categorías ({categories.length})
        </h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
          }}
        >
          <Plus size={18} />
          {isMobile ? 'Crear' : 'Crear Nueva Categoría'}
        </button>
      </div>

      {/* Create Category Form */}
      {showCreateForm && (
        <div style={{
          background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
          border: '2px solid #0ea5e9',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)'
        }}>
          <h4 style={{
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            color: '#1e293b', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Plus size={20} />
            Crear Nueva Categoría
          </h4>
          
          <div style={{marginBottom: '1rem'}}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Nombre de la categoría *
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Ej: Blockchain en Agricultura"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                background: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Descripción (opcional)
            </label>
            <textarea
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              placeholder="Describe el enfoque y alcance de esta categoría..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical',
                minHeight: '80px',
                background: 'white',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap'}}>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setNewCategoryName('');
                setNewCategoryDescription('');
              }}
              style={{
                background: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateCategory}
              disabled={!newCategoryName.trim()}
              style={{
                background: newCategoryName.trim() ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : '#9ca3af',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                cursor: newCategoryName.trim() ? 'pointer' : 'not-allowed',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (newCategoryName.trim()) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (newCategoryName.trim()) {
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              Crear Categoría
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div>
        {categories.map((category) => (
          <div
            key={category.id}
            style={categoryItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e2e8f0';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{flex: 1}}>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <h4 style={{fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', margin: 0}}>
                  {category.name}
                </h4>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: category.status === 'active' ? '#10b981' : '#f59e0b',
                  marginLeft: '0.75rem'
                }}></div>
                {category.status === 'active' ? (
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#10b981',
                    fontWeight: '600'
                  }}>
                    ACTIVA
                  </span>
                ) : (
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#f59e0b',
                    fontWeight: '600'
                  }}>
                    INACTIVA
                  </span>
                )}
              </div>
              <div style={{display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b', flexWrap: 'wrap'}}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <FolderOpen size={14} />
                  {category.analysisCount} análisis
                </span>
                <span>•</span>
                <span>Creada: {category.createdDate}</span>
              </div>
            </div>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <button
                onClick={() => handleEditCategory(category.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  color: '#64748b',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.color = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = '#64748b';
                }}
                title="Editar categoría"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  color: '#ef4444',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fee2e2';
                  e.currentTarget.style.color = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = '#ef4444';
                }}
                title="Eliminar categoría"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#64748b'
          }}>
            <FolderOpen size={48} style={{margin: '0 auto 1rem', opacity: 0.5}} />
            <h3 style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151'}}>
              No hay categorías creadas
            </h3>
            <p style={{fontSize: '1rem', marginBottom: '1.5rem'}}>
              Crea tu primera categoría para organizar tus análisis
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              Crear Primera Categoría
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const UsersTab = () => (
    <div style={{textAlign: 'center', padding: '3rem 1rem', color: '#64748b'}}>
      <Users size={64} style={{margin: '0 auto 1.5rem', opacity: 0.5}} />
      <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', color: '#374151'}}>
        Gestión de Usuarios
      </h3>
      <p style={{fontSize: '1.1rem', marginBottom: '1rem', maxWidth: '400px', margin: '0 auto 1.5rem'}}>
        Administra permisos, roles y accesos de los usuarios de tu organización
      </p>
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'inline-block',
        textAlign: 'left'
      }}>
        <p style={{fontSize: '0.9rem', color: '#64748b', margin: 0}}>
          <strong>Próximamente:</strong> Invitar usuarios, asignar roles, gestionar equipos y configurar permisos granulares.
        </p>
      </div>
    </div>
  );

  const SystemTab = () => (
    <div style={{textAlign: 'center', padding: '3rem 1rem', color: '#64748b'}}>
      <Server size={64} style={{margin: '0 auto 1.5rem', opacity: 0.5}} />
      <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', color: '#374151'}}>
        Configuración del Sistema
      </h3>
      <p style={{fontSize: '1.1rem', marginBottom: '1rem', maxWidth: '400px', margin: '0 auto 1.5rem'}}>
        Ajusta configuraciones avanzadas, integraciones y parámetros del sistema
      </p>
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'inline-block',
        textAlign: 'left'
      }}>
        <p style={{fontSize: '0.9rem', color: '#64748b', margin: 0}}>
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
      <h1 style={{
        fontSize: isMobile ? '1.8rem' : '2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '2rem'
      }}>
        Gestión
      </h1>

      {/* Tabs */}
      <div style={cardStyle}>
        <div style={{
          display: 'flex',
          marginBottom: '2rem',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '1rem',
          flexWrap: 'wrap',
          gap: isMobile ? '0.5rem' : '0'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={tabButtonStyle(activeTab === tab.id)}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
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