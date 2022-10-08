import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';
import icon1 from './ic-1.svg';
import icon2 from './ic-2.svg';
import icon3 from './ic-3.svg';

export const icons = {
	icon1,
	icon2,
	icon3
};

export type IconName = keyof typeof icons;

export interface TipProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: string;
	icon?: IconName;
	appearance: 'mayonnaise' | 'red' | 'blue';
	maxWidth: string;
	position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
	show: boolean;
}
