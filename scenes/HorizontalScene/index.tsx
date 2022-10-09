import styles from './HorizontalScene.module.scss';
import {FC, ReactNode} from 'react';
import {TextContent} from './TextContent';

interface Props {
	title: 'type1' | 'type2';
	text: string | string[];
	tips?: string | string[];
	scene?: any;
}

export const HorizontalSection: FC<Props> = ({title, text}) => {
	return (
		<div className={styles.scene}>
			<TextContent
				title={title}
				text={text}
			/>
		</div>
	);
};
