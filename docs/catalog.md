# Lattice Catalog

Lattice is a reference library of complex-systems models for university students and instructors. Each entry below corresponds to one card on the site and, eventually, a fully implemented and validated model page. The catalog targets canonical models with established textbook treatment, reproducible benchmarks, and clear pedagogical value.

## Curation rules

- A model is included only if it appears in at least one of the priority references and has a defined analytic or numerical benchmark.
- Each entry lists a short canonical name, a one-line description, discipline, primary textbook, original paper, free reference if available, implementation difficulty, and known validation results.
- Difficulty: _easy_ (≤ 1 week for an undergraduate), _medium_ (1–2 weeks), _hard_ (3–4 weeks, may require nontrivial numerics or careful boundary handling).
- Disciplines were extended from the original seven to eleven to keep each category coherent. See the Notes section for the taxonomy rationale.

---

## Networks

Models on graph structure, growth, and dynamical processes constrained by topology. Benchmarks here are typically degree distributions, percolation thresholds, and spectral quantities.

### Erdős–Rényi random graph

- Description: Baseline random graph G(n,p); benchmark for any structural deviation.
- Discipline: networks
- Textbook: Newman, _Networks_ 2nd ed. (Oxford, 2018), ch. 12.
- Original paper: Erdős, P. and Rényi, A., _Publ. Math. Debrecen_ **6**, 290 (1959).
- Free reference: Barabási, _Network Science_, ch. 3 (networksciencebook.com).
- Difficulty: easy.
- Benchmarks: giant component emerges at ⟨k⟩ = 1; Poisson degree distribution with mean np.

### Watts–Strogatz small-world

- Description: Ring lattice with rewiring probability p; short paths with high clustering.
- Discipline: networks
- Textbook: Newman, _Networks_ 2nd ed. (2018), ch. 11.
- Original paper: Watts, D. J. and Strogatz, S. H., _Nature_ **393**, 440 (1998).
- Free reference: Barabási, _Network Science_, ch. 3.
- Difficulty: easy.
- Benchmarks: clustering C(p)/C(0) and path length L(p)/L(0) curves of the Watts–Strogatz figure.

### Barabási–Albert preferential attachment

- Description: Growth + preferential attachment yields scale-free degree distribution.
- Discipline: networks
- Textbook: Barabási, _Network Science_, ch. 5.
- Original paper: Barabási, A.-L. and Albert, R., _Science_ **286**, 509 (1999).
- Free reference: networksciencebook.com ch. 5.
- Difficulty: easy.
- Benchmarks: degree distribution P(k) ~ k^-3 independent of m.

### Configuration model

- Description: Random graph with a prescribed degree sequence via stub matching.
- Discipline: networks
- Textbook: Newman, _Networks_ 2nd ed. (2018), ch. 13.
- Original paper: Molloy, M. and Reed, B., _Random Struct. Algorithms_ **6**, 161 (1995).
- Free reference: Newman lecture notes, arXiv:cond-mat/0303516.
- Difficulty: easy.
- Benchmarks: giant component condition ⟨k(k−1)⟩ = ⟨k⟩.

### Stochastic block model

- Description: Community-structured random graph; canonical benchmark for community detection.
- Discipline: networks
- Textbook: Newman, _Networks_ 2nd ed. (2018), ch. 14.
- Original paper: Holland, P. W., Laskey, K. B. and Leinhardt, S., _Soc. Networks_ **5**, 109 (1983).
- Free reference: Abbe, E., _J. Mach. Learn. Res._ **18**, 1 (2018).
- Difficulty: medium.
- Benchmarks: Kesten–Stigum detectability threshold (a−b)² = 2(a+b) for two equal blocks.

### Girvan–Newman community detection

- Description: Edge-betweenness removal to expose community structure.
- Discipline: networks
- Textbook: Newman, _Networks_ 2nd ed. (2018), ch. 14.
- Original paper: Girvan, M. and Newman, M. E. J., _PNAS_ **99**, 7821 (2002).
- Free reference: arXiv:cond-mat/0112110.
- Difficulty: medium.
- Benchmarks: recovery of planted partitions in karate-club and dolphin networks.

### Bond percolation on networks

- Description: Edge occupation produces a giant component above a threshold p_c.
- Discipline: networks
- Textbook: Newman, _Networks_ 2nd ed. (2018), ch. 15.
- Original paper: Callaway, D. S. et al., _Phys. Rev. Lett._ **85**, 5468 (2000).
- Free reference: Barabási, _Network Science_, ch. 8.
- Difficulty: medium.
- Benchmarks: p_c = ⟨k⟩ / (⟨k²⟩ − ⟨k⟩); p_c → 0 for scale-free with γ ≤ 3.

### SIS / SIR on networks

- Description: Epidemic spread constrained by contact network topology.
- Discipline: networks
- Textbook: Newman, _Networks_ 2nd ed. (2018), ch. 16.
- Original paper: Pastor-Satorras, R. and Vespignani, A., _Phys. Rev. Lett._ **86**, 3200 (2001).
- Free reference: Pastor-Satorras et al., _Rev. Mod. Phys._ **87**, 925 (2015).
- Difficulty: medium.
- Benchmarks: epidemic threshold λ_c = ⟨k⟩/⟨k²⟩; vanishing threshold for scale-free networks.

### Voter model on networks

- Description: Node copies a random neighbor's binary opinion; consensus dynamics.
- Discipline: networks
- Textbook: Castellano, Fortunato, Loreto, _Rev. Mod. Phys._ **81**, 591 (2009).
- Original paper: Clifford, P. and Sudbury, A., _Biometrika_ **60**, 581 (1973).
- Free reference: Sood, V. and Redner, S., _Phys. Rev. Lett._ **94**, 178701 (2005).
- Difficulty: easy.
- Benchmarks: consensus time scales as N on complete graph, N² on 1D lattice.

