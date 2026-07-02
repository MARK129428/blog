import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { pinyin } from 'pinyin-pro';
import { siteConfig } from '../src/config/site';
import { getCatalogLabel, getConfiguredCatalogs } from '../src/config/catalogs';
import {
  getFormattedDate,
  buildMdxBasename,
} from '../src/lib/mdxFilename';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');
const THOUGHTS_CATALOG = 'thoughts';

function toPinyinSlug(str: string): string {
  return str
    .trim()
    .split('')
    .map((char) =>
      /[一-鿿]/.test(char)
        ? pinyin(char, { toneType: 'none' })
        : char,
    )
    .join('')
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
    .toLowerCase()
    .replace(/^-|-$/g, '');
}

function escapeYaml(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function writeMdxFile(catalog: string, basename: string, frontmatter: string, body = '') {
  const dir = path.join(CONTENT_ROOT, catalog.toLowerCase());
  const filePath = path.join(dir, `${basename}.mdx`);

  if (fs.existsSync(filePath)) {
    console.error(`文件已存在: ${filePath}`);
    process.exit(1);
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, `${frontmatter}${body}`, 'utf-8');

  console.log(`\n✓ 已创建: ${filePath}`);
  if (catalog !== THOUGHTS_CATALOG) {
    console.log(`  访问: /${catalog}/${basename}`);
  }
}

function buildArticleFrontmatter(options: {
  title: string;
  date: string;
  tags: string[];
  description?: string;
  cover?: string;
}) {
  const { title, date, tags, description, cover } = options;
  const tagsYaml = tags.length > 0
    ? `tags: [${tags.map((t) => `"${escapeYaml(t)}"`).join(', ')}]`
    : 'tags: []';

  return [
    '---',
    `title: "${escapeYaml(title)}"`,
    `date: ${date}`,
    `author: ${siteConfig.author}`,
    tagsYaml,
    `description: "${escapeYaml(description || title)}"`,
    ...(cover ? [`cover: "${escapeYaml(cover)}"`] : []),
    '---',
    '',
    '',
  ].join('\n');
}

function buildThoughtFrontmatter(options: { date: string; tags: string[] }) {
  const { date, tags } = options;
  const tagsYaml = tags.length > 0
    ? `tags: [${tags.map((t) => `"${escapeYaml(t)}"`).join(', ')}]`
    : 'tags: ["随想"]';

  return ['---', `date: ${date}`, tagsYaml, '---', '', ''].join('\n');
}

// ---- 文章 ----

async function createArticle(options: {
  catalog: string;
  title: string;
  date: string;
  slug?: string;
  tags?: string[];
  description?: string;
  cover?: string;
}) {
  const slug = options.slug || toPinyinSlug(options.title);
  const basename = buildMdxBasename(options.date, slug);
  const frontmatter = buildArticleFrontmatter({
    title: options.title,
    date: options.date,
    tags: options.tags || [],
    description: options.description,
    cover: options.cover,
  });

  writeMdxFile(options.catalog.toLowerCase(), basename, frontmatter);
}

// ---- 说说 ----

async function createThought(options: {
  content: string;
  date: string;
  slug?: string;
  tags?: string[];
}) {
  const slug = options.slug || toPinyinSlug(options.content.slice(0, 24)) || 'note';
  const basename = buildMdxBasename(options.date, slug);
  const frontmatter = buildThoughtFrontmatter({
    date: options.date,
    tags: options.tags?.length ? options.tags : ['随想'],
  });

  writeMdxFile(THOUGHTS_CATALOG, basename, frontmatter, `${options.content.trim()}\n`);
}

// ---- 交互式 ----

async function runInteractive() {
  const catalogs = getConfiguredCatalogs();

  const { kind } = await inquirer.prompt<{ kind: 'article' | 'thought' }>([
    {
      type: 'list',
      name: 'kind',
      message: '写什么？',
      choices: [
        { name: '文章', value: 'article' },
        { name: '说说', value: 'thought' },
      ],
    },
  ]);

  const { date } = await inquirer.prompt<{ date: string }>([
    {
      type: 'input',
      name: 'date',
      message: '日期 (YYYY-MM-DD):',
      default: getFormattedDate(),
      validate: (input: string) =>
        /^\d{4}-\d{2}-\d{2}$/.test(input.trim()) || '日期格式应为 YYYY-MM-DD',
    },
  ]);

  if (kind === 'thought') {
    const { content, tagsInput } = await inquirer.prompt<{ content: string; tagsInput: string }>([
      {
        type: 'input',
        name: 'content',
        message: '说说内容:',
        validate: (input: string) => input.trim() !== '' || '内容不能为空',
      },
      {
        type: 'input',
        name: 'tagsInput',
        message: '标签（逗号分隔，可选）:',
        default: '随想',
      },
    ]);

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    await createThought({ content, date: date.trim(), tags });
    return;
  }

  // 文章
  const { catalog, title, tagsInput, slugInput, description, cover } = await inquirer.prompt<{
    catalog: string;
    title: string;
    tagsInput: string;
    slugInput: string;
    description: string;
    cover: string;
  }>([
    {
      type: 'list',
      name: 'catalog',
      message: '分类:',
      choices: catalogs.map((c) => ({ name: getCatalogLabel(c), value: c })),
    },
    {
      type: 'input',
      name: 'title',
      message: '文章标题:',
      validate: (input: string) => input.trim() !== '' || '标题不能为空',
    },
    {
      type: 'input',
      name: 'description',
      message: '文章简介 (可选):',
      default: '',
    },
    {
      type: 'input',
      name: 'tagsInput',
      message: '标签（逗号分隔，可选）:',
      default: '',
    },
    {
      type: 'input',
      name: 'slugInput',
      message: '文件名 slug (回车自动拼音):',
      default: '',
    },
    {
      type: 'input',
      name: 'cover',
      message: '封面图 URL (可选):',
      default: '',
    },
  ]);

  const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
  const slug = slugInput.trim() || undefined;
  const previewSlug = slug || toPinyinSlug(title);
  const previewBasename = buildMdxBasename(date.trim(), previewSlug);

  console.log(`\n将创建: src/content/${catalog}/${previewBasename}.mdx`);

  await createArticle({
    catalog,
    title: title.trim(),
    date: date.trim(),
    slug,
    tags,
    description: description.trim() || undefined,
    cover: cover.trim() || undefined,
  });
}

// ---- CLI ----

interface ParsedArgs {
  positional: string[];
  flags: Record<string, string | boolean>;
}

function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }

  return { positional, flags };
}

