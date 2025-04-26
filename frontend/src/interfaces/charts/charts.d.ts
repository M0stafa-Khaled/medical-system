export interface IChartDataset {
  label: string;
  data: number[];
}

export interface IChart {
  datasets: IChartDataset[];
  labels: string[];
}

export interface IChartRes {
  status: boolean;
  message: string | null;
  data: IChart;
}
