import { redirect } from '@sveltejs/kit';

const courses = { nails: {}, lashes: {}, fish: {} };

export function load({ params }: { params: { courseId: keyof typeof courses } }) {
	const courseId = params.courseId;
	if (!courses[courseId]) {
		throw redirect(307, '/');
	}
	return courses[courseId];
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Object.keys(courses).map((courseId) => ({ courseId }));
}

export const prerender = true;
