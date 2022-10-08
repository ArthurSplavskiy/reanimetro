import styles from './Layout.module.scss';
import {LayoutProps} from './Layout.props';
import {TopLine} from './TopLine/TopLine';
import {BottomLine} from './BottomLine/BottomLine';
import {FunctionComponent} from 'react';
import {AppContextProvider} from '../context/app.context';
import {mouseEnterHandler, mouseLeaveHandler, mouseMoveHandler} from '../misc/cursor';

const Layout = ({children}: LayoutProps): JSX.Element => {
	return (
		<div
			className={styles.wrapper}
			onMouseMove={e => mouseMoveHandler(e)}
			onMouseLeave={mouseLeaveHandler}
			onMouseEnter={mouseEnterHandler}
		>
			<TopLine className={styles.TopLine} />
			<main
				className={styles.main}
				tabIndex={0}
				role="main"
			>
				<div></div>
				{children}
			</main>
			<BottomLine className={styles.BottomLine} />
			<div className="noise"></div>
			<div className="click-cursor">click</div>
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
): typeof Component => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider
				language="ua"
				scrollable={false}
			>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};
