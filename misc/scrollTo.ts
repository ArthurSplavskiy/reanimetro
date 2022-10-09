import SmoothScroll from './smoothScroll';

const ScrollTo = (link: string) => {
	const bodyScrollbar = SmoothScroll();
	bodyScrollbar.scrollIntoView(document.querySelector(link), {damping: 0.05});
};

export default ScrollTo;
