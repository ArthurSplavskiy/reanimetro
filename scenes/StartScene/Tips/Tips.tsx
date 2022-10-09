import styles from './Tips.module.scss';
import {Tip} from '../../../components';
import {useEffect, useState} from 'react';
import {eventBus} from '../../../context/EventBus/EventBus';
import Lottie from 'react-lottie';
import {useLanguage, useScrollable} from '../../../context/app.context';
import cn from 'classnames';
import * as uaCircleLottieAnimation from '../../../public/lottie/clickCircleUa.json';
import * as enCircleLottieAnimation from '../../../public/lottie/clickCircleEng.json';
import HoldHeartSVG from './hold-heart.svg';
import {useTranslate} from '../../../api/useTranslate';

export const Tips = () => {
	const [showFirstTip, setShowFirstTip] = useState(false);
	const [showSecondTip, setShowSecondTip] = useState(false);
	const [showLineTip, setShowLineTip] = useState(false);
	const [circleAnimation, setCircleAnimation] = useState<any>(uaCircleLottieAnimation);
	const {language} = useLanguage();
	const {setScrollable} = useScrollable();
	const firstTipText = useTranslate<string>('firstTipStartScene');
	const secondTipText = useTranslate<string>('secondTipStartScene');

	const tipCircleConfig = {
		loop: true,
		autoplay: false,
		animationData: circleAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const showFirstTipHandler = () => {
		setShowFirstTip(true);
		setTimeout(() => {
			setShowLineTip(true);
		}, 3000);
	};

	const showSecondTipHandler = () => {
		setTimeout(() => {
			setShowFirstTip(false);
			setShowLineTip(false);
			setShowSecondTip(true);
			setScrollable?.(true);
		}, 3500);
	};

	useEffect(() => {
		if (language === 'en') {
			setCircleAnimation(enCircleLottieAnimation);
		} else {
			setCircleAnimation(uaCircleLottieAnimation);
		}
	}, [language]);

	useEffect(() => {
		eventBus.on('preloaderAnimationEnd', showFirstTipHandler);
		eventBus.on('reanimationStart', showSecondTipHandler);

		return () => {
			eventBus.remove('preloaderAnimationEnd', showFirstTipHandler);
			eventBus.remove('reanimationStart', showSecondTipHandler);
		};
	}, []);

	return (
		<div className={styles.tips}>
			<div className={styles.tipsContent}>
				<div className={styles.tip}>
					<Tip
						appearance="red"
						maxWidth="300"
						position="topLeft"
						show={showFirstTip}
					>
						{firstTipText || 'Something went wrong'}
					</Tip>
					<div className={styles.clickCircle}>
						<Lottie
							options={tipCircleConfig}
							width={180}
							height={180}
							isStopped={!showFirstTip}
						/>
					</div>
				</div>
				<div className={styles.tip}>
					<Tip
						appearance="mayonnaise"
						maxWidth="350"
						position="topRight"
						show={showSecondTip}
					>
						{secondTipText || 'Something went wrong'}
					</Tip>
					<div
						className={cn(styles.holdHeart, {
							[styles.scaleIn]: showSecondTip
						})}
					>
						<HoldHeartSVG />
					</div>
				</div>
			</div>
			<div
				className={cn(styles.tipsLine, {
					[styles.draw]: showLineTip
				})}
			></div>
		</div>
	);
};
