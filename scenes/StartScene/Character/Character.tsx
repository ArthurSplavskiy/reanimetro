import {useEffect, useRef, useState} from 'react';
import Lottie from 'react-lottie';
import {Preloader} from '../Preloader/Preloader';
import * as characterAnimation from '../../../public/lottie/reanimate-person.json';
import * as characterAnimationFull from '../../../public/lottie/reanimate-person-2.json';
import styles from './character.module.scss';
import {eventBus} from '../../../context/EventBus/EventBus';
import gsap from 'gsap';
import {useWindowSize} from '../../../hooks/useWindowSize';

export const Character = () => {
	const [characterLottie, setCharacterLottie] = useState(characterAnimation);
	const [characterPause, setCharacterPause] = useState(true);
	const characterRef = useRef<HTMLDivElement>(null);
	const [windowWidth] = useWindowSize();

	const getCharacter = () => {
		gsap.to(characterRef.current, {
			y: 0,
			duration: 1
		});
	};

	const startReanimation = () => {
		setTimeout(() => {
			setCharacterPause(false);
		}, 2000);
	};

	const scrollAnimation = () => {
		gsap.to('.geo-block', {
			scrollTrigger: {
				trigger: '.geo',
				pin: true, // pin the trigger element while active
				start: 'top top', // when the top of the trigger hits the top of the viewport
				end: '+=100', // end after scrolling 500px beyond the start
				scrub: 1,
				markers: true,
				onEnter: () => setCharacterLottie(characterAnimationFull)
			},
			rotate: 360
		});
	};

	const defaultOptions = {
		loop: false,
		autoplay: false,
		animationData: characterLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	useEffect(() => {
		eventBus.on('preloaderAnimationEnd', getCharacter);
		eventBus.on('reanimationStart', startReanimation);
		scrollAnimation();

		return () => {
			eventBus.remove('preloaderAnimationEnd', getCharacter);
			eventBus.remove('reanimationStart', startReanimation);
		};
	}, []);

	return (
		<div
			className={styles.character}
			id={'id'}
		>
			<div
				className={styles.characterSVG}
				ref={characterRef}
				style={{transform: 'translateY(100%)'}}
			>
				<Lottie
					options={defaultOptions}
					height={windowWidth && windowWidth / 2}
					width={windowWidth && windowWidth / 2}
					isPaused={characterPause}
				/>
			</div>
			<Preloader />
		</div>
	);
};
