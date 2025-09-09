// src/screens/auth/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import {
  createLoginStyles,
  getInputFocusStyle,
  getPasswordInputFocusStyle,
  getButtonHoverStyle,
  getButtonActiveStyle,
  getEyeButtonHoverStyle,
  getLinkHoverStyle,
  cssAnimations,
  backgroundGradients,
  getValidationStyle,
  isMobileDevice,
  mockUsers,
  type User
} from '../../styles/auth/loginStyles';

interface FormErrors {
  username?: boolean;
  password?: boolean;
}

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string>('');

  // Create styles with current state
  const styles = createLoginStyles({ isMobile, isLoading });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clear errors when typing
  const clearError = (field?: string) => {
    setError('');
    if (field && fieldErrors[field as keyof FormErrors]) {
      setFieldErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    
    if (!username.trim()) {
      errors.username = true;
      return { isValid: false, message: 'Ingrese su usuario', errors };
    }
    
    if (!password.trim()) {
      errors.password = true;
      return { isValid: false, message: 'Ingrese su contraseña', errors };
    }
    
    return { isValid: true, message: '', errors: {} };
  };

  const handleLogin = async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.message);
      setFieldErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setError('');
    setFieldErrors({});

    // Simulate network delay
    setTimeout(() => {
      // Check localStorage users first
      const savedUsers = JSON.parse(localStorage.getItem('cycleai_users') || '[]');
      const allUsers = [...mockUsers, ...savedUsers];
      
      const user = allUsers.find(
        (u: User) => u.username === username.toLowerCase() && u.password === password
      );

      if (user) {
        // Store current user session
        localStorage.setItem('cycleai_current_user', JSON.stringify(user));
        // Navigate to main menu after successful login
        navigate('/menu');
      } else {
        setError('Usuario o contraseña incorrectos');
        setFieldErrors({ username: true, password: true });
      }
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Handle input focus and blur
  const handleInputFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleInputBlur = () => {
    setFocusedField('');
  };

  // Get input styles with focus and error states
  const getUsernameInputStyle = () => ({
    ...styles.input,
    ...(focusedField === 'username' ? getInputFocusStyle() : {}),
    ...getValidationStyle(fieldErrors.username || false)
  });

  const getPasswordInputStyle = () => ({
    ...styles.passwordInput,
    ...(focusedField === 'password' ? getPasswordInputFocusStyle() : {}),
    ...getValidationStyle(fieldErrors.password || false)
  });

  // Background SVG Component
  const BackgroundSVG = () => (
    <div style={styles.decorativeBackground}>
      <svg style={styles.backgroundSvg} viewBox="0 0 1200 800">
        <polygon points="100,100 300,100 200,50" fill="url(#grad1)" />
        <polygon points="800,200 1000,300 700,300" fill="url(#grad2)" />
        <line x1="0" y1="200" x2="400" y2="0" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" />
        <line x1="800" y1="0" x2="1200" y2="300" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" />
        <defs>
          {Object.entries(backgroundGradients).map(([key, gradient]) => (
            <linearGradient 
              key={key}
              id={gradient.id} 
              x1={gradient.x1} 
              y1={gradient.y1} 
              x2={gradient.x2} 
              y2={gradient.y2}
            >
              {gradient.stops.map((stop, index) => (
                <stop 
                  key={index}
                  offset={stop.offset} 
                  style={{stopColor: stop.stopColor, stopOpacity: stop.stopOpacity}} 
                />
              ))}
            </linearGradient>
          ))}
        </defs>
      </svg>
      
      {/* Vertical Lines */}
      <div style={styles.verticalLineLeft}></div>
      <div style={styles.verticalLineRight}></div>
    </div>
  );

  // Logo Component with fallback
  const LogoComponent = () => {
    const [logoError, setLogoError] = useState(false);

    const handleLogoError = () => {
      setLogoError(true);
    };

    return (
      <div style={styles.logoImageContainer}>
        {!logoError ? (
          <img 
            src="/src/assets/logo/logo.png" 
            alt="CycleAI" 
            style={styles.logoImage}
            onError={handleLogoError}
          />
        ) : (
          <div style={styles.logoFallback}>
            CA
          </div>
        )}
      </div>
    );
  };

  // Password Toggle Button Component
  const PasswordToggleButton = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      style={styles.eyeButton}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, getEyeButtonHoverStyle());
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, styles.eyeButton);
      }}
    >
      {showPassword ? 
        <EyeOff size={isMobile ? 20 : 24} color="#1e293b" /> : 
        <Eye size={isMobile ? 20 : 24} color="#1e293b" />
      }
    </button>
  );

  // Error Message Component
  const ErrorMessage = () => error ? (
    <div style={{...styles.errorContainer, ...styles.fadeIn}}>
      <p style={styles.errorText}>{error}</p>
    </div>
  ) : null;

  // Demo Info Component
  const DemoInfo = () => (
    <div style={{
      marginTop: '1rem',
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
        <strong>Demo:</strong> Usuarios disponibles: sergio, maria, carlos, ana<br />
        <strong>Contraseña:</strong> 123456
      </p>
    </div>
  );

  return (
    <div style={styles.container}>
      <BackgroundSVG />

      {/* Main Content */}
      <div style={styles.content}>
        {/* Logo Section */}
        <div style={styles.logoContainer}>
          {/* Decorative Triangles */}
          <div style={styles.topTriangleLeft}></div>
          <div style={styles.topTriangleRight}></div>
          
          <div style={styles.logoInner}>
            <LogoComponent />
          </div>
        </div>

        {/* Login Form */}
        <div style={styles.formContainer}>
          {/* Username Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {setUsername(e.target.value); clearError('username');}}
              onFocus={() => handleInputFocus('username')}
              onBlur={handleInputBlur}
              onKeyPress={handleKeyPress}
              style={getUsernameInputStyle()}
              placeholder="Ingrese su usuario"
              autoComplete="username"
            />
          </div>

          {/* Password Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {setPassword(e.target.value); clearError('password');}}
                onFocus={() => handleInputFocus('password')}
                onBlur={handleInputBlur}
                onKeyPress={handleKeyPress}
                style={getPasswordInputStyle()}
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
              />
              <PasswordToggleButton />
            </div>
          </div>

          {/* Error Message */}
          <ErrorMessage />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={styles.loginButton}
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
                Ingresando...
              </div>
            ) : (
              'Ingresar'
            )}
          </button>

          {/* Links Section */}
          <div style={styles.linksContainer}>
            <button 
              style={styles.primaryLink}
              onClick={() => navigate('/forgot-password')}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, getLinkHoverStyle())}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              ¿Olvidó su contraseña?
            </button>
            
            <button 
              style={styles.secondaryLink}
              onClick={() => navigate('/create-user')}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, getLinkHoverStyle())}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              ¿No tienes cuenta? <span style={styles.linkHighlight}>Crear usuario</span>
            </button>
          </div>

          {/* Demo Information */}
          <DemoInfo />
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {cssAnimations}
      </style>
    </div>
  );
};

export default LoginScreen;