import styles from './TopLine.module.scss';
import { TopLineProps } from './TopLine.props';
import { Menu } from '../Menu/Menu';
import cn from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAudio } from '../../hooks/useAudio';

export const TopLine = ({ className, ...props }: TopLineProps): JSX.Element => {
	const [soundOn, setSoundOn] = useState(false);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const { current: sound } = useAudio('/sound.mp3');

	const handleSoundOn = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setSoundOn(true);
			sound?.play();
		} else {
			setSoundOn(false);
			sound?.pause();
		}
	};

	return (
		<>
			<header className={className} {...props}>
				<div className={styles.TopLine}>
					<label className='switchBtn'>
						<input type='checkbox' onChange={handleSoundOn} />
						<div className='slider'>
							<div
								className={cn('bars', {
									paused: !soundOn
								})}>
								{new Array(4).fill(undefined).map((_, i) => (
									<span key={i}></span>
								))}
							</div>
							<div
								className={cn('bars', {
									paused: !soundOn
								})}>
								{new Array(4).fill(undefined).map((_, i) => (
									<span key={i}></span>
								))}
							</div>
						</div>
					</label>
					<h3 className={styles.Title}>Я ТВОЄ СЕРЦЕ</h3>
					<button className={styles.MenuButton}></button>
				</div>
			</header>
			<Menu />
		</>
	);
};
