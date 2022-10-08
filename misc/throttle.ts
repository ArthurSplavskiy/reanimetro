export const throttle = (func: any, delay: number) => {
	let inProgress = false;
	return (...args: any[]) => {
		if (inProgress) {
			return;
		}
		inProgress = true;
		setTimeout(() => {
			func(...args); // Consider moving this line before the set timeout if you want the very first one to be immediate
			inProgress = false;
		}, delay);
	};
};
