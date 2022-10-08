import {withLayout} from '../layout/Layout';
import {StartScene} from '../scenes/StartScene/StartScene';

function Home() {
	return (
		<>
			<StartScene />
			<div style={{background: 'black', height: '200vh', width: '100%'}}>de</div>
		</>
	);
}

export default withLayout(Home);
