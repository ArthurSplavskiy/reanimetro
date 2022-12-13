import React, {useRef} from 'react';
import {FC, useEffect, useState} from 'react';
import Lottie from 'react-lottie';
import styles from './GameScene.module.scss';
import * as GameLottie from '@public/lottie/game-scene.json';
import {useIsView} from '@hooks/useIsView';
import cn from 'classnames';
import {SplitText} from '@cyriacbr/react-split-text';
import {useBrowser} from '@hooks/useBrowser';
import {useTranslate} from '@api/useTranslate';
import {useRouter} from 'next/router';

export const GameScene: FC = () => {
	const router = useRouter();
	const [sceneLottie] = useState(GameLottie);
	const [animationPlay, setAnimationPlay] = useState(false);
	const sceneRef = useRef<HTMLDivElement>(null);
	const sceneIsView = useIsView(sceneRef, {threshold: 0.5});
	const text1 = useTranslate<string>('gameSceneText1');
	const text2 = useTranslate<string>('gameSceneText2');
	const isBrowser = useBrowser();
	const defaultOptions = {
		loop: false,
		autoplay: false,
		animationData: sceneLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	useEffect(() => {
		setAnimationPlay(sceneIsView);
	}, [sceneIsView]);

	useEffect(() => {
		const clickHandler = (e: any) => {
			const firstID = '[transform="matrix(0.8187000155448914,0,0,0.22153045237064362,640,538.5)"]';
			const secondID = '[mask="url(#__lottie_element_131)"]';
			if (e.target.closest(firstID) || e.target.closest(secondID)) {
				router.push('/game');
			}
		};

		if (typeof document !== 'undefined') {
			document.querySelector('#__lottie_element_442')?.remove();
			document.querySelector('#__lottie_element_152')?.remove();
			document.querySelector('#__lottie_element_146')?.remove();
			document.querySelector('#__lottie_element_140')?.remove();
			document.querySelector('[mask="url(#__lottie_element_442)"]')?.remove();
			document.querySelector('[mask="url(#__lottie_element_152)"]')?.remove();
			document.querySelector('[mask="url(#__lottie_element_146)"]')?.remove();
			document.querySelector('[mask="url(#__lottie_element_140)"]')?.remove();

			document.addEventListener('click', clickHandler);
		}

		return () => {
			document.removeEventListener('click', clickHandler);
		};
	}, [sceneLottie]);

	return (
		<section
			className={styles.scene}
			ref={sceneRef}
		>
			{isBrowser && (
				<SplitText
					className={cn(styles.text1, 'firstShow', 'split-text-lines', {
						reveal: animationPlay
					})}
				>
					{text1}
				</SplitText>
			)}
			<Lottie
				options={defaultOptions}
				isPaused={!animationPlay}
			/>
			{isBrowser && (
				<SplitText
					className={cn(styles.text2, 'firstShow', 'split-text-lines', {
						reveal: animationPlay
					})}
				>
					{text2}
				</SplitText>
			)}
		</section>
	);
};
