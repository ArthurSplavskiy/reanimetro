import {SplitText} from '@cyriacbr/react-split-text';
import {IMenu} from './Menu.props';
import cn from 'classnames';
import styles from './Menu.module.scss';
import {useTranslate} from '@api/useTranslate';
import {useBrowser} from '@hooks/useBrowser';

export const Menu = ({open, onClose, animate}: IMenu): JSX.Element => {
	const menuLinksText = useTranslate<string[]>('menu');
	const isBrowser = useBrowser();

	const linksDalay = (id: number) => {
		return animate ? id * 0.07 + 's' : '0s';
	};

	return (
		<div
			className={cn(styles.Menu, {
				[styles.open]: open
			})}
		>
			<div className={styles.MenuCover}></div>
			<div
				className={styles.MenuBackdrop}
				onClick={onClose}
			></div>
			<div className={styles.MenuContent}>
				<ul className={styles.MenuList}>
					{menuLinksText?.map((link, id) => (
						<li key={id}>
							{isBrowser && (
								<SplitText
									className={cn(styles.MenuRevealText, 'split-text', {
										reveal: animate,
										close: open
									})}
									style={{animationDelay: linksDalay(id)}}
								>
									{link}
								</SplitText>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
