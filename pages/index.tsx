import {withLayout} from '../layout/Layout';
import {StartScene} from '../scenes/StartScene/StartScene';
import {HorizontalSection} from '../scenes/HorizontalScene';
import {useTranslate} from '../api/useTranslate';

function Home() {
	const firstHorizontalSectionText = useTranslate<string[]>('firstHorizontalSectionText');
	return (
		<>
			<StartScene />
			<HorizontalSection
				title="type1"
				text={firstHorizontalSectionText}
			/>
		</>
	);
}

export default withLayout(Home);
