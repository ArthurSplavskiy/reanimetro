import styles from './Layout.module.scss';
import { LayoutProps } from './Layout.props';
import { TopLine } from './TopLine/TopLine';
import { BottomLine } from './BottomLine/BottomLine';
import { FunctionComponent } from 'react';

const Layout = ({ children }: LayoutProps): JSX.Element => {

	return (
		<div className={styles.wrapper}>
			<TopLine className={styles.TopLine} />
			<main className={styles.main} tabIndex={0} role='main'>
				{children}
			</main>
			<BottomLine className={styles.BottomLine} />
			<div className='noise'></div>
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>): typeof Component => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};