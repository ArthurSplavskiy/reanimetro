interface I {
	getText: (className: 'split-text' | 'split-text-lines') => any | null;
}

export const pageText: I = {
	getText: nodeStr => {
		if (document) {
			const text: HTMLElement | null = document.querySelector(`.${nodeStr}`);
			const opacity = (opacityValue: '0' | '1') => {
				if (text !== null) text.style.opacity = opacityValue;
			};
			const removeClass = (classValue: string) => {
				if (text !== null) text.classList.remove(classValue);
			};
			const addClass = (classValue: string) => {
				if (text !== null) text.classList.add(classValue);
			};

			return {
				opacity,
				removeClass,
				addClass
			};
		}
		return null;
	}
};
