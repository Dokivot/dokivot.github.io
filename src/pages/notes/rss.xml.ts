import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../lib/constants';

export async function GET() {
  const notes = await getCollection('notes');
  notes.sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());
  return rss({
    title: `${SITE.title} Notes`,
    description: `${SITE.title} study notes and knowledge cards`,
    site: SITE.url,
    items: notes.map((note) => ({
      title: note.data.title,
      description: `[${note.data.maturity}] ${note.data.tags.map((t) => '#' + t).join(' ')}`,
      pubDate: note.data.updated,
      link: `/notes/${note.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
