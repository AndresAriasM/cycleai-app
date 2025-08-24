// src/screens/auth/CreateUserScreen.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Briefcase, ArrowLeft } from 'lucide-react';

interface NewUser {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: string;
}

const CreateUserScreen: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastName: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const roles = [
    'Director de Innovación',
    'Analista Senior',
    'Tech Lead',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Developer',
    'Business Analyst'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Limpiar error al escribir
  };

  const validateForm = () => {
    if (!formData.username.trim()) return 'El nombre de usuario es requerido';
    if (!formData.email.trim()) return 'El email es requerido';
    if (!formData.email.includes('@')) return 'Email inválido';
    if (!formData.password.trim()) return 'La contraseña es requerida';
    if (formData.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) return 'Las contraseñas no coinciden';
    if (!formData.name.trim()) return 'El nombre es requerido';
    if (!formData.lastName.trim()) return 'El apellido es requerido';
    if (!formData.role) return 'Selecciona un rol';
    return null;
  };

  const handleCreateUser = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    // Simular creación de usuario
    setTimeout(() => {
      // Crear nuevo usuario
      const newUser: NewUser = {
        id: Date.now().toString(),
        username: formData.username.toLowerCase(),
        email: formData.email.toLowerCase(),
        password: formData.password,
        name: formData.name,
        lastName: formData.lastName,
        role: formData.role
      };

      // Aquí normalmente guardarías en una base de datos
      // Por ahora solo lo guardamos en localStorage para demo
      const existingUsers = JSON.parse(localStorage.getItem('cycleai_users') || '[]');
      
      // Verificar si el usuario ya existe
      if (existingUsers.some((user: NewUser) => user.username === newUser.username)) {
        setError('El nombre de usuario ya existe');
        setIsLoading(false);
        return;
      }

      existingUsers.push(newUser);
      localStorage.setItem('cycleai_users', JSON.stringify(existingUsers));

      setSuccess('¡Usuario creado exitosamente!');
      setIsLoading(false);

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1000);
  };

  // Estilos (manteniendo consistencia con LoginScreen)
  const containerStyle: React.CSSProperties = {
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '1rem',
    paddingTop: '2rem',
    overflowY: 'auto'
  };

  const headerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '2rem'
  };

  const backButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'color 0.3s ease'
  };

  const titleContainerStyle: React.CSSProperties = {
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(25px)',
    borderRadius: '24px',
    padding: '2rem',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    position: 'relative'
  };

  const formContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '2rem'
  };

  const fieldGroupStyle: React.CSSProperties = {
    marginBottom: '1.5rem'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    letterSpacing: '0.025em'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem 1.25rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.3)'
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '1.25rem 2rem',
    background: isLoading 
      ? '#64748b' 
      : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    borderRadius: '12px',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)',
    letterSpacing: '0.025em',
    marginTop: '1rem'
  };

  const messageStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: '600'
  };

  const errorMessageStyle: React.CSSProperties = {
    ...messageStyle,
    background: 'rgba(127, 29, 29, 0.4)',
    border: '2px solid rgba(239, 68, 68, 0.5)',
    color: 'white'
  };

  const successMessageStyle: React.CSSProperties = {
    ...messageStyle,
    background: 'rgba(5, 46, 22, 0.4)',
    border: '2px solid rgba(34, 197, 94, 0.5)',
    color: 'white'
  };

  return (
    <div style={containerStyle}>
      {/* Fondo decorativo similar al login */}
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1}}>
        <svg style={{position: 'absolute', width: '100%', height: '100%', opacity: 0.1}} viewBox="0 0 1200 800">
          <polygon points="100,100 300,100 200,50" fill="url(#grad1)" />
          <polygon points="800,200 1000,300 700,300" fill="url(#grad2)" />
          <line x1="0" y1="200" x2="400" y2="0" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" />
          <line x1="800" y1="0" x2="1200" y2="300" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#06b6d4', stopOpacity: 0.3}} />
              <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0.1}} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 0.3}} />
              <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 0.1}} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Contenido */}
      <div style={contentStyle}>
        
        {/* Header */}
        <div style={headerStyle}>
          <div 
            style={backButtonStyle}
            onClick={() => navigate('/login')}
            onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
          >
            <ArrowLeft size={20} style={{marginRight: '0.5rem'}} />
            Volver al login
          </div>

          <div style={titleContainerStyle}>
            {/* Triángulos superiores */}
            <div style={{
              position: 'absolute',
              top: '-25px',
              left: '15px',
              width: '0',
              height: '0',
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderBottom: '30px solid rgba(6, 182, 212, 0.4)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }}></div>
            
            <div style={{
              position: 'absolute',
              top: '-25px',
              right: '15px',
              width: '0',
              height: '0',
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderBottom: '30px solid rgba(139, 92, 246, 0.4)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }}></div>

            <User size={48} style={{color: 'white', marginBottom: '1rem'}} />
            <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem'}}>
              Crear Usuario
            </h1>
            <p style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem'}}>
              Únete a CycleAI
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div style={formContainerStyle}>
          
          {/* Nombre y Apellido */}
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
            <div style={{flex: 1}}>
              <label style={labelStyle}>Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={inputStyle}
                placeholder="Tu nombre"
              />
            </div>
            <div style={{flex: 1}}>
              <label style={labelStyle}>Apellido</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                style={inputStyle}
                placeholder="Tu apellido"
              />
            </div>
          </div>

          {/* Usuario */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Nombre de usuario</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              style={inputStyle}
              placeholder="usuario123"
            />
          </div>

          {/* Email */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={inputStyle}
              placeholder="tu@email.com"
            />
          </div>

          {/* Rol */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Rol</label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              style={selectStyle}
            >
              <option value="">Selecciona tu rol</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Contraseñas */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Contraseña</label>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                style={{...inputStyle, flex: 1}}
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={20} color="#1e293b" /> : <Eye size={20} color="#1e293b" />}
              </button>
            </div>
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Confirmar contraseña</label>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                style={{...inputStyle, flex: 1}}
                placeholder="Repite la contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} color="#1e293b" /> : <Eye size={20} color="#1e293b" />}
              </button>
            </div>
          </div>

          {/* Mensajes */}
          {error && <div style={errorMessageStyle}>{error}</div>}
          {success && <div style={successMessageStyle}>{success}</div>}

          {/* Botón crear */}
          <button
            onClick={handleCreateUser}
            disabled={isLoading}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(6, 182, 212, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(6, 182, 212, 0.3)';
              }
            }}
          >
            {isLoading ? (
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }}></div>
                Creando usuario...
              </div>
            ) : (
              'Crear Usuario'
            )}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default CreateUserScreen;