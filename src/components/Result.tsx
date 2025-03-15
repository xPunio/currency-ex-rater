import { ResultProps } from "@/lib/props-types";
import { useEffect, useState } from "react";

function Result({ amount, currencyTo, latestRate }: ResultProps) {
    const [result, setResult] = useState<number>(0);

    useEffect(() => {
        if (latestRate) {
            const result: number = Number(amount) * Number(latestRate);
            setResult(Number(result));
        }
    }, [amount, latestRate]);

    return result > 0 ? (
        <div className="flex flex-col w-full items-center justify-center">
            <p className="text-sm text-gray-500">You will get</p>
            <p className="text-xl font-bold">
                {result.toFixed(2)} {currencyTo}
            </p>
        </div>
    ) : (
        <div className="flex flex-col w-full items-center justify-center">
            <p className="text-sm text-gray-500">Provide amount to convert</p>
        </div>
    );
}

export default Result;
