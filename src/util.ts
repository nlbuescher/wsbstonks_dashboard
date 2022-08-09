declare global {
	interface Number {
		/** @param places default is 0, which rounds to the nearest whole number. Negative places are valid */
		round(places?: number): number

		/** combination of round() and toLocaleString() */
		format(locale: string, places?: number): string
	}

	interface Date {
		toRelativeTime(): string
	}
}

Number.prototype.round = function (places = 0): number {
	const factor = 10 ** places;
	return Math.round(this as number * factor) / factor;
}

Number.prototype.format = function (locale: string, places = 0): string {
	return (this as number)
		.round(places)
		.toLocaleString(locale, { minimumFractionDigits: Math.max(places, 0) });
}

Date.prototype.toRelativeTime = function (): string {
	const now = new Date();
	const seconds = ((now.getTime() - this.getTime()) / 1000).round();
	const minutes = seconds / 60;
	const hours = minutes / 60;
	const days = hours / 24;
	const weeks = days / 7;
	const months = weeks / 4.34524;
	const years = months / 12;

	if (seconds < 5) return 'gerade eben';
	if (seconds < 60) return `vor ${seconds.round()} Sekunden`;
	if (seconds < 90) return 'vor einer Minute';
	if (minutes < 60) return `vor ${minutes.round()} Minuten`;
	if (minutes < 90) return 'vor einer Stunde';
	if (hours < 24) return `vor ${hours.round()} Stunden`;
	if (hours < 36) return 'vor einem Tag';
	if (days < 7) return `vor ${days.round()} Tagen`;
	if (days < 11) return 'vor einer Woche';
	if (weeks < 4.34524) return `vor ${weeks.round()} Wochen`;
	if (weeks < 6.51786) return 'vor einem Monat';
	if (months < 12) return `vor ${months.round()} Monaten`;
	if (months < 18) return 'vor einem Jahr';
	return `vor ${years.round()} Jahren`;
}

export function setTimer(
	callback: (...args: unknown[]) => void,
	delay = 1,
	...args: unknown[]
): NodeJS.Timeout {
	callback(args);
	return setInterval(callback, delay, args);
}

export function clearTimer(timeout: NodeJS.Timeout): void {
	clearInterval(timeout);
}
