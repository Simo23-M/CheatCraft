import type { CheatSheetData, Theme } from '$lib/types';
import { themes } from './themes';

export const exportAsHTML = (data: CheatSheetData, theme: Theme): void => {
  const themeConfig = themes[theme];
  const html = generateHTMLContent(data, themeConfig);
  
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.title.replace(/\s+/g, '_').toLowerCase()}_cheatsheet.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportAsJSON = (data: CheatSheetData): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.title.replace(/\s+/g, '_').toLowerCase()}_cheatsheet.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportAsPDF = (data: CheatSheetData, theme: Theme): void => {
  const themeConfig = themes[theme];
  const html = generatePrintableHTML(data, themeConfig);
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      setTimeout(() => printWindow.close(), 1000);
    };
  }
};

const generateHTMLContent = (data: CheatSheetData, themeConfig: any): string => {
  const categoriesHTML = data.categories.map(category => {
    const commandsHTML = category.commands ? category.commands.map(command => `
      <div class="command-item">
        <span class="command-desc">${escapeHtml(command.description)}</span>
        <span class="command-code">${escapeHtml(command.command)}</span>
      </div>
    `).join('') : '';

    const tipHTML = category.tip ? `
      <div class="tip-box">
        <h3 class="tip-title">💡 ${escapeHtml(category.tip.title)}</h3>
        <p>${escapeHtml(category.tip.content)}</p>
      </div>
    ` : '';

    return `
      <div class="category">
        <h2 class="category-title">
          <span class="category-icon">${category.icon || '📋'}</span>
          ${escapeHtml(category.title)}
        </h2>
        ${commandsHTML}
        ${tipHTML}
      </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.title)}</title>
  <style>
    :root {
      --primary-gradient: ${themeConfig.gradient};
      --primary-color: ${themeConfig.primary};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f8f9fa;
      padding: 20px;
    }

    .cheatsheet {
      max-width: 1200px;
      margin: 0 auto;
    }

    .cheatsheet-header {
      text-align: center;
      margin-bottom: 40px;
      padding: 40px;
      background: var(--primary-gradient);
      border-radius: 20px;
      color: white;
    }

    .cheatsheet-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 10px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .cheatsheet-description {
      font-size: 1.2rem;
      opacity: 0.9;
      font-weight: 300;
    }

    .categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 30px;
    }

    .category {
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid #e0e0e0;
    }

    .category-title {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 20px;
      color: #2c3e50;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .category-icon {
      font-size: 1.5rem;
    }

    .command-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 12px;
      margin: 10px 0;
      border-left: 4px solid var(--primary-color);
    }

    .command-desc {
      flex: 1;
      font-weight: 500;
      color: #2c3e50;
    }

    .command-code {
      background: #2d3748;
      color: #e2e8f0;
      padding: 8px 12px;
      border-radius: 8px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .tip-box {
      background: var(--primary-gradient);
      color: white;
      padding: 20px;
      border-radius: 15px;
      margin: 15px 0;
    }

    .tip-title {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }

    @media (max-width: 768px) {
      .cheatsheet-title {
        font-size: 2rem;
      }
      
      .categories {
        grid-template-columns: 1fr;
      }
      
      .command-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .category {
        break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ddd;
      }
    }
  </style>
</head>
<body>
  <div class="cheatsheet">
    <div class="cheatsheet-header">
      <h1 class="cheatsheet-title">${data.icon || '📝'} ${escapeHtml(data.title)}</h1>
      ${data.description ? `<p class="cheatsheet-description">${escapeHtml(data.description)}</p>` : ''}
    </div>
    <div class="categories">
      ${categoriesHTML}
    </div>
  </div>
</body>
</html>`;
};

const generatePrintableHTML = (data: CheatSheetData, themeConfig: any): string => {
  return generateHTMLContent(data, themeConfig);
};

const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};