import styles from './BottomLine.module.scss';
import {BottomLineProps} from './BottomLine.props';
import cn from 'classnames';
import {MouseEvent, useEffect, useState} from 'react';
import {useLanguage, useScrollable} from '../../context/app.context';
import {useTranslate} from '../../api/useTranslate';
import {SplitText} from '@cyriacbr/react-split-text';
import {eventBus} from '../../context/EventBus/EventBus';
import {useBrowser} from '../../hooks/useBrowser';

export const BottomLine = ({className, ...props}: BottomLineProps): JSX.Element => {
	const [switchIsOpen, setSwitchIsOpen] = useState(false);
	const [show, setShow] = useState(false);
	const {language, setLanguage} = useLanguage();
	const [fallbackLanguage, setFallbackLanguage] = useState('en');
	const {scrollable} = useScrollable();
	const isBrowser = useBrowser();

	const localeName = useTranslate<string[]>('localeName');
	const scrollIndicator = useTranslate<string>('scrollIndicator');

	const changeLanguage = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;
		setFallbackLanguage(language as string);
		setLanguage?.(target.dataset.lang as string);
	};

	const handleShow = () => {
		setShow(true);
	};

	useEffect(() => {
		const currentLanguage = localStorage.getItem('language');
		if (currentLanguage === 'ua') {
			setFallbackLanguage('en');
		} else {
			setFallbackLanguage('ua');
		}

		eventBus.on('preloaderAnimationEnd', handleShow);

		return () => {
			eventBus.remove('preloaderAnimationEnd', handleShow);
		};
	}, []);

	return (
		<div
			className={cn(className, styles.BottomLine)}
			{...props}
		>
			<div
				className={cn(styles.BottomLang, {
					[styles.open]: switchIsOpen,
					[styles.show]: show
				})}
				onClick={() => setSwitchIsOpen(prev => !prev)}
			>
				<div className={styles.BottomLangVariant}>
					<button
						onClick={e => changeLanguage(e)}
						data-lang={fallbackLanguage}
					>
						{localeName?.[1]}
					</button>
				</div>
				<div className={styles.BottomLangCurrent}>
					<button>{localeName?.[0]}</button>
				</div>
			</div>
			<div className={styles.BottomLineScroll}>
				{isBrowser && (
					<SplitText
						className={cn(styles.MenuRevealText, 'split-text', 'firstShow', {
							reveal: scrollable
						})}
					>
						{scrollIndicator}
					</SplitText>
				)}
				{/*<div>{scrollIndicator}</div>*/}
			</div>
		</div>
	);
};
