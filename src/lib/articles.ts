import { throwIfNot2xx } from './fetch-utils';

export function getAllChapters(courseId: string) {
	return fetch(
		`https://nginx-anything-storage-glovbogi2a-uc.a.run.app/storage?q=course/${courseId}/chapter`,
		{
			method: 'GET',
			credentials: 'include'
		}
	)
		.then(throwIfNot2xx(`Unable to read all chapters for ${courseId}`))
		.then((r) => r.json());
}
