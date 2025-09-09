// frontend/src/styles/auth/loginStyles.ts
import type { CSSProperties } from 'react';

interface StylesConfig {
  isMobile?: boolean;
  isLoading?: boolean;
}

export const createLoginStyles = ({ isMobile = false, isLoading = false }: StylesConfig = {}) => ({
  // Container Styles
  container: {
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #3730a3 50%, #1e40af 75%, #1e3a8a 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  } as CSSProperties,

  // Background Decorative Elements
  decorativeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  } as CSSProperties,

  backgroundSvg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1
  } as CSSProperties,

  verticalLineLeft: {
    position: 'absolute',
    left: isMobile ? '1rem' : '2rem',
    top: 0,
    bottom: 0,
    width: '1px',
    background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.3), transparent)'
  } as CSSProperties,

  verticalLineRight: {
    position: 'absolute',
    right: isMobile ? '1rem' : '2rem',
    top: 0,
    bottom: 0,
    width: '1px',
    background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.3), transparent)'
  } as CSSProperties,

  // Content Layout
  content: {
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: isMobile ? '1rem' : '2rem'
  } as CSSProperties,

  // Logo Container
  logoContainer: {
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(25px)',
    borderRadius: isMobile ? '24px' : '32px',
    padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    marginBottom: isMobile ? '2rem' : '3rem',
    width: '100%',
    maxWidth: isMobile ? '320px' : '380px',
    position: 'relative'
  } as CSSProperties,

  logoInner: {
    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%)',
    borderRadius: isMobile ? '16px' : '20px',
    padding: isMobile ? '2rem' : '2.5rem',
    textAlign: 'center' as const,
    border: '2px solid rgba(79, 70, 229, 0.5)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  } as CSSProperties,

  // Logo Decorative Triangles
  topTriangleLeft: {
    position: 'absolute',
    top: '-30px',
    left: '20px',
    width: '0',
    height: '0',
    borderLeft: isMobile ? '20px solid transparent' : '25px solid transparent',
    borderRight: isMobile ? '20px solid transparent' : '25px solid transparent',
    borderBottom: isMobile ? '30px solid rgba(6, 182, 212, 0.4)' : '40px solid rgba(6, 182, 212, 0.4)',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
  } as CSSProperties,

  topTriangleRight: {
    position: 'absolute',
    top: '-30px',
    right: '20px',
    width: '0',
    height: '0',
    borderLeft: isMobile ? '20px solid transparent' : '25px solid transparent',
    borderRight: isMobile ? '20px solid transparent' : '25px solid transparent',
    borderBottom: isMobile ? '30px solid rgba(139, 92, 246, 0.4)' : '40px solid rgba(139, 92, 246, 0.4)',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
  } as CSSProperties,

  // Logo Image
  logoImageContainer: {
    display: 'flex',
    justifyContent: 'center'
  } as CSSProperties,

  logoImage: {
    width: isMobile ? '200px' : '250px',
    height: isMobile ? '88px' : '110px',
    objectFit: 'contain' as const,
    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
    marginBottom: '1rem'
  } as CSSProperties,

  logoFallback: {
    width: isMobile ? '100px' : '120px',
    height: isMobile ? '100px' : '120px',
    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: isMobile ? '2.5rem' : '3rem',
    margin: '0 auto',
    boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3)'
  } as CSSProperties,

  // Form Styles
  formContainer: {
    width: '100%',
    maxWidth: isMobile ? '300px' : '320px'
  } as CSSProperties,

  fieldGroup: {
    marginBottom: '1.5rem'
  } as CSSProperties,

  label: {
    display: 'block',
    color: 'white',
    fontSize: isMobile ? '1.125rem' : '1.25rem',
    fontWeight: '600',
    textAlign: 'center' as const,
    marginBottom: '0.75rem',
    letterSpacing: '0.025em'
  } as CSSProperties,

  // Input Styles
  input: {
    width: '100%',
    padding: isMobile ? '1rem 1.25rem' : '1.25rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
    fontSize: isMobile ? '1rem' : '1.125rem',
    fontWeight: '500',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box' as const
  } as CSSProperties,

  inputFocus: {
    borderColor: '#06b6d4',
    boxShadow: '0 0 0 4px rgba(6, 182, 212, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.3)'
  } as CSSProperties,

  // Password Container
  passwordContainer: {
    display: 'flex',
    gap: '0.75rem'
  } as CSSProperties,

  passwordInput: {
    flex: 1,
    padding: isMobile ? '1rem 1.25rem' : '1.25rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
    fontSize: isMobile ? '1rem' : '1.125rem',
    fontWeight: '500',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box' as const
  } as CSSProperties,

  passwordInputFocus: {
    flex: 1,
    borderColor: '#06b6d4',
    boxShadow: '0 0 0 4px rgba(6, 182, 212, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.3)'
  } as CSSProperties,

  // Eye Button
  eyeButton: {
    padding: isMobile ? '1rem' : '1.25rem',
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
  } as CSSProperties,

  eyeButtonHover: {
    background: 'rgba(255, 255, 255, 1)',
    borderColor: '#06b6d4'
  } as CSSProperties,

  // Button Styles
  loginButton: {
    width: '100%',
    padding: isMobile ? '1rem 1.5rem' : '1.25rem 2rem',
    background: isLoading 
      ? '#64748b' 
      : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    color: 'white',
    fontSize: isMobile ? '1.125rem' : '1.25rem',
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
  } as CSSProperties,

  loginButtonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 20px 40px -5px rgba(6, 182, 212, 0.4)'
  } as CSSProperties,

  loginButtonActive: {
    transform: 'scale(0.98)'
  } as CSSProperties,

  // Error Message
  errorContainer: {
    background: 'rgba(127, 29, 29, 0.4)',
    border: '2px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '16px',
    padding: isMobile ? '0.875rem' : '1rem',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    marginBottom: '1rem'
  } as CSSProperties,

  errorText: {
    color: 'white',
    fontSize: isMobile ? '1rem' : '1.125rem',
    fontWeight: '600',
    textAlign: 'center' as const,
    margin: 0
  } as CSSProperties,

  // Links Container
  linksContainer: {
    textAlign: 'center' as const,
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem'
  } as CSSProperties,

  // Link Styles
  primaryLink: {
    color: 'white',
    fontSize: isMobile ? '1rem' : '1.125rem',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    textAlign: 'center' as const
  } as CSSProperties,

  secondaryLink: {
    color: 'white',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '500',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    textAlign: 'center' as const
  } as CSSProperties,

  linkHighlight: {
    color: '#67e8f9',
    fontWeight: '600'
  } as CSSProperties,

  linkHover: {
    color: '#67e8f9'
  } as CSSProperties,

  // Loading Spinner
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  } as CSSProperties,

  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  } as CSSProperties,

  // Animation Classes
  fadeIn: {
    animation: 'fadeIn 0.5s ease-in-out'
  } as CSSProperties,

  slideUp: {
    animation: 'slideUp 0.6s ease-out'
  } as CSSProperties,

  // Responsive Utilities
  hideOnMobile: isMobile ? { display: 'none' } : {} as CSSProperties,
  showOnMobile: !isMobile ? { display: 'none' } : {} as CSSProperties
});

