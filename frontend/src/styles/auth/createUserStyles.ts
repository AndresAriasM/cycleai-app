// frontend/src/styles/auth/createUserStyles.ts
import type { CSSProperties } from 'react';

interface StylesConfig {
  isMobile?: boolean;
  isLoading?: boolean;
}

export const createUserStyles = ({ isMobile = false, isLoading = false }: StylesConfig = {}) => ({
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
    opacity: 0.1
  } as CSSProperties,

  // Content Layout
  content: {
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: isMobile ? '0.5rem' : '1rem',
    paddingTop: isMobile ? '1rem' : '2rem',
    overflowY: 'auto' as const
  } as CSSProperties,

  // Header Styles
  header: {
    width: '100%',
    maxWidth: isMobile ? '350px' : '400px',
    marginBottom: isMobile ? '1.5rem' : '2rem'
  } as CSSProperties,

  backButton: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'color 0.3s ease',
    background: 'none',
    border: 'none',
    padding: 0
  } as CSSProperties,

  titleContainer: {
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(25px)',
    borderRadius: isMobile ? '20px' : '24px',
    padding: isMobile ? '1.5rem' : '2rem',
    border: '2px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.6)',
    textAlign: 'center' as const,
    position: 'relative'
  } as CSSProperties,

  // Title Elements
  topTriangleLeft: {
    position: 'absolute',
    top: '-25px',
    left: '15px',
    width: '0',
    height: '0',
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderBottom: '30px solid rgba(6, 182, 212, 0.4)',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
  } as CSSProperties,

  topTriangleRight: {
    position: 'absolute',
    top: '-25px',
    right: '15px',
    width: '0',
    height: '0',
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderBottom: '30px solid rgba(139, 92, 246, 0.4)',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
  } as CSSProperties,

  titleIcon: {
    color: 'white',
    marginBottom: '1rem'
  } as CSSProperties,

  title: {
    fontSize: isMobile ? '1.7rem' : '2rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
    margin: 0
  } as CSSProperties,

  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: isMobile ? '0.9rem' : '1rem',
    margin: 0
  } as CSSProperties,

  // Form Styles
  formContainer: {
    width: '100%',
    maxWidth: isMobile ? '350px' : '400px',
    marginBottom: '2rem'
  } as CSSProperties,

  fieldGroup: {
    marginBottom: '1.5rem'
  } as CSSProperties,

  flexFieldGroup: {
    display: 'flex',
    gap: isMobile ? '0.75rem' : '1rem',
    marginBottom: '1.5rem'
  } as CSSProperties,

  flexField: {
    flex: 1
  } as CSSProperties,

  // Label and Input Styles
  label: {
    display: 'block',
    color: 'white',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    letterSpacing: '0.025em'
  } as CSSProperties,

  input: {
    width: '100%',
    padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '500',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box' as const
  } as CSSProperties,

  select: {
    width: '100%',
    padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '500',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    boxSizing: 'border-box' as const
  } as CSSProperties,

  // Password Input Group
  passwordGroup: {
    display: 'flex',
    gap: '0.75rem'
  } as CSSProperties,

  passwordInput: {
    flex: 1,
    padding: isMobile ? '0.875rem 1rem' : '1rem 1.25rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '500',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box' as const
  } as CSSProperties,

  passwordToggle: {
    padding: isMobile ? '0.875rem' : '1rem',
    background: 'rgba(255, 255, 255, 0.95)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    outline: 'none'
  } as CSSProperties,

  // Message Styles
  messageBase: {
    padding: isMobile ? '0.875rem' : '1rem',
    borderRadius: '12px',
    marginBottom: '1rem',
    textAlign: 'center' as const,
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '600'
  } as CSSProperties,

  errorMessage: {
    background: 'rgba(127, 29, 29, 0.4)',
    border: '2px solid rgba(239, 68, 68, 0.5)',
    color: 'white'
  } as CSSProperties,

  successMessage: {
    background: 'rgba(5, 46, 22, 0.4)',
    border: '2px solid rgba(34, 197, 94, 0.5)',
    color: 'white'
  } as CSSProperties,

  // Button Styles
  primaryButton: {
    width: '100%',
    padding: isMobile ? '1rem 1.5rem' : '1.25rem 2rem',
    background: isLoading 
      ? '#64748b' 
      : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    color: 'white',
    fontSize: isMobile ? '1rem' : '1.125rem',
    fontWeight: 'bold',
    borderRadius: '12px',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 15px 30px -5px rgba(6, 182, 212, 0.3)',
    letterSpacing: '0.025em',
    marginTop: '1rem'
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

  // Focus and Hover Effects
  inputFocus: {
    borderColor: '#06b6d4',
    boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.1), 0 8px 20px -5px rgba(0, 0, 0, 0.3)'
  } as CSSProperties,

  buttonHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 20px 40px -5px rgba(6, 182, 212, 0.4)'
  } as CSSProperties,

  buttonActive: {
    transform: 'scale(0.98)'
  } as CSSProperties,

  backButtonHover: {
    color: '#67e8f9'
  } as CSSProperties,

  passwordToggleHover: {
    background: 'rgba(255, 255, 255, 1)',
    borderColor: '#06b6d4'
  } as CSSProperties,

  // Responsive Utilities
  hideOnMobile: isMobile ? { display: 'none' } : {} as CSSProperties,
  showOnMobile: !isMobile ? { display: 'none' } : {} as CSSProperties,

  // Animation Classes
  fadeIn: {
    animation: 'fadeIn 0.5s ease-in-out'
  } as CSSProperties,

  slideUp: {
    animation: 'slideUp 0.6s ease-out'
  } as CSSProperties
});

// Helper functions for dynamic styles
export const getInputFocusStyle = () => ({
  borderColor: '#06b6d4',
  boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.1), 0 8px 20px -5px rgba(0, 0, 0, 0.3)'
});

export const getButtonHoverStyle = (isLoading: boolean) => {
  if (isLoading) return {};
  return {
    transform: 'scale(1.02)',
    boxShadow: '0 20px 40px -5px rgba(6, 182, 212, 0.4)'
  };
};

export const getButtonActiveStyle = (isLoading: boolean) => {
  if (isLoading) return {};
  return {
    transform: 'scale(0.98)'
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
`;

// SVG Gradient definitions for background
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
    ? '0 0 0 3px rgba(239, 68, 68, 0.1), 0 8px 20px -5px rgba(0, 0, 0, 0.3)'
    : '0 8px 20px -5px rgba(0, 0, 0, 0.3)'
});

// Mobile breakpoint helper
export const isMobileDevice = () => window.innerWidth < 768;