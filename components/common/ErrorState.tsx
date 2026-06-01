import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error while fetching the data. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50/50 border border-red-100 rounded-xl">
      <div className="p-4 bg-red-50 rounded-full text-red-500 mb-4">
        <FiAlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="primary" className="bg-red-600 hover:bg-red-700" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
