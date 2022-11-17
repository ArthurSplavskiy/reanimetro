import Lottie from 'react-lottie';
import * as cardioBlack from '@public/lottie/cardio-black.json';
import * as cardioRed from '@public/lottie/cardio-red.json';
import styles from './Reanimation.module.scss';
import {useWindowSize} from '@hooks/useWindowSize';
import {useEffect, useRef, useState} from 'react';
import {eventBus} from '@context/EventBus/EventBus';
import gsap from 'gsap';
import {useScrollable} from '@context/app.context';

export const Reanimation = () => {
	const [windowWidth] = useWindowSize();
	const [cardioLottie, setCardioLottie] = useState(cardioBlack);
	const [cardioAnimationPause, setCardioAnimationPause] = useState(true);
	const {scrollable} = useScrollable();
	const reanimationRef = useRef<HTMLDivElement>(null);

	const cardioAnimationHandler = () => {
		setCardioAnimationPause(false);
	};

	const setSecondCardioLottie = () => {
		setTimeout(() => {
			setCardioLottie(cardioRed);
		}, 3500);
	};

	const CardioAnimationConfig = {
		loop: false,
		autoplay: false,
		animationData: cardioLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	useEffect(() => {
		if (scrollable) {
			gsap.to(reanimationRef.current, {
				scrollTrigger: {
					trigger: '.start-scene',
					start: '4px top',
					end: '200px top',
					scrub: 1
				},
				y: -120
			});
		}
	}, [scrollable]);

	useEffect(() => {
		eventBus.on('preloaderAnimationEnd', cardioAnimationHandler);
		eventBus.on('reanimationStart', setSecondCardioLottie);

		return () => {
			eventBus.remove('preloaderAnimationEnd', cardioAnimationHandler);
			eventBus.remove('reanimationStart', setSecondCardioLottie);
		};
	}, []);

	return (
		<div
			ref={reanimationRef}
			className={styles.reanimation}
		>
			<Lottie
				options={CardioAnimationConfig}
				width={windowWidth && windowWidth + 60}
				isPaused={cardioAnimationPause}
			/>
		</div>
	);
};
