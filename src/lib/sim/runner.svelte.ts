import { getContext, setContext } from 'svelte';

export interface SimEngine<TParams extends Record<string, number>, TMetrics extends Record<string, number>> {
	params: TParams;
	step(): void;
	reset(seed: number): void;
	metrics(): TMetrics;
}

interface MetricSample {
	t: number;
	value: number;
}

export class SimRunner<
	TParams extends Record<string, number>,
	TMetrics extends Record<string, number>
> {
	private engine: SimEngine<TParams, TMetrics>;
	private raf = 0;
	private stepsPerTick = 1;

	tick = $state(0);
	playing = $state(false);
	speed = $state(1);
	metrics = $state<TMetrics>({} as TMetrics);
	params = $state<TParams>({} as TParams);
	history = $state<MetricSample[]>([]);
	primaryMetric: keyof TMetrics;

	constructor(engine: SimEngine<TParams, TMetrics>, primaryMetric: keyof TMetrics) {
		this.engine = engine;
		this.primaryMetric = primaryMetric;
		this.params = { ...engine.params };
		this.syncMetrics();
	}

	private syncMetrics(): void {
		this.metrics = this.engine.metrics();
	}

	private appendHistory(): void {
		const value = this.metrics[this.primaryMetric];
		this.history.push({ t: this.tick, value: value as number });
		if (this.history.length > 300) this.history.shift();
	}

	step(): void {
		const n = Math.max(1, Math.round(this.stepsPerTick * this.speed));
		for (let i = 0; i < n; i++) this.engine.step();
		this.tick += n;
		this.syncMetrics();
		this.appendHistory();
	}

	play(): void {
		if (this.playing) return;
		this.playing = true;
		const loop = () => {
			if (!this.playing) return;
			this.step();
			this.raf = requestAnimationFrame(loop);
		};
		this.raf = requestAnimationFrame(loop);
	}

	pause(): void {
		this.playing = false;
		if (this.raf) cancelAnimationFrame(this.raf);
	}

	reset(seed = Date.now() & 0xffffffff): void {
		this.pause();
		Object.assign(this.engine.params, this.params);
		this.engine.reset(seed);
		this.tick = 0;
		this.history = [];
		this.syncMetrics();
	}

	setParam<K extends keyof TParams>(key: K, value: TParams[K]): void {
		this.params[key] = value;
		this.engine.params[key] = value;
	}

	setParams(values: Partial<TParams>): void {
		for (const key in values) {
			const v = values[key];
			if (v !== undefined) this.setParam(key, v as TParams[Extract<keyof TParams, string>]);
		}
		this.reset();
	}

	rawEngine(): SimEngine<TParams, TMetrics> {
		return this.engine;
	}
}

const KEY = Symbol('sim-runner');

export function provideRunner<P extends Record<string, number>, M extends Record<string, number>>(
	runner: SimRunner<P, M>
): void {
	setContext(KEY, runner);
}

export function useRunner<
	P extends Record<string, number> = Record<string, number>,
	M extends Record<string, number> = Record<string, number>
>(): SimRunner<P, M> {
	return getContext(KEY);
}
