import { withLayout } from '../layout/Layout';

export function Error500(): JSX.Element {

	return (
		<>
			<h1>Помилка 500</h1>
		</>
	);
}

export default withLayout(Error500);