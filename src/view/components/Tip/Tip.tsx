import styles from './Tip.module.scss';
import {icons, TipProps} from './Tip.props';
import cn from 'classnames';
import {SplitText} from '@cyriacbr/react-split-text';
import {useEffect, useState} from 'react';
import {useBrowser} from '@hooks/useBrowser';

export const Tip = ({
	icon,
	appearance,
	className,
	maxWidth,
	position,
	children,
	show,
	...props
}: TipProps): JSX.Element => {
	const [isReveal, setIsReveal] = useState(false);
	const IconComponent = icons[icon || 'icon1'];
	const isBrowser = useBrowser();

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				setIsReveal(true);
			}, 500);
		} else {
			setIsReveal(false);
		}
	}, [show]);

	return (
		<div
			className={cn(className, styles.tip, {
				[styles.topLeft]: position === 'topLeft',
				[styles.topRight]: position === 'topRight',
				[styles.bottomLeft]: position === 'bottomLeft',
				[styles.bottomRight]: position === 'bottomRight',
				[styles.show]: show
			})}
			style={{maxWidth: maxWidth + 'px'}}
			{...props}
		>
			<div
				className={cn(styles.tipContent, {
					[styles.bgRed]: appearance === 'red',
					[styles.bgMayonnaise]: appearance === 'mayonnaise',
					[styles.bgBlue]: appearance === 'blue',
					[styles.iconFirst]: icon === 'icon1',
					[styles.iconRight]: (position === 'topRight' || position === 'bottomRight') && icon,
					[styles.onlyText]: icon === undefined
				})}
			>
				{position !== 'topRight' && position !== 'bottomRight' && icon ? <IconComponent /> : null}
				{isBrowser && (
					<SplitText
						className={cn('firstShow', 'split-text-lines', {
							reveal: isReveal
						})}
					>
						{children}
					</SplitText>
				)}
				{(position === 'topRight' || position === 'bottomRight') && icon ? <IconComponent /> : null}
			</div>
		</div>
	);
};
