// src/components/common/UserAvatar.tsx
import React, { useState } from 'react';
import { User } from 'lucide-react';

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  name, 
  avatar, 
  size = 'md', 
  className = '',
  showBorder = true 
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Configurar tamaños
  const sizeClasses = {
    sm: { container: 'w-8 h-8', text: 'text-sm', icon: 16 },
    md: { container: 'w-12 h-12', text: 'text-base', icon: 20 },
    lg: { container: 'w-16 h-16', text: 'text-lg', icon: 24 },
    xl: { container: 'w-24 h-24', text: 'text-2xl', icon: 32 }
  };

  const { container, text, icon } = sizeClasses[size];

  // Generar iniciales del nombre
  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  };

  // Generar color de fondo basado en el nombre
  const getBackgroundColor = (name: string): string => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const containerStyle: React.CSSProperties = {
    background: avatar && !imageError ? 'transparent' : getBackgroundColor(name),
    border: showBorder ? '3px solid rgba(255, 255, 255, 0.2)' : 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  };

  const imageStyle: React.CSSProperties = {
    objectFit: 'cover',
    filter: 'brightness(1.05) contrast(1.1)'
  };

  if (avatar && !imageError) {
    return (
      <div 
        className={`${container} rounded-full overflow-hidden ${className} flex-shrink-0`}
        style={containerStyle}
      >
        <img
          src={avatar}
          alt={`Avatar de ${name}`}
          style={imageStyle}
          className="w-full h-full"
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
      </div>
    );
  }

  // Fallback: iniciales o ícono
  return (
    <div 
      className={`${container} rounded-full ${className} flex items-center justify-center text-white font-bold flex-shrink-0`}
      style={containerStyle}
      title={name}
    >
      {name.trim() ? (
        <span className={text} style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
          {getInitials(name)}
        </span>
      ) : (
        <User size={icon} className="opacity-80" />
      )}
    </div>
  );
};

export default UserAvatar;