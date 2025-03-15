export interface CurrencyInList {
    code: string;
    name: string;
}

export interface Currency {
    amount: number;
    base: string;
    date: string;
    rates: {
        [key: string]: Rate;
    };
}
export interface Rate {
    [key: string]: number;
}

export interface RateData {
    date: string;
    rate: number;
}
