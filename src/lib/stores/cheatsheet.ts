import { writable, derived } from 'svelte/store';
import type { CheatSheetData, Theme, ValidationError } from '$lib/types';
import { validateCheatSheet } from '$lib/utils/validation';
import { templates } from '$lib/utils/templates';

// Core stores
export const currentTheme = writable<Theme>('blue');
export const currentTemplate = writable<string>('basic');
export const jsonContent = writable<string>(JSON.stringify(templates.basic, null, 2));
export const validationErrors = writable<ValidationError[]>([]);

// Derived stores
export const cheatsheetData = derived(
  jsonContent,
  ($jsonContent) => {
    try {
      const data = JSON.parse($jsonContent);
      const errors = validateCheatSheet(data);
      validationErrors.set(errors);

      if (errors.length === 0) {
        return data as CheatSheetData;
      }
      return null;
    } catch (error) {
      validationErrors.set([{ message: `Invalid JSON: ${error.message}` }]);
      return null;
    }
  }
);

export const isValid = derived(
  validationErrors,
  ($errors) => $errors.length === 0
);

// Actions
export const loadTemplate = (templateId: string) => {
  const template = templates[templateId];
  if (template) {
    currentTemplate.set(templateId);
    jsonContent.set(JSON.stringify(template, null, 2));
  }
};

export const updateTheme = (theme: Theme) => {
  currentTheme.set(theme);
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('cheatcraft_theme', theme);
  }
};

export const autoSave = () => {
  if (typeof window !== 'undefined') {
    jsonContent.subscribe(content => {
      localStorage.setItem('cheatcraft_autosave', content);
    });
  }
};

export const autoLoad = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cheatcraft_autosave');
    const savedTheme = localStorage.getItem('cheatcraft_theme') as Theme;

    if (savedTheme) {
      currentTheme.set(savedTheme);
    }

    if (saved) {
      jsonContent.set(saved);
    }
  }
};