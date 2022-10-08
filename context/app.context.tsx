import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {pageText} from '../misc/allSplitText';

export interface IAppContext {
	language: string;
	scrollable: boolean;
	setLanguage?: (newLang: string) => void;
	setScrollable?: (scrollValue: boolean) => void;
}

export const AppContext = createContext<IAppContext>({
	language: 'ua',
	scrollable: false
});

export const useLanguage = () => {
	const {language, setLanguage} = useContext(AppContext);
	return {language, setLanguage};
};

export const useScrollable = () => {
	const {scrollable, setScrollable} = useContext(AppContext);
	return {scrollable, setScrollable};
};

export const AppContextProvider = ({
	language,
	scrollable,
	children
}: PropsWithChildren<IAppContext>): JSX.Element => {
	const [lang, setLang] = useState(language);
	const [scrollAble, setScrollAble] = useState(scrollable);
	const [notFirstRender, setNotFirstRender] = useState(false);

	const setLanguage = (newLang: string) => {
		setLang(newLang);
		localStorage.setItem('language', newLang);
	};

	const setScrollable = (scrollValue: boolean) => {
		setScrollAble(scrollValue);
	};

	useEffect(() => {
		const localLanguage = localStorage.getItem('language');

		if (localLanguage) {
			setLanguage(localLanguage);
		} else {
			if (navigator.language) {
				if (navigator.language.slice(0, 2) === 'uk') {
					setLanguage('ua');
				} else if (navigator.language.slice(0, 2) === 'en') {
					setLanguage('en');
				} else return;
			}
		}

		setTimeout(() => setNotFirstRender(true), 2000);
	}, []);

	useEffect(() => {
		if (document.body) {
			scrollAble
				? document.body.classList.remove('no-scroll')
				: document.body.classList.add('no-scroll');
		}
	}, [scrollAble]);

	useEffect(() => {
		if (notFirstRender) {
			pageText.getText('split-text-lines').removeClass('reveal');
			pageText.getText('split-text').removeClass('firstShow');
			pageText.getText('split-text').removeClass('reveal');
			setTimeout(() => {
				pageText.getText('split-text-lines').addClass('reveal');
				pageText.getText('split-text').addClass('firstShow');
				pageText.getText('split-text').addClass('reveal');
				pageText.getText('split-text').opacity('1');
			}, 500);
		}
	}, [lang]);

	return (
		<AppContext.Provider
			value={{language: lang, scrollable: scrollAble, setLanguage, setScrollable}}
		>
			{children}
		</AppContext.Provider>
	);
};
