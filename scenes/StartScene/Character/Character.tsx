import {useEffect, useRef, useState} from 'react';
import Lottie from 'react-lottie';
import {Preloader} from '../Preloader/Preloader';
import * as characterAnimation from '../../../public/lottie/reanimate-person.json';
import * as characterAnimationFull from '../../../public/lottie/reanimate-person-2.json';
import styles from './character.module.scss';
import {eventBus} from '../../../context/EventBus/EventBus';
import gsap from 'gsap';
import {useWindowSize} from '../../../hooks/useWindowSize';
import {useScrollable} from '../../../context/app.context';

export const Character = () => {
	const [characterLottie, setCharacterLottie] = useState(characterAnimation);
	const [characterPause, setCharacterPause] = useState(true);
	const characterRef = useRef<HTMLDivElement>(null);
	const [windowWidth] = useWindowSize();
	const {scrollable} = useScrollable();

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

	const setFullCharacter = () => {
		setCharacterLottie(characterAnimationFull);
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
		eventBus.on('setFullCharacter', setFullCharacter);

		return () => {
			eventBus.remove('preloaderAnimationEnd', getCharacter);
			eventBus.remove('reanimationStart', startReanimation);
			eventBus.remove('setFullCharacter', setFullCharacter);
		};
	}, []);

	return (
		<div className={styles.character}>
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
