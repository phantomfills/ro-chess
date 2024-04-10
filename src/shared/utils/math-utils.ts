export function numberRange(start: number, finish: number) {
	const numberRange = [];
	for (let index = start; index < finish; index++) {
		numberRange.push(index);
	}
	return numberRange;
}
