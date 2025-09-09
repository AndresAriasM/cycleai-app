// src/screens/auth/ForgotPasswordScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Key, Send } from 'lucide-react';
import {
  createForgotPasswordStyles,
  getInputFocusStyle,
  getButtonHoverStyle,
  //getButtonActiveStyle,
  getSecondaryButtonHoverStyle,
  cssAnimations,
  backgroundGradients,
  getStepIconColor,
  isMobileDevice,
  getValidationStyle
} from '../../styles/auth/forgotPasswordStyles';

type RecoveryStep = 'email' | 'code' | 'newPassword' | 'success';

interface FormErrors {
  [key: string]: boolean;
}

const ForgotPasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const [currentStep, setCurrentStep] = useState<RecoveryStep>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [focusedField, setFocusedField] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  // Create styles with current state
  const styles = createForgotPasswordStyles({ isMobile, isLoading, currentStep });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clear errors when changing fields
  const clearError = (field?: string) => {
    setError('');
    if (field && fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  // Simular envío de código
  const handleSendCode = async () => {
    if (!email.trim()) {
      setError('Ingresa tu email');
      setFieldErrors({ email: true });
      return;
    }
    if (!email.includes('@')) {
      setError('Email inválido');
      setFieldErrors({ email: true });
      return;
    }

    setIsLoading(true);
    clearError();
    setFieldErrors({});

    // Verificar si el email existe en localStorage
    const users = JSON.parse(localStorage.getItem('cycleai_users') || '[]');
    const userExists = users.some((user: any) => user.email === email.toLowerCase());

    setTimeout(() => {
      if (userExists || email === 'demo@cycleai.com') {
        // Generar código de 6 dígitos
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        console.log(`Código enviado a ${email}: ${code}`); // Para demo
        setCurrentStep('code');
      } else {
        setError('No encontramos una cuenta asociada a este email');
        setFieldErrors({ email: true });
      }
      setIsLoading(false);
    }, 1500);
  };

  // Verificar código
  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setError('Ingresa el código de verificación');
      setFieldErrors({ code: true });
      return;
    }

    setIsLoading(true);
    clearError();
    setFieldErrors({});

    setTimeout(() => {
      if (verificationCode === generatedCode || verificationCode === '123456') { // 123456 para demo
        setCurrentStep('newPassword');
      } else {
        setError('Código incorrecto. Intenta de nuevo');
        setFieldErrors({ code: true });
      }
      setIsLoading(false);
    }, 800);
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    const errors: FormErrors = {};
    
    if (!newPassword.trim()) {
      errors.newPassword = true;
      setError('Ingresa la nueva contraseña');
      setFieldErrors(errors);
      return;
    }
    if (newPassword.length < 6) {
      errors.newPassword = true;
      setError('La contraseña debe tener al menos 6 caracteres');
      setFieldErrors(errors);
      return;
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = true;
      setError('Las contraseñas no coinciden');
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    clearError();
    setFieldErrors({});

    setTimeout(() => {
      // Actualizar contraseña en localStorage
      const users = JSON.parse(localStorage.getItem('cycleai_users') || '[]');
      const updatedUsers = users.map((user: any) => 
        user.email === email.toLowerCase() 
          ? { ...user, password: newPassword }
          : user
      );
      localStorage.setItem('cycleai_users', JSON.stringify(updatedUsers));
      
      setCurrentStep('success');
      setIsLoading(false);
    }, 1000);
  };

  // Handle input focus and blur
  const handleInputFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleInputBlur = () => {
    setFocusedField('');
  };

  // Get input styles with focus and error states
  const getInputStyle = (field: string) => ({
    ...styles.input,
    ...(focusedField === field ? getInputFocusStyle() : {}),
    ...getValidationStyle(fieldErrors[field] || false)
  });

  const getCodeInputStyle = () => ({
    ...styles.codeInput,
    ...(focusedField === 'code' ? getInputFocusStyle() : {}),
    ...getValidationStyle(fieldErrors.code || false)
  });

  const getPasswordInputStyle = (field: string) => ({
    ...styles.passwordInput,
    ...(focusedField === field ? getInputFocusStyle() : {}),
    ...getValidationStyle(fieldErrors[field] || false)
  });

  // Background SVG Component
  const BackgroundSVG = () => (
    <div style={styles.backgroundDecorative}>
      <svg style={styles.backgroundSvg} viewBox="0 0 1200 800">
        <polygon points="100,100 300,100 200,50" fill="url(#grad1)" />
        <polygon points="800,200 1000,300 700,300" fill="url(#grad2)" />
        <circle cx="200" cy="600" r="100" fill="url(#grad3)" opacity="0.5" />
        <circle cx="1000" cy="200" r="80" fill="url(#grad4)" opacity="0.3" />
        <defs>
          {Object.entries(backgroundGradients).map(([key, gradient]) => (
            <linearGradient key={key} id={gradient.id}>
              {gradient.stops.map((stop, index) => (
                <stop 
                  key={index}
                  offset={stop.offset} 
                  stopColor={stop.stopColor} 
                  stopOpacity={stop.stopOpacity} 
                />
              ))}
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );

  // Step Indicator Component
  const StepIndicator = () => (
    <div style={styles.stepIndicator}>
      {[1, 2, 3].map((step, index) => {
        const isActive = (
          (currentStep === 'email' && index === 0) ||
          (currentStep === 'code' && index === 1) ||
          (currentStep === 'newPassword' && index === 2)
        );
        const isCompleted = (
          (currentStep === 'code' && index === 0) ||
          (currentStep === 'newPassword' && index < 2) ||
          (currentStep === 'success' && index < 3)
        );
        
        return (
          <div key={step} style={styles.stepDot(isActive, isCompleted)} />
        );
      })}
    </div>
  );

  // Error Message Component
  const ErrorMessage = () => error ? (
    <div style={{...styles.errorMessage, ...styles.fadeIn}}>
      {error}
    </div>
  ) : null;

  // Demo Info Component
  const DemoInfo = ({ text, highlight }: { text: string; highlight: string }) => (
    <div style={styles.demoInfo}>
      {text} <span style={styles.demoHighlight}>{highlight}</span>
    </div>
  );

  // Renderizar pasos
  const renderStepContent = () => {
    switch (currentStep) {
      case 'email':
        return (
          <>
            <StepIndicator />

            <div style={styles.stepHeader}>
              <Mail 
                size={isMobile ? 40 : 48} 
                style={styles.stepIcon(getStepIconColor('email'))} 
              />
              <h2 style={styles.stepTitle}>
                Recuperar Contraseña
              </h2>
              <p style={styles.stepDescription}>
                Ingresa tu email y te enviaremos un código de verificación para restablecer tu contraseña
              </p>
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value); clearError('email');}}
              onFocus={() => handleInputFocus('email')}
              onBlur={handleInputBlur}
              style={getInputStyle('email')}
              placeholder="tu@email.com"
              autoFocus
            />

            <ErrorMessage />

            <button
              onClick={handleSendCode}
              disabled={isLoading}
              style={styles.primaryButton()}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, getButtonHoverStyle(isLoading));
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, {
                  transform: 'scale(1)',
                  boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)'
                });
              }}
            >
              {isLoading ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.loadingSpinner} />
                  Enviando código...
                </div>
              ) : (
                <>
                  <Send size={20} />
                  Enviar código
                </>
              )}
            </button>

            <DemoInfo 
              text="Para demo, usa:" 
              highlight="demo@cycleai.com" 
            />
          </>
        );

      case 'code':
        return (
          <>
            <StepIndicator />

            <div style={styles.stepHeader}>
              <AlertCircle 
                size={isMobile ? 40 : 48} 
                style={styles.stepIcon(getStepIconColor('code'))} 
              />
              <h2 style={styles.stepTitle}>
                Código Enviado
              </h2>
              <p style={styles.stepDescription}>
                Enviamos un código de 6 dígitos a <br />
                <span style={styles.stepDescriptionHighlight}>{email}</span>
              </p>
            </div>

            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6)); 
                clearError('code');
              }}
              onFocus={() => handleInputFocus('code')}
              onBlur={handleInputBlur}
              style={getCodeInputStyle()}
              placeholder="000000"
              maxLength={6}
              autoFocus
            />

            <ErrorMessage />

            <button
              onClick={handleVerifyCode}
              disabled={isLoading || verificationCode.length !== 6}
              style={styles.primaryButton(verificationCode.length !== 6)}
              onMouseEnter={(e) => {
                if (verificationCode.length === 6) {
                  Object.assign(e.currentTarget.style, getButtonHoverStyle(isLoading, verificationCode.length !== 6));
                }
              }}
              onMouseLeave={(e) => {
                if (verificationCode.length === 6) {
                  Object.assign(e.currentTarget.style, {
                    transform: 'scale(1)',
                    boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)'
                  });
                }
              }}
            >
              {isLoading ? 'Verificando...' : 'Verificar código'}
            </button>

            <button
              onClick={() => handleSendCode()}
              style={styles.secondaryButton}
              disabled={isLoading}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, getSecondaryButtonHoverStyle(isLoading));
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                });
              }}
            >
              Reenviar código
            </button>

            <DemoInfo 
              text="Para demo, usa:" 
              highlight="123456 o el código mostrado en consola" 
            />
          </>
        );

      case 'newPassword':
        return (
          <>
            <StepIndicator />

            <div style={styles.stepHeader}>
              <Key 
                size={isMobile ? 40 : 48} 
                style={styles.stepIcon(getStepIconColor('newPassword'))} 
              />
              <h2 style={styles.stepTitle}>
                Nueva Contraseña
              </h2>
              <p style={styles.stepDescription}>
                Crea una nueva contraseña segura para tu cuenta
              </p>
            </div>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => {setNewPassword(e.target.value); clearError('newPassword');}}
              onFocus={() => handleInputFocus('newPassword')}
              onBlur={handleInputBlur}
              style={getPasswordInputStyle('newPassword')}
              placeholder="Nueva contraseña (mín. 6 caracteres)"
              autoFocus
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {setConfirmPassword(e.target.value); clearError('confirmPassword');}}
              onFocus={() => handleInputFocus('confirmPassword')}
              onBlur={handleInputBlur}
              style={getPasswordInputStyle('confirmPassword')}
              placeholder="Confirmar nueva contraseña"
            />

            <ErrorMessage />

            <button
              onClick={handleChangePassword}
              disabled={isLoading}
              style={styles.primaryButton()}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, getButtonHoverStyle(isLoading));
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, {
                  transform: 'scale(1)',
                  boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)'
                });
              }}
            >
              {isLoading ? 'Actualizando...' : 'Cambiar contraseña'}
            </button>
          </>
        );

      case 'success':
        return (
          <>
            <div style={styles.stepHeader}>
              <CheckCircle 
                size={isMobile ? 56 : 64} 
                style={styles.successIcon} 
              />
              <h2 style={styles.successTitle}>
                ¡Contraseña actualizada!
              </h2>
              <p style={styles.successDescription}>
                Tu contraseña ha sido cambiada exitosamente. <br />
                Ahora puedes iniciar sesión con tu nueva contraseña.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              style={styles.primaryButton()}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, getButtonHoverStyle(false));
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, {
                  transform: 'scale(1)',
                  boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)'
                });
              }}
            >
              Ir al login
            </button>
          </>
        );

      default:
        return null;
    }
  };

  const handleBackClick = () => {
    if (currentStep === 'email') {
      navigate('/login');
    } else {
      setCurrentStep('email');
      setError('');
      setFieldErrors({});
    }
  };

  return (
    <div style={styles.container}>
      <BackgroundSVG />

      {/* Contenido */}
      <div style={styles.content}>
        <div style={styles.card}>
          {/* Botón volver */}
          <button 
            style={styles.backButton}
            onClick={handleBackClick}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.backButtonHover)}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
          >
            <ArrowLeft size={18} style={{marginRight: '0.5rem'}} />
            {currentStep === 'email' ? 'Login' : 'Volver'}
          </button>

          {/* Triángulos decorativos */}
          <div style={styles.topTriangleLeft}></div>
          <div style={styles.topTriangleRight}></div>

          {/* Contenido del paso actual */}
          <div style={{...styles.slideUp}}>
            {renderStepContent()}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {cssAnimations}
      </style>
    </div>
  );
};

export default ForgotPasswordScreen;