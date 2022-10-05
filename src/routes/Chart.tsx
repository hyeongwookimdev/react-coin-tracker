import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
/*
니꼬샘이 제공해준 https://ohlcv-api.nomadcoders.workers.dev API는 close 데이터가 string이기 때문에 parseFloat를 통해 형 변환을 시켜줘야 합니다!

data: data?.map((price) => parseFloat(price.close)) ?? []
*/

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return [
                  price.time_close,
                  parseFloat(price.open),
                  parseFloat(price.high),
                  parseFloat(price.low),
                  parseFloat(price.close),
                ];
              }) as [],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 350,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#e84118",
                  downward: "#00a8ff",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
