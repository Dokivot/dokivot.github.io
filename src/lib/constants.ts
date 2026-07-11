export const SITE = {
  title: 'Dokivot',
  description: 'Personal knowledge repository — deep technical writing on LLMs, ML, and systems.',
  url: 'https://dokivot.github.io',
  author: 'Dokivot',
  locale: 'en-US',
};

export const NAV_ITEMS = [
  { label: 'Blog', href: '/blog', icon: 'FileText' },
  { label: 'Notes', href: '/notes', icon: 'StickyNote' },
  { label: 'Projects', href: '/projects', icon: 'FolderGit2' },
  { label: 'Docs', href: '/docs', icon: 'BookOpen' },
  { label: 'About', href: '/about', icon: 'User' },
] as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/Dokivot',
  email: 'mailto:dokivot@outlook.com',
  twitter: 'https://x.com/Dokivot',
  scholar: 'https://scholar.google.com/citations?user=Dokivot',
} as const;

export const MATURITY_LABELS: Record<string, string> = {
  seedling: 'Seedling',
  budding: 'Budding',
  evergreen: 'Evergreen',
};

export const MATURITY_ICONS: Record<string, string> = {
  seedling: 'Sprout',
  budding: 'Leaf',
  evergreen: 'TreePine',
};