---

## Epidemics

Compartmental and agent-based models for transmission of an infectious agent.

### SIR (deterministic)

- Description: Susceptible–Infectious–Recovered ODE; R0 = β/γ.
- Discipline: epidemics
- Textbook: Keeling and Rohani, _Modeling Infectious Diseases_ (Princeton, 2008), ch. 2.
- Original paper: Kermack, W. O. and McKendrick, A. G., _Proc. R. Soc. A_ **115**, 700 (1927).
- Free reference: complexity-explorables.org (Brockmann), "Epidemonic" suite.
- Difficulty: easy.
- Benchmarks: final size relation 1 − R(∞) = exp(−R0 R(∞)).

### SIS

- Description: No permanent immunity; endemic equilibrium for R0 > 1.
- Discipline: epidemics
- Textbook: Keeling and Rohani (2008), ch. 2.
- Original paper: Weiss, G. H. and Dishon, M., _Math. Biosci._ **11**, 261 (1971).
- Free reference: Brauer, F., _Math. Biosci. Eng._ **14**, 1297 (2017).
- Difficulty: easy.
- Benchmarks: endemic fraction I\* = 1 − 1/R0.

### SEIR

- Description: Adds latent (Exposed) compartment; matches diseases with incubation.
- Discipline: epidemics
- Textbook: Keeling and Rohani (2008), ch. 3.
- Original paper: Anderson, R. M. and May, R. M., _Infectious Diseases of Humans_ (Oxford, 1991).
- Free reference: Hethcote, H. W., _SIAM Rev._ **42**, 599 (2000).
- Difficulty: easy.
- Benchmarks: R0 = βσ/[(σ+μ)(γ+μ)]; identical final size to SIR.

### SIRS

- Description: Waning immunity drives sustained or oscillatory dynamics.
- Discipline: epidemics
- Textbook: Keeling and Rohani (2008), ch. 2.
- Original paper: Hethcote, H. W., _Math. Biosci._ **28**, 335 (1976).
- Free reference: Hethcote, _SIAM Rev._ (2000).
- Difficulty: easy.
- Benchmarks: damped oscillations to endemic equilibrium; period ≈ 2π/√(γ(R0−1)/τ).

### Agent-based SIR on lattice

- Description: Stochastic neighbor-to-neighbor transmission on a 2D grid.
- Discipline: epidemics
- Textbook: Sayama, _Modeling and Analysis of Complex Systems_ (OpenSUNY, 2015), ch. 11.
- Original paper: Grassberger, P., _Math. Biosci._ **63**, 157 (1983).
- Free reference: ditto.
- Difficulty: easy.
- Benchmarks: maps onto bond percolation; threshold p_c = 0.5 (bond, square lattice).

### Metapopulation epidemic model

- Description: Coupled SIR patches with mobility; threshold depends on mobility network.
- Discipline: epidemics
- Textbook: Keeling and Rohani (2008), ch. 7.
- Original paper: Colizza, V. et al., _Nat. Phys._ **3**, 276 (2007).
- Free reference: complexity-explorables.org, "Networked Epidemics".
- Difficulty: medium.
- Benchmarks: invasion threshold R\* in terms of mobility and patch R0.

### Vaccination strategies

- Description: Random vs. targeted (high-degree, acquaintance) immunization.
- Discipline: epidemics
- Textbook: Pastor-Satorras et al., _Rev. Mod. Phys._ **87**, 925 (2015).
- Original paper: Cohen, R., Havlin, S., ben-Avraham, D., _Phys. Rev. Lett._ **91**, 247901 (2003).
- Free reference: arXiv:cond-mat/0207387.
- Difficulty: medium.
- Benchmarks: acquaintance immunization threshold scales sublinearly with N on scale-free graphs.

---

## Spatial

Lattice- or continuum-based models in which geometry matters.

### Schelling segregation

- Description: Agents relocate if too few same-type neighbors; produces segregated clusters at low intolerance.
- Discipline: spatial
- Textbook: Sayama (2015), ch. 19; Mitchell, _Complexity_ (2009), ch. 10.
- Original paper: Schelling, T. C., _J. Math. Sociol._ **1**, 143 (1971).
- Free reference: NetLogo Models Library / Wilensky.
- Difficulty: easy.
- Benchmarks: phase transition near tolerance ≈ 1/3; average cluster size diverges.

### Site percolation (2D)

- Description: Occupy sites with probability p; spanning cluster at p_c.
- Discipline: spatial
- Textbook: Stauffer and Aharony, _Introduction to Percolation Theory_ 2nd ed. (Taylor & Francis, 1994), ch. 1–2.
- Original paper: Broadbent, S. R. and Hammersley, J. M., _Proc. Camb. Phil. Soc._ **53**, 629 (1957).
- Free reference: Saberi, _Phys. Rep._ **578**, 1 (2015).
- Difficulty: easy.
- Benchmarks: p_c ≈ 0.59275 (square); fractal dimension d_f = 91/48; ν = 4/3 in 2D.

### Bond percolation (2D)

- Description: Edge variant; same universality class as site percolation.
- Discipline: spatial
- Textbook: Stauffer & Aharony (1994), ch. 1–2.
- Original paper: Broadbent and Hammersley (1957).
- Free reference: Grimmett, _Percolation_ 2nd ed. (Springer, 1999).
- Difficulty: easy.
- Benchmarks: p_c = 1/2 (square); β = 5/36, γ = 43/18.

### Forest-fire model (Drossel–Schwabl)

- Description: Trees grow, lightning ignites; self-organizes to critical cluster distribution.
- Discipline: criticality
- Textbook: Jensen, _Self-Organized Criticality_ (Cambridge, 1998), ch. 4.
- Original paper: Drossel, B. and Schwabl, F., _Phys. Rev. Lett._ **69**, 1629 (1992).
- Free reference: arXiv:cond-mat/9412101 (Clar, Drossel, Schwabl review).
- Difficulty: easy.
- Benchmarks: cluster-size distribution exponent τ ≈ 2.14 in 2D.