// Helper functions for dynamic styles
export const getInputFocusStyle = () => ({
  borderColor: '#06b6d4',
  boxShadow: '0 0 0 4px rgba(6, 182, 212, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.3)'
});

export const getPasswordInputFocusStyle = () => ({
  flex: 1,
  borderColor: '#06b6d4',
  boxShadow: '0 0 0 4px rgba(6, 182, 212, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.3)'
});

export const getButtonHoverStyle = (isLoading: boolean) => {
  if (isLoading) return {};
  return {
    transform: 'scale(1.05)',
    boxShadow: '0 20px 40px -5px rgba(6, 182, 212, 0.4)'
  };
};

export const getButtonActiveStyle = (isLoading: boolean) => {
  if (isLoading) return {};
  return {
    transform: 'scale(0.98)'
  };
};

export const getEyeButtonHoverStyle = () => ({
  background: 'rgba(255, 255, 255, 1)',
  borderColor: '#06b6d4'
});

export const getLinkHoverStyle = () => ({
  color: '#67e8f9'
});

// CSS Animation Keyframes
export const cssAnimations = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @keyframes pulse {
    0%, 100% { 
      transform: scale(1); 
      opacity: 1; 
    }
    50% { 
      transform: scale(1.02); 
      opacity: 0.9; 
    }
  }
`;

// SVG Background Gradients
export const backgroundGradients = {
  grad1: {
    id: 'grad1',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '100%',
    stops: [
      { offset: '0%', stopColor: '#06b6d4', stopOpacity: 0.3 },
      { offset: '100%', stopColor: '#3b82f6', stopOpacity: 0.1 }
    ]
  },
  grad2: {
    id: 'grad2',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '100%',
    stops: [
      { offset: '0%', stopColor: '#8b5cf6', stopOpacity: 0.3 },
      { offset: '100%', stopColor: '#06b6d4', stopOpacity: 0.1 }
    ]
  }
};

// Form validation styles
export const getValidationStyle = (hasError: boolean) => ({
  borderColor: hasError ? '#ef4444' : 'rgba(255, 255, 255, 0.5)',
  boxShadow: hasError 
    ? '0 0 0 4px rgba(239, 68, 68, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.3)'
    : '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
});

// Mobile breakpoint helper
export const isMobileDevice = () => window.innerWidth < 768;

// Mock users (moved from component to styles for better organization)
export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
}

export const mockUsers: User[] = [
  { id: '1', username: 'sergio', password: '123456', name: 'Sergio Arboleda', role: 'Director de Innovación' },
  { id: '2', username: 'maria', password: '123456', name: 'María González', role: 'Analista Senior' },
  { id: '3', username: 'carlos', password: '123456', name: 'Carlos Mendez', role: 'Tech Lead' },
  { id: '4', username: 'ana', password: '123456', name: 'Ana Rodríguez', role: 'Data Scientist' }
];