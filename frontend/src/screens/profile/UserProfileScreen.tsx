// src/screens/profile/UserProfileScreen.tsx
import React, { useState, useRef } from 'react';
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
  Calendar,
  CreditCard,
  Bell,
  Shield,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import UserAvatar from '../../components/common/UserAvatar';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  lastName: string;
  role: string;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string;
  joinDate: string;
  subscription: 'free' | 'pro' | 'enterprise';
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

const UserProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  const [activeTab, setActiveTab] = useState<'personal' | 'subscription' | 'preferences' | 'documents'>('personal');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({
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

  const handleSave = () => {
    setCurrentUser({ ...editedUser });
    setIsEditing(false);
    // Aquí guardarías en localStorage o API
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

  const user = isEditing ? editedUser : currentUser;

  // Estilos
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle: React.CSSProperties = {
    padding: '2rem 1rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '900px',
    margin: '0 auto'
  };

  const contentStyle: React.CSSProperties = {
    padding: '0 1rem 2rem',
    maxWidth: '900px',
    margin: '0 auto'
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(25px)',
    borderRadius: '24px',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    overflow: 'hidden'
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '1rem 2rem',
    background: active ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
    color: active ? '#67e8f9' : 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    borderRadius: '12px'
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: isEditing ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: isEditing ? '#1e293b' : 'white',
    fontSize: '1rem',
    outline: 'none',
    cursor: isEditing ? 'text' : 'default'
  };

  const renderPersonalTab = () => (
    <div style={{ padding: '2rem' }}>
      {/* Avatar Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '3rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        padding: '2rem'
      }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <UserAvatar 
            name={`${user.name} ${user.lastName}`}
            avatar={user.avatar}
            size="xl"
            showBorder={true}
            showStatus={true}
          />
          {isEditing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                background: '#06b6d4',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
              }}
            >
              <Camera size={20} color="white" />
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
        
        <h2 style={{
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: '1rem 0 0.5rem',
          textAlign: 'center'
        }}>
          {user.name} {user.lastName}
        </h2>
        
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1.1rem',
          textAlign: 'center'
        }}>
          {user.role}
        </p>

        {isEditing && (
          <div style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '1rem',
            maxWidth: '400px',
            margin: '1.5rem auto 0'
          }}>
            <div style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', gridColumn: '1 / -1' }}>
              Avatares disponibles:
            </div>
            {availableAvatars.map((avatar, index) => (
              <div
                key={index}
                onClick={() => handleAvatarChange(avatar)}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: user.avatar === avatar ? '3px solid #06b6d4' : '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
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
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div>
          <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
            <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Nombre
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => isEditing && setEditedUser({ ...editedUser, name: e.target.value })}
            style={inputStyle}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
            <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Apellido
          </label>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => isEditing && setEditedUser({ ...editedUser, lastName: e.target.value })}
            style={inputStyle}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
            <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => isEditing && setEditedUser({ ...editedUser, email: e.target.value })}
            style={inputStyle}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
            <Phone size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Teléfono
          </label>
          <input
            type="tel"
            value={user.phone || ''}
            onChange={(e) => isEditing && setEditedUser({ ...editedUser, phone: e.target.value })}
            style={inputStyle}
            placeholder="Número de teléfono"
            readOnly={!isEditing}
          />
        </div>

        <div>
          <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
            <Briefcase size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Rol
          </label>
          <input
            type="text"
            value={user.role}
            onChange={(e) => isEditing && setEditedUser({ ...editedUser, role: e.target.value })}
            style={inputStyle}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
            <MapPin size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Dirección
          </label>
          <input
            type="text"
            value={user.address || ''}
            onChange={(e) => isEditing && setEditedUser({ ...editedUser, address: e.target.value })}
            style={inputStyle}
            placeholder="Ciudad, País"
            readOnly={!isEditing}
          />
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
          <Edit size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Biografía
        </label>
        <textarea
          value={user.bio || ''}
          onChange={(e) => isEditing && setEditedUser({ ...editedUser, bio: e.target.value })}
          style={{
            ...inputStyle,
            minHeight: '100px',
            resize: 'vertical'
          }}
          placeholder="Cuéntanos sobre ti..."
          readOnly={!isEditing}
        />
      </div>

      {/* Change Password */}
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => setShowChangePassword(!showChangePassword)}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Shield size={18} />
          Cambiar contraseña
        </button>

        {showChangePassword && (
          <div style={{
            marginTop: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Contraseña actual
                </label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  style={{
                    ...inputStyle,
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#1e293b'
                  }}
                />
              </div>
              <div>
                <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  style={{
                    ...inputStyle,
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#1e293b'
                  }}
                />
              </div>
              <div>
                <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Confirmar nueva contraseña
                </label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  style={{
                    ...inputStyle,
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#1e293b'
                  }}
                />
              </div>
              <button
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Actualizar contraseña
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSubscriptionTab = () => (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        <CreditCard size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
        Suscripción y Facturación
      </h3>

      {/* Current Plan */}
      <div style={{
        background: 'rgba(6, 182, 212, 0.2)',
        border: '2px solid rgba(6, 182, 212, 0.4)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ color: 'white', fontSize: '1.3rem', margin: 0 }}>Plan Actual: Pro</h4>
          <div style={{
            background: '#10b981',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            Activo
          </div>
        </div>
        
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Acceso completo a todas las herramientas de análisis y 500 créditos mensuales.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ color: 'white', fontSize: '0.9rem' }}>
            ✓ 500 créditos de análisis/mes
          </div>
          <div style={{ color: 'white', fontSize: '0.9rem' }}>
            ✓ 200 créditos de IA/mes
          </div>
          <div style={{ color: 'white', fontSize: '0.9rem' }}>
            ✓ Soporte prioritario
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <button style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Cambiar plan
          </button>
          <button style={{
            background: 'transparent',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            color: '#f87171',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Cancelar suscripción
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Método de pago
        </h4>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem',
          borderRadius: '12px'
        }}>
          <CreditCard size={24} color="#06b6d4" style={{ marginRight: '1rem' }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontWeight: '600' }}>•••• •••• •••• 4567</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>Vence 12/2027</div>
          </div>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#06b6d4',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Cambiar
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '1.5rem'
      }}>
        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Historial de facturación
        </h4>
        {[
          { date: 'Ago 2024', amount: '$29.99', status: 'Pagado' },
          { date: 'Jul 2024', amount: '$29.99', status: 'Pagado' },
          { date: 'Jun 2024', amount: '$29.99', status: 'Pagado' }
        ].map((invoice, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: index < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
          }}>
            <div style={{ color: 'white' }}>{invoice.date}</div>
            <div style={{ color: 'white', fontWeight: '600' }}>{invoice.amount}</div>
            <div style={{ color: '#10b981', fontSize: '0.875rem' }}>{invoice.status}</div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#06b6d4',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              <Download size={16} style={{ marginRight: '0.25rem' }} />
              PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        <Bell size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
        Preferencias y Notificaciones
      </h3>

      {/* Notifications */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Notificaciones
        </h4>
        
        {[
          { key: 'email', label: 'Notificaciones por email', description: 'Recibe actualizaciones importantes por correo' },
          { key: 'push', label: 'Notificaciones push', description: 'Notificaciones en tiempo real en tu navegador' },
          { key: 'marketing', label: 'Emails de marketing', description: 'Recibe ofertas y novedades del producto' }
        ].map((item) => (
          <div key={item.key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>
                {item.label}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                {item.description}
              </div>
            </div>
            <div
              onClick={() => {
                const key = item.key as keyof typeof currentUser.notifications;
                setCurrentUser({
                  ...currentUser,
                  notifications: {
                    ...currentUser.notifications,
                    [key]: !currentUser.notifications[key]
                  }
                });
              }}
              style={{
                width: '50px',
                height: '30px',
                background: currentUser.notifications[item.key as keyof typeof currentUser.notifications] 
                  ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
                borderRadius: '15px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '26px',
                height: '26px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: currentUser.notifications[item.key as keyof typeof currentUser.notifications] ? '22px' : '2px',
                transition: 'all 0.3s ease'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Language & Region */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '1.5rem'
      }}>
        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Idioma y región
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
              Idioma
            </label>
            <select style={{
              ...inputStyle,
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#1e293b'
            }}>
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>
          
          <div>
            <label style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
              Zona horaria
            </label>
            <select style={{
              ...inputStyle,
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

  const renderDocumentsTab = () => (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        <Download size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
        Documentos y Datos
      </h3>

      {/* Export Data */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Exportar mis datos
        </h4>
        
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Descarga todos tus datos, análisis y configuraciones en formato JSON o PDF.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            border: 'none',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Download size={18} />
            Exportar análisis (JSON)
          </button>
          
          <button style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Download size={18} />
            Reporte completo (PDF)
          </button>
        </div>
      </div>

      {/* Recent Documents */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Documentos recientes
        </h4>
        
        {[
          { name: 'Análisis IA Agroindustria.pdf', date: '15 Ago 2024', size: '2.3 MB' },
          { name: 'Hypecycle Report Q3.json', date: '12 Ago 2024', size: '856 KB' },
          { name: 'MICMAC Matrix Results.xlsx', date: '08 Ago 2024', size: '1.2 MB' },
          { name: 'Tendencias Tecnológicas.pdf', date: '05 Ago 2024', size: '4.1 MB' }
        ].map((doc, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            marginBottom: '0.75rem',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(6, 182, 212, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <Download size={18} color="#06b6d4" />
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {doc.name}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                  {doc.date} • {doc.size}
                </div>
              </div>
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#06b6d4',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px'
            }}>
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Data Management */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        border: '2px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem'
      }}>
        <h4 style={{ color: '#f87171', fontSize: '1.1rem', marginBottom: '1rem' }}>
          <Trash2 size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Gestión de datos
        </h4>
        
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          <strong>Atención:</strong> Estas acciones son irreversibles y eliminarán permanentemente tus datos.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            background: 'transparent',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            color: '#f87171',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Eliminar todos los análisis
          </button>
          
          <button style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            color: '#f87171',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Eliminar cuenta completa
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
          }}
          onClick={() => navigate('/menu')}
          onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          <ArrowLeft size={20} style={{marginRight: '0.5rem'}} />
          Volver
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                <Save size={18} />
                Guardar
              </button>
              
              <button
                onClick={handleCancel}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <X size={18} />
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                border: 'none',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
              }}
            >
              <Edit size={18} />
              Editar perfil
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={contentStyle}>
        <div style={cardStyle}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1rem 2rem 0',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {[
              { key: 'personal', label: 'Información Personal', icon: User },
              { key: 'subscription', label: 'Suscripción', icon: CreditCard },
              { key: 'preferences', label: 'Preferencias', icon: Bell },
              { key: 'documents', label: 'Documentos', icon: Download }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  style={tabStyle(activeTab === tab.key)}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.key) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.key) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    }
                  }}
                >
                  <Icon size={18} style={{ marginRight: '0.5rem' }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'personal' && renderPersonalTab()}
            {activeTab === 'subscription' && renderSubscriptionTab()}
            {activeTab === 'preferences' && renderPreferencesTab()}
            {activeTab === 'documents' && renderDocumentsTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileScreen;