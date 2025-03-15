import { PercentageChangeProps } from "@/lib/props-types";
import { useEffect } from "react";
import { useState } from "react";
import { MoveUpRight, MoveDownRight } from "lucide-react";

function PercentageChange({ firstRate, latestRate }: PercentageChangeProps) {
    const [percentageChange, setPercentageChange] = useState<number>(0);

    useEffect(() => {
        if (firstRate && latestRate) {
            const percentageChange =
                ((latestRate - firstRate) / firstRate) * 100;
            setPercentageChange(Number(percentageChange.toFixed(2)));
        }
    }, [firstRate, latestRate]);

    return (
        <div className="flex gap-2 items-center">
            {percentageChange && percentageChange > 0 ? (
                <MoveUpRight className="w-5 h-5 text-green-500" />
            ) : (
                <MoveDownRight className="w-5 h-5 text-red-500" />
            )}
            <span
                className={`text-lg font-medium ${
                    percentageChange && percentageChange > 0
                        ? "text-green-500"
                        : "text-red-500"
                }`}
            >
                {Math.abs(percentageChange)}%
            </span>
        </div>
    );
}

export default PercentageChange;
