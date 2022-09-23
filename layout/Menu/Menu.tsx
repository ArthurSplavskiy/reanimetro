import styles from './Menu.module.scss';

export const Menu = (): JSX.Element => {
	return (
		<div className={styles.Menu}>
			<div className={styles.MenuBackdrop}></div>
			<div className={styles.MenuContent}></div>
		</div>
	);
};
