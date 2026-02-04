// src/components/common/StatCard.tsx - VERSIONI I RREGULLUAR
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
 
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo' | 'orange';
 
  description?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  description,
  onClick
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-primary-50',
      text: 'text-primary-600',
      border: 'border-primary-100',
      iconBg: 'bg-primary-100'
    },
    green: {
      bg: 'bg-success-50',
      text: 'text-success-600',
      border: 'border-success-100',
      iconBg: 'bg-success-100'
    },
    red: {
      bg: 'bg-danger-50',
      text: 'text-danger-600',
      border: 'border-danger-100',
      iconBg: 'bg-danger-100'
    },
    yellow: {
      bg: 'bg-warning-50',
      text: 'text-warning-600',
      border: 'border-warning-100',
      iconBg: 'bg-warning-100'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      iconBg: 'bg-purple-100'
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-100' 
    },
    orange:{
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-100',
      iconBg: 'bg-orange-100' 
    }
  };

  // Sigurohu që color ekziston, përdor default nëse jo
  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div 
      className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-card-hover transition-shadow cursor-pointer ${onClick ? 'hover:border-primary-300' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors.iconBg} ${colors.text}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend.isPositive ? 'text-success-600' : 'text-danger-600'
          }`}>
            <span className={trend.isPositive ? 'text-success-500' : 'text-danger-500'}>
              {trend.isPositive ? '↑' : '↓'}
            </span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-600 mt-1">{title}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;