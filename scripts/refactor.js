const fs = require('fs');
const path = require('path');

const componentsDir = path.join(process.cwd(), 'src', 'components');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('import { portfolioData } from "@/data/portfolio"')) {
    // Replace import
    content = content.replace(
      'import { portfolioData } from "@/data/portfolio";',
      'import { usePortfolioData } from "@/components/providers/PortfolioProvider";'
    );
    
    // Check if it's a component function and inject hook
    const functionMatch = content.match(/export default function ([A-Za-z0-9_]+)\([^)]*\)\s*\{/);
    if (functionMatch) {
      const funcStart = content.indexOf('{', functionMatch.index) + 1;
      content = content.slice(0, funcStart) + '\n  const portfolioData = usePortfolioData();' + content.slice(funcStart);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(componentsDir);
