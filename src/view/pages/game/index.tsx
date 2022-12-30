import React, {useEffect, useState} from 'react';
import {FC} from 'react';
import styles from './GameContent.module.scss';
import {useTranslate} from '@api/useTranslate';
import cn from 'classnames';
import {TypedText} from '@scenes/StartScene/Preloader/TypedText/TypedText';
import {Timer} from '@components/Timer';
import {GamePagination} from '@components/GamePagination';
import {gameQuestions} from './gameQuestion.data';
import classNames from 'classnames';

const green = '#036a01';
const red = '#6a0101';

export const GameContent: FC = () => {
	const startText = useTranslate<string>('gameStartText');
	const [current, setCurrent] = useState(0);
	const [hideText, setHideText] = useState(false);
	const [start, setStart] = useState(false);
	const [end, setEnd] = useState(false);
	const [endTime, setEndTime] = useState(false);
	const lapTime = 40;

	const endLap = () => {
		setTimeout(() => {
			setEnd(true);
			setStart(false);
			setEndTime(false);
		}, 2000);
		setTimeout(nextSlide, 3000);
	};

	const startGameTimer = () => {
		setTimeout(() => {
			setEndTime(true);
			endLap();
		}, lapTime * 1000);
	};

	const nextSlide = () => {
		setEnd(false);
		setCurrent(prev => {
			if (prev < gameQuestions.length - 1 && prev !== -1) {
				return prev + 1;
			}
			return -1;
		});
		setStart(true);
		startGameTimer();
	};

	const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const trueBtn = document.querySelector('[data-true]') as HTMLButtonElement;
		if (trueBtn.dataset.true) {
			trueBtn.style.background = green;
		}
		if (e.currentTarget.dataset.true) {
			e.currentTarget.style.background = green;
		} else {
			e.currentTarget.style.background = red;
		}
		endLap();
	};

	useEffect(() => {
		setTimeout(() => {
			setStart(true);
			startGameTimer();
		}, 8000);
		setTimeout(() => {
			setHideText(true);
		}, 7000);
	}, []);

	return (
		<section className={styles.content}>
			<div className={styles.sceneBg}>
				<TypedText
					speed={25}
					className={cn(styles.startText, {
						[styles.startTextAnimate]: hideText
					})}
				>
					{startText || ''}
				</TypedText>
				<img
					className={styles.sceneBgImage}
					src="/image/game-bg.png"
					alt="scene"
				/>
			</div>
			<div
				className={classNames(styles.sceneOverlay, {
					[styles.sceneOverlayShow]: start && gameQuestions?.[current]
				})}
			></div>
			<div
				className={classNames(styles.sceneGame, {
					[styles.freeze]: !start,
					[styles.freezeEnd]: end
				})}
			>
				{gameQuestions[current] ? (
					<>
						<GamePagination
							show={start}
							current={gameQuestions[current].id}
							total={gameQuestions.length}
						/>
						<h2 className={classNames(styles.title, {['fadeIn']: start})}>
							{gameQuestions[current].question}
						</h2>
						<div className={styles.gameBtns}>
							{gameQuestions[current].answers.map((a, i) => (
								<button
									key={a.text}
									style={start ? {transitionDelay: (i + 1) / 6 + 's'} : {}}
									data-true={a.isTrue ? '1' : ''}
									className={classNames(styles.gameBtn, {
										[styles.isTrue]: endTime && a.isTrue,
										[styles.isFalse]: endTime && !a.isTrue,
										['fadeIn']: start
									})}
									onClick={e => clickHandler(e)}
								>
									{a.text}
								</button>
							))}
						</div>
						{start && (
							<Timer
								time={lapTime}
								show={start}
							/>
						)}
					</>
				) : (
					<h2>Game Over</h2>
				)}
			</div>
		</section>
	);
};
