import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartDataPoint } from "@/data/mockData";

interface DualAxisChartProps {
  data: ChartDataPoint[];
}

export function DualAxisChart({ data }: DualAxisChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gradSpend" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 10%, 18%)" />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} axisLine={false} tickLine={false} width={50} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(228, 12%, 11%)",
            border: "1px solid hsl(228, 10%, 18%)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "hsl(210, 20%, 90%)",
          }}
          formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
        />
        <Area
          type="monotone"
          dataKey="spend"
          stroke="hsl(0, 72%, 51%)"
          strokeWidth={2}
          fill="url(#gradSpend)"
          name="Spend"
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="hsl(142, 71%, 45%)"
          strokeWidth={2}
          fill="url(#gradRevenue)"
          name="Revenue"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
