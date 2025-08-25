// src/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
}

const mockUsers: User[] = [
  { id: '1', username: 'sergio', password: '123456', name: 'Sergio Arboleda', role: 'Director de Innovación' },
  { id: '2', username: 'maria', password: '123456', name: 'María González', role: 'Analista Senior' },
  { id: '3', username: 'carlos', password: '123456', name: 'Carlos Mendez', role: 'Tech Lead' },
  { id: '4', username: 'ana', password: '123456', name: 'Ana Rodríguez', role: 'Data Scientist' }
];

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const user = mockUsers.find(
        u => u.username === username.toLowerCase() && u.password === password
      );

      if (user) {
        // Navegar al menú principal después de login exitoso
        navigate('/menu');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
      setIsLoading(false);
    }, 800);
  };

  const containerStyle: React.CSSProperties = {
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const decorativeBackgroundStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
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

  const logoContainerStyle: React.CSSProperties = {
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(25px)',
    borderRadius: '32px',
    padding: '3rem 2.5rem',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    marginBottom: '3rem',
    width: '100%',
    maxWidth: '380px',
    position: 'relative'
  };

  const logoInnerStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%)',
    borderRadius: '20px',
    padding: '2.5rem',
    textAlign: 'center',
    border: '2px solid rgba(79, 70, 229, 0.5)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  };

  const logoStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
    marginBottom: '1rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
    letterSpacing: '0.05em'
  };

  const formContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '320px'
  };

  const fieldGroupStyle: React.CSSProperties = {
    marginBottom: '1.5rem'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '0.75rem',
    letterSpacing: '0.025em'
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
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
  };

  const inputFocusStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: '#06b6d4',
    boxShadow: '0 0 0 4px rgba(6, 182, 212, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.3)'
  };

  const passwordContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.75rem'
  };

  const eyeButtonStyle: React.CSSProperties = {
    padding: '1.25rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '1.25rem 2rem',
    background: isLoading 
      ? '#64748b' 
      : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    borderRadius: '16px',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)',
    letterSpacing: '0.025em',
    transform: isLoading ? 'none' : 'scale(1)',
    marginTop: '2rem'
  };

  const linkStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    textAlign: 'center'
  };

  const errorStyle: React.CSSProperties = {
    background: 'rgba(127, 29, 29, 0.4)',
    border: '2px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '16px',
    padding: '1rem',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    marginBottom: '1rem'
  };

  const errorTextStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: '600',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      {/* Fondo decorativo */}
      <div style={decorativeBackgroundStyle}>
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
        
        {/* Líneas verticales */}
        <div style={{
          position: 'absolute',
          left: '2rem',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.3), transparent)'
        }}></div>
        <div style={{
          position: 'absolute',
          right: '2rem',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.3), transparent)'
        }}></div>
      </div>

      {/* Contenido */}
      <div style={contentStyle}>
        {/* Logo */}
        <div style={logoContainerStyle}>
          {/* Solo triángulos decorativos superiores pegados al contenido */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '20px',
            width: '0',
            height: '0',
            borderLeft: '25px solid transparent',
            borderRight: '25px solid transparent',
            borderBottom: '40px solid rgba(6, 182, 212, 0.4)',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
          }}></div>
          
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '20px',
            width: '0',
            height: '0',
            borderLeft: '25px solid transparent',
            borderRight: '25px solid transparent',
            borderBottom: '40px solid rgba(139, 92, 246, 0.4)',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
          }}></div>
          
          <div style={logoInnerStyle}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <img 
                src="/src/assets/logo/logo.png" 
                alt="CycleAI" 
                style={{...logoStyle, width: '120px', height: '120px'}}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.style.cssText = 'width: 120px; height: 120px; background: linear-gradient(135deg, #06b6d4, #3b82f6); border-radius: 20px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 3rem; margin: 0 auto; box-shadow: 0 8px 32px rgba(6, 182, 212, 0.3);';
                  fallback.textContent = 'CA';
                  target.parentElement?.appendChild(fallback);
                }}
              />
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div style={formContainerStyle}>
          {/* Usuario */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              placeholder="Ingrese su usuario"
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          {/* Contraseña */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Contraseña</label>
            <div style={passwordContainerStyle}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{...inputStyle, flex: 1}}
                placeholder="Ingrese su contraseña"
                onFocus={(e) => Object.assign(e.target.style, {...inputFocusStyle, flex: 1})}
                onBlur={(e) => Object.assign(e.target.style, {...inputStyle, flex: 1})}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
              >
                {showPassword ? <EyeOff size={24} color="#1e293b" /> : <Eye size={24} color="#1e293b" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={errorStyle}>
              <p style={errorTextStyle}>{error}</p>
            </div>
          )}

          {/* Botón */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'scale(1.05)';
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
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>

          {/* Enlaces */}
          <div style={{textAlign: 'center', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <a 
              style={linkStyle}
              onClick={() => navigate('/forgot-password')}
              onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              ¿Olvidó su contraseña?
            </a>
            <a 
              style={{...linkStyle, fontSize: '1rem', fontWeight: '500'}}
              onClick={() => navigate('/create-user')}
              onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              ¿No tienes cuenta? <span style={{color: '#67e8f9', fontWeight: '600'}}>Crear usuario</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;