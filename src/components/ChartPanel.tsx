import { ChartPanelProps } from "@/lib/props-types";
import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    Line,
    Tooltip,
} from "recharts";
import { RateData } from "@/lib/types";

function ChartPanel({ changeTo, currency }: ChartPanelProps) {
    const [chartData, setChartData] = useState<RateData[]>([]);

    useEffect(() => {
        if (currency) {
            setChartData(
                Object.entries(currency.rates).map(([date, rate]) => ({
                    date,
                    rate: (rate as Record<string, number>)[changeTo],
                }))
            );
        }
    }, [currency, changeTo]);

    return (
        <div className="mt-4 mr-8 h-full">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} width={1000} height={300}>
                    <XAxis
                        dataKey="date"
                        allowDecimals={false}
                        tickFormatter={(tick) =>
                            tick.split("-").slice(1, 3).join("-")
                        }
                        tickMargin={10}
                    />
                    <YAxis
                        type="number"
                        domain={[
                            (dataMin: number) => (dataMin * 0.99).toFixed(2),
                            (dataMax: number) => (dataMax * 1.01).toFixed(2),
                        ]}
                        tickMargin={10}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ChartPanel;
