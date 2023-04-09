import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexTheme, ApexTitleSubtitle } from "ng-apexcharts"

export interface ChartOptions {
  series: ApexNonAxisChartSeries,
  chart: ApexChart,
  labels: any,
  colors: string[],
  legend: ApexLegend,
  title: ApexTitleSubtitle
}
