export type VideoPlatform = 'youtube' | 'instagram' | 'unknown';

export function getVideoPlatform(url: string): VideoPlatform {
	const host = new URL(url).hostname.replace(/^www\./, '');
	if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com') return 'youtube';
	if (host === 'instagram.com') return 'instagram';
	return 'unknown';
}

export function getYouTubeId(url: string): string | null {
	const parsed = new URL(url);
	if (parsed.hostname.replace(/^www\./, '') === 'youtu.be') {
		return parsed.pathname.slice(1).split('/')[0] || null;
	}
	if (parsed.pathname.startsWith('/shorts/')) {
		return parsed.pathname.split('/')[2] || null;
	}
	return parsed.searchParams.get('v');
}
