// src/components/common/UserAvatar.tsx
import React, { useState } from 'react';
import { User } from 'lucide-react';

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
  showStatus?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  name, 
  avatar, 
  size = 'md', 
  className = '',
  showBorder = true,
  showStatus = false
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Configurar tamaños
  /*const sizeClasses = {
    sm: { container: 'w-8 h-8', text: 'text-sm', icon: 16 },
    md: { container: 'w-12 h-12', text: 'text-base', icon: 20 },
    lg: { container: 'w-16 h-16', text: 'text-lg', icon: 24 },
    xl: { container: 'w-24 h-24', text: 'text-2xl', icon: 32 }
  };*/

  const sizePixels = {
    sm: { size: '32px', fontSize: '14px', iconSize: 16 },
    md: { size: '48px', fontSize: '16px', iconSize: 20 },
    lg: { size: '64px', fontSize: '18px', iconSize: 24 },
    xl: { size: '96px', fontSize: '24px', iconSize: 32 }
  };

  const { size: containerSize, fontSize, iconSize } = sizePixels[size];

  // Generar iniciales del nombre
  const getInitials = (fullName: string): string => {
    if (!fullName || fullName.trim() === '') return 'U';
    
    const names = fullName.trim().split(' ').filter(n => n.length > 0);
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  };

  // Generar color de fondo basado en el nombre
  const getBackgroundGradient = (name: string): string => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return gradients[Math.abs(hash) % gradients.length];
  };

  // Generar URL de placeholder realista
  const getPlaceholderUrl = (name: string, seed?: string): string => {
    const cleanName = name.replace(/[^a-zA-Z]/g, '');
    const seedParam = seed || cleanName.toLowerCase();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seedParam}&backgroundColor=transparent`;
  };

  const containerStyle: React.CSSProperties = {
    width: containerSize,
    height: containerSize,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    position: 'relative',
    background: avatar && !imageError ? '#f3f4f6' : getBackgroundGradient(name),
    border: showBorder ? '3px solid rgba(255, 255, 255, 0.2)' : 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(1.05) contrast(1.05)'
  };

  const statusDotStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: size === 'xl' ? '16px' : size === 'lg' ? '12px' : '8px',
    height: size === 'xl' ? '16px' : size === 'lg' ? '12px' : '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    border: '2px solid white',
    boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.3)'
  };

  // Intentar cargar avatar personalizado, luego placeholder, luego iniciales
  const renderContent = () => {
    // Si hay avatar personalizado y no ha fallado
    if (avatar && !imageError) {
      return (
        <img
          src={avatar}
          alt={`Avatar de ${name}`}
          style={imageStyle}
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
      );
    }

    // Si no hay avatar o falló, intentar placeholder
    if (!imageError || !avatar) {
      return (
        <img
          src={getPlaceholderUrl(name)}
          alt={`Avatar de ${name}`}
          style={imageStyle}
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
      );
    }

    // Fallback: iniciales o ícono
    return name.trim() ? (
      <span 
        style={{
          color: 'white',
          fontSize: fontSize,
          fontWeight: 'bold',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          userSelect: 'none'
        }}
      >
        {getInitials(name)}
      </span>
    ) : (
      <User size={iconSize} style={{color: 'white', opacity: 0.8}} />
    );
  };

  return (
    <div 
      className={className}
      style={containerStyle}
      title={name}
    >
      {renderContent()}
      {showStatus && <div style={statusDotStyle} />}
    </div>
  );
};

export default UserAvatar;