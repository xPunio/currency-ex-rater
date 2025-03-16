import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import CurrencyPicker from "./components/CurrencyPicker";
import { Currency, CurrencyInList } from "./lib/types";
import { CircleDollarSign, LoaderCircle } from "lucide-react";
import Ratio from "./components/Ratio";
import Result from "./components/Result";
import ChartPanel from "./components/ChartPanel";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select";
import PercentageChange from "./components/PercentageChange";
function App() {
    const [changeFrom, setChangeFrom] = useState<string>("USD");
    const [changeTo, setChangeTo] = useState<string>("PLN");
    const [currencies, setCurrencies] = useState<CurrencyInList[]>([]);
    const [currency, setCurrency] = useState<Currency | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [latestRate, setLatestRate] = useState<number | null>(null);
    const [firstRate, setFirstRate] = useState<number | null>(null);
    const [timeSlot, setTimeSlot] = useState<number>(7);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch(
                    `https://api.frankfurter.dev/v1/currencies`
                );
                const data = await response.json();
                setCurrencies(
                    Object.entries(data).map(([code, name]) => ({
                        code,
                        name: name as string,
                    }))
                );
            } catch (error) {
                console.error(error);
            }
        };
        fetchCurrencies();
    }, []);

    useEffect(() => {
        if (currency) {
            setLatestRate(
                Object.values(currency.rates).at(-1)?.[changeTo] ?? null
            );
            setFirstRate(
                Object.values(currency.rates).at(0)?.[changeTo] ?? null
            );
        }
    }, [currency, changeTo]);

    useEffect(() => {
        setCurrency(null);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - timeSlot);
        const startDateString = startDate.toISOString().split("T")[0];

        async function fetchData() {
            try {
                const response = await fetch(
                    `https://api.frankfurter.dev/v1/${startDateString}..?base=${changeFrom}&symbols=${changeTo}`
                );
                const data = await response.json();

                if (!data) throw new Error("No data");

                setCurrency(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [timeSlot, changeFrom, changeTo]);

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="shadow-2xl relative">
                <CardContent className="flex lg:flex-row flex-col gap-4 items-center">
                    <div className="flex flex-col gap-4 max-md:pt-8">
                        <CardTitle className="flex items-center gap-2 absolute top-0 left-0 p-4">
                            <CircleDollarSign className="w-8 h-8" />
                            <span>Currency Converter</span>
                        </CardTitle>
                        <Ratio
                            currency={currency}
                            currencyTo={changeTo}
                            latestRate={latestRate}
                        />
                        <div className="flex flex-col gap-4">
                            <CurrencyPicker
                                changeFrom={changeFrom}
                                setChangeFrom={setChangeFrom}
                                changeTo={changeTo}
                                setChangeTo={setChangeTo}
                                currencies={currencies}
                                setCurrency={setCurrency}
                            />
                            <Input
                                type="number"
                                placeholder="Enter amount"
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 text-center"
                                value={amount > 0 ? amount : ""}
                                onChange={(e) =>
                                    setAmount(Number(e.target.value))
                                }
                            />
                        </div>
                        <div className="mt-4 h-12 flex justify-center items-center">
                            <Result
                                amount={amount}
                                currencyTo={changeTo}
                                latestRate={latestRate}
                            />
                        </div>
                    </div>
                    <div className="w-[500px] h-[350px] relative max-lg:mt-8">
                        <div className="flex justify-between items-center lg:ml-20">
                            <Select
                                value={timeSlot.toString()}
                                onValueChange={(value: string) =>
                                    setTimeSlot(Number(value))
                                }
                                defaultValue={timeSlot.toString()}
                            >
                                <SelectTrigger className="w-30">
                                    <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="7">7-days</SelectItem>
                                    <SelectItem value="14">14-days</SelectItem>
                                    <SelectItem value="30">30-days</SelectItem>
                                </SelectContent>
                            </Select>
                            <PercentageChange
                                firstRate={firstRate}
                                latestRate={latestRate}
                            />
                        </div>
                        {currency ? (
                            <ChartPanel
                                changeTo={changeTo}
                                currency={currency}
                            />
                        ) : (
                            <div className="flex justify-center items-center h-full w-full absolute top-0 left-0">
                                <LoaderCircle className="w-10 h-10 animate-spin" />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
