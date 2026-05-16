// Read computed values of the CSS color tokens defined in tokens.css.
// Canvas renderers cannot bind to CSS variables directly; this helper
// keeps them aligned with the design system at runtime.

const TOKEN_NAMES = [
	'paper',
	'paper-2',
	'ink',
	'ink-muted',
	'ink-subtle',
	'rule',
	'rule-strong',
	'accent',
	'accent-hover',
	'accent-soft'
] as const;

export type ColorToken = (typeof TOKEN_NAMES)[number];

const FALLBACK: Record<ColorToken, string> = {
	paper: '#f9f6f0',
	'paper-2': '#f3efe5',
	ink: '#161513',
	'ink-muted': '#5e5a52',
	'ink-subtle': '#8a8579',
	rule: '#e5dfd3',
	'rule-strong': '#d4ccb8',
	accent: '#b5450b',
	'accent-hover': '#973808',
	'accent-soft': '#f4e4d0'
};

export function readColors(): Record<ColorToken, string> {
	if (typeof window === 'undefined') return { ...FALLBACK };
	const styles = getComputedStyle(document.documentElement);
	const out = { ...FALLBACK };
	for (const name of TOKEN_NAMES) {
		const value = styles.getPropertyValue(`--color-${name}`).trim();
		if (value) out[name] = value;
	}
	return out;
}
