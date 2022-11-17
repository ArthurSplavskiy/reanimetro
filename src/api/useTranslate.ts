import {useEffect, useState} from 'react';
import {useLanguage} from '@context/app.context';
import API from './api';

export const useTranslate = <T>(field = '') => {
	const {language} = useLanguage();
	const [textField, setTextField] = useState<T>();

	const getData = async () => {
		const data = await API.getLanguage();
		data.find((lang: any) => {
			if (lang.locale === language) {
				setTextField(lang[field] || '');
			} else return;
		});
	};

	useEffect(() => {
		try {
			getData();
		} catch (e) {}
	}, [language]);

	return textField;
};
