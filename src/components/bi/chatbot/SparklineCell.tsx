import { LineChart, Line, ResponsiveContainer } from "recharts";

interface SparklineCellProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function SparklineCell({ data, color = "hsl(var(--primary))", width = 80, height = 25 }: SparklineCellProps) {
  const chartData = data.map((value) => ({ value }));

  return (
    <div style={{ width, height }} className="inline-block">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
