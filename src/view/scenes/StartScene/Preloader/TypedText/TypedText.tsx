import {ReactNode, useEffect, useState} from 'react';
import {ITypedTextProps} from './TypedText.props';

export const TypedText = ({className, children, speed = 55, ...props}: ITypedTextProps) => {
	const strArr = children.split('');
	const [text, setText] = useState<string[]>([strArr[0]]);

	const typedIntervalAnimation = () => {
		let index = 0;
		const interval = setInterval(() => {
			if (strArr[index] !== undefined) {
				setText(prev => [...prev, strArr[index - 1]]);
				index++;
			} else {
				clearInterval(interval);
			}
		}, speed);
		return interval;
	};

	useEffect(() => {
		setText('' || ['']);
		const interval = typedIntervalAnimation();
		return () => clearInterval(interval);
	}, [children]);

	const newLine = ({children}: {children: ReactNode}) => {
		return <div className="line">{children}</div>;
	};

	return (
		<div
			className={className}
			{...props}
		>
			{text.map((l, id) => {
				if (l === '%') return <br key={id} />;
				if (l === ' ') return <span key={id}>&nbsp;</span>;
				return <span key={id}>{l}</span>;
			})}
		</div>
	);
};
