import {FC, useEffect, useState} from 'react';

interface Props {
	time: number;
	timerStart?: boolean;
}

export const Timer: FC<Props> = ({time, timerStart}) => {
	const [startTime, setStartTime] = useState(time);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setStartTime(prev => prev - 1);
		}, 1000);
		if (startTime === 0) {
			clearInterval(intervalId);
		}
		return () => {
			clearInterval(intervalId);
		};
	}, []);
	return <div>{startTime}</div>;
};
