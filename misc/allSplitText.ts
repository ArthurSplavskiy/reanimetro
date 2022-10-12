interface I {
	getText: (className: 'split-text' | 'split-text-lines') => any | null;
}

export const pageText: I = {
	getText: nodeStr => {
		if (document) {
			const text = document.querySelectorAll(`.${nodeStr}`);
			const opacity = (opacityValue: '0' | '1') => {
				if (text) {
					text.forEach(t => {
						const textNode = t as HTMLElement;
						textNode.style.opacity = opacityValue;
					});
				}
			};
			const removeClass = (classValue: string) => {
				if (text) {
					text.forEach(t => {
						t.classList.remove(classValue);
					});
				}
			};
			const addClass = (classValue: string) => {
				if (text) {
					text.forEach(t => {
						t.classList.add(classValue);
					});
				}
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
