import type { CheatSheetData, Theme } from '$lib/types';
import { themes } from './themes';

export const exportAsHTML = (data: CheatSheetData, theme: Theme): void => {
  const themeConfig = themes[theme];
  const html = generateHTMLContent(data, themeConfig);
  
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.title.replace(/\s+/g, '_').toLowerCase()}.html`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportAsJSON = (data: CheatSheetData): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.title.replace(/\s+/g, '_').toLowerCase()}.json`;
  a.click();
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
  // Implementation would include the full HTML generation logic
  return `<!DOCTYPE html>
<html>
<head>
  <title>${data.title}</title>
  <style>
    :root {
      --primary-gradient: ${themeConfig.gradient};
      --primary-color: ${themeConfig.primary};
    }
    /* Include all the CSS styles here */
  </style>
</head>
<body>
  <!-- Generated cheat sheet HTML -->
</body>
</html>`;
};

const generatePrintableHTML = (data: CheatSheetData, themeConfig: any): string => {
  // Similar to generateHTMLContent but optimized for printing
  return generateHTMLContent(data, themeConfig);
};
