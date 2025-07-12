import type { ValidationError } from '$lib/types';

export const validateCheatSheet = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data) {
    errors.push({ message: 'Data is required' });
    return errors;
  }

  if (typeof data !== 'object') {
    errors.push({ message: 'Data must be an object' });
    return errors;
  }

  if (!data.title || typeof data.title !== 'string') {
    errors.push({ message: 'Title is required and must be a string', path: 'title' });
  }

  if (!data.categories || !Array.isArray(data.categories)) {
    errors.push({ message: 'Categories is required and must be an array', path: 'categories' });
    return errors;
  }

  if (data.categories.length === 0) {
    errors.push({ message: 'At least one category is required', path: 'categories' });
  }

  data.categories.forEach((category: any, index: number) => {
    if (!category.title || typeof category.title !== 'string') {
      errors.push({ 
        message: `Category title is required`, 
        path: `categories[${index}].title` 
      });
    }

    if (category.commands && !Array.isArray(category.commands)) {
      errors.push({ 
        message: `Category commands must be an array`, 
        path: `categories[${index}].commands` 
      });
    }

    if (category.commands) {
      category.commands.forEach((command: any, cmdIndex: number) => {
        if (!command.description || typeof command.description !== 'string') {
          errors.push({ 
            message: `Command description is required`, 
            path: `categories[${index}].commands[${cmdIndex}].description` 
          });
        }

        if (!command.command || typeof command.command !== 'string') {
          errors.push({ 
            message: `Command value is required`, 
            path: `categories[${index}].commands[${cmdIndex}].command` 
          });
        }
      });
    }
  });

  return errors;
};