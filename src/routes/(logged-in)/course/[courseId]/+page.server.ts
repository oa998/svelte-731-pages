import { redirect } from '@sveltejs/kit';

const courses = ['crs_6431203430'];

export function load({ params }: { params: { courseId: string } }) {
	const courseId = params.courseId;
	if (!courses.includes(courseId)) {
		throw redirect(307, '/');
	}
	return {};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return courses.map((courseId) => ({ courseId }));
}

export const prerender = true;
