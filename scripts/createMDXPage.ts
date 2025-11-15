import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { pinyin } from 'pinyin-pro';
const contentRoot = path.join(process.cwd(), 'src/content');
const appRoot = path.join(process.cwd(), 'src/app');
const author = 'Your Name';

// 首字母大写
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 获取当前时间，格式 yyyy-mm-dd hhmmss
function getFormattedDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}${min}${ss}`;
}

// 中文名转拼音 slug
function toSlug(str: string) {
  return pinyin(str, { toneType: 'none' }) // 不带声调
    .replace(/\s+/g, '-') // 空格换成中横线
    .toLowerCase(); // 全部小写
}

// 渲染模板：用 {{变量名}} 替换
function renderTemplate(
  templatePath: string,
  variables: Record<string, string>,
) {
  let content = fs.readFileSync(templatePath, 'utf-8');
  for (const key in variables) {
    const re = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(re, variables[key]);
  }
  return content;
}

async function main() {
  // 获取模块列表
  const modules = fs
    .readdirSync(contentRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (modules.length === 0) {
    console.error('没有找到模块目录');
    process.exit(1);
  }

  // 选择模块
  const { moduleName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'moduleName',
      message: '请选择模块:',
      choices: modules,
    },
  ]);

  // 输入文章名称（支持中文）
  const { pageName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pageName',
      message: '请输入文章名称（支持中文）:',
      validate: (input) => input.trim() !== '' || '文章名称不能为空',
    },
  ]);

  const formattedDate = getFormattedDate();
  const slug = toSlug(pageName); // 中文文章名生成拼音 slug

  // -------- MDX 文件 --------
  const mdxDir = path.join(contentRoot, moduleName);
  if (!fs.existsSync(mdxDir)) fs.mkdirSync(mdxDir, { recursive: true });
  const mdxPath = path.join(mdxDir, `${slug}.mdx`);

  const mdxTemplatePath = path.join(
    process.cwd(),
    'scripts/templates/mdx.template',
  );
  const mdxContent = renderTemplate(mdxTemplatePath, {
    title: pageName, // MDX 显示中文标题
    date: formattedDate,
    author,
  });
  fs.writeFileSync(mdxPath, mdxContent, 'utf-8');
  console.log(`生成 MDX 文件: ${mdxPath}`);

  // -------- page.tsx --------
  const pageDir = path.join(appRoot, moduleName, slug);
  if (fs.existsSync(pageDir))
    fs.rmSync(pageDir, { recursive: true, force: true });
  fs.mkdirSync(pageDir, { recursive: true });
  const pageTsxPath = path.join(pageDir, 'page.tsx');

  const pageTemplatePath = path.join(
    process.cwd(),
    'scripts/templates/page.template',
  );
  const pageTsxContent = renderTemplate(pageTemplatePath, {
    title: pageName, // 页面显示中文
    module: moduleName,
    slug, // 路由使用拼音 slug
  });
  fs.writeFileSync(pageTsxPath, pageTsxContent, 'utf-8');
  console.log(`生成 page.tsx: ${pageTsxPath}`);

  // -------- 模块首页 page.tsx --------
  const pageIndex = path.join(appRoot, moduleName);
  const pageIndexTemplatePath = path.join(
    process.cwd(),
    'scripts/templates/moduleIndex.template',
  );
  const pageIndexPath = path.join(pageIndex, 'page.tsx');

  if (!fs.existsSync(pageIndexPath)) {
    const pageIndexContent = renderTemplate(pageIndexTemplatePath, {
      module: moduleName,
    });
    fs.writeFileSync(pageIndexPath, pageIndexContent, 'utf-8');
    console.log(`生成模块首页: ${pageIndexPath}`);
  }

  console.log('页面生成完成！');
}

main();
