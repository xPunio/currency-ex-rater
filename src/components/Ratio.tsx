import { RatioProps } from "@/lib/props-types";
import { Triangle, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

function Ratio({ currency, currencyTo, latestRate }: RatioProps) {
    const [isRising, setIsRising] = useState(false);

    useEffect(() => {
        if (currency?.rates && Object.keys(currency?.rates).length >= 2) {
            const values = Object.values(currency.rates);
            const previousRate = values.at(-2)?.[currencyTo] ?? 0;
            if (latestRate && previousRate) {
                setIsRising(latestRate > previousRate);
            }
        }
    }, [currency, currencyTo, latestRate]);

    if (!currency) return null;
    return (
        <div className="flex gap-2 items-center justify-center h-6">
            {currency && (
                <div className="flex justify-center items-center">
                    <span className="text-sm text-muted-foreground">
                        {latestRate ? (
                            "1 : " + latestRate.toFixed(2)
                        ) : (
                            <LoaderCircle className="w-2 h-2 animate-spin" />
                        )}
                    </span>
                </div>
            )}
            {latestRate ? (
                isRising ? (
                    <div className="flex justify-center items-center">
                        <Triangle
                            className="w-2 h-2 text-green-500"
                            fill="rgb(34, 197, 94)"
                        />
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <Triangle
                            className="w-2 h-2 text-red-500 rotate-180"
                            fill="rgb(239, 68, 68)"
                        />
                    </div>
                )
            ) : (
                ""
            )}
        </div>
    );
}

export default Ratio;
