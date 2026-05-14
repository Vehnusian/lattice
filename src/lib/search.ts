import Fuse from 'fuse.js';
import { registry, type ModelEntry } from './models/registry';

export function normalize(s: string): string {
	return s
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[‐-―−]/g, '-')
		.replace(/[-_/]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

interface IndexedEntry extends ModelEntry {
	_name: string;
	_tagline: string;
	_slug: string;
}

const indexed: IndexedEntry[] = registry.map((m) => ({
	...m,
	_name: normalize(m.name),
	_tagline: normalize(m.tagline),
	_slug: normalize(m.slug)
}));

const fuse = new Fuse(indexed, {
	keys: [
		{ name: '_name', weight: 0.6 },
		{ name: '_tagline', weight: 0.3 },
		{ name: '_slug', weight: 0.1 }
	],
	threshold: 0.4,
	ignoreLocation: true,
	includeScore: true,
	minMatchCharLength: 2
});

export function searchModels(query: string): ModelEntry[] {
	const q = normalize(query);
	if (!q) return registry;
	return fuse.search(q).map((r) => r.item);
}
