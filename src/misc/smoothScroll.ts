import Scrollbar, {ScrollbarPlugin} from 'smooth-scrollbar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let isMobile: any;
let options: any;
if (typeof navigator !== 'undefined') {
	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
}

if (typeof document !== 'undefined') {
	options = {
		damping: isMobile ? 0.05 : 0.1,
		thumbMinSize: 20,
		renderByPixels: !('ontouchstart' in document),
		alwaysShowTracks: false,
		continuousScrolling: true,
		delegateTo: document
	};
}

const SmoothScroll = () => {
	const bodyScrollbar = Scrollbar.init(
		document.querySelector('#scroll-viewport') as HTMLElement,
		options
	);
	bodyScrollbar.track.xAxis.element.remove();
	ScrollTrigger.scrollerProxy(document.body, {
		scrollTop(value) {
			if (arguments.length) {
				bodyScrollbar.scrollTop = value as number;
			}
			return bodyScrollbar.scrollTop;
		}
	});
	bodyScrollbar.addListener(ScrollTrigger.update);
	// bodyScrollbar.addListener(() => {
	// 	ScrollTrigger.refresh();
	// });

	return bodyScrollbar;
};

class ModalPlugin extends ScrollbarPlugin {
	static pluginName = 'modal';

	static defaultOptions = {
		open: false
	};

	transformDelta(delta: any) {
		return this.options.open ? {x: 0, y: 0} : delta;
	}
}

Scrollbar.use(ModalPlugin /* OverscrollPlugin */);

export default SmoothScroll;
