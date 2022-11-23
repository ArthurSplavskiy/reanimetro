import React from 'react';
import {FC, useEffect, useState} from 'react';
import Lottie from 'react-lottie';
import styles from './GameScene.module.scss';
import * as GameLottie from '@public/lottie/game-scene.json';

export const GameScene: FC = () => {
	const [sceneLottie] = useState(GameLottie);

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: sceneLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	useEffect(() => {
		if (typeof document !== 'undefined') {
			document.querySelector('#__lottie_element_442')?.remove();
			document.querySelector('#__lottie_element_152')?.remove();
			document.querySelector('#__lottie_element_146')?.remove();
			document.querySelector('#__lottie_element_140')?.remove();
			document.querySelector('[mask="url(#__lottie_element_442)"]')?.remove();
			document.querySelector('[mask="url(#__lottie_element_152)"]')?.remove();
			document.querySelector('[mask="url(#__lottie_element_146)"]')?.remove();
			document.querySelector('[mask="url(#__lottie_element_140)"]')?.remove();

			const clickHandler = (e: any) => {
				if (
					e.target.closest(
						'[transform="matrix(0.8187000155448914,0,0,0.22153045237064362,640,538.5)"]'
					) ||
					e.target.closest('[mask="url(#__lottie_element_131)"]')
				) {
					console.log('PLAY');
				}
			};

			document.addEventListener('click', clickHandler);
		}
	}, [sceneLottie]);

	return (
		<section className={styles.scene}>
			<Lottie options={defaultOptions} />
		</section>
	);
};
