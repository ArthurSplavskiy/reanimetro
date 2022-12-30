import {withLayout} from '@layout/Layout';
import {StartScene} from '@scenes/StartScene/StartScene';
import {HorizontalScene} from '@scenes/HorizontalScene';
import {useTranslate} from '@api/useTranslate';
import * as horizontalScene1 from '@public/lottie/horizontal-scene-1.json';
import {GameScene} from '@scenes/GameScene';

function Home() {
	const firstHorizontalSectionText = useTranslate<string[]>('firstHorizontalSectionText');
	const firstHorizontalSectionTips = useTranslate<string[]>('firstHorizontalSectionTips');
	return (
		<>
			<StartScene slide={1} />
			<HorizontalScene
				index={1}
				title="type1"
				text={firstHorizontalSectionText}
				tips={firstHorizontalSectionTips}
				scene={horizontalScene1}
				slide={2}
				horizontalSlide={true}
			/>
			<GameScene slide={3} />
			<HorizontalScene
				index={2}
				title="type1"
				text={firstHorizontalSectionText}
				tips={firstHorizontalSectionTips}
				scene={horizontalScene1}
				slide={4}
				horizontalSlide
			/>
		</>
	);
}

export default withLayout(Home);
