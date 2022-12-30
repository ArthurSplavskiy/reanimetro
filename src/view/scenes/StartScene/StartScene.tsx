import {Character} from './Character/Character';
import {Reanimation} from './Reanimation/Reanimation';
import styles from './StartScene.module.scss';
import {Tips} from './Tips/Tips';
import cn from 'classnames';

interface Props {
	slide: number;
}

export const StartScene: React.FC<Props> = ({slide}) => {
	return (
		<div
			className={cn(styles.scene, 'start-scene')}
			data-slide={slide}
		>
			<Tips />
			<Reanimation />
			<Character />
		</div>
	);
};
