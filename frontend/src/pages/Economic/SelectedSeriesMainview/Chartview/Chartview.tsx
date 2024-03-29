import * as React from "react";
import * as S from "../../style";

import { Skeleton, Typography } from "@mui/material";
import { FredSeriesEntry, getFredSeries } from "pages/Economic/requests";

import { ChartviewProps } from "./type";

import Highcharts, { PointOptionsObject } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useThemeStore } from "store/theme";
import { ColorsEnum } from "common/theme";
import { useChartDataStore } from "pages/Economic/store";

// TypeScript interface for props
interface ChartProps {
  data:
    | (number | [string | number, number | null] | PointOptionsObject | null)[]
    | undefined;
  seriesSelected: FredSeriesEntry | undefined;
}

function Chart(props: ChartProps) {
  const themeMode = useThemeStore();
  const defaultColorScheme =
    themeMode.mode === "dark" ? ColorsEnum.white : ColorsEnum.black;
  const axisColorScheme =
    themeMode.mode === "dark" ? ColorsEnum.coolgray7 : ColorsEnum.darkGrey;

  const options: Highcharts.Options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      animation: {
        duration: 2000, // Customize duration of the entrance animation (in milliseconds)
        easing: "easeOutBounce", // Customize the easing function (see Highcharts documentation for more options)
      },
    },
    title: {
      text: props.seriesSelected?.title,
      style: {
        fontSize: "12px",
        color: defaultColorScheme,
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        style: { fontSize: "8px", color: axisColorScheme },
      },
    },
    yAxis: {
      labels: {
        style: { fontSize: "8px", color: axisColorScheme },
      },
  title: {
      text: null
  }
    },
    legend: {
      enabled: false, // Disable the legend
    },
    series: [
      {
        name: props.seriesSelected?.id,
        data: props.data,
        type: "line",
        connectNulls: true,
        color: defaultColorScheme,
        animation: {
          duration: 2000, // Customize duration of the entrance animation (in milliseconds)
          easing: "easeOutBounce", // Customize the easing function
        },
        marker: {
          enabled: false,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <HighchartsReact
      containerProps={{ style: { height: "100%" } }}
      highcharts={Highcharts}
      options={options}
    />
  );
}

/**
 * Provides a historical chart view of a single security selected.
 * @returns
 */
export default function Chartview(props: ChartviewProps) {
  const [setChartData, loading, setLoading] = useChartDataStore((state) => [
    state.setChartData,
    state.loading,
    state.setLoading,
  ]);
  const [data, setData] = React.useState<[number, number][]>([]);

  const ticker = props.ticker;

  React.useEffect(() => {
    setLoading(true);
    if (ticker !== "")
      getFredSeries(ticker).then((res: any) => {
        const tickerData = res.data.map((val: any) => [
          new Date(val.date).getTime(),
          val.value,
        ]);
        setData(tickerData);
        setChartData(tickerData);
        setLoading(false);
      });
  }, [props.ticker]);

  return props.ticker !== "" ? (
    loading ? (
      <></>
    ) : !data ? (
      <></>
    ) : (
      <Chart seriesSelected={props.seriesSelected} data={data} />
    )
  ) : (
    <S.NoDataAvailableContainer></S.NoDataAvailableContainer>
  );
}
