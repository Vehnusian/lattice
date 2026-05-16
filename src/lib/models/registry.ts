export type Discipline =
	| 'networks'
	| 'epidemics'
	| 'spatial'
	| 'dynamics'
	| 'synchronization'
	| 'criticality'
	| 'evolution'
	| 'automata'
	| 'morphogenesis'
	| 'econophysics'
	| 'opinion'
	| 'active'
	| 'walks';

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
	{ id: 'synchronization', label: 'Synchronization' },
	{ id: 'criticality', label: 'Criticality' },
	{ id: 'evolution', label: 'Evolution' },
	{ id: 'automata', label: 'Automata' },
	{ id: 'morphogenesis', label: 'Morphogenesis' },
	{ id: 'econophysics', label: 'Econophysics' },
	{ id: 'opinion', label: 'Opinion' },
	{ id: 'active', label: 'Active matter' },
	{ id: 'walks', label: 'Walks' }
];

export const registry: ModelEntry[] = [
	{
		slug: 'erdos-renyi',
		name: 'Erdős–Rényi random graph',
		tagline: 'Baseline random graph G(n,p); benchmark for structural deviations.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'watts-strogatz',
		name: 'Watts–Strogatz small-world',
		tagline: 'Ring lattice with rewiring; short paths with high clustering.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'barabasi-albert',
		name: 'Barabási–Albert preferential attachment',
		tagline: 'Growth with preferential attachment yields scale-free degree distribution.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'configuration-model',
		name: 'Configuration model',
		tagline: 'Random graph with a prescribed degree sequence via stub matching.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'stochastic-block-model',
		name: 'Stochastic block model',
		tagline: 'Community-structured random graph; canonical for community detection.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'girvan-newman',
		name: 'Girvan–Newman',
		tagline: 'Edge-betweenness removal to expose community structure.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'bond-percolation-networks',
		name: 'Bond percolation on networks',
		tagline: 'Edge occupation produces a giant component above a threshold.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'sir-on-networks',
		name: 'SIS / SIR on networks',
		tagline: 'Epidemic spread constrained by contact-network topology.',
		discipline: 'networks',
		status: 'planned'
	},
	{
		slug: 'voter-on-networks',
		name: 'Voter model on networks',
		tagline: 'Nodes copy a random neighbor; consensus dynamics on graphs.',
		discipline: 'networks',
		status: 'planned'
	},

	{
		slug: 'sir',
		name: 'SIR (deterministic)',
		tagline: 'Susceptible–Infectious–Recovered ODE; basic reproduction number R₀ = β/γ.',
		discipline: 'epidemics',
		status: 'planned'
	},
	{
		slug: 'sis',
		name: 'SIS',
		tagline: 'No permanent immunity; endemic equilibrium for R₀ > 1.',
		discipline: 'epidemics',
		status: 'planned'
	},
	{
		slug: 'seir',
		name: 'SEIR',
		tagline: 'Adds a latent exposed compartment; matches diseases with incubation.',
		discipline: 'epidemics',
		status: 'planned'
	},
	{
		slug: 'sirs',
		name: 'SIRS',
		tagline: 'Waning immunity drives sustained or oscillatory dynamics.',
		discipline: 'epidemics',
		status: 'planned'
	},
	{
		slug: 'sir-lattice',
		name: 'Agent-based SIR on lattice',
		tagline: 'Stochastic neighbor-to-neighbor transmission on a 2D grid.',
		discipline: 'epidemics',
		status: 'planned'
	},
	{
		slug: 'metapopulation',
		name: 'Metapopulation epidemic',
		tagline: 'Coupled SIR patches with mobility; threshold depends on the mobility network.',
		discipline: 'epidemics',
		status: 'planned'
	},
	{
		slug: 'vaccination',
		name: 'Vaccination strategies',
		tagline: 'Random vs targeted immunization on heterogeneous networks.',
		discipline: 'epidemics',
		status: 'planned'
	},

	{
		slug: 'schelling',
		name: 'Schelling segregation',
		tagline: 'Mild preference for like neighbors produces sharp segregation.',
		discipline: 'spatial',
		status: 'published'
	},
	{
		slug: 'site-percolation',
		name: 'Site percolation (2D)',
		tagline: 'Occupy sites with probability p; spanning cluster appears at p_c.',
		discipline: 'spatial',
		status: 'planned'
	},
	{
		slug: 'bond-percolation',
		name: 'Bond percolation (2D)',
		tagline: 'Edge variant of percolation; same universality class.',
		discipline: 'spatial',
		status: 'planned'
	},
	{
		slug: 'predator-prey-lattice',
		name: 'Predator–prey lattice',
		tagline: 'Stochastic Lotka–Volterra on a grid; spatial coexistence and waves.',
		discipline: 'spatial',
		status: 'planned'
	},
	{
		slug: 'dla',
		name: 'Diffusion-limited aggregation',
		tagline: 'Random walkers stick to a cluster; produces fractal dendrites.',
		discipline: 'spatial',
		status: 'planned'
	},
	{
		slug: 'eden-growth',
		name: 'Eden growth',
		tagline: 'Compact cluster growth from random boundary additions; KPZ roughening.',
		discipline: 'spatial',
		status: 'planned'
	},

	{
		slug: 'logistic-map',
		name: 'Logistic map',
		tagline: 'x → r x(1−x); period-doubling route to chaos.',
		discipline: 'dynamics',
		status: 'planned'
	},
	{
		slug: 'henon-map',
		name: 'Hénon map',
		tagline: '2D quadratic map producing a strange attractor.',
		discipline: 'dynamics',
		status: 'planned'
	},
	{
		slug: 'lorenz',
		name: 'Lorenz attractor',
		tagline: '3D ODE for atmospheric convection; canonical strange attractor.',
		discipline: 'dynamics',
		status: 'planned'
	},
	{
		slug: 'rossler',
		name: 'Rössler attractor',
		tagline: 'Simpler 3D ODE strange attractor with a single nonlinearity.',
		discipline: 'dynamics',
		status: 'planned'
	},
	{
		slug: 'double-pendulum',
		name: 'Double pendulum',
		tagline: 'Two coupled rigid pendula; chaotic for moderate energies.',
		discipline: 'dynamics',
		status: 'planned'
	},
	{
		slug: 'fitzhugh-nagumo',
		name: 'FitzHugh–Nagumo',
		tagline: '2D reduction of Hodgkin–Huxley; excitable and oscillatory regimes.',
		discipline: 'dynamics',
		status: 'planned'
	},
	{
		slug: 'van-der-pol',
		name: 'Van der Pol oscillator',
		tagline: 'Nonlinear damped oscillator with a limit cycle.',
		discipline: 'dynamics',
		status: 'planned'
	},
	{
		slug: 'lotka-volterra',
		name: 'Lotka–Volterra',
		tagline: 'Predator and prey populations oscillate around a fixed point.',
		discipline: 'dynamics',
		status: 'planned'
	},

	{
		slug: 'kuramoto',
		name: 'Kuramoto oscillators',
		tagline: 'Phase oscillators with mean-field coupling; collective synchronization.',
		discipline: 'synchronization',
		status: 'planned'
	},
	{
		slug: 'winfree',
		name: 'Winfree model',
		tagline: 'Pulse-coupled oscillators; precursor to Kuramoto.',
		discipline: 'synchronization',
		status: 'planned'
	},
	{
		slug: 'chimera',
		name: 'Chimera states',
		tagline: 'Coexisting synchronous and asynchronous regions in symmetric arrays.',
		discipline: 'synchronization',
		status: 'planned'
	},
	{
		slug: 'integrate-fire',
		name: 'Pulse-coupled integrate-and-fire',
		tagline: 'Mirollo–Strogatz neurons synchronize via instantaneous pulses.',
		discipline: 'synchronization',
		status: 'planned'
	},

	{
		slug: 'sandpile',
		name: 'Bak–Tang–Wiesenfeld sandpile',
		tagline: 'Toppling rule produces power-law avalanche sizes; self-organized criticality.',
		discipline: 'criticality',
		status: 'planned'
	},
	{
		slug: 'manna',
		name: 'Manna model',
		tagline: 'Stochastic two-state sandpile with cleaner critical exponents.',
		discipline: 'criticality',
		status: 'planned'
	},
	{
		slug: 'ising',
		name: '2D Ising model',
		tagline: 'Nearest-neighbor spin lattice with a second-order phase transition.',
		discipline: 'criticality',
		status: 'planned'
	},
	{
		slug: 'forest-fire',
		name: 'Drossel–Schwabl forest fire',
		tagline: 'Trees grow and lightning ignites; self-organizes to critical clusters.',
		discipline: 'criticality',
		status: 'planned'
	},
	{
		slug: 'percolation-cluster-stats',
		name: 'Percolation cluster statistics',
		tagline: 'Distribution of cluster sizes near p_c; finite-size scaling.',
		discipline: 'criticality',
		status: 'planned'
	},
	{
		slug: 'directed-percolation',
		name: 'Directed percolation',
		tagline: 'Anisotropic percolation; canonical absorbing-state universality.',
		discipline: 'criticality',
		status: 'planned'
	},

	{
		slug: 'replicator',
		name: 'Replicator dynamics',
		tagline: 'Frequency dynamics of strategies proportional to fitness deviation.',
		discipline: 'evolution',
		status: 'planned'
	},
	{
		slug: 'hawk-dove',
		name: 'Hawk–Dove',
		tagline: 'Two-strategy game with a stable mixed ESS for V < C.',
		discipline: 'evolution',
		status: 'planned'
	},
	{
		slug: 'spatial-pd',
		name: "Spatial Prisoner's Dilemma",
		tagline: "Prisoner's Dilemma on a lattice; cooperation persists via clustering.",
		discipline: 'evolution',
		status: 'planned'
	},
	{
		slug: 'moran',
		name: 'Moran process',
		tagline: 'Birth–death dynamics in a finite population; fixation probabilities.',
		discipline: 'evolution',
		status: 'planned'
	},
	{
		slug: 'wright-fisher',
		name: 'Wright–Fisher',
		tagline: 'Discrete-generation genetic drift via binomial sampling.',
		discipline: 'evolution',
		status: 'planned'
	},
	{
		slug: 'nk-landscape',
		name: 'NK fitness landscape',
		tagline: 'Tunable rugged landscape with N loci and K epistatic links.',
		discipline: 'evolution',
		status: 'planned'
	},
	{
		slug: 'bak-sneppen',
		name: 'Bak–Sneppen evolution',
		tagline: 'Minimal-fitness species replaced; co-evolutionary avalanches.',
		discipline: 'evolution',
		status: 'planned'
	},

	{
		slug: 'rule-30',
		name: 'Elementary CA — Rule 30',
		tagline: '1D rule producing an apparently random central column.',
		discipline: 'automata',
		status: 'planned'
	},
	{
		slug: 'rule-90',
		name: 'Elementary CA — Rule 90',
		tagline: 'XOR rule produces a Sierpiński triangle from a singleton seed.',
		discipline: 'automata',
		status: 'planned'
	},
	{
		slug: 'rule-110',
		name: 'Elementary CA — Rule 110',
		tagline: 'Turing-complete 1D CA with localized gliders.',
		discipline: 'automata',
		status: 'planned'
	},
	{
		slug: 'rule-184',
		name: 'Elementary CA — Rule 184',
		tagline: 'Particle-conserving traffic rule; mean-field traffic transition.',
		discipline: 'automata',
		status: 'planned'
	},
	{
		slug: 'game-of-life',
		name: "Conway's Game of Life",
		tagline: '2D CA with B3/S23 rule; Turing-complete with gliders, oscillators, guns.',
		discipline: 'automata',
		status: 'planned'
	},
	{
		slug: 'langtons-ant',
		name: "Langton's ant",
		tagline: '2-color turmite with an eventual period-104 highway attractor.',
		discipline: 'automata',
		status: 'planned'
	},
	{
		slug: 'fhp-lattice-gas',
		name: 'FHP lattice gas',
		tagline: 'Hexagonal lattice gas; recovers Navier–Stokes in the continuum limit.',
		discipline: 'automata',
		status: 'planned'
	},

	{
		slug: 'gray-scott',
		name: 'Gray–Scott reaction–diffusion',
		tagline: 'Two-species reaction–diffusion with a rich pattern zoo.',
		discipline: 'morphogenesis',
		status: 'planned'
	},
	{
		slug: 'brusselator',
		name: 'Brusselator',
		tagline: 'Prototype reaction–diffusion with Hopf and Turing bifurcations.',
		discipline: 'morphogenesis',
		status: 'planned'
	},
	{
		slug: 'turing-pattern',
		name: 'Turing pattern',
		tagline: 'Linear instability of a stable homogeneous state under diffusion.',
		discipline: 'morphogenesis',
		status: 'planned'
	},
	{
		slug: 'bz-oregonator',
		name: 'Belousov–Zhabotinsky',
		tagline: 'Three-variable Oregonator; target and spiral chemical waves.',
		discipline: 'morphogenesis',
		status: 'planned'
	},
	{
		slug: 'physarum',
		name: 'Physarum transport',
		tagline: 'Tube reinforcement by flow; recovers shortest-path and network optimization.',
		discipline: 'morphogenesis',
		status: 'planned'
	},
	{
		slug: 'l-systems',
		name: 'L-systems',
		tagline: 'String-rewriting grammars producing branching plant-like structures.',
		discipline: 'morphogenesis',
		status: 'planned'
	},

	{
		slug: 'minority-game',
		name: 'Minority game',
		tagline: 'Agents choose one of two actions; minority wins; emergent volatility curve.',
		discipline: 'econophysics',
		status: 'planned'
	},
	{
		slug: 'wealth-exchange',
		name: 'Kinetic wealth exchange',
		tagline: 'Random pairwise wealth redistribution with saving propensity.',
		discipline: 'econophysics',
		status: 'planned'
	},
	{
		slug: 'yard-sale',
		name: 'Yard-sale model',
		tagline: 'Multiplicative wealth exchange; condensation onto a single agent.',
		discipline: 'econophysics',
		status: 'planned'
	},
	{
		slug: 'cont-bouchaud',
		name: 'Cont–Bouchaud herding',
		tagline: 'Random trader clusters produce fat-tailed returns.',
		discipline: 'econophysics',
		status: 'planned'
	},
	{
		slug: 'lux-marchesi',
		name: 'Lux–Marchesi market',
		tagline: 'Fundamentalist–chartist agents reproduce stylized facts of returns.',
		discipline: 'econophysics',
		status: 'planned'
	},

	{
		slug: 'voter-model',
		name: 'Voter model',
		tagline: 'Random neighbor copy; coarsening to consensus on finite lattices.',
		discipline: 'opinion',
		status: 'planned'
	},
	{
		slug: 'sznajd',
		name: 'Sznajd model',
		tagline: 'A pair of agreeing neighbors converts neighbors; united we stand.',
		discipline: 'opinion',
		status: 'planned'
	},
	{
		slug: 'deffuant',
		name: 'Deffuant bounded confidence',
		tagline: 'Pairwise averaging only if opinions differ by less than ε.',
		discipline: 'opinion',
		status: 'planned'
	},
	{
		slug: 'hegselmann-krause',
		name: 'Hegselmann–Krause',
		tagline: 'Synchronous bounded-confidence averaging over neighbors within ε.',
		discipline: 'opinion',
		status: 'planned'
	},
	{
		slug: 'galam',
		name: 'Galam majority rule',
		tagline: 'Small groups adopt local majority; tipping points in referendum dynamics.',
		discipline: 'opinion',
		status: 'planned'
	},

	{
		slug: 'vicsek',
		name: 'Vicsek flocking',
		tagline: 'Constant-speed agents align to neighbors with noise; flocking transition.',
		discipline: 'active',
		status: 'planned'
	},
	{
		slug: 'boids',
		name: 'Boids',
		tagline: 'Separation, alignment, and cohesion produce emergent flocking.',
		discipline: 'active',
		status: 'planned'
	},
	{
		slug: 'active-brownian',
		name: 'Active Brownian particles',
		tagline: 'Self-propelled disks with rotational diffusion; motility-induced phase separation.',
		discipline: 'active',
		status: 'planned'
	},

	{
		slug: 'random-walk',
		name: 'Simple random walk',
		tagline: 'Step ±1 each tick; mean-square displacement linear in time.',
		discipline: 'walks',
		status: 'planned'
	},
	{
		slug: 'levy-flight',
		name: 'Lévy flight',
		tagline: 'Heavy-tailed step lengths; super-diffusive scaling.',
		discipline: 'walks',
		status: 'planned'
	},
	{
		slug: 'self-avoiding-walk',
		name: 'Self-avoiding walk',
		tagline: 'A walk that never revisits a site; canonical polymer model.',
		discipline: 'walks',
		status: 'planned'
	},
	{
		slug: 'first-passage',
		name: 'First passage',
		tagline: 'Time to hit a target for a diffusive or biased walker.',
		discipline: 'walks',
		status: 'planned'
	}
];
