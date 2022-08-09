export class Portfolio {
	buyin = 0
	value = 0
	diffEuro = 0
	diffPercent = 0
}

export interface Stonk {
	name: string
	symbol: string
	count: number
	buyinPrice: number
	buyinValue: number
	currentPrice: number
	currentValue: number
	diffEuro: number
	diffPercent: number
}

export interface StonksResult {
	/** unix timestamp in ms */
	timestamp: number
	portfolio: Portfolio
	stonks: Stonk[]
}

export interface StonkCandles {
	closes: number[]
	times: number[]
}

export interface StonkCandlesMap {
	[symbol: string]: StonkCandles
}

export interface StonkCandlesResult {
	/** unix timestamp in ms */
	timestamp: number
	candles: StonkCandlesMap
}

const SERVER = 'https://api.wsbstonks.info';

export default class Api {
	static async allStonks(): Promise<StonksResult> {
		return fetch(`${SERVER}/stonks`).then(res => res.json());
	}

	static async allStonkCandles(): Promise<StonkCandlesResult> {
		return fetch(`${SERVER}/stonkcandles`).then(res => res.json());
	}
}
