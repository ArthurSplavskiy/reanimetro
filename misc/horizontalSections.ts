import gsap from 'gsap';

export const hs = () => {
	const horizontalSections = gsap.utils.toArray('section.horizontal');

	horizontalSections.forEach(function (sec, i) {
		const thisPinWrap = sec.querySelector('.pin-wrap');
		const thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');

		const getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

		gsap.fromTo(
			thisAnimWrap,
			{
				x: () => (thisAnimWrap.classList.contains('to-right') ? 0 : getToValue())
			},
			{
				x: () => (thisAnimWrap.classList.contains('to-right') ? getToValue() : 0),
				ease: 'none',
				scrollTrigger: {
					trigger: sec,
					scroller: document.body, // neccessary setting for smooth-scrollbar on body
					pinType: 'transform', // neccessary setting for smooth-scrollbar on body
					start: 'top top',
					end: () => '+=' + thisAnimWrap.scrollWidth,
					pin: thisPinWrap,
					invalidateOnRefresh: true,
					anticipatePin: 1,
					scrub: true
					//markers: true,
				}
			}
		);
	});
};
