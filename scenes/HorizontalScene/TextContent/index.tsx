import {FC, ReactNode, useEffect, useState} from 'react';
import styles from './TextContent.module.scss';
import cn from 'classnames';
import Lottie from 'react-lottie';
import {SplitText} from '@cyriacbr/react-split-text';
import * as heartTitle from '../../../public/lottie/heart-title.json';
import {useLanguage} from '../../../context/app.context';

interface Props {
	title: 'type1' | 'type2';
	text: string | string[];
}

const heartAnimationConfig = {
	loop: false,
	autoplay: false,
	animationData: heartTitle,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};
const titleType2 = {
	loop: false,
	autoplay: false,
	animationData: heartTitle,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

export const TextContent: FC<Props> = ({title, text}) => {
	const {language} = useLanguage();
	const [locale, setLocale] = useState('');

	useEffect(() => {
		setLocale(language);
	}, [language]);

	return (
		<>
			{title === 'type1' && (
				<div
					className={cn(styles.title, {
						[styles.titleAnimate]: true
					})}
				>
					{locale === 'ua' && (
						<>
							<div>
								<span>Раптова зупинка</span>{' '}
							</div>
							<div>
								<span>
									серця: це{' '}
									<span className={styles.titleHeart}>
										<Lottie
											options={heartAnimationConfig}
											width={85}
											height={85}
										/>
									</span>
									може
								</span>
							</div>
							<div>
								<span>статися з будь-ким</span>
							</div>
						</>
					)}
					{locale === 'en' && (
						<>
							<div>
								<span>Sudden cardiac</span>{' '}
							</div>
							<div>
								<span>
									arrest:{' '}
									<span className={styles.titleHeart}>
										<Lottie
											options={heartAnimationConfig}
											width={85}
											height={85}
										/>
									</span>
									It may
								</span>
							</div>
							<div>
								<span>happen to anyone</span>
							</div>
						</>
					)}
				</div>
			)}
			{title === 'type2' && (
				<SplitText
					className={cn('split-text', 'firstShow', {
						reveal: true
					})}
					LineWrapper={({lineIndex, children}) => (
						<span className="wrapper">
							{children}
							<Lottie options={titleType2} />
						</span>
					)}
				></SplitText>
			)}
			<div className={styles.text}>
				{Array.isArray(text) ? (
					text.map((p, i) => (
						<SplitText
							className={cn('split-text-lines', 'firstShow', {
								reveal: true
							})}
						>
							{p}
						</SplitText>
					))
				) : (
					<SplitText
						className={cn('split-text-lines', 'firstShow', {
							reveal: true
						})}
					>
						{text}
					</SplitText>
				)}
			</div>
		</>
	);
};