### Predator–prey lattice

- Description: Stochastic Lotka–Volterra on a grid; spatial coexistence and waves.
- Discipline: spatial
- Textbook: Murray, _Mathematical Biology II_ 3rd ed. (Springer, 2003), ch. 1, 14.
- Original paper: Satulovsky, J. E. and Tomé, T., _Phys. Rev. E_ **49**, 5073 (1994).
- Free reference: Sayama (2015), ch. 11.
- Difficulty: easy.
- Benchmarks: damped oscillations on lattice vs. closed orbits in mean field.

### Diffusion-limited aggregation

- Description: Random walkers stick to a cluster; produces fractal dendrites.
- Discipline: spatial
- Textbook: Vicsek, _Fractal Growth Phenomena_ 2nd ed. (World Scientific, 1992), ch. 5.
- Original paper: Witten, T. A. and Sander, L. M., _Phys. Rev. Lett._ **47**, 1400 (1981).
- Free reference: Halsey, T. C., _Phys. Today_ **53**, 36 (2000).
- Difficulty: medium.
- Benchmarks: 2D fractal dimension d_f ≈ 1.71.

### Eden growth

- Description: Compact cluster growth by adding random boundary sites; KPZ surface roughening.
- Discipline: spatial
- Textbook: Barabási and Stanley, _Fractal Concepts in Surface Growth_ (Cambridge, 1995), ch. 8.
- Original paper: Eden, M., _Proc. 4th Berkeley Symp._ **4**, 223 (1961).
- Free reference: Krug, J. and Spohn, H., in _Solids Far from Equilibrium_ (1991).
- Difficulty: easy.
- Benchmarks: roughness exponents α = 1/2, β = 1/3 in 1+1 d (KPZ class).

---

## Dynamics

Low-dimensional ODE and map systems; standard chaos and bifurcation testbeds.

### Logistic map

- Description: x\_{n+1} = r x_n(1−x_n); period-doubling route to chaos.
- Discipline: dynamics
- Textbook: Strogatz, _Nonlinear Dynamics and Chaos_ 2nd ed. (Westview, 2015), ch. 10.
- Original paper: May, R. M., _Nature_ **261**, 459 (1976).
- Free reference: Strogatz lectures (MIT OCW 18.353).
- Difficulty: easy.
- Benchmarks: onset of chaos r_∞ ≈ 3.5699; Feigenbaum δ ≈ 4.6692.

### Hénon map

- Description: 2D quadratic map; strange attractor.
- Discipline: dynamics
- Textbook: Strogatz (2015), ch. 12.
- Original paper: Hénon, M., _Commun. Math. Phys._ **50**, 69 (1976).
- Free reference: Sprott, _Chaos and Time-Series Analysis_ (Oxford, 2003).
- Difficulty: easy.
- Benchmarks: Lyapunov λ₁ ≈ 0.419; attractor dimension ≈ 1.26 at (a,b)=(1.4,0.3).

### Lorenz attractor

- Description: 3D ODE atmospheric convection; canonical strange attractor.
- Discipline: dynamics
- Textbook: Strogatz (2015), ch. 9.
- Original paper: Lorenz, E. N., _J. Atmos. Sci._ **20**, 130 (1963).
- Free reference: Strogatz MIT OCW.
- Difficulty: easy.
- Benchmarks: at σ=10, β=8/3, ρ=28: λ₁ ≈ 0.906; correlation dimension ≈ 2.05.

### Rössler attractor

- Description: Simpler 3D ODE strange attractor with single nonlinearity.
- Discipline: dynamics
- Textbook: Strogatz (2015), ch. 12.
- Original paper: Rössler, O. E., _Phys. Lett. A_ **57**, 397 (1976).
- Free reference: Sprott (2003).
- Difficulty: easy.
- Benchmarks: Lyapunov λ₁ ≈ 0.071 at (a,b,c)=(0.2,0.2,5.7).

### Double pendulum

- Description: Two coupled rigid pendula; chaotic for moderate energies.
- Discipline: dynamics
- Textbook: Goldstein, Poole, Safko, _Classical Mechanics_ 3rd ed. (Addison-Wesley, 2002), ch. 1, 8.
- Original paper: Shinbrot, T. et al., _Am. J. Phys._ **60**, 491 (1992).
- Free reference: Acheson, D. J., _Eur. J. Phys._ **14**, 282 (1993).
- Difficulty: easy.
- Benchmarks: energy conservation to machine precision with symplectic integrator; positive λ₁ above threshold.

### FitzHugh–Nagumo

- Description: 2D reduction of Hodgkin–Huxley; excitable and oscillatory regimes.
- Discipline: dynamics
- Textbook: Murray, _Mathematical Biology I_ 3rd ed. (Springer, 2002), ch. 7.
- Original paper: FitzHugh, R., _Biophys. J._ **1**, 445 (1961).
- Free reference: Izhikevich, _Dynamical Systems in Neuroscience_ (MIT, 2007).
- Difficulty: easy.
- Benchmarks: Hopf bifurcation at I = I_H; spiral waves in 2D PDE extension.

### Van der Pol oscillator

- Description: Nonlinear damped oscillator with limit cycle.
- Discipline: dynamics
- Textbook: Strogatz (2015), ch. 7.
- Original paper: van der Pol, B., _Philos. Mag._ **2**, 978 (1926).
- Free reference: Strogatz MIT OCW.
- Difficulty: easy.
- Benchmarks: limit-cycle period T ≈ (3 − 2 ln 2)μ for μ ≫ 1.

### Lotka–Volterra (continuous)

