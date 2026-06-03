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

// Gather all existing tags from all MDX files
function getExistingTags(): string[] {
  const tagSet = new Set<string>();
  if (!fs.existsSync(contentRoot)) return [];

  const catalogs = fs
    .readdirSync(contentRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const cat of catalogs) {
    const dir = path.join(contentRoot, cat.name);
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const match = raw.match(/^tags:\s*\[(.+)\]$/m);
      if (match) {
        const tags = match[1]
          .split(',')
          .map((t) => t.trim().replace(/['"]/g, ''));
        tags.forEach((t) => t && tagSet.add(t));
      }
    }
  }
  return Array.from(tagSet).sort();
}

function getExistingCovers(): string[] {
  const publicDir = path.join(process.cwd(), 'public');
  const covers: string[] = [];

  function walk(dir: string, prefix: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.isDirectory()) {
        walk(path.join(dir, e.name), `${prefix}${e.name}/`);
      } else if (/\.(png|jpe?g|gif|webp|svg)$/i.test(e.name)) {
        covers.push(`/${prefix}${e.name}`);
      }
    }
  }
  walk(publicDir, '');
  return covers;
}

async function main() {
  const modules = fs
    .readdirSync(contentRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (!modules.length) {
    console.error('请先在 src/content/ 下创建分类目录');
    process.exit(1);
  }

  // Step 1: select catalog
  const { moduleName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'moduleName',
      message: '选择分类:',
      choices: modules,
    },
  ]);

  // Step 2: enter title
  const { pageName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pageName',
      message: '文章标题（中文自动转拼音）:',
      validate: (input: string) => input.trim() !== '' || '标题不能为空',
    },
  ]);

  const slug = toSlug(pageName);
  const date = getFormattedDate();

  // Step 3: select tags from existing + add custom
  const existingTags = getExistingTags();
  const { selectedTags } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedTags',
      message: '选择已有标签（空格选择，回车确认）:',
      choices: existingTags,
    },
  ]);

  const { customTags } = await inquirer.prompt([
    {
      type: 'input',
      name: 'customTags',
      message: '添加新标签（逗号分隔，可选）:',
      default: '',
    },
  ]);

  const allTags = [
    ...(selectedTags || []),
    ...(customTags
      ? customTags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : []),
  ];

  // Step 4: cover image (optional)
  const covers = getExistingCovers();
  const coverChoices = [{ name: '不使用头图', value: '' }, ...covers.map((c) => ({ name: c, value: c }))];
  const { cover } = await inquirer.prompt([
    {
      type: 'list',
      name: 'cover',
      message: '选择封面图片（可选）:',
      choices: coverChoices,
      default: '',
    },
  ]);

  // Step 5: description
  const { description } = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: '文章摘要:',
      default: pageName,
    },
  ]);

  // Step 6: featured
  const { isFeatured } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isFeatured',
      message: '设为精选文章？',
      default: false,
    },
  ]);

  const moduleDir = path.join(contentRoot, moduleName.toLowerCase());
  const mdxPath = path.join(moduleDir, `${slug}.mdx`);

  if (fs.existsSync(mdxPath)) {
    console.error(`文件已存在: ${mdxPath}`);
    process.exit(1);
  }

  const tagsYaml =
    allTags.length > 0
      ? `tags: [${allTags.map((t: string) => `"${t}"`).join(', ')}]`
      : 'tags: []';

  const frontmatter = [
    '---',
    `title: "${pageName}"`,
    `date: ${date}`,
    `author: ${author}`,
    tagsYaml,
    `description: "${description}"`,
    ...(cover ? [`cover: "${cover}"`] : []),
    `isFeatured: ${isFeatured}`,
    '---',
    '',
    '',
  ].join('\n');

  fs.mkdirSync(moduleDir, { recursive: true });
  fs.writeFileSync(mdxPath, frontmatter, 'utf-8');

  console.log(`\n 已创建: ${mdxPath}`);
  console.log(` 访问: /${moduleName.toLowerCase()}/${slug}`);
  if (cover) console.log(` 封面: ${cover}`);
  if (allTags.length) console.log(` 标签: ${allTags.join(', ')}`);
}

main();
