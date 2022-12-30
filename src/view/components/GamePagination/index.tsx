import classNames from 'classnames';
import styles from './pagination.module.scss';

interface Props {
	total: number;
	current: number;
	show: boolean;
}

export const GamePagination: React.FC<Props> = ({total, current, show}) => {
	const totalWithZero = total < 10 ? '0' + total : total;
	const currentWithZero = current < 10 ? '0' + current : current;
	return (
		<div
			className={classNames(styles.pagination, {
				['scaleIn']: show
			})}
		>
			<span>
				{currentWithZero}
				<span className={styles.total}>&nbsp;- {totalWithZero}</span>
			</span>
		</div>
	);
};
