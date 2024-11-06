import dynamic from "next/dynamic";
import type { Props } from "react-apexcharts";

const Chart = dynamic<Props>(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => null,
});

export default Chart;