- Description: Predator–prey ODE with closed orbits.
- Discipline: dynamics
- Textbook: Murray, _Mathematical Biology I_ (2002), ch. 3.
- Original paper: Lotka, A. J., _PNAS_ **6**, 410 (1920); Volterra, V., _Nature_ **118**, 558 (1926).
- Free reference: Hofbauer and Sigmund, _Evolutionary Games and Population Dynamics_ (Cambridge, 1998).
- Difficulty: easy.
- Benchmarks: conserved H = δx − γ ln x + βy − α ln y.

---

## Synchronization

Phase- and amplitude-coupled oscillator networks.

### Kuramoto oscillators

- Description: N phase oscillators with mean-field sinusoidal coupling.
- Discipline: synchronization
- Textbook: Strogatz, _Sync_ (Hyperion, 2003); Pikovsky, Rosenblum, Kurths, _Synchronization_ (Cambridge, 2001), ch. 4.
- Original paper: Kuramoto, Y., _Int. Symp. Math. Probl. Theor. Phys._ (1975).
- Free reference: Strogatz, _Physica D_ **143**, 1 (2000).
- Difficulty: easy.
- Benchmarks: K_c = 2/(π g(0)) for Lorentzian g; r ~ √(K−K_c) above threshold.

### Winfree model

- Description: Pulse-coupled oscillators; precursor to Kuramoto.
- Discipline: synchronization
- Textbook: Strogatz, _Sync_ (2003).
- Original paper: Winfree, A. T., _J. Theor. Biol._ **16**, 15 (1967).
- Free reference: Ariaratnam and Strogatz, _Phys. Rev. Lett._ **86**, 4278 (2001).
- Difficulty: medium.
- Benchmarks: phase diagram with incoherent, locked, partially locked, and oscillator-death regions.

### Chimera states

- Description: Coexisting synchronous and asynchronous regions in symmetric oscillator arrays.
- Discipline: synchronization
- Textbook: Pikovsky et al. (2001), supplementary chapters; Strogatz, _Nature_ **513**, 158 (2014).
- Original paper: Kuramoto, Y. and Battogtokh, D., _Nonlin. Phenom. Complex Syst._ **5**, 380 (2002).
- Free reference: Abrams, D. M. and Strogatz, S. H., _Phys. Rev. Lett._ **93**, 174102 (2004).
- Difficulty: medium.
- Benchmarks: stable chimera for coupling phase α near π/2 in nonlocal ring.

### Pulse-coupled integrate-and-fire

- Description: Mirollo–Strogatz neurons synchronize via instantaneous pulses.
- Discipline: synchronization
- Textbook: Pikovsky et al. (2001), ch. 8.
- Original paper: Mirollo, R. E. and Strogatz, S. H., _SIAM J. Appl. Math._ **50**, 1645 (1990).
- Free reference: Strogatz, _Sync_ (2003).
- Difficulty: easy.
- Benchmarks: full synchronization in finite time for concave-up firing curves.

---

## Criticality

Self-organized critical and equilibrium critical systems.

### Bak–Tang–Wiesenfeld sandpile

- Description: Toppling rule on a lattice; avalanche size distribution is power-law.
- Discipline: criticality
- Textbook: Jensen, _Self-Organized Criticality_ (1998), ch. 2.
- Original paper: Bak, P., Tang, C. and Wiesenfeld, K., _Phys. Rev. Lett._ **59**, 381 (1987).
- Free reference: Dhar, D., _Physica A_ **369**, 29 (2006).
- Difficulty: easy.
- Benchmarks: 2D avalanche-size exponent τ ≈ 1.27 (deterministic BTW).

### Manna model

- Description: Stochastic two-state sandpile; cleaner critical exponents than BTW.
- Discipline: criticality
- Textbook: Jensen (1998), ch. 3.
- Original paper: Manna, S. S., _J. Phys. A_ **24**, L363 (1991).
- Free reference: Lübeck, S., _Int. J. Mod. Phys. B_ **18**, 3977 (2004).
- Difficulty: medium.
- Benchmarks: 2D τ ≈ 1.275 (universal Manna class).

### 2D Ising model

- Description: Nearest-neighbor spin model with second-order phase transition.
- Discipline: criticality
- Textbook: Goldenfeld, _Lectures on Phase Transitions and the Renormalization Group_ (Addison-Wesley, 1992), ch. 2.
- Original paper: Onsager, L., _Phys. Rev._ **65**, 117 (1944).
- Free reference: Sethna, _Statistical Mechanics: Entropy, Order Parameters, and Complexity_ (Oxford, 2006), ch. 8 (free PDF).
- Difficulty: easy.
- Benchmarks: T_c = 2/ln(1+√2) ≈ 2.269; β = 1/8, γ = 7/4.

### Percolation cluster statistics

- Description: Distribution of cluster sizes near p_c; finite-size scaling.
- Discipline: criticality
- Textbook: Stauffer and Aharony (1994), ch. 2–3.
- Original paper: Hoshen, J. and Kopelman, R., _Phys. Rev. B_ **14**, 3438 (1976).
- Free reference: Newman and Ziff, _Phys. Rev. E_ **64**, 016706 (2001).
- Difficulty: medium.
- Benchmarks: τ = 187/91, σ = 36/91 in 2D.

### Directed percolation

- Description: Anisotropic percolation; canonical absorbing-state universality.
- Discipline: criticality
- Textbook: Henkel, Hinrichsen, Lübeck, _Non-Equilibrium Phase Transitions I_ (Springer, 2008).
- Original paper: Broadbent and Hammersley (1957); Domany, E. and Kinzel, W., _Phys. Rev. Lett._ **53**, 311 (1984).
- Free reference: Hinrichsen, H., _Adv. Phys._ **49**, 815 (2000).
- Difficulty: medium.
- Benchmarks: 1+1d β ≈ 0.2765; ν*∥ ≈ 1.733, ν*⊥ ≈ 1.097.

