import {FC, useState} from 'react';
import Lottie from 'react-lottie';
import {useWindowSize} from '@hooks/useWindowSize';

interface Props {
	scene: any;
}

export const MediaContent: FC<Props> = ({scene}) => {
	const [sceneLottie] = useState(scene);
	const [windowWidth, windowHeight] = useWindowSize();

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: sceneLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<div className={'d2edew'}>
			<Lottie
				options={defaultOptions}
				height={200}
				width={200}
			/>
		</div>
	);
};
