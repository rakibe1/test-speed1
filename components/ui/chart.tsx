"use client"

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
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Define a type for the chart components to simplify usage
type ChartComponent = typeof LineChart | typeof BarChart | typeof PieChart | typeof RadialBarChart | typeof AreaChart

// Define a map for chart types to their components
const chartComponents: { [key: string]: ChartComponent } = {
  line: LineChart,
  bar: BarChart,
  pie: PieChart,
  radial: RadialBarChart,
  area: AreaChart,
}

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[]
  config: ChartConfig
  chartType: "line" | "bar" | "pie" | "radial" | "area"
  aspectRatio?: number
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      data,
      config,
      chartType,
      aspectRatio = 16 / 9,
      showGrid = true,
      showXAxis = true,
      showYAxis = true,
      showTooltip = true,
      showLegend = true,
      className,
      ...props
    },
    ref,
  ) => {
    const ChartComponent = chartComponents[chartType]

    if (!ChartComponent) {
      console.warn(`Chart type "${chartType}" is not supported.`)
      return null
    }

    const renderChartElements = () => {
      switch (chartType) {
        case "line":
          return Object.entries(config).map(([key, item]) => {
            if (item.type === "value") {
              return <Line key={key} dataKey={key} stroke={item.color} type="monotone" dot={false} name={item.label} />
            }
            return null
          })
        case "bar":
          return Object.entries(config).map(([key, item]) => {
            if (item.type === "value") {
              return <Bar key={key} dataKey={key} fill={item.color} name={item.label} />
            }
            return null
          })
        case "area":
          return Object.entries(config).map(([key, item]) => {
            if (item.type === "value") {
              return (
                <Area key={key} dataKey={key} fill={item.color} stroke={item.color} type="monotone" name={item.label} />
              )
            }
            return null
          })
        case "pie":
          // PieChart typically uses a single Pie component
          const valueKey = Object.keys(config).find((k) => config[k].type === "value")
          const nameKey = Object.keys(config).find((k) => config[k].type === "category")

          if (!valueKey || !nameKey) {
            console.warn("Pie chart config requires a 'value' and 'category' type key.")
            return null
          }

          return (
            <Pie
              dataKey={valueKey}
              nameKey={nameKey}
              outerRadius={80}
              fill="#8884d8" // Default fill, can be overridden by data
              label
            >
              {/* Colors for segments can be passed via data or a custom function */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={config[nameKey]?.color || "#8884d8"} />
              ))}
            </Pie>
          )
        case "radial":
          // RadialBarChart typically uses a single RadialBar component
          const radialValueKey = Object.keys(config).find((k) => config[k].type === "value")
          const radialNameKey = Object.keys(config).find((k) => config[k].type === "category")

          if (!radialValueKey || !radialNameKey) {
            console.warn("Radial bar chart config requires a 'value' and 'category' type key.")
            return null
          }

          return (
            <RadialBar
              minAngle={15}
              label={{ position: "insideStart", fill: "#fff" }}
              background
              clockWise
              dataKey={radialValueKey}
            >
              {/* Colors for segments can be passed via data or a custom function */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={config[radialNameKey]?.color || "#8884d8"} />
              ))}
            </RadialBar>
          )
        default:
          return null
      }
    }

    return (
      <ChartContainer ref={ref} config={config} className={cn("min-h-[200px] w-full", className)} {...props}>
        <ResponsiveContainer aspect={aspectRatio}>
          <ChartComponent data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey={Object.keys(config).find((k) => config[k].type === "category")} />}
            {showYAxis && <YAxis />}
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {renderChartElements()}
          </ChartComponent>
        </ResponsiveContainer>
      </ChartContainer>
    )
  },
)

Chart.displayName = "Chart"

export { Chart }
