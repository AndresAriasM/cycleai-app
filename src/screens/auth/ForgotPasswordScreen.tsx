// src/screens/auth/ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Key, Send } from 'lucide-react';

type RecoveryStep = 'email' | 'code' | 'newPassword' | 'success';

const ForgotPasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<RecoveryStep>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Simular envío de código
  const handleSendCode = async () => {
    if (!email.trim()) {
      setError('Ingresa tu email');
      return;
    }
    if (!email.includes('@')) {
      setError('Email inválido');
      return;
    }

    setIsLoading(true);
    setError('');

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
      }
      setIsLoading(false);
    }, 1500);
  };

  // Verificar código
  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setError('Ingresa el código de verificación');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (verificationCode === generatedCode || verificationCode === '123456') { // 123456 para demo
        setCurrentStep('newPassword');
      } else {
        setError('Código incorrecto. Intenta de nuevo');
      }
      setIsLoading(false);
    }, 800);
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    if (!newPassword.trim()) {
      setError('Ingresa la nueva contraseña');
      return;
    }
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    setError('');

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

  // Estilos base
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(25px)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    width: '100%',
    maxWidth: '420px',
    position: 'relative',
    textAlign: 'center'
  };

  const backButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1.5rem',
    left: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    zIndex: 20
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1.25rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    marginBottom: '1.5rem'
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
    borderRadius: '16px',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)',
    letterSpacing: '0.025em',
    marginBottom: '1.5rem'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.2)'
  };

  const errorStyle: React.CSSProperties = {
    background: 'rgba(127, 29, 29, 0.4)',
    border: '2px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1.5rem',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '500'
  };

  const stepIndicatorStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
    gap: '0.5rem'
  };

  const stepDotStyle = (active: boolean, completed: boolean): React.CSSProperties => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: completed ? '#10b981' : active ? '#06b6d4' : 'rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
    boxShadow: active || completed ? '0 0 0 3px rgba(6, 182, 212, 0.2)' : 'none'
  });

  // Renderizar pasos
  const renderStepContent = () => {
    switch (currentStep) {
      case 'email':
        return (
          <>
            <div style={stepIndicatorStyle}>
              {[1, 2, 3].map((step, index) => (
                <div key={step} style={stepDotStyle(index === 0, false)} />
              ))}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Mail size={48} style={{ color: '#06b6d4', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                Recuperar Contraseña
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', lineHeight: '1.5' }}>
                Ingresa tu email y te enviaremos un código de verificación para restablecer tu contraseña
              </p>
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value); setError('');}}
              style={inputStyle}
              placeholder="tu@email.com"
              autoFocus
            />

            {error && <div style={errorStyle}>{error}</div>}

            <button
              onClick={handleSendCode}
              disabled={isLoading}
              style={buttonStyle}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: '20px', height: '20px', marginRight: '0.5rem',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white', borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Enviando código...
                </div>
              ) : (
                <>
                  <Send size={20} style={{ marginRight: '0.5rem' }} />
                  Enviar código
                </>
              )}
            </button>

            <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Para demo, usa: <strong>demo@cycleai.com</strong>
            </div>
          </>
        );

      case 'code':
        return (
          <>
            <div style={stepIndicatorStyle}>
              {[1, 2, 3].map((step, index) => (
                <div key={step} style={stepDotStyle(index === 1, index === 0)} />
              ))}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <AlertCircle size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                Código Enviado
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', lineHeight: '1.5' }}>
                Enviamos un código de 6 dígitos a <br />
                <strong style={{ color: '#06b6d4' }}>{email}</strong>
              </p>
            </div>

            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setError('');}}
              style={{...inputStyle, letterSpacing: '0.5rem', fontSize: '1.5rem'}}
              placeholder="000000"
              maxLength={6}
              autoFocus
            />

            {error && <div style={errorStyle}>{error}</div>}

            <button
              onClick={handleVerifyCode}
              disabled={isLoading || verificationCode.length !== 6}
              style={{...buttonStyle, opacity: verificationCode.length !== 6 ? 0.6 : 1}}
            >
              {isLoading ? 'Verificando...' : 'Verificar código'}
            </button>

            <button
              onClick={() => handleSendCode()}
              style={secondaryButtonStyle}
              disabled={isLoading}
            >
              Reenviar código
            </button>

            <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Para demo, usa: <strong>123456</strong> o el código mostrado en consola
            </div>
          </>
        );

      case 'newPassword':
        return (
          <>
            <div style={stepIndicatorStyle}>
              {[1, 2, 3].map((step, index) => (
                <div key={step} style={stepDotStyle(index === 2, index < 2)} />
              ))}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Key size={48} style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                Nueva Contraseña
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', lineHeight: '1.5' }}>
                Crea una nueva contraseña segura para tu cuenta
              </p>
            </div>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => {setNewPassword(e.target.value); setError('');}}
              style={inputStyle}
              placeholder="Nueva contraseña (mín. 6 caracteres)"
              autoFocus
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {setConfirmPassword(e.target.value); setError('');}}
              style={inputStyle}
              placeholder="Confirmar nueva contraseña"
            />

            {error && <div style={errorStyle}>{error}</div>}

            <button
              onClick={handleChangePassword}
              disabled={isLoading}
              style={buttonStyle}
            >
              {isLoading ? 'Actualizando...' : 'Cambiar contraseña'}
            </button>
          </>
        );

      case 'success':
        return (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <CheckCircle size={64} style={{ color: '#10b981', marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                ¡Contraseña actualizada!
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Tu contraseña ha sido cambiada exitosamente. <br />
                Ahora puedes iniciar sesión con tu nueva contraseña.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              style={buttonStyle}
            >
              Ir al login
            </button>
          </>
        );
    }
  };

  return (
    <div style={containerStyle}>
      {/* Fondo decorativo */}
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1}}>
        <svg style={{position: 'absolute', width: '100%', height: '100%', opacity: 0.08}} viewBox="0 0 1200 800">
          <polygon points="100,100 300,100 200,50" fill="url(#grad1)" />
          <polygon points="800,200 1000,300 700,300" fill="url(#grad2)" />
          <circle cx="200" cy="600" r="100" fill="url(#grad3)" opacity="0.5" />
          <circle cx="1000" cy="200" r="80" fill="url(#grad4)" opacity="0.3" />
          <defs>
            <linearGradient id="grad1"><stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" /></linearGradient>
            <linearGradient id="grad2"><stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" /><stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" /></linearGradient>
            <linearGradient id="grad3"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" /></linearGradient>
            <linearGradient id="grad4"><stop offset="0%" stopColor="#10b981" stopOpacity="0.2" /><stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" /></linearGradient>
          </defs>
        </svg>
      </div>

      {/* Contenido */}
      <div style={contentStyle}>
        <div style={cardStyle}>
          {/* Botón volver */}
          <div 
            style={backButtonStyle}
            onClick={() => currentStep === 'email' ? navigate('/login') : setCurrentStep('email')}
            onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
          >
            <ArrowLeft size={18} style={{marginRight: '0.5rem'}} />
            {currentStep === 'email' ? 'Login' : 'Volver'}
          </div>

          {/* Triángulos decorativos */}
          <div style={{
            position: 'absolute', top: '-20px', left: '20px', width: '0', height: '0',
            borderLeft: '18px solid transparent', borderRight: '18px solid transparent',
            borderBottom: '25px solid rgba(6, 182, 212, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute', top: '-20px', right: '20px', width: '0', height: '0',
            borderLeft: '18px solid transparent', borderRight: '18px solid transparent',
            borderBottom: '25px solid rgba(139, 92, 246, 0.4)'
          }}></div>

          {renderStepContent()}
        </div>
      </div>

      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
};

export default ForgotPasswordScreen;