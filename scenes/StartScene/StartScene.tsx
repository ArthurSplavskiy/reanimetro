import {Character} from './Character/Character';
import {Reanimation} from './Reanimation/Reanimation';
import styles from './StartScene.module.scss';
import {Tips} from './Tips/Tips';

export const StartScene = () => {
	return (
		<div className={styles.scene}>
			<Tips />
			<Reanimation />
			<Character />
		</div>
	);
};
