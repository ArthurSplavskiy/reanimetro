import styles from './TopLine.module.scss';
import {TopLineProps} from './TopLine.props';
import {Menu} from '../Menu/Menu';
import cn from 'classnames';
import {ChangeEvent, useEffect, useState} from 'react';
import {useAudio} from '@hooks/useAudio';
import {SplitText} from '@cyriacbr/react-split-text';
import {useTranslate} from '@api/useTranslate';
import {eventBus} from '@context/EventBus/EventBus';
import {useBrowser} from '@hooks/useBrowser';

export const TopLine = ({className, ...props}: TopLineProps): JSX.Element => {
	const [soundOn, setSoundOn] = useState(false);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const [menuTransitionStart, setMenuTransitionStart] = useState(false);
	const [show, setShow] = useState(false);
	const slogan = useTranslate<string>('slogan');
	const {current: sound} = useAudio('/sound.mp3');
	const isBrowser = useBrowser();

	const handleSoundOn = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setSoundOn(true);
			sound?.play();
		} else {
			setSoundOn(false);
			sound?.pause();
		}
	};

	const handleMenuOpen = () => {
		if (!menuIsOpen) {
			setMenuIsOpen(true);
			setTimeout(() => {
				setMenuTransitionStart(true);
			}, 400);
		} else {
			setMenuTransitionStart(false);
			setTimeout(() => {
				setMenuIsOpen(false);
			}, 400);
		}
	};

	const handleShow = () => {
		setShow(true);
	};

	useEffect(() => {
		eventBus.on('preloaderAnimationEnd', handleShow);

		return () => {
			eventBus.remove('preloaderAnimationEnd', handleShow);
		};
	}, []);

	return (
		<>
			<header
				className={className}
				{...props}
			>
				<div className={styles.TopLine}>
					<div className={styles.TopLineContent}>
						<label
							className={cn('switchBtn', styles.SoundSwitch, {
								[styles.SoundSwitchShow]: show
							})}
							data-cursor-hide
						>
							<input
								type="checkbox"
								onChange={handleSoundOn}
							/>
							<div className="slider">
								<div
									className={cn('bars', {
										paused: !soundOn
									})}
								>
									{new Array(4).fill(undefined).map((_, i) => (
										<span key={i}></span>
									))}
								</div>
								<div
									className={cn('bars', {
										paused: !soundOn
									})}
								>
									{new Array(4).fill(undefined).map((_, i) => (
										<span key={i}></span>
									))}
								</div>
							</div>
						</label>
						<h3 className={styles.Title}>
							{isBrowser && (
								<SplitText
									className={cn('split-text', 'firstShow', {
										reveal: show
									})}
								>
									{slogan}
								</SplitText>
							)}
						</h3>
						<button
							className={cn(styles.MenuButton, {
								[styles.close]: menuIsOpen,
								[styles.MenuButtonShow]: show,
								[styles.MenuButtonAppeared]: !show
							})}
							data-cursor-hide
							onClick={handleMenuOpen}
						></button>
					</div>
				</div>
			</header>
			<Menu
				open={menuIsOpen}
				onClose={handleMenuOpen}
				animate={menuTransitionStart}
			/>
		</>
	);
};
