import {useEffect, useState} from 'react';

interface IOptions {
	root?: HTMLElement;
	rootMargin?: string;
	threshold?: number;
}
// * observerOptions = {
// *  root: document.querySelector('#scrollArea'),
// *  rootMargin: '0px',
// *  threshold: 1.0 // 1.0 - (100% element scroll) 0.9 - 90%(100% element scroll)
// * }

export const useIsView = (
	reference: {current: HTMLElement | null},
	options?: IOptions
): boolean => {
	const [isView, setIsView] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (reference.current === null) return;

		if (typeof window.IntersectionObserver !== 'undefined') {
			const observer = new window.IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setIsView(true);
					} else {
						setIsView(false);
					}
				});
			}, options);

			observer.observe(reference.current);
		}
	}, []);

	return isView;
};
