import { useRef } from 'react';

export const useAudio = (url: string) => {
	const player = useRef<HTMLAudioElement | undefined>(
		typeof Audio !== 'undefined' ? new Audio(url) : undefined,
	);

	return player;
};
