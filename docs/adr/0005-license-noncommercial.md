# 0005. License: source-available, noncommercial

Status: Accepted (supersedes ADR-0001)

## Context

Lattice is a personal portfolio project published under the author's own name. The goal in making the repository public is visibility and citation, not to hand the work to others to reuse or resell. ADR-0001 chose MIT for code and CC-BY-4.0 for prose, both of which explicitly permit commercial reuse. That no longer matches the intent.

A public GitHub repository can always be viewed and forked; that cannot be turned off. The only real control is the license, which governs what a reader may legally do with the contents once they have them.

## Decision

Source code is released under the PolyForm Noncommercial License 1.0.0 (`LICENSE`).

Prose, documentation, and figures are released under CC BY-NC 4.0 (`docs/LICENSE-DOCS.txt`).

Both permit reading, study, academic citation, and noncommercial use (including research and teaching). Neither permits commercial use.

## Consequences

- The project is source-available, not open-source. Readers may inspect, learn from, and cite the work, and use it for noncommercial purposes.
- Commercial reuse, redistribution, and adaptation are not permitted.
- Site copy and documentation that previously described the project as openly reusable ("clone, build, and reproduce", "copy the file and adapt it") were softened to match.
- ADR-0001 is retained as a historical record and marked superseded.
- External contribution is not a goal of a personal, noncommercially licensed project; `CONTRIBUTING.md` frames how models are added rather than soliciting reuse.
