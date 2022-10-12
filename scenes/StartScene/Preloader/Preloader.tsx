import {TypedText} from './TypedText/TypedText';
import {useTranslate} from '../../../api/useTranslate';
import {useEffect, useRef, useState} from 'react';
import Lottie from 'react-lottie';
import gsap from 'gsap';
import cn from 'classnames';
import {eventBus} from '../../../context/EventBus/EventBus';
import styles from './Preloader.module.scss';
import * as HeartAnimation from '../../../public/lottie/heart.json';
import * as HeartCharacterAnimation from '../../../public/lottie/heart-character.json';
import {useScrollable} from '../../../context/app.context';

export const Preloader = () => {
	const [messageText, setMessageText] = useState<string>('');
	const [heartAnimationPause, setHeartAnimationPause] = useState(false);
	const [preloaderHeartAnimationEnd, setPreloaderHeartAnimationEnd] = useState(false);
	const [textHide, setTextHide] = useState(false);
	const [heartLottie, setHeartLottie] = useState(HeartAnimation);
	const heartRef = useRef<HTMLDivElement>(null);
	const preloaderRef = useRef<HTMLDivElement>(null);
	const message = useTranslate<string>('preloaderMessage');
	const {scrollable} = useScrollable();

	const HeartAnimationConfig = {
		loop: false,
		autoplay: false,
		animationData: heartLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const startPreloaderFadeOut = () => {
		gsap.to(heartRef.current, {
			scale: 1.4,
			bottom: 100,
			duration: 1
		});
	};

	const heartFixing = () => {
		gsap.to(preloaderRef.current, {
			bottom: -105,
			top: 'inherit',
			duration: 1
		});
	};

	const startReanimation = (e: any) => {
		if (e.target.closest('svg')) {
			setHeartAnimationPause(false);
			eventBus.dispatch('reanimationStart');
		}
	};

	const hideHeart = () => {
		gsap.to(heartRef.current, {
			scale: 0,
			y: 40
		});
	};

	useEffect(() => {
		setMessageText(message || '');
	}, [message]);

	useEffect(() => {
		if (preloaderHeartAnimationEnd) {
			setHeartAnimationPause(true);
			setHeartLottie(HeartCharacterAnimation);
			startPreloaderFadeOut();
			heartFixing();
			eventBus.dispatch('preloaderAnimationEnd');
		}
	}, [preloaderHeartAnimationEnd]);

	useEffect(() => {
		const timeout = setTimeout(() => setTextHide(true), 4000);
		eventBus.on('setFullCharacter', hideHeart);

		return () => {
			clearTimeout(timeout);
			eventBus.remove('setFullCharacter', hideHeart);
		};
	}, []);

	return (
		<div
			ref={preloaderRef}
			className={styles.preloader}
		>
			<div className={styles.content}>
				<div
					ref={heartRef}
					className={styles.heart}
					style={{width: '10vw', height: '10vw'}}
					onClick={startReanimation}
				>
					<Lottie
						options={HeartAnimationConfig}
						isPaused={heartAnimationPause}
						eventListeners={[
							{
								eventName: 'complete',
								callback: () => setPreloaderHeartAnimationEnd(true)
							}
						]}
					/>
				</div>
				<TypedText
					className={cn(styles.text, {
						[styles.textAnimate]: textHide,
						'visually-hidden': preloaderHeartAnimationEnd
					})}
				>
					{messageText}
				</TypedText>
			</div>
		</div>
	);
};
