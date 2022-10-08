import {useEffect, useState} from 'react';
import {throttle} from '../misc/throttle';
import {useBrowser} from './useBrowser';

export const useWindowSize = () => {
	const [windowWidth, setWindowWidth] = useState<number>();
	const [windowHeight, setWindowHeight] = useState<number>();
	const isBrowser = useBrowser();

	const getInitialValue = () => {
		isBrowser && setWindowWidth(window.innerWidth);
		isBrowser && setWindowHeight(window.innerHeight);
	};

	const getWindowSize = (e: Event) => {
		const target = e.target as Window;
		setWindowWidth(target.innerWidth);
		setWindowHeight(target.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', throttle(getWindowSize, 300));
		return () => {
			window.addEventListener('resize', getWindowSize);
		};
	}, []);

	useEffect(() => {
		getInitialValue();
	}, [isBrowser]);

	return [windowWidth, windowHeight];
};
