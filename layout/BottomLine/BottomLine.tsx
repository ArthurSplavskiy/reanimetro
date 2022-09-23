import styles from './BottomLine.module.scss';
import { BottomLineProps } from './BottomLine.props';
import cn from 'classnames';
import { format } from 'date-fns';

export const BottomLine = ({ className, ...props }: BottomLineProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div className={styles.footerBottom}>
				OwlTop &copy; 2020 - {format(new Date(), 'yyyy')} Всі права захищені
			</div>
			<a href='#' target='_blank'>
				Права користувача
			</a>
			<a href='#' target='_blank'>
				Політика конфеденційності
			</a>
		</footer>
	);
};
