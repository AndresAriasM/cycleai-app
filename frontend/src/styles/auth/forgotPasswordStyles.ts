// frontend/src/styles/auth/forgotPasswordStyles.ts
import type { CSSProperties } from 'react';

interface StylesConfig {
  isMobile?: boolean;
  isLoading?: boolean;
  currentStep?: 'email' | 'code' | 'newPassword' | 'success';
}

export const createForgotPasswordStyles = ({ 
  isMobile = false, 
  isLoading = false, 
  //currentStep = 'email' 
}: StylesConfig = {}) => ({
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
  backgroundDecorative: {
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
    opacity: 0.08
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

  // Main Card
  card: {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(25px)',
    borderRadius: isMobile ? '20px' : '24px',
    padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    width: '100%',
    maxWidth: isMobile ? '360px' : '420px',
    position: 'relative',
    textAlign: 'center' as const
  } as CSSProperties,

  // Back Button
  backButton: {
    position: 'absolute',
    top: isMobile ? '1rem' : '1.5rem',
    left: isMobile ? '1rem' : '1.5rem',
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    zIndex: 20,
    background: 'none',
    border: 'none',
    padding: 0
  } as CSSProperties,

  // Decorative Triangles
  topTriangleLeft: {
    position: 'absolute',
    top: '-20px',
    left: '20px',
    width: '0',
    height: '0',
    borderLeft: '18px solid transparent',
    borderRight: '18px solid transparent',
    borderBottom: '25px solid rgba(6, 182, 212, 0.4)'
  } as CSSProperties,

  topTriangleRight: {
    position: 'absolute',
    top: '-20px',
    right: '20px',
    width: '0',
    height: '0',
    borderLeft: '18px solid transparent',
    borderRight: '18px solid transparent',
    borderBottom: '25px solid rgba(139, 92, 246, 0.4)'
  } as CSSProperties,

  // Step Indicator
  stepIndicator: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
    gap: '0.5rem'
  } as CSSProperties,

  stepDot: (active: boolean, completed: boolean) => ({
    width: isMobile ? '10px' : '12px',
    height: isMobile ? '10px' : '12px',
    borderRadius: '50%',
    background: completed ? '#10b981' : active ? '#06b6d4' : 'rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
    boxShadow: active || completed ? '0 0 0 3px rgba(6, 182, 212, 0.2)' : 'none'
  } as CSSProperties),

  // Step Content Headers
  stepHeader: {
    marginBottom: '2rem'
  } as CSSProperties,

  stepIcon: (color: string) => ({
    color: color,
    marginBottom: '1rem'
  } as CSSProperties),

  stepTitle: {
    fontSize: isMobile ? '1.5rem' : '1.8rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
    margin: 0
  } as CSSProperties,

  stepDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: isMobile ? '0.9rem' : '1rem',
    lineHeight: '1.5',
    margin: 0
  } as CSSProperties,

  stepDescriptionHighlight: {
    color: '#06b6d4',
    fontWeight: 'bold'
  } as CSSProperties,

  // Form Inputs
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
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.3)',
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    boxSizing: 'border-box' as const
  } as CSSProperties,

  // Code Input (special styling)
  codeInput: {
    width: '100%',
    padding: isMobile ? '1rem 1.25rem' : '1.25rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: '500',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.3)',
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    letterSpacing: '0.5rem',
    boxSizing: 'border-box' as const
  } as CSSProperties,

  // Password Inputs
  passwordInput: {
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
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.3)',
    marginBottom: '1.5rem',
    boxSizing: 'border-box' as const
  } as CSSProperties,

  // Buttons
  primaryButton: (disabled = false) => ({
    width: '100%',
    padding: isMobile ? '1rem 1.5rem' : '1.25rem 2rem',
    background: isLoading || disabled
      ? '#64748b' 
      : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    color: 'white',
    fontSize: isMobile ? '1rem' : '1.125rem',
    fontWeight: 'bold',
    borderRadius: '16px',
    border: 'none',
    cursor: isLoading || disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)',
    letterSpacing: '0.025em',
    marginBottom: '1.5rem',
    opacity: disabled ? 0.6 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  } as CSSProperties),

  secondaryButton: {
    width: '100%',
    padding: isMobile ? '1rem 1.5rem' : '1.25rem 2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    color: 'white',
    fontSize: isMobile ? '1rem' : '1.125rem',
    fontWeight: 'bold',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.2)',
    letterSpacing: '0.025em',
    marginBottom: '1.5rem'
  } as CSSProperties,

  // Loading Spinner
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  } as CSSProperties,

  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '0.5rem'
  } as CSSProperties,

  // Error Message
  errorMessage: {
    background: 'rgba(127, 29, 29, 0.4)',
    border: '2px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '12px',
    padding: isMobile ? '0.875rem' : '1rem',
    marginBottom: '1.5rem',
    color: 'white',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '500'
  } as CSSProperties,

  // Demo Info
  demoInfo: {
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '1.4'
  } as CSSProperties,

  demoHighlight: {
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)'
  } as CSSProperties,

  // Success Screen Specific
  successIcon: {
    color: '#10b981',
    marginBottom: '1.5rem'
  } as CSSProperties,

  successTitle: {
    fontSize: isMobile ? '1.7rem' : '2rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem',
    margin: 0
  } as CSSProperties,

  successDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: isMobile ? '1rem' : '1.1rem',
    lineHeight: '1.6',
    margin: 0
  } as CSSProperties,

  // Hover Effects
  backButtonHover: {
    color: '#67e8f9'
  } as CSSProperties,

  buttonHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 20px 40px -5px rgba(6, 182, 212, 0.4)'
  } as CSSProperties,

  buttonActive: {
    transform: 'scale(0.98)'
  } as CSSProperties,

  inputFocus: {
    borderColor: '#06b6d4',
    boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.1), 0 8px 20px -5px rgba(0, 0, 0, 0.3)'
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
  boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.1), 0 8px 20px -5px rgba(0, 0, 0, 0.3)'
});

