"use client"

import { cn } from "@/lib/utils"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  Area,
  AreaChart,
} from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Define types for common chart props
type ChartProps = {
  data: Record<string, any>[]
  categories: string[]
  index: string
  type?: "line" | "bar" | "pie" | "radial" | "area"
  valueFormatter?: (value: number) => string
  className?: string
}

// Chart component
const Chart = ({ data, categories, index, type = "line", valueFormatter, className }: ChartProps) => {
  const ChartComponent =
    type === "line"
      ? LineChart
      : type === "bar"
        ? BarChart
        : type === "pie"
          ? PieChart
          : type === "radial"
            ? RadialBarChart
            : AreaChart

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {categories.map((category) => (
              <Line key={category} dataKey={category} stroke="hsl(var(--primary))" dot={false} />
            ))}
          </LineChart>
        )
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {categories.map((category) => (
              <Bar key={category} dataKey={category} fill="hsl(var(--primary))" />
            ))}
          </BarChart>
        )
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {categories.map((category) => (
              <Area key={category} dataKey={category} fill="hsl(var(--primary))" stroke="hsl(var(--primary))" />
            ))}
          </AreaChart>
        )
      case "pie":
        return (
          <PieChart>
            {categories.map((category) => (
              <Pie
                key={category}
                dataKey={category}
                nameKey={index}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="hsl(var(--primary))"
                label
              />
            ))}
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        )
      case "radial":
        return (
          <RadialBarChart innerRadius={20} outerRadius={100} data={data}>
            {categories.map((category) => (
              <RadialBar key={category} dataKey={category} fill="hsl(var(--primary))" />
            ))}
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadialBarChart>
        )
      default:
        return null
    }
  }

  return (
    <ChartContainer
      config={{
        [categories[0]]: {
          label: categories[0],
          color: "hsl(var(--primary))",
        },
      }}
      className={cn("min-h-[200px] w-full", className)}
    >
      {renderChart()}
    </ChartContainer>
  )
}

// Example usage with a selector for different chart types
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

export function ChartWithSelector() {
  const [chartType, setChartType] = React.useState<ChartProps["type"]>("line")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Statistics</CardTitle>
        <CardDescription>Monthly active users for desktop and mobile.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Select value={chartType} onValueChange={(value: ChartProps["type"]) => setChartType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
              <SelectItem value="radial">Radial Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Chart data={chartData} categories={["desktop", "mobile"]} index="month" type={chartType} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Desktop</TableHead>
              <TableHead>Mobile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chartData.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.month}</TableCell>
                <TableCell>{row.desktop}</TableCell>
                <TableCell>{row.mobile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
