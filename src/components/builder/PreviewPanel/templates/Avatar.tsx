import React from 'react';
import { PersonalInfo } from '../../../../types';

export const Avatar: React.FC<{
  info: PersonalInfo;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
}> = ({ info, size = 'md', className = '', style, dark }) => {
  const initials = `${info.firstName?.[0] ?? ''}${info.lastName?.[0] ?? ''}`.toUpperCase();
  const sizes: Record<string, string> = {
    xs: 'w-10 h-10 text-sm',
    sm: 'w-16 h-16 text-xl',
    md: 'w-24 h-24 text-3xl',
    lg: 'w-32 h-32 text-4xl',
  };
  return (
    <div
      className={`${sizes[size]} rounded-full overflow-hidden flex items-center justify-center font-bold shrink-0 border-4 border-white/30 ${className}`}
      style={style}
    >
      {info.avatar ? (
        <img src={info.avatar} alt="profile" className="w-full h-full object-cover" />
      ) : (
        <span className={dark ? 'text-white/70' : 'text-white/90'}>{initials}</span>
      )}
    </div>
  );
};
