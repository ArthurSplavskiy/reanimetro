import {eventBus} from '@context/EventBus/EventBus';
import {useBrowser} from '@hooks/useBrowser';
import {DEFAULT_EASING} from '@misc/constants';
import classNames from 'classnames';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import styles from './page-transition.module.scss';

export const PageTransition = () => {
	const router = useRouter();
	const [transitionStart, setTransitionStart] = useState(false);
	const isBrowser = useBrowser();
	const myDocument = isBrowser ? document : null;

	const handleStop = (route: string) => {
		const layout = document.querySelector('.layout') as HTMLDivElement;

		if (route !== '/') {
			layout.style.transition = 'none';
			layout.style.transform = 'translateY(-20%)';
			layout.style.opacity = '0';
			setTimeout(() => {
				layout.style.transition = `transform 0.5s ${DEFAULT_EASING}`;
				layout.style.transform = 'translateY(0)';
				layout.style.opacity = '1';
				setTransitionStart(false);
			}, 100);
			setTimeout(() => {
				layout.style.transition = 'none';
				layout.style.transform = 'none';
			}, 600);
		} else {
			setTransitionStart(false);
		}
	};

	const transition = (CustomEvent: any) => {
		setTransitionStart(true);
		setTimeout(() => {
			const route = CustomEvent?.detail?.route;
			router.push(route, route, {scroll: false});
		}, 1000);
	};

	useEffect(() => {
		if (myDocument) {
			const layout = myDocument.querySelector('.layout') as HTMLDivElement;
			if (transitionStart) {
				layout?.classList.add('page-transition-start');
			} else {
				layout?.classList.remove('page-transition-start');
			}
		}
	}, [myDocument, transitionStart]);

	useEffect(() => {
		eventBus.on('pageTransition', params => transition(params));
		router.events.on('routeChangeComplete', handleStop);
		router.events.on('routeChangeError', handleStop);

		return () => {
			eventBus.remove('pageTransition', transition);
			router.events.off('routeChangeComplete', handleStop);
			router.events.off('routeChangeError', handleStop);
		};
	}, []);

	return (
		<div
			className={classNames(styles.pageTransition, {
				[styles.transitionStart]: transitionStart
			})}
		></div>
	);
};
