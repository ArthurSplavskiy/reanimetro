import {withLayout} from '../layout/Layout';
import {StartScene} from '../scenes/StartScene/StartScene';
import {HorizontalSection} from '../scenes/HorizontalScene';

function Home() {
	return (
		<>
			<StartScene />
			<HorizontalSection
				title="type1"
				text={[
					'Основи домедичної допомоги потрібно знати всім, адже до приїзду медиків втрачається дорогоцінний час, коли можна врятувати життя чи не допустити погіршення стану.',
					'Той, хто надає домедичну допомогу, повинен самостійно та максимально швидко вирішити, що потрібно робити, аби врятувати життя потерпілого.'
				]}
			/>
		</>
	);
}

export default withLayout(Home);
