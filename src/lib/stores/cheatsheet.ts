import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown JSON error';
      validationErrors.set([{ message: `Invalid JSON: ${errorMessage}` }]);
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
  // Save to localStorage if in browser
  if (browser) {
    try {
      localStorage.setItem('cheatcraft_theme', theme);
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error);
    }
  }
};

export const autoSave = () => {
  if (browser) {
    let timeoutId: NodeJS.Timeout;
    
    jsonContent.subscribe(content => {
      // Debounce auto-save to avoid too frequent saves
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        try {
          localStorage.setItem('cheatcraft_autosave', content);
          console.log('Auto-saved content');
        } catch (error) {
          console.warn('Could not auto-save to localStorage:', error);
        }
      }, 1000);
    });
  }
};

export const autoLoad = () => {
  if (browser) {
    try {
      // Load saved theme
      const savedTheme = localStorage.getItem('cheatcraft_theme') as Theme;
      if (savedTheme && ['blue', 'green', 'orange', 'purple', 'pink', 'dark'].includes(savedTheme)) {
        currentTheme.set(savedTheme);
      }

      // Load saved content
      const saved = localStorage.getItem('cheatcraft_autosave');
      if (saved) {
        try {
          // Validate that saved content is valid JSON
          JSON.parse(saved);
          jsonContent.set(saved);
          console.log('Loaded saved content');
        } catch (error) {
          console.warn('Saved content was invalid JSON, using default');
          // Don't load invalid JSON
        }
      }
    } catch (error) {
      console.warn('Could not load from localStorage:', error);
    }
  }
};

// Clear saved data
export const clearSavedData = () => {
  if (browser) {
    try {
      localStorage.removeItem('cheatcraft_autosave');
      localStorage.removeItem('cheatcraft_theme');
      console.log('Cleared saved data');
    } catch (error) {
      console.warn('Could not clear localStorage:', error);
    }
  }
};