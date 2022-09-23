import styles from './Cardiograma.module.scss';

export const Cardiograma = (): JSX.Element => {
	return (
		<div className={styles.Cardiograma}>
			<div className={styles.CardiogramaBlack} style={{ backgroundImage: "url('/cardiograma-black.svg')" }}></div>
			<div className={styles.CardiogramaRed} style={{ backgroundImage: "url('/cardiograma-red.svg')" }}></div>
		</div>
	);
};