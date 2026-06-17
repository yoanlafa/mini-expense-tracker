import {type Expense} from "../types/Expense.ts";
import {PieChart, Pie, ResponsiveContainer, Sector} from "recharts";

interface ExpenseChartProps{
    expenses: Expense[];
    onClose: ()=>void;
}

const COLORS = [
    "#3b82f6", // blue
    "#22c55e", // green
    "#f97316", // orange
    "#a855f7", // purple
    "#ef4444", // red
    "#14b8a6", // teal
];

interface ChartData{
    category: string;
    amount: number;
    percentage: number;
    color: string;
}

function ExpenseChart({expenses, onClose}: ExpenseChartProps){
    const totalAmount = expenses.reduce(
        (sum,expense)=>sum+expense.amount,0
    );

    const amountByCategory = expenses.reduce<Record<string, number>>(
        (acc, expense)=> {
            acc[expense.category] =
                (acc[expense.category] || 0) + expense.amount;
            return acc;
        },{}
    );

    const chartData: ChartData[] = Object.entries(amountByCategory).map(
        ([category, amount],index) => ({
            category,
            amount,
            percentage: totalAmount ===0 ? 0 : (amount/totalAmount) * 100,
            color: COLORS[index % COLORS.length],
        })
    );

    const renderColoredSector = (props: any) => {
        return (
            <Sector
                {...props}
                fill={props.payload.color}
            />
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-5">
            <div className="mx-auto max-w-[500px] rounded-lg bg-white p-5 shadow-sm">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Spending by Category
                </h3>

                {chartData.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No expenses to display.
                    </p>
                ) : (
                    <>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="amount"
                                        nameKey="category"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        shape={renderColoredSector}
                                        label={({ percent }) =>
                                            `${((percent ?? 0) * 100).toFixed(0)}%`
                                        }
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            {chartData.map((item) => (
                                <div
                                    key={item.category}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <div className="flex items-center gap-2">
                        <span
                            className="h-3 w-3 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        />

                                        <span>{item.category}</span>
                                    </div>

                                    <span>
                        {item.amount.toFixed(2)} € ({item.percentage.toFixed(0)}%)
                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-400"
                    >Back</button>
            </div>

        </div>
    )
}

export default ExpenseChart;