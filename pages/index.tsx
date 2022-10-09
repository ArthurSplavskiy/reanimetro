import {withLayout} from '../layout/Layout';
import {StartScene} from '../scenes/StartScene/StartScene';

function Home() {
	return (
		<>
			<StartScene />
			<div
				className="geo"
				style={{background: 'black', height: '200vh', width: '100%'}}
			>
				<div
					className="geo-block"
					style={{background: 'yellow', height: '100px', width: '100px'}}
				>
					de
				</div>
			</div>
		</>
	);
}

export default withLayout(Home);
