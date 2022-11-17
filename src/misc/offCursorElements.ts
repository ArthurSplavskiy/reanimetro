export const offCursorElements = (elementID: string) => {
	const cursor = document.querySelector('.click-cursor');
	const elements = document.querySelectorAll(elementID);

	const handleHover = () => {
		cursor?.classList.add('hide');
	};

	const handleUnHover = () => {
		cursor?.classList.remove('hide');
	};

	if (elements) {
		elements.forEach(elem => {
			elem.removeEventListener('mouseenter', handleHover);
			elem.removeEventListener('mouseleave', handleUnHover);
			elem.addEventListener('mouseenter', handleHover);
			elem.addEventListener('mouseleave', handleUnHover);
		});
	}
};
