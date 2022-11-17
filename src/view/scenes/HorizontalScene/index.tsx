import styles from './HorizontalScene.module.scss';
import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {TextContent} from './TextContent';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import {MediaContent} from '@scenes/HorizontalScene/MediaContent';

interface Props {
	title: 'type1' | 'type2';
	text?: string | string[];
	tips?: string | string[];
	scene?: any;
}

export const HorizontalSection: FC<Props> = ({title, text, scene}) => {
	const [startSectionAnimation, setStartSectionAnimation] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLDivElement>(null);
	const timeline = useRef(gsap.timeline());

	const createScrollTrigger = useCallback(() => {
		ScrollTrigger.create({
			trigger: sectionRef.current,
			animation: timeline.current,
			start: 'top top',
			end: '+=1000',
			//end: () => `${this.timelineEnd || this.timelineSizes.endDesktop}px 100%`,
			pin: true,
			scrub: true,
			invalidateOnRefresh: true,
			onEnter: () => setStartSectionAnimation(true)
		});
	}, []);

	const createScroller = useCallback(() => {
		if (scrollerRef.current !== null) {
			timeline.current.to(scrollerRef.current, {
				xPercent: '-100'
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
		>
			<div
				ref={scrollerRef}
				className={styles.scroller}
			>
				<TextContent
					title={title}
					text={text}
				/>
				<MediaContent scene={scene} />
			</div>
		</section>
	);
};
