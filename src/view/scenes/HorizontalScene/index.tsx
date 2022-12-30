import styles from './HorizontalScene.module.scss';
import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {TextContent} from './TextContent';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import {MediaContent} from '@scenes/HorizontalScene/MediaContent';
import {SIDE_OFFSET} from '@misc/constants';
import {eventBus} from '@context/EventBus/EventBus';
import {useScrollable} from '@context/app.context';

interface Props {
	index: 1 | 2;
	title: 'type1' | 'type2';
	text?: string | string[];
	tips?: string[];
	scene?: any;
	slide: number;
	horizontalSlide: boolean;
}

export const HorizontalScene: FC<Props> = ({title, text, scene, tips, index, horizontalSlide}) => {
	const [startSectionAnimation, setStartSectionAnimation] = useState(false);
	const sectionRef = useRef<any>(null);
	const scrollerRef = useRef<HTMLDivElement>(null);
	const timeline = useRef(gsap.timeline());
	const {scrollable, setScrollable} = useScrollable();

	const createScrollTrigger = useCallback(() => {
		ScrollTrigger.create({
			trigger: sectionRef.current,
			animation: timeline.current,
			start: 'top top',
			end: () => '2000px 100%',
			pin: true,
			scrub: true,
			invalidateOnRefresh: true,
			onEnter: () => setStartSectionAnimation(true)
		});
	}, []);

	const createScroller = useCallback(() => {
		if (scrollerRef.current !== null) {
			timeline.current.fromTo(
				scrollerRef.current,
				{autoAlpha: 0.99, duration: 1.5},
				{autoAlpha: 1}
			);
			timeline.current.to(scrollerRef.current, {
				x: () =>
					(scrollerRef.current &&
						-scrollerRef.current.offsetWidth - SIDE_OFFSET + window.innerWidth) ||
					0,
				duration: 5
			});
			timeline.current.call(_ => {
				eventBus.dispatch(`setLastHorizontalAnimation-${index}`);
				setScrollable?.(false);
				setTimeout(() => setScrollable?.(true), 1000);
			});
		}
	}, []);

	useEffect(() => {
		createScrollTrigger();
		createScroller();
	}, []);

	return (
		<section
			ref={sectionRef}
			className={styles.section}
			data-horizontal={horizontalSlide}
		>
			<div
				ref={scrollerRef}
				className={styles.scroller}
			>
				<TextContent
					title={title}
					text={text}
				/>
				<MediaContent
					index={index}
					scene={scene}
					tips={tips}
				/>
			</div>
		</section>
	);
};
