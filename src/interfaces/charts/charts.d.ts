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

export interface ITreasuriesChart extends IChart {
  total: string;
  treasury_name: string;
}

export interface ITreasuriesChartRes {
  status: boolean;
  message: string | null;
  data: ITreasuriesChart;
}
