# CheatCraft 📝

Create beautiful, shareable cheat sheets with JSON. A modern web application that lets you design and export professional-looking reference guides using a simple JSON format.

## Features

- **Live JSON Editor**: Real-time editing with syntax validation and auto-formatting
- **Themes**: 6 pre-built themes with gradient backgrounds
- **Multiple Export Formats**: Export as HTML, JSON, or PDF for easy sharing
- **Template Library**: Pre-built templates for common use cases (Git, VS Code, NPM, etc.)
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Auto-save**: Your work is automatically saved to browser storage

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cheatcraft.git
cd cheatcraft

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Basic Usage

1. **Choose a Template**: Select from pre-built templates or start with a custom one
2. **Edit JSON**: Use the live editor to modify your cheat sheet structure
3. **Pick a Theme**: Choose from 6 color themes
4. **Preview Live**: See your changes instantly in the preview panel
5. **Export**: Download as HTML, JSON, or print as PDF

## Documentation

### JSON Schema

CheatCraft uses a simple JSON structure:

```json
{
  "title": "Your Cheat Sheet Title",
  "description": "Optional description",
  "icon": "📝",
  "categories": [
    {
      "title": "Category Name",
      "icon": "📁",
      "commands": [
        {
          "description": "What this command does",
          "command": "actual-command-here"
        }
      ],
      "tip": {
        "title": "Pro Tip",
        "content": "Helpful advice or notes"
      }
    }
  ]
}
```

### Available Templates

- **Basic Commands**: Essential file and directory operations
- **Development Tools**: Git, NPM, and development workflows
- **Keyboard Shortcuts**: VS Code and productivity shortcuts
- **Custom Template**: Start from scratch with your own content

### Export Options

- **HTML**: Standalone webpage with embedded CSS
- **JSON**: Raw data for backup or sharing
- **PDF**: Print-ready format for offline use

## Development

### Local Development

```bash
# Install dependencies
npm install

# Run development server with hot reload
npm run dev

# Type check
npm run check

# Watch mode for type checking
npm run check:watch
```

### Tech Stack

- **Frontend**: SvelteKit + TypeScript
- **Styling**: CSS with CSS Variables for theming
- **Editor**: Monaco Editor for JSON editing
- **Build**: Vite + Rollup
- **Code Quality**: Prettier + TypeScript strict mode

### Project Structure

```
cheatcraft/
├── src/
│   ├── lib/
│   │   ├── components/     # Svelte components
│   │   ├── stores/         # Svelte stores for state
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── routes/             # SvelteKit routes
│   └── styles/             # Global CSS
├── static/                 # Static assets
└── package.json
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the build locally
npm run preview
```

## Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and ensure they follow our coding standards
4. Run type checking: `npm run check`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a pull request

### Development Guidelines

- Use TypeScript for type safety
- Follow the existing component structure
- Add proper error handling and validation
- Test your changes across different browsers
- Ensure responsive design works on mobile devices

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Editor powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Icons from various emoji sets

---

**Made with ❤️ love by a developer who was supposed to be ironing**