export interface MdxFrontmatter {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  cover?: string;
  tags?: string[];
  isFeatured?: boolean;
}

export interface MdxPostMeta extends MdxFrontmatter {
  slug: string;
}
