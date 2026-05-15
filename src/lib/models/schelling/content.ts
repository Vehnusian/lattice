import type { Citation } from '$lib/components/CitationBlock.svelte';

export const defaultParams = {
	size: 50,
	density: 0.9,
	tolerance: 0.4
};

export const presets = [
	{ label: 'Sharp segregation', summary: 'τ 0.5 · d 0.9', params: { tolerance: 0.5, density: 0.9 } },
	{ label: 'Mild preference', summary: 'τ 0.3 · d 0.9', params: { tolerance: 0.3, density: 0.9 } },
	{ label: 'Sparse drift', summary: 'τ 0.5 · d 0.5', params: { tolerance: 0.5, density: 0.5 } },
	{ label: 'Tight quarters', summary: 'τ 0.7 · d 0.95', params: { tolerance: 0.7, density: 0.95 } }
];

export const citation: Citation = {
	paper:
		'Schelling, T. C. (1971). Dynamic Models of Segregation. Journal of Mathematical Sociology, 1, 143–186.',
	paperUrl: 'https://doi.org/10.1080/0022250X.1971.9989794',
	textbook:
		'Sayama, H. (2015). Introduction to the Modeling and Analysis of Complex Systems. Open SUNY Textbooks.',
	textbookUrl: 'https://open.umn.edu/opentextbooks/textbooks/233',
	freeRef: 'Wilensky, U. (1997). NetLogo Models Library: Segregation.',
	freeRefUrl: 'https://ccl.northwestern.edu/netlogo/models/Segregation'
};

export const originalBibtex = `@article{schelling1971dynamic,
  author  = {Schelling, Thomas C.},
  title   = {Dynamic Models of Segregation},
  journal = {Journal of Mathematical Sociology},
  volume  = {1},
  pages   = {143--186},
  year    = {1971}
}`;

export const originalPlain =
	'Schelling, T. C. (1971). Dynamic Models of Segregation. Journal of Mathematical Sociology, 1, 143–186.';

export const pageBibtex = `@misc{lattice2026schelling,
  author       = {Khan, Hashim},
  title        = {Schelling segregation},
  howpublished = {Lattice: A reference library of complex systems models},
  year         = {2026},
  url          = {https://github.com/Vehnusian/lattice}
}`;

export const pagePlain =
	'Khan, H. (2026). Schelling segregation. In Lattice: A reference library of complex systems models. https://github.com/Vehnusian/lattice';
