import {withLayout} from '@layout/Layout';
import {StartScene} from '@scenes/StartScene/StartScene';
import {HorizontalSection} from '@scenes/HorizontalScene';
import {useTranslate} from '@api/useTranslate';
import * as horizontalScene1 from '@public/lottie/horizontal-scene-1.json';

function Home() {
	const firstHorizontalSectionText = useTranslate<string[]>('firstHorizontalSectionText');
	return (
		<>
			<StartScene />
			<HorizontalSection
				title="type1"
				text={firstHorizontalSectionText}
				scene={horizontalScene1}
			/>
		</>
	);
}

export default withLayout(Home);