export const getButtonHoverStyle = (isLoading: boolean, disabled = false) => {
  if (isLoading || disabled) return {};
  return {
    transform: 'scale(1.02)',
    boxShadow: '0 20px 40px -5px rgba(6, 182, 212, 0.4)'
  };
};

export const getButtonActiveStyle = (isLoading: boolean, disabled = false) => {
  if (isLoading || disabled) return {};
  return {
    transform: 'scale(0.98)'
  };
};

export const getSecondaryButtonHoverStyle = (isLoading: boolean) => {
  if (isLoading) return {};
  return {
    background: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.5)'
  };
};

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
      transform: scale(1.05); 
      opacity: 0.8; 
    }
  }
`;

// SVG Background Gradients
export const backgroundGradients = {
  grad1: {
    id: 'grad1',
    stops: [
      { offset: '0%', stopColor: '#06b6d4', stopOpacity: 0.3 },
      { offset: '100%', stopColor: '#3b82f6', stopOpacity: 0.1 }
    ]
  },
  grad2: {
    id: 'grad2',
    stops: [
      { offset: '0%', stopColor: '#8b5cf6', stopOpacity: 0.3 },
      { offset: '100%', stopColor: '#06b6d4', stopOpacity: 0.1 }
    ]
  },
  grad3: {
    id: 'grad3',
    stops: [
      { offset: '0%', stopColor: '#f59e0b', stopOpacity: 0.2 },
      { offset: '100%', stopColor: '#ef4444', stopOpacity: 0.1 }
    ]
  },
  grad4: {
    id: 'grad4',
    stops: [
      { offset: '0%', stopColor: '#10b981', stopOpacity: 0.2 },
      { offset: '100%', stopColor: '#06b6d4', stopOpacity: 0.1 }
    ]
  }
};

// Step-specific icon colors
export const getStepIconColor = (step: string) => {
  switch (step) {
    case 'email': return '#06b6d4';
    case 'code': return '#f59e0b';
    case 'newPassword': return '#8b5cf6';
    case 'success': return '#10b981';
    default: return '#06b6d4';
  }
};

// Mobile breakpoint helper
export const isMobileDevice = () => window.innerWidth < 768;

// Form validation styles
export const getValidationStyle = (hasError: boolean) => ({
  borderColor: hasError ? '#ef4444' : 'rgba(255, 255, 255, 0.5)',
  boxShadow: hasError 
    ? '0 0 0 3px rgba(239, 68, 68, 0.1), 0 8px 20px -5px rgba(0, 0, 0, 0.3)'
    : '0 8px 20px -5px rgba(0, 0, 0, 0.3)'
});