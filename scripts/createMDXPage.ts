import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { pinyin } from 'pinyin-pro';

const contentRoot = path.join(process.cwd(), 'src/content');
const author = 'Gemini';

function getFormattedDate(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function toSlug(str: string): string {
  return str
    .trim()
    .split('')
    .map((char) =>
      /[一-龥]/.test(char) ? pinyin(char, { toneType: 'none' }) : char,
    )
    .join('')
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
    .toLowerCase()
    .trim();
}

async function main() {
  const modules = fs
    .readdirSync(contentRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (!modules.length) {
    console.error('没有找到模块目录，请先在 src/content/ 下创建分类目录');
    process.exit(1);
  }

  const { moduleName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'moduleName',
      message: '请选择分类:',
      choices: modules,
    },
  ]);

  const { pageName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pageName',
      message: '请输入文章标题（支持中文）:',
      validate: (input: string) => input.trim() !== '' || '文章标题不能为空',
    },
  ]);

  const slug = toSlug(pageName);
  const date = getFormattedDate();
  const moduleDir = path.join(contentRoot, moduleName.toLowerCase());
  const mdxPath = path.join(moduleDir, `${slug}.mdx`);

  if (fs.existsSync(mdxPath)) {
    console.error(`文件已存在: ${mdxPath}`);
    process.exit(1);
  }

  const frontmatter = [
    '---',
    `title: "${pageName}"`,
    `date: ${date}`,
    `author: ${author}`,
    'tags: []',
    `description: "${pageName}"`,
    '---',
    '',
    `# ${pageName}`,
    '',
    '开始写作...',
    '',
  ].join('\n');

  fs.mkdirSync(moduleDir, { recursive: true });
  fs.writeFileSync(mdxPath, frontmatter, 'utf-8');

  console.log(`已创建: ${mdxPath}`);
  console.log(`访问路径: /${moduleName.toLowerCase()}/${slug}`);
}

main();
