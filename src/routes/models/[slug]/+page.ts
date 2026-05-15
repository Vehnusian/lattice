import { error } from '@sveltejs/kit';
import { registry } from '$lib/models/registry';

export const prerender = false;

export const load = ({ params }) => {
	const model = registry.find((m) => m.slug === params.slug);
	if (!model) throw error(404, 'Model not found');
	return { model };
};
