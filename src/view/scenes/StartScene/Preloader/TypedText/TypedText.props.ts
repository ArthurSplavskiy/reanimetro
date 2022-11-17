import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface ITypedTextProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: string;
}
