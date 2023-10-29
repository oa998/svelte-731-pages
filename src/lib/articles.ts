export function getAllChapters(courseId: string) {
	return fetch(
		`https://nginx-anything-storage-glovbogi2a-uc.a.run.app/storage?q=course/${courseId}/chapter`,
		{
			method: 'GET',
			credentials: 'include'
		}
	)
		.then((r) => r.json())
		.then((j) => {
			if (!/^2\d\d$/.test('' + j.status)) {
				throw new Error(j.message);
			}
		});
}