---

## Evolution

Replicator and population-genetic models, including evolutionary game theory.

### Replicator dynamics

- Description: Frequency dynamics of strategies proportional to fitness deviation.
- Discipline: evolution
- Textbook: Nowak, _Evolutionary Dynamics_ (Harvard, 2006), ch. 4; Hofbauer and Sigmund (1998), ch. 7.
- Original paper: Taylor, P. D. and Jonker, L. B., _Math. Biosci._ **40**, 145 (1978).
- Free reference: Sigmund, _Games of Life_ (Penguin, 1993).
- Difficulty: easy.
- Benchmarks: Lyapunov functions for stable ESS; convergence to interior fixed points.

### Hawk–Dove

- Description: Two-strategy game with stable mixed ESS for V < C.
- Discipline: evolution
- Textbook: Nowak (2006), ch. 4.
- Original paper: Maynard Smith, J. and Price, G. R., _Nature_ **246**, 15 (1973).
- Free reference: Maynard Smith, _Evolution and the Theory of Games_ (Cambridge, 1982).
- Difficulty: easy.
- Benchmarks: ESS hawk fraction p\* = V/C.

### Spatial Prisoner's Dilemma

- Description: PD on a lattice; cooperation persists via clustering.
- Discipline: evolution
- Textbook: Nowak (2006), ch. 9.
- Original paper: Nowak, M. A. and May, R. M., _Nature_ **359**, 826 (1992).
- Free reference: Szabó, G. and Fáth, G., _Phys. Rep._ **446**, 97 (2007).
- Difficulty: easy.
- Benchmarks: cooperation persists when temptation b ∈ (1.8, 2.0) on Moore neighborhood.

### Moran process

- Description: Birth–death dynamics in a finite population; fixation probabilities.
- Discipline: evolution
- Textbook: Nowak (2006), ch. 6.
- Original paper: Moran, P. A. P., _Proc. Camb. Phil. Soc._ **54**, 60 (1958).
- Free reference: Traulsen and Hauert, _Rev. Nonlinear Dyn. Complex._ **2**, 25 (2009).
- Difficulty: easy.
- Benchmarks: fixation probability ρ = (1−1/r)/(1−1/r^N).

### Wright–Fisher

- Description: Discrete-generation drift with binomial sampling.
- Discipline: evolution
- Textbook: Ewens, _Mathematical Population Genetics_ 2nd ed. (Springer, 2004), ch. 1.
- Original paper: Fisher, _The Genetical Theory of Natural Selection_ (Oxford, 1930); Wright, _Genetics_ **16**, 97 (1931).
- Free reference: Wakeley, _Coalescent Theory_ (Roberts, 2008).
- Difficulty: easy.
- Benchmarks: heterozygosity decay (1 − 1/(2N))^t; fixation time E[T] ≈ 4N for neutral.

### NK fitness landscape

- Description: Tunable rugged landscape with N loci and K epistatic links.
- Discipline: evolution
- Textbook: Kauffman, _The Origins of Order_ (Oxford, 1993), ch. 2.
- Original paper: Kauffman, S. A. and Weinberger, E. D., _J. Theor. Biol._ **141**, 211 (1989).
- Free reference: Altenberg, L., in _Handbook of Evolutionary Computation_ (1997).
- Difficulty: medium.
- Benchmarks: number of local optima ≈ 2^N/(N+1) at K=N−1; expected walk length ~ ln N at K=0.

### Bak–Sneppen evolution

- Description: Minimal-fitness species replaced; co-evolutionary avalanches.
- Discipline: evolution
- Textbook: Jensen (1998), ch. 4.
- Original paper: Bak, P. and Sneppen, K., _Phys. Rev. Lett._ **71**, 4083 (1993).
- Free reference: Paczuski, Maslov, Bak, _Phys. Rev. E_ **53**, 414 (1996).
- Difficulty: easy.
- Benchmarks: threshold fitness ≈ 0.667 (1D); avalanche exponent τ ≈ 1.07.

---

## Automata

Discrete-time, discrete-state, locally-updated rules.

### Elementary CA — Rule 30

- Description: 1D rule producing apparently random central column.
- Discipline: automata
- Textbook: Wolfram, _A New Kind of Science_ (Wolfram Media, 2002), ch. 2 & 3.
- Original paper: Wolfram, S., _Rev. Mod. Phys._ **55**, 601 (1983).
- Free reference: wolframscience.com (full book online).
- Difficulty: easy.
- Benchmarks: entropy of central column → 1 bit/step; passes most diehard tests.

### Elementary CA — Rule 90

- Description: XOR rule; produces Sierpiński triangle from singleton seed.
- Discipline: automata
- Textbook: Wolfram (2002), ch. 3.
- Original paper: Wolfram (1983).
- Free reference: wolframscience.com.
- Difficulty: easy.
- Benchmarks: exact fractal dimension log 3 / log 2 ≈ 1.585.

### Elementary CA — Rule 110

- Description: Turing-complete 1D CA with localized "gliders."
- Discipline: automata
- Textbook: Wolfram (2002), ch. 11.
- Original paper: Cook, M., _Complex Syst._ **15**, 1 (2004).
- Free reference: wolframscience.com.
- Difficulty: medium.
- Benchmarks: emulation of cyclic tag systems; universal computation.

### Elementary CA — Rule 184

- Description: Traffic / particle-conserving rule; mean-field traffic transition.
- Discipline: automata
- Textbook: Wolfram (2002), ch. 6.
- Original paper: Nagel, K. and Schreckenberg, M., _J. Phys. I France_ **2**, 2221 (1992).
- Free reference: Chowdhury, Santen, Schadschneider, _Phys. Rep._ **329**, 199 (2000).
- Difficulty: easy.
- Benchmarks: free-flow / jammed transition at density 1/2; flux–density triangle.

