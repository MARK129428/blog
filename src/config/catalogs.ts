  const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;

export interface CatalogMeta {
  label: string;
  icon: string;
  description?: string;
}

/** 按主题分类；具体语言/框架用 tags 标注 */
export const catalogMeta: Record<string, CatalogMeta> = {
  frontend: {
    label: '前端',
    icon: devicon('react'),
    description: '框架、浏览器、工程化与性能',
  },
  uiux: {
    label: 'UI/UX',
    icon: devicon('figma'),
    description: '界面设计、交互体验、可用性',
  },
  product: {
    label: '产品',
    icon: devicon('jira'),
    description: '产品设计、需求分析、用户研究',
  },
  backend: {
    label: '后端',
    icon: devicon('nodejs'),
    description: 'API、架构、鉴权、微服务',
  },
  devops: {
    label: 'DevOps',
    icon: devicon('docker'),
    description: '部署、CI/CD、运维',
  },
  database: {
    label: '数据库',
    icon: devicon('postgresql'),
    description: 'SQL、索引、缓存、存储',
  },
  algorithm: {
    label: '算法',
    icon: devicon('cplusplus'),
    description: '算法与数据结构',
  },
  tools: {
    label: '工具',
    icon: devicon('vscode'),
    description: '编辑器、效率、工作流',
  },
  misc: {
    label: '杂谈',
    icon: devicon('markdown'),
    description: '不适合以上分类的随笔',
  },
};

export function getConfiguredCatalogs(): string[] {
  return Object.keys(catalogMeta);
}

export function isValidCatalog(catalog: string): boolean {
  return catalog in catalogMeta;
}

export function getCatalogLabel(catalog: string): string {
  return catalogMeta[catalog]?.label ?? catalog;
}

export function getCatalogIcon(catalog: string): string {
  return (
    catalogMeta[catalog]?.icon ??
    devicon(catalog.toLowerCase().replace(/\s/g, ''))
  );
}

export function getCatalogDescription(catalog: string): string | undefined {
  return catalogMeta[catalog]?.description;
}
