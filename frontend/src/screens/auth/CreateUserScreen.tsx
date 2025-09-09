// src/screens/auth/CreateUserScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, ArrowLeft } from 'lucide-react';
import { 
  createUserStyles, 
  getInputFocusStyle, 
  getButtonHoverStyle, 
  getButtonActiveStyle,
  cssAnimations,
  backgroundGradients,
  getValidationStyle,
  isMobileDevice
} from '../../styles/auth/createUserStyles';

interface NewUser {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: string;
}

interface FormErrors {
  [key: string]: boolean;
}

const CreateUserScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(isMobileDevice());
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
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string>('');

  // Create styles with current state
  const styles = createUserStyles({ isMobile, isLoading });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    
    // Clear field-specific error
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    
    if (!formData.username.trim()) {
      errors.username = true;
      return { isValid: false, message: 'El nombre de usuario es requerido', errors };
    }
    
    if (!formData.email.trim()) {
      errors.email = true;
      return { isValid: false, message: 'El email es requerido', errors };
    }
    
    if (!formData.email.includes('@')) {
      errors.email = true;
      return { isValid: false, message: 'Email inválido', errors };
    }
    
    if (!formData.password.trim()) {
      errors.password = true;
      return { isValid: false, message: 'La contraseña es requerida', errors };
    }
    
    if (formData.password.length < 6) {
      errors.password = true;
      return { isValid: false, message: 'La contraseña debe tener al menos 6 caracteres', errors };
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = true;
      return { isValid: false, message: 'Las contraseñas no coinciden', errors };
    }
    
    if (!formData.name.trim()) {
      errors.name = true;
      return { isValid: false, message: 'El nombre es requerido', errors };
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = true;
      return { isValid: false, message: 'El apellido es requerido', errors };
    }
    
    if (!formData.role) {
      errors.role = true;
      return { isValid: false, message: 'Selecciona un rol', errors };
    }
    
    return { isValid: true, message: '', errors };
  };

  const handleCreateUser = async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.message);
      setFieldErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setError('');
    setFieldErrors({});

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
        setFieldErrors({ username: true });
        setIsLoading(false);
        return;
      }

      if (existingUsers.some((user: NewUser) => user.email === newUser.email)) {
        setError('El email ya está registrado');
        setFieldErrors({ email: true });
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

  const handleInputFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleInputBlur = () => {
    setFocusedField('');
  };

  const getInputStyle = (field: string) => ({
    ...styles.input,
    ...(focusedField === field ? getInputFocusStyle() : {}),
    ...getValidationStyle(fieldErrors[field] || false)
  });

  const getPasswordInputStyle = (field: string) => ({
    ...styles.passwordInput,
    ...(focusedField === field ? getInputFocusStyle() : {}),
    ...getValidationStyle(fieldErrors[field] || false)
  });

  const getSelectStyle = () => ({
    ...styles.select,
    ...(focusedField === 'role' ? getInputFocusStyle() : {}),
    ...getValidationStyle(fieldErrors.role || false)
  });

  const BackgroundSVG = () => (
    <div style={styles.backgroundDecorative}>
      <svg style={styles.backgroundSvg} viewBox="0 0 1200 800">
        <polygon points="100,100 300,100 200,50" fill="url(#grad1)" />
        <polygon points="800,200 1000,300 700,300" fill="url(#grad2)" />
        <line x1="0" y1="200" x2="400" y2="0" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" />
        <line x1="800" y1="0" x2="1200" y2="300" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" />
        <defs>
          <linearGradient 
            id={backgroundGradients.grad1.id} 
            x1={backgroundGradients.grad1.x1} 
            y1={backgroundGradients.grad1.y1} 
            x2={backgroundGradients.grad1.x2} 
            y2={backgroundGradients.grad1.y2}
          >
            {backgroundGradients.grad1.stops.map((stop, index) => (
              <stop 
                key={index}
                offset={stop.offset} 
                style={{stopColor: stop.stopColor, stopOpacity: stop.stopOpacity}} 
              />
            ))}
          </linearGradient>
          <linearGradient 
            id={backgroundGradients.grad2.id} 
            x1={backgroundGradients.grad2.x1} 
            y1={backgroundGradients.grad2.y1} 
            x2={backgroundGradients.grad2.x2} 
            y2={backgroundGradients.grad2.y2}
          >
            {backgroundGradients.grad2.stops.map((stop, index) => (
              <stop 
                key={index}
                offset={stop.offset} 
                style={{stopColor: stop.stopColor, stopOpacity: stop.stopOpacity}} 
              />
            ))}
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  const PasswordToggleButton = ({ 
    isVisible, 
    onToggle, 
    field 
  }: { 
    isVisible: boolean; 
    onToggle: () => void; 
    field: string;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      style={{
        ...styles.passwordToggle,
        ...getValidationStyle(fieldErrors[field] || false)
      }}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, styles.passwordToggleHover);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, styles.passwordToggle);
      }}
    >
      {isVisible ? 
        <EyeOff size={isMobile ? 18 : 20} color="#1e293b" /> : 
        <Eye size={isMobile ? 18 : 20} color="#1e293b" />
      }
    </button>
  );

  return (
    <div style={styles.container}>
      <BackgroundSVG />

      {/* Contenido */}
      <div style={styles.content}>
        
        {/* Header */}
        <div style={styles.header}>
          <button 
            style={styles.backButton}
            onClick={() => navigate('/login')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.backButtonHover)}
            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
          >
            <ArrowLeft size={20} style={{marginRight: '0.5rem'}} />
            Volver al login
          </button>

          <div style={styles.titleContainer}>
            {/* Triángulos superiores */}
            <div style={styles.topTriangleLeft}></div>
            <div style={styles.topTriangleRight}></div>

            <User size={isMobile ? 40 : 48} style={styles.titleIcon} />
            <h1 style={styles.title}>
              Crear Usuario
            </h1>
            <p style={styles.subtitle}>
              Únete a CycleAI
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div style={styles.formContainer}>
          
          {/* Nombre y Apellido */}
          <div style={styles.flexFieldGroup}>
            <div style={styles.flexField}>
              <label style={styles.label}>Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onFocus={() => handleInputFocus('name')}
                onBlur={handleInputBlur}
                style={getInputStyle('name')}
                placeholder="Tu nombre"
              />
            </div>
            <div style={styles.flexField}>
              <label style={styles.label}>Apellido</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onFocus={() => handleInputFocus('lastName')}
                onBlur={handleInputBlur}
                style={getInputStyle('lastName')}
                placeholder="Tu apellido"
              />
            </div>
          </div>

          {/* Usuario */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Nombre de usuario</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              onFocus={() => handleInputFocus('username')}
              onBlur={handleInputBlur}
              style={getInputStyle('username')}
              placeholder="usuario123"
            />
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => handleInputFocus('email')}
              onBlur={handleInputBlur}
              style={getInputStyle('email')}
              placeholder="tu@email.com"
            />
          </div>

          {/* Rol */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Rol</label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              onFocus={() => handleInputFocus('role')}
              onBlur={handleInputBlur}
              style={getSelectStyle()}
            >
              <option value="">Selecciona tu rol</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Contraseñas */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.passwordGroup}>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onFocus={() => handleInputFocus('password')}
                onBlur={handleInputBlur}
                style={getPasswordInputStyle('password')}
                placeholder="Mínimo 6 caracteres"
              />
              <PasswordToggleButton
                isVisible={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
                field="password"
              />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Confirmar contraseña</label>
            <div style={styles.passwordGroup}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                onFocus={() => handleInputFocus('confirmPassword')}
                onBlur={handleInputBlur}
                style={getPasswordInputStyle('confirmPassword')}
                placeholder="Repite la contraseña"
              />
              <PasswordToggleButton
                isVisible={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                field="confirmPassword"
              />
            </div>
          </div>

          {/* Mensajes */}
          {error && (
            <div style={{
              ...styles.messageBase,
              ...styles.errorMessage,
              ...styles.fadeIn
            }}>
              {error}
            </div>
          )}
          
          {success && (
            <div style={{
              ...styles.messageBase,
              ...styles.successMessage,
              ...styles.fadeIn
            }}>
              {success}
            </div>
          )}

          {/* Botón crear */}
          <button
            onClick={handleCreateUser}
            disabled={isLoading}
            style={styles.primaryButton}
            onMouseEnter={(e) => {
              if (!isLoading) {
                Object.assign(e.currentTarget.style, getButtonHoverStyle(isLoading));
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                Object.assign(e.currentTarget.style, {
                  transform: 'scale(1)',
                  boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)'
                });
              }
            }}
            onMouseDown={(e) => {
              if (!isLoading) {
                Object.assign(e.currentTarget.style, getButtonActiveStyle(isLoading));
              }
            }}
            onMouseUp={(e) => {
              if (!isLoading) {
                Object.assign(e.currentTarget.style, getButtonHoverStyle(isLoading));
              }
            }}
          >
            {isLoading ? (
              <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                Creando usuario...
              </div>
            ) : (
              'Crear Usuario'
            )}
          </button>

          {/* Información adicional */}
          {!success && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                margin: 0,
                textAlign: 'center',
                lineHeight: '1.4'
              }}>
                Al crear una cuenta, aceptas nuestros términos de servicio y política de privacidad.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {cssAnimations}
      </style>
    </div>
  );
};

export default CreateUserScreen;