### Conway's Game of Life

- Description: 2D CA with B3/S23 rule; Turing-complete with gliders, oscillators, guns.
- Discipline: automata
- Textbook: Berlekamp, Conway, Guy, _Winning Ways for Your Mathematical Plays_ (Academic, 1982), vol. 2, ch. 25.
- Original paper: Gardner, M., _Sci. Am._ **223**, 120 (1970).
- Free reference: LifeWiki (conwaylife.com/wiki).
- Difficulty: easy.
- Benchmarks: glider period 4, speed c/4; existence of universal constructor (Rendell).

### Langton's ant

- Description: 2-color turmite with eventual "highway" period-104 attractor.
- Discipline: automata
- Textbook: Sayama (2015), ch. 12.
- Original paper: Langton, C. G., _Physica D_ **22**, 120 (1986).
- Free reference: Bunimovich and Troubetzkoy, _J. Stat. Phys._ **67**, 289 (1992).
- Difficulty: easy.
- Benchmarks: highway emerges by ~10⁴ steps; mean drift slope 2 in highway.

### FHP lattice gas

- Description: Hexagonal lattice gas automaton; recovers Navier–Stokes in continuum limit.
- Discipline: automata
- Textbook: Wolf-Gladrow, _Lattice-Gas Cellular Automata and Lattice Boltzmann Models_ (Springer, 2000), ch. 3.
- Original paper: Frisch, U., Hasslacher, B. and Pomeau, Y., _Phys. Rev. Lett._ **56**, 1505 (1986).
- Free reference: Rothman, D. H. and Zaleski, S., _Rev. Mod. Phys._ **66**, 1417 (1994).
- Difficulty: medium.
- Benchmarks: Poiseuille profile; correct shear viscosity ν = 1/8.

---

## Morphogenesis

Reaction–diffusion and pattern-forming systems.

### Gray–Scott reaction–diffusion

- Description: Two-species RD with rich pattern zoo (spots, stripes, self-replication).
- Discipline: morphogenesis
- Textbook: Murray, _Mathematical Biology II_ (2003), ch. 2.
- Original paper: Pearson, J. E., _Science_ **261**, 189 (1993).
- Free reference: Munafo, R., mrob.com/pub/comp/xmorphia/.
- Difficulty: medium.
- Benchmarks: published (F,k) phase diagram (Pearson 1993, regions α–λ).

### Brusselator

- Description: Prototype RD with Hopf and Turing bifurcations.
- Discipline: morphogenesis
- Textbook: Murray, _Mathematical Biology I_ (2002), ch. 6.
- Original paper: Prigogine, I. and Lefever, R., _J. Chem. Phys._ **48**, 1695 (1968).
- Free reference: Nicolis and Prigogine, _Self-Organization in Non-Equilibrium Systems_ (Wiley, 1977).
- Difficulty: easy.
- Benchmarks: Hopf at B = 1 + A²; Turing onset condition Dv/Du > (√(1+A²)−1)²/A².

### Turing pattern (general two-species)

- Description: Linear instability of a stable homogeneous state under diffusion.
- Discipline: morphogenesis
- Textbook: Murray, _Mathematical Biology II_ (2003), ch. 2.
- Original paper: Turing, A. M., _Philos. Trans. R. Soc. B_ **237**, 37 (1952).
- Free reference: Cross, M. C. and Hohenberg, P. C., _Rev. Mod. Phys._ **65**, 851 (1993).
- Difficulty: easy.
- Benchmarks: critical wavenumber k_c² = √(f_u g_v − f_v g_u) / √(D_u D_v).

### Belousov–Zhabotinsky (Oregonator)

- Description: Three-variable model of the BZ chemical oscillator; target and spiral waves.
- Discipline: morphogenesis
- Textbook: Murray, _Mathematical Biology I_ (2002), ch. 8.
- Original paper: Field, R. J. and Noyes, R. M., _J. Chem. Phys._ **60**, 1877 (1974).
- Free reference: Tyson, J. J., _Lect. Notes Biomath._ **10** (1976).
- Difficulty: medium.
- Benchmarks: spiral period ≈ 2π/√(ε f) in stiff limit; experimentally observed at ~1 Hz.

### Physarum slime-mold transport

- Description: Reinforcement of tubes by flow; recovers shortest-path and network optimization.
- Discipline: morphogenesis
- Textbook: Adamatzky, _Physarum Machines_ (World Scientific, 2010), ch. 1–4.
- Original paper: Tero, A., Kobayashi, R. and Nakagaki, T., _J. Theor. Biol._ **244**, 553 (2007).
- Free reference: Tero et al., _Science_ **327**, 439 (2010).
- Difficulty: medium.
- Benchmarks: reproduction of Tokyo rail network with cost/efficiency ratio close to empirical.

### L-systems

- Description: String-rewriting grammars producing branching plant-like structures.
- Discipline: morphogenesis
- Textbook: Prusinkiewicz and Lindenmayer, _The Algorithmic Beauty of Plants_ (Springer, 1990).
- Original paper: Lindenmayer, A., _J. Theor. Biol._ **18**, 280 (1968).
- Free reference: full book free at algorithmicbotany.org.
- Difficulty: easy.
- Benchmarks: fractal dimensions of canonical curves (Koch, dragon, plant) match closed forms.

---

## Econophysics

Statistical-physics models of markets and wealth.

### Minority game

- Description: N agents choose one of two actions; minority wins; emergent volatility curve.
- Discipline: econophysics
- Textbook: Challet, Marsili and Zhang, _Minority Games_ (Oxford, 2005).
- Original paper: Challet, D. and Zhang, Y.-C., _Physica A_ **246**, 407 (1997).
- Free reference: arXiv:adap-org/9712006.
- Difficulty: medium.
- Benchmarks: scaling collapse of σ²/N as function of α = 2^m/N.

