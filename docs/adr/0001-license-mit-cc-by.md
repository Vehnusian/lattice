# 0001. License: MIT for code, CC-BY-4.0 for prose

Status: Accepted

## Context

The project contains two distinct kinds of material: source code (TypeScript engines, Svelte components, Python references, build scripts) and prose / figures (model explanations, documentation, rendered visualizations). A single license must apply to each.

MIT is the de facto standard for permissive open-source code in the JavaScript and Python ecosystems. Creative Commons Attribution 4.0 International (CC-BY-4.0) is the standard for open educational and scientific prose, allowing reuse with credit.

## Decision

Source code is released under the MIT License (`LICENSE`).

Prose, documentation, and figures are released under CC-BY-4.0 (`LICENSE-docs`).

The split is declared in the repository README and in the footer of the deployed site.

## Consequences

- Both licenses are permissive and compatible with most downstream use.
- Anyone may reuse the code or the prose with attribution.
- Two license files at the repository root require slight extra explanation. The README covers this in a single sentence.
- Academic users can cite the prose under CC-BY-4.0 and the implementation under the repository's `CITATION.cff`, keeping the two distinct.
