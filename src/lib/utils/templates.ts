import type { CheatSheetTemplate } from '$lib/types';

export const templates: Record<string, CheatSheetTemplate> = {
  basic: {
    id: 'basic',
    name: 'Basic Commands',
    title: "Basic Commands Cheat Sheet",
    description: "Essential commands for daily use",
    icon: "📝",
    categories: [
      {
        title: "File Operations",
        icon: "📁",
        commands: [
          {
            description: "Create new file",
            command: "touch filename.txt"
          },
          {
            description: "Copy file",
            command: "cp source.txt destination.txt"
          },
          {
            description: "Move/rename file",
            command: "mv oldname.txt newname.txt"
          },
          {
            description: "Delete file",
            command: "rm filename.txt"
          }
        ]
      },
      {
        title: "Directory Operations",
        icon: "📂",
        commands: [
          {
            description: "Create directory",
            command: "mkdir dirname"
          },
          {
            description: "List directory contents",
            command: "ls -la"
          },
          {
            description: "Change directory",
            command: "cd /path/to/directory"
          },
          {
            description: "Remove directory",
            command: "rmdir dirname"
          }
        ]
      }
    ]
  },
  development: {
    id: 'development',
    name: 'Development Tools',
    title: "Development Tools Cheat Sheet",
    description: "Essential commands for developers",
    icon: "💻",
    categories: [
      {
        title: "Git Commands",
        icon: "🌿",
        commands: [
          {
            description: "Initialize repository",
            command: "git init"
          },
          {
            description: "Add files to staging",
            command: "git add ."
          },
          {
            description: "Commit changes",
            command: "git commit -m \"message\""
          },
          {
            description: "Push to remote",
            command: "git push origin main"
          }
        ]
      },
      {
        title: "NPM Commands",
        icon: "📦",
        commands: [
          {
            description: "Install dependencies",
            command: "npm install"
          },
          {
            description: "Start development server",
            command: "npm run dev"
          },
          {
            description: "Build for production",
            command: "npm run build"
          },
          {
            description: "Run tests",
            command: "npm test"
          }
        ]
      }
    ]
  },
  shortcuts: {
    id: 'shortcuts',
    name: 'Keyboard Shortcuts',
    title: "Keyboard Shortcuts Cheat Sheet",
    description: "Productivity shortcuts for various applications",
    icon: "⌨️",
    categories: [
      {
        title: "VS Code Shortcuts",
        icon: "💻",
        commands: [
          {
            description: "Command Palette",
            command: "Ctrl+Shift+P"
          },
          {
            description: "Quick Open",
            command: "Ctrl+P"
          },
          {
            description: "Toggle Terminal",
            command: "Ctrl+`"
          },
          {
            description: "Multi-cursor",
            command: "Ctrl+Alt+↓"
          }
        ]
      }
    ]
  },
  custom: {
    id: 'custom',
    name: 'Custom Template',
    title: "Custom Cheat Sheet",
    description: "Create your own custom cheat sheet",
    icon: "✨",
    categories: [
      {
        title: "Your Category",
        icon: "📋",
        commands: [
          {
            description: "Your command description",
            command: "your-command"
          }
        ]
      }
    ]
  }
};