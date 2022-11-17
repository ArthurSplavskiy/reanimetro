import {withLayout} from '@layout/Layout';

export function Error404(): JSX.Element {
	return (
		<>
			<h1>Помилка 404</h1>
		</>
	);
}

export default withLayout(Error404);
