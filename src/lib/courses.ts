import { throwCustomIfNot2xx } from './fetch-utils';

export type Course = {
	courseId: string;
	title: string;
	summary: string;
	image: string;
	fake?: boolean;
};

export type Chapter = {
	chapterId: string;
	title: string;
	markdown: string;
	sequence: number;
	videoURL?: string;
};

export function getAllCourses() {
	// return fetch(`${env.PUBLIC_SERVER_URL}/course-overview`, {
	return fetch(`/data/course-overview`, {
		method: 'GET',
		credentials: 'include'
	})
		.then(throwCustomIfNot2xx(`Unable to read all courses`))
		.then((r) => r.json())
		.then((j) => j as Course[]);
}

export function getAllChapters(courseId: string) {
	// return fetch(`${env.PUBLIC_SERVER_URL}/storage?q=course/${courseId}/chapter`, {
	return fetch(`/data/storage?q=course/${courseId}/chapter`, {
		method: 'GET',
		credentials: 'include'
	})
		.then(throwCustomIfNot2xx(`Unable to read all chapters for ${courseId}`))
		.then((r) => r.json())
		.then((j) => j as Chapter[]);
}

export function getCourse(courseId: string) {
	// return fetch(`${env.PUBLIC_SERVER_URL}/storage?q=course/${courseId}`, {
	return fetch(`/data/storage?q=course/${courseId}`, {
		method: 'GET',
		credentials: 'include'
	})
		.then(throwCustomIfNot2xx(`Unable to read course ${courseId}`))
		.then((r) => r.json())
		.then((j) => {
			const courses = j as Course[];
			if (courses.length > 0) return courses[0];
			throw new Error(`Course ${courseId} does not exist.`);
		});
}

export function getChapter(courseId: string, chapterId: string) {
	// return fetch(`${env.PUBLIC_SERVER_URL}/storage?q=course/${courseId}/chapter/${chapterId}`, {
	return fetch(`/data/storage?q=course/${courseId}/chapter/${chapterId}`, {
		method: 'GET',
		credentials: 'include'
	})
		.then(throwCustomIfNot2xx(`Unable to read chapters ${chapterId} of course ${courseId}`))
		.then((r) => r.json())
		.then((j) => {
			const chapters = j as Chapter[];
			if (chapters.length > 0) return chapters[0];
			throw new Error(`Chapter ${chapterId} from course ${courseId} does not exist.`);
		});
}

export function postCourse(body: Course) {
	// return fetch(`${env.PUBLIC_SERVER_URL}/storage?q=course/${body.courseId}`, {
	return fetch(`/data/storage?q=course/${body.courseId}`, {
		method: 'POST',
		headers: {
			['content-type']: 'application/json'
		},
		body: JSON.stringify(body),
		credentials: 'include'
	})
		.then(throwCustomIfNot2xx(`Unable to set course ${body.courseId}`))
		.then((r) => r.json());
}

export function postChapter(courseId: string, body: Chapter) {
	// return fetch(`${env.PUBLIC_SERVER_URL}/storage?q=course/${courseId}/chapter/${body.chapterId}`, {
	return fetch(`/data/storage?q=course/${courseId}/chapter/${body.chapterId}`, {
		method: 'POST',
		headers: {
			['content-type']: 'application/json'
		},
		body: JSON.stringify(body),
		credentials: 'include'
	})
		.then(throwCustomIfNot2xx(`Unable to set chapter ${body.chapterId} of course ${courseId}`))
		.then((r) => r.json());
}
