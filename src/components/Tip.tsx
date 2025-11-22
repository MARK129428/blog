'use client';

import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

interface TipProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

const typeConfig = {
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-800 dark:text-blue-200',
    iconColor: 'text-blue-500',
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-800 dark:text-green-200',
    iconColor: 'text-green-500',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    textColor: 'text-yellow-800 dark:text-yellow-200',
    iconColor: 'text-yellow-500',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-800 dark:text-red-200',
    iconColor: 'text-red-500',
  },
};

export function Tip({ type = 'info', children }: TipProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} ${config.textColor} border-l-4 p-4 my-4 rounded-r-lg flex gap-3`}
    >
      <Icon className={`${config.iconColor} flex-shrink-0 w-5 h-5 mt-0.5`} />
      <div className='flex-1 prose-sm dark:prose-invert'>{children}</div>
    </div>
  );
}

