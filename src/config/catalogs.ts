const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;

export interface CatalogMeta {
  label: string;
  icon: string;
}

export const catalogMeta: Record<string, CatalogMeta> = {
  js: { label: 'JavaScript', icon: devicon('javascript') },
};

export function getCatalogLabel(catalog: string): string {
  return catalogMeta[catalog]?.label ?? catalog;
}

export function getCatalogIcon(catalog: string): string {
  return (
    catalogMeta[catalog]?.icon ??
    devicon(catalog.toLowerCase().replace(/\s/g, ''))
  );
}
