import { throwIfNot2xx } from './fetch-utils';

type Course = {
	title: string;
	markdown: string;
};

type Chapter = {
	title: string;
	markdown: string;
	sequence: number;
};

export function getAllChapters(courseId: string) {
	return fetch(
		`https://nginx-anything-storage-glovbogi2a-uc.a.run.app/storage?q=course/${courseId}/chapter`,
		{
			method: 'GET',
			credentials: 'include'
		}
	)
		.then(throwIfNot2xx(`Unable to read all chapters for ${courseId}`))
		.then((r) => r.json())
		.then((j) => j as Chapter[]);
}

export function getCourse(courseId: string) {
	return fetch(
		`https://nginx-anything-storage-glovbogi2a-uc.a.run.app/storage?q=course/${courseId}`,
		{
			method: 'GET',
			credentials: 'include'
		}
	)
		.then(throwIfNot2xx(`Unable to read course ${courseId}`))
		.then((r) => r.json())
		.then((j) => {
			const courses = j as Course[];
			if (courses.length > 0) return courses[0];
			throw new Error(`Course ${courseId} does not exist.`);
		});
}

export function getChapter(courseId: string, chapterId: string) {
	return fetch(
		`https://nginx-anything-storage-glovbogi2a-uc.a.run.app/storage?q=course/${courseId}/chapter/${chapterId}`,
		{
			method: 'GET',
			credentials: 'include'
		}
	)
		.then(throwIfNot2xx(`Unable to read chapters ${chapterId} of course ${courseId}`))
		.then((r) => r.json())
		.then((j) => {
			const chapters = j as Chapter[];
			if (chapters.length > 0) return chapters[0];
			throw new Error(`Chapter ${chapterId} from course ${courseId} does not exist.`);
		});
}

export function postCourse(courseId: string, body: Course) {
	return fetch(
		`https://nginx-anything-storage-glovbogi2a-uc.a.run.app/storage?q=course/${courseId}`,
		{
			method: 'POST',
			headers: {
				['content-type']: 'application/json'
			},
			body: JSON.stringify({ ...body, courseId }),
			credentials: 'include'
		}
	)
		.then(throwIfNot2xx(`Unable to set course ${courseId}`))
		.then((r) => r.json());
}

export function postChapter(courseId: string, chapterId: string, body: Chapter) {
	return fetch(
		`https://nginx-anything-storage-glovbogi2a-uc.a.run.app/storage?q=course/${courseId}/chapter/${chapterId}`,
		{
			method: 'POST',
			headers: {
				['content-type']: 'application/json'
			},
			body: JSON.stringify({ ...body, chapterId }),
			credentials: 'include'
		}
	)
		.then(throwIfNot2xx(`Unable to set chapter ${chapterId} of course ${courseId}`))
		.then((r) => r.json());
}
