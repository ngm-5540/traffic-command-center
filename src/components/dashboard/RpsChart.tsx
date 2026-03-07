import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { RpsDataPoint } from "@/data/mockData";

interface RpsChartProps {
  data: RpsDataPoint[];
}

export function RpsChart({ data }: RpsChartProps) {
  const maxRps = Math.max(...data.map((d) => d.rps));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 10%, 18%)" vertical={false} />
        <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} axisLine={false} tickLine={false} width={30} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(228, 12%, 11%)",
            border: "1px solid hsl(228, 10%, 18%)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "hsl(210, 20%, 90%)",
          }}
        />
        <Bar dataKey="rps" radius={[3, 3, 0, 0]} name="RPS">
          {data.map((entry, index) => {
            const intensity = entry.rps / maxRps;
            const hue = 210;
            const lightness = 30 + intensity * 30;
            return <Cell key={index} fill={`hsl(${hue}, 100%, ${lightness}%)`} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
