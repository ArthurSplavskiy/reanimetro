import Lottie from 'react-lottie';
import * as cardioBlack from '../../../public/lottie/cardio-black.json';
import * as cardioRed from '../../../public/lottie/cardio-red.json';
import styles from './Reanimation.module.scss';
import {useWindowSize} from '../../../hooks/useWindowSize';
import {useEffect, useState} from 'react';
import {eventBus} from '../../../context/EventBus/EventBus';

export const Reanimation = () => {
	const [windowWidth] = useWindowSize();
	const [cardioLottie, setCardioLottie] = useState(cardioBlack);
	const [cardioAnimationPause, setCardioAnimationPause] = useState(true);

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
		eventBus.on('preloaderAnimationEnd', cardioAnimationHandler);
		eventBus.on('reanimationStart', setSecondCardioLottie);

		return () => {
			eventBus.remove('preloaderAnimationEnd', cardioAnimationHandler);
			eventBus.remove('reanimationStart', setSecondCardioLottie);
		};
	}, []);

	return (
		<div className={styles.reanimation}>
			<Lottie
				options={CardioAnimationConfig}
				width={windowWidth && windowWidth + 60}
				isPaused={cardioAnimationPause}
			/>
		</div>
	);
};