function showUsage() {
  console.log(`用法:
  pnpm create-mdx                               # 交互式创建
  pnpm create-mdx frontend "文章标题"             # 快速创建文章
  pnpm create-mdx frontend "标题" --tags "React"  # 指定标签
  pnpm create-mdx frontend "标题" --description "简介" --cover "https://..."
  pnpm create-mdx frontend "标题" --slug hooks    # 自定义 slug
  pnpm create-mdx thought "说说内容"               # 创建说说

文件名格式: YYYY-MM-DD-slug.mdx
`);
}

async function runCli() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const isThought =
    flags.thought === true ||
    positional[0]?.toLowerCase() === 'thought' ||
    positional[0]?.toLowerCase() === THOUGHTS_CATALOG;

  const date =
    typeof flags.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(flags.date)
      ? flags.date
      : getFormattedDate();

  const tags =
    typeof flags.tags === 'string'
      ? flags.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

  // 说说
  if (isThought) {
    const content =
      typeof flags.content === 'string'
        ? flags.content
        : positional[0]?.toLowerCase() === 'thought' ||
            positional[0]?.toLowerCase() === THOUGHTS_CATALOG
          ? positional.slice(1).join(' ')
          : positional.join(' ');

    if (!content.trim()) {
      console.error('用法: pnpm create-mdx thought "说说内容"');
      process.exit(1);
    }

    await createThought({
      content,
      date,
      slug: typeof flags.slug === 'string' ? flags.slug : undefined,
      tags,
    });
    return;
  }

  // 文章
  const catalog = positional[0];
  const title = positional.slice(1).join(' ') || (flags.title as string);

  if (!catalog || !title?.trim()) {
    showUsage();
    process.exit(positional.length === 0 && Object.keys(flags).length === 0 ? 0 : 1);
  }

  const catalogs = getConfiguredCatalogs();
  if (!catalogs.includes(catalog)) {
    console.error(
      `未知分类 "${catalog}"，可选: ${catalogs.map((c) => `${c} (${getCatalogLabel(c)})`).join(', ')}`,
    );
    process.exit(1);
  }

  await createArticle({
    catalog,
    title: title.trim(),
    date,
    slug: typeof flags.slug === 'string' ? flags.slug : undefined,
    tags,
    description: typeof flags.description === 'string' ? flags.description : undefined,
    cover: typeof flags.cover === 'string' ? flags.cover : undefined,
  });
}

// ---- 入口 ----

async function main() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    fs.mkdirSync(CONTENT_ROOT, { recursive: true });
  }

  if (process.argv.length > 2) {
    await runCli();
  } else {
    await runInteractive();
  }
}

main();
