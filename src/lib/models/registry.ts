export type Discipline =
	| 'networks'
	| 'epidemics'
	| 'spatial'
	| 'dynamics'
	| 'criticality'
	| 'evolution'
	| 'automata';

export type ModelStatus = 'planned' | 'in-progress' | 'published';

export interface ModelEntry {
	slug: string;
	name: string;
	tagline: string;
	discipline: Discipline;
	status: ModelStatus;
}

export const disciplines: { id: Discipline | 'all'; label: string }[] = [
	{ id: 'all', label: 'All' },
	{ id: 'networks', label: 'Networks' },
	{ id: 'epidemics', label: 'Epidemics' },
	{ id: 'spatial', label: 'Spatial' },
	{ id: 'dynamics', label: 'Dynamics' },
	{ id: 'criticality', label: 'Criticality' },
	{ id: 'evolution', label: 'Evolution' },
	{ id: 'automata', label: 'Automata' }
];

export const registry: ModelEntry[] = [
	{
		slug: 'schelling',
		name: 'Schelling segregation',
		tagline: 'Mild preference for like neighbors produces sharp segregation.',
		discipline: 'spatial',
		status: 'planned'
	},
	{
		slug: 'sir',
		name: 'SIR epidemic',
		tagline: 'Susceptible–infected–recovered dynamics on a closed population.',
		discipline: 'epidemics',
		status: 'planned'
	},
	{
		slug: 'ising',
		name: 'Ising model',
		tagline: 'Spin lattice with a phase transition at a critical temperature.',
		discipline: 'criticality',
		status: 'planned'
	},
	{
		slug: 'boids',
		name: 'Boids',
		tagline: 'Three local rules — separation, alignment, cohesion — yield flocking.',
		discipline: 'dynamics',
		status: 'planned'
	},
	{
		slug: 'wolfram-ca',
		name: 'Elementary cellular automata',
		tagline: "Wolfram's 256 rules across simple, periodic, chaotic, and complex.",
		discipline: 'automata',
		status: 'planned'
	},
	{
		slug: 'percolation',
		name: 'Site percolation',
		tagline: 'A geometric phase transition at a critical occupation probability.',
		discipline: 'spatial',
		status: 'planned'
	},
	{
		slug: 'forest-fire',
		name: 'Forest fire',
		tagline: 'Self-organized criticality from local growth and spreading fires.',
		discipline: 'criticality',
		status: 'planned'
	},
	{
		slug: 'erdos-renyi',
		name: 'Erdős–Rényi graph',
		tagline: 'A giant connected component appears at mean degree one.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'preferential-attachment',
		name: 'Preferential attachment',
		tagline: 'Rich-get-richer growth produces scale-free degree distributions.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'lotka-volterra',
		name: 'Lotka–Volterra',
		tagline: 'Predator and prey populations oscillate around a fixed point.',
		discipline: 'dynamics',
		status: 'planned'
	}
];
