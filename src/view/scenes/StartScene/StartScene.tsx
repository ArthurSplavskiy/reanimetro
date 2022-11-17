import {Character} from './Character/Character';
import {Reanimation} from './Reanimation/Reanimation';
import styles from './StartScene.module.scss';
import {Tips} from './Tips/Tips';
import cn from 'classnames';

export const StartScene = () => {
	return (
		<div className={cn(styles.scene, 'start-scene')}>
			<Tips />
			<Reanimation />
			<Character />
		</div>
	);
};
