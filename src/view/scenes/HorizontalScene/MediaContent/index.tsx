import {FC, useEffect, useState} from 'react';
import Lottie from 'react-lottie';
import styles from './MediaContent.module.scss';
import {Tip} from '@components/Tip/Tip';
import {eventBus} from '@context/EventBus/EventBus';
import cn from 'classnames';

interface Props {
	scene: any;
	tips?: string[];
}

export const MediaContent: FC<Props> = ({scene, tips}) => {
	const [sceneLottie] = useState(scene);
	const [showTips, setShowTips] = useState(false);
	const [reduceScene, setReduceScene] = useState(false);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: sceneLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const setAnimation = () => {
		setShowTips(true);
		setReduceScene(true);
	};

	useEffect(() => {
		eventBus.on('setLastHorizontalAnimation', setAnimation);

		return () => {
			eventBus.remove('setLastHorizontalAnimation', setAnimation);
		};
	}, []);

	return (
		<div className={styles.container}>
			{/*<Lottie*/}
			{/*	options={defaultOptions}*/}
			{/*	height={200}*/}
			{/*	width={200}*/}
			{/*/>*/}
			{tips?.[0] && (
				<Tip
					className={styles.topLeftTip}
					appearance="blue"
					maxWidth="328"
					position="topLeft"
					show={showTips}
					icon="icon1"
				>
					{tips[0]}
				</Tip>
			)}
			{tips?.[1] && (
				<Tip
					className={styles.topRightTip}
					appearance="mayonnaise"
					maxWidth="328"
					position="topRight"
					show={showTips}
					icon="icon2"
				>
					{tips[1]}
				</Tip>
			)}
			<img
				className={cn(styles.scene, {[styles.smallScene]: reduceScene})}
				src="/image/horizontal-scene-1.png"
				alt="scene"
			/>
			{tips?.[2] && (
				<Tip
					className={styles.bottomLeftTip}
					appearance="mayonnaise"
					maxWidth="328"
					position="bottomLeft"
					show={showTips}
					icon="icon1"
				>
					{tips[2]}
				</Tip>
			)}
			{tips?.[3] && (
				<Tip
					className={styles.bottomRightTip}
					appearance="red"
					maxWidth="328"
					position="bottomRight"
					show={showTips}
					icon="icon3"
				>
					{tips[3]}
				</Tip>
			)}
		</div>
	);
};
