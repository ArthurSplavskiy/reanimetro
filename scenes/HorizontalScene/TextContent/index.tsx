import {FC, useCallback, useEffect, useRef, useState} from 'react';
import styles from './TextContent.module.scss';
import cn from 'classnames';
import Lottie from 'react-lottie';
import {SplitText} from '@cyriacbr/react-split-text';
import * as heartTitle from '../../../public/lottie/heart-title.json';
import {useLanguage} from '../../../context/app.context';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import {useBrowser} from '../../../hooks/useBrowser';

gsap.registerPlugin(ScrollTrigger);

interface Props {
	title: 'type1' | 'type2';
	text?: string | string[];
}

const heartAnimationConfig = {
	loop: false,
	autoplay: false,
	animationData: heartTitle,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};
const titleType2 = {
	loop: false,
	autoplay: false,
	animationData: heartTitle,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

export const TextContent: FC<Props> = ({title, text}) => {
	const {language} = useLanguage();
	const isBrowser = useBrowser();
	const [locale, setLocale] = useState('');
	const [titleReveal, setTitleReveal] = useState(false);
	const [textReveal, setTextReveal] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const timeline = useRef(gsap.timeline());
	const [startSectionAnimation, setStartSectionAnimation] = useState(false);

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

	const createTextAnimation = useCallback(() => {
		if (textRef.current !== null) {
			gsap.to(titleRef.current, {
				scrollTrigger: {
					trigger: titleRef.current,
					start: 'bottom bottom'
				},
				onStart: () => setTitleReveal(true)
			});
		}
		setTimeout(() => {
			if (textRef.current !== null) {
				gsap.to(textRef.current, {
					scrollTrigger: {
						trigger: textRef.current,
						start: 'bottom bottom'
					},
					onStart: () => setTextReveal(true)
				});
			}
		}, 100);
	}, []);

	useEffect(() => {
		setLocale(language);
	}, [language]);

	useEffect(() => {
		createTextAnimation();
	}, [isBrowser, textRef, titleRef]);

	useEffect(() => {
		createScrollTrigger();
	}, []);

	return (
		<section ref={sectionRef}>
			{title === 'type1' && (
				<div
					ref={titleRef}
					className={cn(styles.title, {
						[styles.titleAnimate]: titleReveal
					})}
				>
					{locale === 'ua' && (
						<>
							<div>
								<span>Раптова зупинка</span>{' '}
							</div>
							<div>
								<span>
									серця: це{' '}
									<span className={styles.titleHeart}>
										<Lottie
											options={heartAnimationConfig}
											width={85}
											height={85}
										/>
									</span>
									може
								</span>
							</div>
							<div>
								<span>статися з будь-ким</span>
							</div>
						</>
					)}
					{locale === 'en' && (
						<>
							<div>
								<span>Sudden cardiac</span>{' '}
							</div>
							<div>
								<span>
									arrest:{' '}
									<span className={styles.titleHeart}>
										<Lottie
											options={heartAnimationConfig}
											width={85}
											height={85}
										/>
									</span>
									It may
								</span>
							</div>
							<div>
								<span>happen to anyone</span>
							</div>
						</>
					)}
				</div>
			)}
			{title === 'type2' && (
				<SplitText
					className={cn('split-text', 'firstShow', {
						reveal: textReveal
					})}
					LineWrapper={({lineIndex, children}) => (
						<span className="wrapper">
							{children}
							<Lottie options={titleType2} />
						</span>
					)}
				></SplitText>
			)}
			{isBrowser && (
				<div
					ref={textRef}
					className={styles.text}
				>
					{Array.isArray(text) ? (
						text.map((p, i) => (
							<SplitText
								key={i}
								className={cn(styles.textItem, 'split-text-lines', 'firstShow', {
									reveal: textReveal
								})}
							>
								{p}
							</SplitText>
						))
					) : (
						<SplitText
							className={cn(styles.textItem, 'split-text-lines', 'firstShow', {
								reveal: textReveal
							})}
						>
							{text}
						</SplitText>
					)}
				</div>
			)}
		</section>
	);
};
