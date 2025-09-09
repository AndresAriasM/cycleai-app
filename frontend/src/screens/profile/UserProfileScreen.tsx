// src/screens/profile/UserProfileScreen.tsx - OPTIMIZADO
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera, 
  Edit, 
  Save, 
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CreditCard,
  Bell,
  Shield,
  Download,
  Trash2
} from 'lucide-react';
import UserAvatar from '../../components/common/UserAvatar';
import { 
  createUserProfileScreenStyles,
  getSubscriptionColor,
  getSubscriptionFeatures,
  validatePassword,
  validateEmail,
  tabsConfig
} from '../../styles/profile/UserProfileScreenStyles';
import type { 
  UserProfile, 
  Passwords, 
  TabType 
} from '../../styles/profile/UserProfileScreenStyles';

const UserProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Crear estilos basados en si es móvil o no
  const styles = createUserProfileScreenStyles(isMobile);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: '1',
    username: 'sergio',
    email: 'sergio@cycleai.com',
    name: 'Sergio',
    lastName: 'Arboleda',
    role: 'Director de Innovación',
    phone: '+57 300 123 4567',
    address: 'Medellín, Colombia',
    bio: 'Apasionado por la innovación tecnológica y la transformación digital. Liderando proyectos de IA y análisis de tendencias.',
    joinDate: 'Enero 2024',
    subscription: 'pro',
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>({ ...currentUser });
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState<Passwords>({
    current: '',
    new: '',
    confirm: ''
  });

  // Avatares locales disponibles
  const availableAvatars = [
    '/src/assets/users/sergio.jpg',
    '/src/assets/users/maria.jpg',
    '/src/assets/users/carlos.jpg',
    '/src/assets/users/ana.jpg',
    '/src/assets/users/luis.jpg',
    '/src/assets/users/sofia.jpg'
  ];

  // Handlers
  const handleSave = () => {
    if (!validateEmail(editedUser.email)) {
      alert('Por favor ingresa un email válido');
      return;
    }
    
    setCurrentUser({ ...editedUser });
    setIsEditing(false);
    localStorage.setItem('cycleai_current_user', JSON.stringify(editedUser));
  };

  const handleCancel = () => {
    setEditedUser({ ...currentUser });
    setIsEditing(false);
  };

  const handleAvatarChange = (newAvatar: string) => {
    if (isEditing) {
      setEditedUser({ ...editedUser, avatar: newAvatar });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isEditing) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditedUser({ ...editedUser, avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordUpdate = () => {
    if (!validatePassword(passwords.new)) {
      alert('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    // Aquí iría la lógica de actualización de contraseña
    alert('Contraseña actualizada exitosamente');
    setPasswords({ current: '', new: '', confirm: '' });
    setShowChangePassword(false);
  };

  const handleNotificationToggle = (key: keyof UserProfile['notifications']) => {
    setCurrentUser({
      ...currentUser,
      notifications: {
        ...currentUser.notifications,
        [key]: !currentUser.notifications[key]
      }
    });
  };

  const user = isEditing ? editedUser : currentUser;

  // Componentes
  const Header = () => (
    <div style={styles.header}>
      <div 
        style={{
          ...styles.backButton,
          ...(hoveredElement === 'back' ? styles.backButtonHover : {})
        }}
        onClick={() => navigate('/menu')}
        onMouseEnter={() => setHoveredElement('back')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <ArrowLeft size={20} />
        Volver
      </div>

      <div style={styles.headerActions}>
        {isEditing ? (
          <>
            <button
              style={{
                ...styles.saveButton,
                ...(hoveredElement === 'save' ? styles.saveButtonHover : {})
              }}
              onClick={handleSave}
              onMouseEnter={() => setHoveredElement('save')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <Save size={18} />
              Guardar
            </button>
            
            <button
              style={{
                ...styles.cancelButton,
                ...(hoveredElement === 'cancel' ? styles.cancelButtonHover : {})
              }}
              onClick={handleCancel}
              onMouseEnter={() => setHoveredElement('cancel')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <X size={18} />
              Cancelar
            </button>
          </>
        ) : (
          <button
            style={{
              ...styles.editButton,
              ...(hoveredElement === 'edit' ? styles.editButtonHover : {})
            }}
            onClick={() => setIsEditing(true)}
            onMouseEnter={() => setHoveredElement('edit')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <Edit size={18} />
            {isMobile ? 'Editar' : 'Editar perfil'}
          </button>
        )}
      </div>
    </div>
  );

  const FormField: React.FC<{
    label: string;
    icon: React.ElementType;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    isTextarea?: boolean;
  }> = ({ label, icon: Icon, value, onChange, type = 'text', placeholder, isTextarea = false }) => (
    <div style={styles.formField}>
      <label style={styles.formLabel}>
        <Icon size={16} />
        {label}
      </label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => isEditing && onChange(e.target.value)}
          style={styles.formTextarea(isEditing)}
          placeholder={placeholder}
          readOnly={!isEditing}
          onFocus={(e) => isEditing && (e.target.style.borderColor = '#06b6d4')}
          onBlur={(e) => isEditing && (e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)')}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => isEditing && onChange(e.target.value)}
          style={styles.formInput(isEditing)}
          placeholder={placeholder}
          readOnly={!isEditing}
          onFocus={(e) => isEditing && (e.target.style.borderColor = '#06b6d4')}
          onBlur={(e) => isEditing && (e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)')}
        />
      )}
    </div>
  );

  const PersonalTab = () => (
    <div style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
      {/* Avatar Section */}
      <div style={styles.avatarSection}>
        <div style={styles.avatarContainer}>
          <UserAvatar 
            name={`${user.name} ${user.lastName}`}
            avatar={user.avatar}
            size="xl"
            showBorder={true}
            showStatus={true}
          />
          {isEditing && (
            <button
              style={{
                ...styles.avatarEditButton,
                ...(hoveredElement === 'avatar-edit' ? styles.avatarEditButtonHover : {})
              }}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={() => setHoveredElement('avatar-edit')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <Camera size={isMobile ? 16 : 20} color="white" />
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </div>
        
        <h2 style={styles.userTitle}>
          {user.name} {user.lastName}
        </h2>
        
        <p style={styles.userSubtitle}>
          {user.role}
        </p>

        {isEditing && (
          <div style={styles.avatarGrid}>
            <div style={{ 
              color: 'white', 
              fontSize: isMobile ? '0.8rem' : '0.9rem', 
              marginBottom: '0.5rem', 
              gridColumn: '1 / -1' 
            }}>
              Avatares disponibles:
            </div>
            {availableAvatars.map((avatar, index) => (
              <div
                key={index}
                onClick={() => handleAvatarChange(avatar)}
                style={{
                  ...styles.avatarOption(user.avatar === avatar),
                  ...(hoveredElement === `avatar-${index}` ? styles.avatarOptionHover : {})
                }}
                onMouseEnter={() => setHoveredElement(`avatar-${index}`)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  style={styles.avatarImage}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=avatar${index}`;
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div style={styles.formGrid}>
        <FormField
          label="Nombre"
          icon={User}
          value={user.name}
          onChange={(value) => setEditedUser({ ...editedUser, name: value })}
        />

        <FormField
          label="Apellido"
          icon={User}
          value={user.lastName}
          onChange={(value) => setEditedUser({ ...editedUser, lastName: value })}
        />

        <FormField
          label="Email"
          icon={Mail}
          type="email"
          value={user.email}
          onChange={(value) => setEditedUser({ ...editedUser, email: value })}
        />

        <FormField
          label="Teléfono"
          icon={Phone}
          type="tel"
          value={user.phone || ''}
          onChange={(value) => setEditedUser({ ...editedUser, phone: value })}
          placeholder="Número de teléfono"
        />

        <FormField
          label="Rol"
          icon={Briefcase}
          value={user.role}
          onChange={(value) => setEditedUser({ ...editedUser, role: value })}
        />

        <FormField
          label="Dirección"
          icon={MapPin}
          value={user.address || ''}
          onChange={(value) => setEditedUser({ ...editedUser, address: value })}
          placeholder="Ciudad, País"
        />
      </div>

      <FormField
        label="Biografía"
        icon={Edit}
        value={user.bio || ''}
        onChange={(value) => setEditedUser({ ...editedUser, bio: value })}
        placeholder="Cuéntanos sobre ti..."
        isTextarea
      />

      {/* Change Password */}
      <div style={styles.passwordSection}>
        <button
          style={{
            ...styles.passwordButton,
            ...(hoveredElement === 'password-toggle' ? styles.passwordButtonHover : {})
          }}
          onClick={() => setShowChangePassword(!showChangePassword)}
          onMouseEnter={() => setHoveredElement('password-toggle')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <Shield size={18} />
          Cambiar contraseña
        </button>

        {showChangePassword && (
          <div style={styles.passwordForm}>
            <div style={styles.passwordGrid}>
              <FormField
                label="Contraseña actual"
                icon={Shield}
                type="password"
                value={passwords.current}
                onChange={(value) => setPasswords({ ...passwords, current: value })}
              />
              <FormField
                label="Nueva contraseña"
                icon={Shield}
                type="password"
                value={passwords.new}
                onChange={(value) => setPasswords({ ...passwords, new: value })}
              />
              <FormField
                label="Confirmar nueva contraseña"
                icon={Shield}
                type="password"
                value={passwords.confirm}
                onChange={(value) => setPasswords({ ...passwords, confirm: value })}
              />
              <button
                onClick={handlePasswordUpdate}
                style={styles.passwordUpdateButton}
              >
                Actualizar contraseña
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const SubscriptionTab = () => {
    const subscriptionFeatures = getSubscriptionFeatures(currentUser.subscription);
    
    return (
      <div style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
        <h3 style={{ 
          color: 'white', 
          fontSize: isMobile ? '1.25rem' : '1.5rem', 
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CreditCard size={24} />
          Suscripción y Facturación
        </h3>

        {/* Current Plan */}
        <div style={styles.subscriptionCard}>
          <div style={styles.subscriptionHeader}>
            <h4 style={{ 
              color: 'white', 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              margin: 0 
            }}>
              Plan Actual: {currentUser.subscription.charAt(0).toUpperCase() + currentUser.subscription.slice(1)}
            </h4>
            <div style={styles.subscriptionBadge}>
              Activo
            </div>
          </div>
          
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            marginBottom: '1rem',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}>
            Acceso completo a todas las herramientas de análisis y 500 créditos mensuales.
          </p>
          
          <div style={styles.subscriptionFeatures}>
            {subscriptionFeatures.map((feature, index) => (
              <div key={index} style={{ 
                color: 'white', 
                fontSize: isMobile ? '0.85rem' : '0.9rem' 
              }}>
                ✓ {feature}
              </div>
            ))}
          </div>
          
          <div style={styles.subscriptionActions}>
            <button 
              style={{
                ...styles.subscriptionButton('primary'),
                ...(hoveredElement === 'change-plan' ? styles.subscriptionButtonHover('primary') : {})
              }}
              onMouseEnter={() => setHoveredElement('change-plan')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              Cambiar plan
            </button>
            <button 
              style={{
                ...styles.subscriptionButton('danger'),
                ...(hoveredElement === 'cancel-sub' ? styles.subscriptionButtonHover('danger') : {})
              }}
              onMouseEnter={() => setHoveredElement('cancel-sub')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              Cancelar suscripción
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div style={styles.paymentMethod}>
          <h4 style={{ 
            color: 'white', 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            marginBottom: '1rem' 
          }}>
            Método de pago
          </h4>
          <div style={styles.paymentMethodContent}>
            <CreditCard size={24} color="#06b6d4" style={{ marginRight: isMobile ? '0' : '1rem' }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: '600' }}>•••• •••• •••• 4567</div>
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.6)', 
                fontSize: isMobile ? '0.8rem' : '0.875rem' 
              }}>
                Vence 12/2027
              </div>
            </div>
            <button style={styles.paymentMethodButton}>
              Cambiar
            </button>
          </div>
        </div>

        {/* Billing History */}
        <div style={styles.billingHistory}>
          <h4 style={{ 
            color: 'white', 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            marginBottom: '1rem' 
          }}>
            Historial de facturación
          </h4>
          {[
            { date: 'Ago 2024', amount: '$29.99', status: 'Pagado' },
            { date: 'Jul 2024', amount: '$29.99', status: 'Pagado' },
            { date: 'Jun 2024', amount: '$29.99', status: 'Pagado' }
          ].map((invoice, index) => (
            <div key={index} style={{
              ...styles.billingItem,
              borderBottom: index < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
            }}>
              <div style={{ color: 'white' }}>{invoice.date}</div>
              <div style={{ color: 'white', fontWeight: '600' }}>{invoice.amount}</div>
              <div style={{ 
                color: '#10b981', 
                fontSize: isMobile ? '0.8rem' : '0.875rem' 
              }}>
                {invoice.status}
              </div>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#06b6d4',
                cursor: 'pointer',
                fontSize: isMobile ? '0.8rem' : '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Download size={16} />
                PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PreferencesTab = () => (
    <div style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
      <h3 style={{ 
        color: 'white', 
        fontSize: isMobile ? '1.25rem' : '1.5rem', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Bell size={24} />
        Preferencias y Notificaciones
      </h3>

      {/* Notifications */}
      <div style={styles.notificationsSection}>
        <h4 style={{ 
          color: 'white', 
          fontSize: isMobile ? '1rem' : '1.1rem', 
          marginBottom: '1rem' 
        }}>
          Notificaciones
        </h4>
        
        {[
          { key: 'email' as const, label: 'Notificaciones por email', description: 'Recibe actualizaciones importantes por correo' },
          { key: 'push' as const, label: 'Notificaciones push', description: 'Notificaciones en tiempo real en tu navegador' },
          { key: 'marketing' as const, label: 'Emails de marketing', description: 'Recibe ofertas y novedades del producto' }
        ].map((item, index, array) => (
          <div key={item.key} style={{
            ...styles.notificationItem,
            borderBottom: index === array.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <div style={{ 
                color: 'white', 
                fontWeight: '600', 
                marginBottom: '0.25rem',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}>
                {item.label}
              </div>
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.6)', 
                fontSize: isMobile ? '0.8rem' : '0.875rem' 
              }}>
                {item.description}
              </div>
            </div>
            <div
              onClick={() => handleNotificationToggle(item.key)}
              style={styles.notificationToggle(currentUser.notifications[item.key])}
            >
              <div style={styles.notificationKnob(currentUser.notifications[item.key])} />
            </div>
          </div>
        ))}
      </div>

      {/* Language & Region */}
      <div style={styles.languageSection}>
        <h4 style={{ 
          color: 'white', 
          fontSize: isMobile ? '1rem' : '1.1rem', 
          marginBottom: '1rem' 
        }}>
          Idioma y región
        </h4>
        
        <div style={styles.languageGrid}>
          <div>
            <label style={styles.formLabel}>
              Idioma
            </label>
            <select style={{
              ...styles.formInput(true),
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#1e293b'
            }}>
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>
          
          <div>
            <label style={styles.formLabel}>
              Zona horaria
            </label>
            <select style={{
              ...styles.formInput(true),
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#1e293b'
            }}>
              <option value="America/Bogota">Bogotá (UTC-5)</option>
              <option value="America/Mexico_City">Ciudad de México (UTC-6)</option>
              <option value="America/New_York">Nueva York (UTC-4)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const DocumentsTab = () => (
    <div style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
      <h3 style={{ 
        color: 'white', 
        fontSize: isMobile ? '1.25rem' : '1.5rem', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Download size={24} />
        Documentos y Datos
      </h3>

      {/* Export Data */}
      <div style={styles.exportSection}>
        <h4 style={{ 
          color: 'white', 
          fontSize: isMobile ? '1rem' : '1.1rem', 
          marginBottom: '1rem' 
        }}>
          Exportar mis datos
        </h4>
        
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.7)', 
          marginBottom: '1.5rem', 
          fontSize: isMobile ? '0.9rem' : '0.95rem' 
        }}>
          Descarga todos tus datos, análisis y configuraciones en formato JSON o PDF.
        </p>
        
        <div style={styles.exportActions}>
          <button 
            style={{
              ...styles.exportButton('primary'),
              ...(hoveredElement === 'export-json' ? styles.exportButtonHover : {})
            }}
            onMouseEnter={() => setHoveredElement('export-json')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <Download size={18} />
            Exportar análisis (JSON)
          </button>
          
          <button 
            style={{
              ...styles.exportButton('secondary'),
              ...(hoveredElement === 'export-pdf' ? styles.exportButtonHover : {})
            }}
            onMouseEnter={() => setHoveredElement('export-pdf')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <Download size={18} />
            Reporte completo (PDF)
          </button>
        </div>
      </div>

      {/* Recent Documents */}
      <div style={styles.documentsSection}>
        <h4 style={{ 
          color: 'white', 
          fontSize: isMobile ? '1rem' : '1.1rem', 
          marginBottom: '1rem' 
        }}>
          Documentos recientes
        </h4>
        
        {[
          { name: 'Análisis IA Agroindustria.pdf', date: '15 Ago 2024', size: '2.3 MB' },
          { name: 'Hypecycle Report Q3.json', date: '12 Ago 2024', size: '856 KB' },
          { name: 'MICMAC Matrix Results.xlsx', date: '08 Ago 2024', size: '1.2 MB' },
          { name: 'Tendencias Tecnológicas.pdf', date: '05 Ago 2024', size: '4.1 MB' }
        ].map((doc, index) => (
          <div 
            key={index} 
            style={{
              ...styles.documentItem,
              ...(hoveredElement === `doc-${index}` ? styles.documentItemHover : {})
            }}
            onMouseEnter={() => setHoveredElement(`doc-${index}`)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={styles.documentIcon}>
                <Download size={18} color="#06b6d4" />
              </div>
              <div style={styles.documentInfo}>
                <div style={styles.documentName}>
                  {doc.name}
                </div>
                <div style={styles.documentMeta}>
                  {doc.date} • {doc.size}
                </div>
              </div>
            </div>
            <button style={styles.documentDownload}>
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Data Management */}
      <div style={styles.dangerZone}>
        <h4 style={styles.dangerTitle}>
          <Trash2 size={20} />
          Gestión de datos
        </h4>
        
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.7)', 
          marginBottom: '1.5rem', 
          fontSize: isMobile ? '0.9rem' : '0.95rem' 
        }}>
          <strong>Atención:</strong> Estas acciones son irreversibles y eliminarán permanentemente tus datos.
        </p>
        
        <div style={styles.dangerActions}>
          <button 
            style={{
              ...styles.dangerButton('outline'),
              ...(hoveredElement === 'delete-analysis' ? styles.dangerButtonHover : {})
            }}
            onMouseEnter={() => setHoveredElement('delete-analysis')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            Eliminar todos los análisis
          </button>
          
          <button 
            style={{
              ...styles.dangerButton('filled'),
              ...(hoveredElement === 'delete-account' ? styles.dangerButtonHover : {})
            }}
            onMouseEnter={() => setHoveredElement('delete-account')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            Eliminar cuenta completa
          </button>
        </div>
      </div>
    </div>
  );

  const Tabs = () => (
    <div style={styles.tabsContainer}>
      {tabsConfig.map((tab) => {
        const iconMap = {
          User,
          CreditCard,
          Bell,
          Download
        };
        const Icon = iconMap[tab.icon as keyof typeof iconMap];
        
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tab(activeTab === tab.key),
              ...(hoveredElement === `tab-${tab.key}` && activeTab !== tab.key ? styles.tabHover : {})
            }}
            onMouseEnter={() => setHoveredElement(`tab-${tab.key}`)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <Icon size={18} />
            {isMobile ? tab.label.split(' ')[0] : tab.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={styles.container}>
      <Header />
      
      <div style={styles.content}>
        <div style={styles.card}>
          <Tabs />
          
          <div style={styles.tabContent}>
            {activeTab === 'personal' && <PersonalTab />}
            {activeTab === 'subscription' && <SubscriptionTab />}
            {activeTab === 'preferences' && <PreferencesTab />}
            {activeTab === 'documents' && <DocumentsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileScreen;