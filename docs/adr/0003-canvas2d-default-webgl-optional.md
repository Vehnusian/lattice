# 0003. Default rendering: Canvas2D, with WebGL opt-in

Status: Accepted

## Context

Models in the library range from a few hundred agents (Schelling, Boids) to grids with 10⁵ or more cells (Ising at 256×256, reaction-diffusion). Rendering each model with the same technology is unrealistic. Choices include SVG, Canvas2D, WebGL (via `regl`), and full GPU shader code.

SVG is debuggable and accessible but slow above a few thousand elements. Canvas2D handles up to roughly 10⁴ updates per frame comfortably. WebGL is required for reaction-diffusion and large cellular automata.

## Decision

Canvas2D is the default rendering target for all models. WebGL via `regl` is used only when the entity count exceeds 10⁴ or the model is inherently shader-based (e.g., Gray-Scott reaction-diffusion).

SVG is reserved for static figures, small network visualizations, and inline diagrams.

## Consequences

- Most models start simple and remain debuggable.
- WebGL adoption is per-model and justified case-by-case in that model's README.
- A single rendering layer per page keeps the bundle small.
- A small Canvas2D abstraction (`CanvasViewport` component) handles common concerns: device pixel ratio, resize, RAF loop, prefers-reduced-motion.
