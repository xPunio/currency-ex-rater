import { Currency, CurrencyInList } from "./types";

export interface CurrencyPickerProps {
    changeFrom: string;
    setChangeFrom: (currency: string) => void;
    changeTo: string;
    setChangeTo: (currency: string) => void;
    currencies: CurrencyInList[];
    setCurrency: (currency: Currency) => void;
}

export interface RatioProps {
    currency: Currency | null;
    currencyTo: string;
    latestRate: number | null;
}

export interface ResultProps {
    amount: number;
    currencyTo: string;
    latestRate: number | null;
}

export interface ChartPanelProps {
    changeTo: string;
    currency: Currency | null;
}

export interface PercentageChangeProps {
    firstRate: number | null;
    latestRate: number | null;
}
