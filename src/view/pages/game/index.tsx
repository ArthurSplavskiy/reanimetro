import React from 'react';
import {FC} from 'react';
import styles from './GameContent.module.scss';
import {useTranslate} from '@api/useTranslate';
import cn from 'classnames';
import {TypedText} from '@scenes/StartScene/Preloader/TypedText/TypedText';
import {Timer} from '@components/Timer';

export const GameContent: FC = () => {
	const startText = useTranslate<string>('gameStartText');

	return (
		<section className={styles.content}>
			<div className={styles.sceneBg}>
				<TypedText
					speed={35}
					className={cn(styles.startText, {
						[styles.startTextAnimate]: false,
						'visually-hidden': false
					})}
				>
					{startText || ''}
				</TypedText>
				<img
					className={styles.sceneBgImage}
					src="/image/game-bg.png"
					alt=""
				/>
			</div>
			<div className={styles.sceneOverlay}></div>
			<div className={styles.sceneGame}>
				<Timer time={40} />
			</div>
		</section>
	);
};
