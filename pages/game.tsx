import {withLayout} from '@layout/Layout';
import {GameContent} from '../src/view/pages/game';

function Game() {
	return (
		<>
			<GameContent />
		</>
	);
}

export default withLayout(Game);
