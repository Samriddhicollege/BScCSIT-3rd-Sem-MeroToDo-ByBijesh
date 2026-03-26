export const PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

export const PRIORITY_COLORS = {
  high: '#ef4444',
  medium: '#f97316',
  low: '#22c55e'
};

export const PRIORITY_LABELS = {
  high: 'High',
  medium: 'Medium',
  low: 'Low'
};

export const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Work', color: '#3b82f6' },
  { id: 2, name: 'Personal', color: '#a855f7' },
  { id: 3, name: 'Shopping', color: '#ec4899' }
];

export const STORAGE_KEYS = {
  TASKS: 'todo_tasks',
  TRASH: 'todo_trash',
  CATEGORIES: 'todo_categories',
  THEME: 'todo_theme'
};

export const THEME_COLORS = {
  light: {
    bg: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
    hover: '#f3f4f6',
    card: '#f9fafb'
  },
  dark: {
    bg: '#1f2937',
    text: '#f3f4f6',
    border: '#374151',
    hover: '#111827',
    card: '#111827'
  }
};