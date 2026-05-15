import type { Citation } from '$lib/components/CitationBlock.svelte';

export const citation: Citation = {
	paper:
		'Schelling, T. C. (1971). Dynamic Models of Segregation. Journal of Mathematical Sociology, 1, 143–186.',
	paperUrl: 'https://doi.org/10.1080/0022250X.1971.9989794',
	textbook:
		'Sayama, H. (2015). Introduction to the Modeling and Analysis of Complex Systems. OpenSUNY, ch. 19.',
	freeRef: 'Wilensky, U. (1997). NetLogo Models Library: Segregation.',
	freeRefUrl: 'https://ccl.northwestern.edu/netlogo/models/Segregation'
};

export const presets = [
	{ label: 'Sharp segregation', params: { tolerance: 0.5, density: 0.9 } },
	{ label: 'Indifferent agents', params: { tolerance: 0.2, density: 0.9 } },
	{ label: 'Sparse drift', params: { tolerance: 0.5, density: 0.5 } },
	{ label: 'Tight quarters', params: { tolerance: 0.7, density: 0.95 } }
];

export const defaultParams = {
	size: 50,
	density: 0.9,
	tolerance: 0.4
};

export const bibtex = `@article{schelling1971dynamic,
  author  = {Schelling, Thomas C.},
  title   = {Dynamic Models of Segregation},
  journal = {Journal of Mathematical Sociology},
  volume  = {1},
  pages   = {143--186},
  year    = {1971}
}`;
