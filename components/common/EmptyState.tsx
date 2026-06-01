import React from 'react';
import { FiInbox } from 'react-icons/fi';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your search filters or clearing options.',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-100 rounded-xl">
      <div className="p-4 bg-slate-50 rounded-full text-slate-400 mb-4">
        <FiInbox className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