### Kinetic wealth-exchange (CCM)

- Description: Random pairwise wealth redistribution with saving propensity λ.
- Discipline: econophysics
- Textbook: Yakovenko and Rosser, _Rev. Mod. Phys._ **81**, 1703 (2009).
- Original paper: Chakraborti, A. and Chakrabarti, B. K., _Eur. Phys. J. B_ **17**, 167 (2000).
- Free reference: Chakrabarti et al., _Econophysics of Wealth Distributions_ (Springer, 2005).
- Difficulty: easy.
- Benchmarks: exponential P(w) at λ=0; gamma-like with mean 1 at fixed λ.

### Yard-sale model

- Description: Multiplicative wealth exchange; condensation onto a single agent.
- Discipline: econophysics
- Textbook: Boghosian, B. M., _Sci. Am._ **321**, 70 (2019).
- Original paper: Chakraborti, A., _Int. J. Mod. Phys. C_ **13**, 1315 (2002).
- Free reference: Boghosian, _Phys. Rev. E_ **89**, 042804 (2014).
- Difficulty: easy.
- Benchmarks: wealth Gini → 1 as t → ∞ without redistribution.

### Cont–Bouchaud herding

- Description: Random partition of agents into trading clusters; fat-tailed returns.
- Discipline: econophysics
- Textbook: Mantegna and Stanley, _Introduction to Econophysics_ (Cambridge, 2000), ch. 11.
- Original paper: Cont, R. and Bouchaud, J.-P., _Macroecon. Dyn._ **4**, 170 (2000).
- Free reference: Bouchaud and Potters, _Theory of Financial Risk and Derivative Pricing_ (Cambridge, 2003).
- Difficulty: easy.
- Benchmarks: return-distribution tail exponent ≈ 3/2 near percolation threshold.

### Lux–Marchesi market

- Description: Heterogeneous fundamentalist–chartist agents; stylized facts of returns.
- Discipline: econophysics
- Textbook: Mantegna and Stanley (2000), ch. 11.
- Original paper: Lux, T. and Marchesi, M., _Nature_ **397**, 498 (1999).
- Free reference: LeBaron, B., in _Handbook of Computational Economics_ (Elsevier, 2006).
- Difficulty: medium.
- Benchmarks: volatility clustering, leptokurtic returns matching empirical exponents ≈ 3.

---

## Opinion dynamics

Social-state propagation rules.

### Voter model (1D/2D)

- Description: Random neighbor copy; coarsening to consensus on finite lattices.
- Discipline: opinion dynamics
- Textbook: Liggett, _Interacting Particle Systems_ (Springer, 1985), ch. 5.
- Original paper: Clifford and Sudbury (1973); Holley, R. A. and Liggett, T. M., _Ann. Probab._ **3**, 643 (1975).
- Free reference: Castellano, Fortunato, Loreto, _Rev. Mod. Phys._ **81**, 591 (2009).
- Difficulty: easy.
- Benchmarks: density of interfaces decays as t^{-1/2} in 2D, t^{-1/2} in 1D (logarithmic correction).

### Sznajd model

- Description: Pair of agreeing neighbors converts neighbors; "united we stand."
- Discipline: opinion dynamics
- Textbook: Castellano, Fortunato, Loreto (2009).
- Original paper: Sznajd-Weron, K. and Sznajd, J., _Int. J. Mod. Phys. C_ **11**, 1157 (2000).
- Free reference: Sznajd-Weron, K., _Acta Phys. Pol. B_ **36**, 2537 (2005).
- Difficulty: easy.
- Benchmarks: exit probability transitions sharply at initial up-fraction 1/2 in 1D.

### Deffuant bounded confidence

- Description: Pairwise averaging only if opinions differ by less than ε.
- Discipline: opinion dynamics
- Textbook: Castellano, Fortunato, Loreto (2009).
- Original paper: Deffuant, G., Neau, D., Amblard, F., Weisbuch, G., _Adv. Complex Syst._ **3**, 87 (2000).
- Free reference: Lorenz, J., _Int. J. Mod. Phys. C_ **18**, 1819 (2007).
- Difficulty: easy.
- Benchmarks: number of clusters ≈ floor(1/(2ε)).

### Hegselmann–Krause

- Description: Synchronous bounded-confidence averaging over all neighbors within ε.
- Discipline: opinion dynamics
- Textbook: Lorenz (2007).
- Original paper: Hegselmann, R. and Krause, U., _JASSS_ **5**(3), 2 (2002).
- Free reference: open at jasss.org.
- Difficulty: easy.
- Benchmarks: consensus for ε ≳ 0.2; cluster splitting at lower ε.

### Galam majority rule

- Description: Random small groups adopt local majority; reformulates referendum dynamics.
- Discipline: opinion dynamics
- Textbook: Galam, _Sociophysics: A Physicist's Modeling of Psycho-Political Phenomena_ (Springer, 2012).
- Original paper: Galam, S., _J. Math. Psychol._ **30**, 426 (1986).
- Free reference: Galam, S., _Eur. Phys. J. B_ **25**, 403 (2002).
- Difficulty: easy.
- Benchmarks: tipping point at initial minority fraction 17.7% for triplets.

---

## Active matter

Self-propelled or motile agent collectives.

### Vicsek flocking

- Description: Constant-speed agents align to neighbors with noise; transition to flock.
- Discipline: active matter
- Textbook: Marchetti et al., _Rev. Mod. Phys._ **85**, 1143 (2013).
- Original paper: Vicsek, T. et al., _Phys. Rev. Lett._ **75**, 1226 (1995).
- Free reference: arXiv:cond-mat/0611743 (Chaté review).
- Difficulty: easy.
- Benchmarks: order parameter scaling near noise critical η_c; weak first-order in 2D.

### Boids

