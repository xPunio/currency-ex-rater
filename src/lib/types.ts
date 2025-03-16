export interface CurrencyInList {
    readonly code: string;
    readonly name: string;
}

export interface Currency {
    readonly amount: number;
    readonly base: string;
    readonly date: string;
    readonly rates: {
        [key: string]: Rate;
    };
}
export interface Rate {
    readonly [key: string]: number;
}

export interface RateData {
    readonly date: string;
    readonly rate: number;
}
