import classNames from 'classnames';
import {FC, useEffect, useRef, useState} from 'react';
import styles from './Timer.module.scss';

interface Props {
	time: number;
	timerStart?: boolean;
	show: boolean;
}

export const Timer: FC<Props> = ({time, show}) => {
	const [startTime, setStartTime] = useState(time);
	const circleRef = useRef<SVGCircleElement>(null);

	useEffect(() => {
		const total = 20;
		const t = total;
		const ratio = t / total;
		const rad = 47;
		const progress = Math.ceil(rad * (22 / 7) * 2 * (1 - ratio));
		//t -= 1;
		const intervalId = setInterval(() => {
			const total = 20;
			const t = total;
			const ratio = t / total;
			const rad = 47;
			const progress = Math.ceil(rad * (22 / 7) * 2 * (1 - ratio));
			setStartTime(prev => prev - 1);
			circleRef.current!.style.strokeDashoffset = progress.toString();
		}, 1000);
		setTimeout(() => {
			clearInterval(intervalId);
		}, time * 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className={classNames(styles.timer, {['scaleIn']: show})}>
			{startTime} <span>c</span>
			<svg
				className={styles.timerCountdown}
				width="104"
				height="104"
				viewBox="0 0 104 104"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					ref={circleRef}
					cx="52"
					cy="52"
					r="47"
					stroke="white"
					strokeWidth="10"
					strokeDasharray="1 10"
				/>
			</svg>
		</div>
	);
};