- Description: Reynolds' three rules (separation, alignment, cohesion) produce flocking.
- Discipline: active matter
- Textbook: Reynolds, C. W., _SIGGRAPH '87 Proceedings_, 25 (1987).
- Original paper: same.
- Free reference: red3d.com/cwr/boids.
- Difficulty: easy.
- Benchmarks: emergent polarization > 0.9 for default rule weights; obstacle avoidance.

### Active Brownian particles

- Description: Self-propelled disks with rotational diffusion; motility-induced phase separation.
- Discipline: active matter
- Textbook: Marchetti et al. (2013).
- Original paper: Fily, Y. and Marchetti, M. C., _Phys. Rev. Lett._ **108**, 235702 (2012).
- Free reference: Cates and Tailleur, _Annu. Rev. Condens. Matter Phys._ **6**, 219 (2015).
- Difficulty: medium.
- Benchmarks: MIPS phase boundary in Pe–φ plane.

---

## Walks and transport

Stochastic motion models underpinning many of the above.

### Simple random walk

- Description: Step ±1 each tick on Z; mean-square displacement linear in t.
- Discipline: walks
- Textbook: Feller, _Introduction to Probability Theory and Its Applications_ vol. 1 3rd ed. (Wiley, 1968), ch. 3.
- Original paper: Pearson, K., _Nature_ **72**, 294 (1905).
- Free reference: Hughes, _Random Walks and Random Environments_ (Oxford, 1995).
- Difficulty: easy.
- Benchmarks: ⟨x²⟩ = t; first-passage exponent 1/2 for return to origin.

### Lévy flight

- Description: Heavy-tailed step lengths; super-diffusive scaling.
- Discipline: walks
- Textbook: Mantegna and Stanley (2000), ch. 3.
- Original paper: Mandelbrot, B. B., _The Fractal Geometry of Nature_ (Freeman, 1982).
- Free reference: Klafter, J., Shlesinger, M. F. and Zumofen, G., _Phys. Today_ **49**, 33 (1996).
- Difficulty: easy.
- Benchmarks: ⟨|x|^q⟩ ~ t^{q/α} for q < α; α = 2 recovers diffusion.

### Self-avoiding walk

- Description: Walk that never revisits a site; canonical polymer model.
- Discipline: walks
- Textbook: Madras and Slade, _The Self-Avoiding Walk_ (Birkhäuser, 1993).
- Original paper: Flory, P. J., _J. Chem. Phys._ **17**, 303 (1949).
- Free reference: Hughes (1995), vol. 1.
- Difficulty: medium.
- Benchmarks: ν = 3/4 in 2D, ν ≈ 0.588 in 3D; connective constant μ(square) ≈ 2.638.

### First-passage to a boundary

- Description: Time to hit a target for a diffusive or biased walker.
- Discipline: walks
- Textbook: Redner, _A Guide to First-Passage Processes_ (Cambridge, 2001).
- Original paper: same.
- Free reference: Bray, Majumdar, Schehr, _Adv. Phys._ **62**, 225 (2013).
- Difficulty: easy.
- Benchmarks: exact ⟨T⟩ for symmetric walker on [0,L] starting at x: x(L−x).

---

## Notes

### Considered but excluded

- **Cellular Potts (Glazier–Graner)** — strong biological pedigree but no compact analytic benchmark suitable for a teaching card; revisit when a calibrated benchmark is available.
- **Spin glasses (EA / SK)** — heavy numerics (replica symmetry, parallel tempering); fits a graduate addendum better than the introductory catalog.
- **Ant colony optimization** — algorithmic rather than a model of a natural system; out of scope.
- **DLA aggregates in 3D** — covered by the 2D entry; difficulty bump not pedagogically informative.
- **Continuous opinion with heterogeneous trust (Friedkin–Johnsen)** — borderline; can be added if opinion dynamics expands.
- **Synchronization on networks (Kuramoto with Laplacian)** — held back as a _variant page_ under Kuramoto rather than its own card.
- **Game of Life soup statistics** — derivative of Game of Life; treat as an analysis notebook.

### Taxonomy suggestions

The original seven-discipline split conflated reaction–diffusion patterning with generic "spatial" models and put all oscillator work under "dynamics," obscuring the natural pedagogical clusters. The catalog therefore splits the original into eleven disciplines: **networks, epidemics, spatial, dynamics, synchronization, criticality, evolution, automata, morphogenesis, econophysics, opinion dynamics, active matter, walks**. Each discipline now contains 3–9 entries, which is a workable size for a discipline-level landing page.

Two cross-cutting tags are worth introducing at the card level even though they aren't disciplines:

- _self-organized criticality_ (BTW, Manna, Drossel–Schwabl, Bak–Sneppen) — currently split across criticality, spatial, evolution.
- _universality class_ (DP, Ising, KPZ, percolation) — useful for advanced students comparing exponents.

### Open questions

- Should the catalog include explicit **PDE benchmarks** (Burgers, KPZ, Cahn–Hilliard, Kuramoto–Sivashinsky)? They appear in Murray and Cross–Hohenberg but require numerical methods more than systems-modeling intuition. A "continuum models" discipline could absorb them.
- Quantum / open quantum walks are now standard in some curricula. Out of scope here, but worth flagging for a Lattice-Quantum sibling.
- The line between **opinion dynamics** and **evolution** is thin (voter model, replicator on networks). A long-term option is to merge them into a single "co-evolutionary dynamics" discipline; for now, the separation matches student expectations from the source textbooks.

### Highlights

Two entries are notably high return-on-implementation:

- **Bak–Tang–Wiesenfeld sandpile** — a few hundred lines yields a clean power-law avalanche distribution, suitable as a first SOC encounter and as a benchmark for any later avalanche model.
- **Kuramoto oscillators** — the synchronization transition is dramatic, the analytics are tractable to undergraduates, and the model generalizes seamlessly to graphs, delays, and noise.
