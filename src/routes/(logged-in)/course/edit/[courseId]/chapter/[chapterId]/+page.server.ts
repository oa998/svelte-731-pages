import { redirect } from '@sveltejs/kit';
import type { RouteParams } from './$types.js';

const courses = ['nails', 'lashes', 'fish'];
const chapters = ['1', '2', '3', '4', '5'];

export function load({
	params
}: {
	params: {
		courseId: string;
		chapterId: string;
	};
}) {
	const { courseId, chapterId } = params;
	if (!courses.includes(courseId) || !chapters.includes(chapterId)) {
		throw redirect(307, '/');
	}
	return {};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return courses.reduce((a: RouteParams[], courseId) => {
		chapters.forEach((chapterId) => {
			a = a.concat({ courseId, chapterId });
		});
		return a;
	}, []);
}

export const prerender = true;
