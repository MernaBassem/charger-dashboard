import { Box, BoxProps, Card, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Chart from "../../components/elements/chart";
import Layout from "../../components/layout/layout";
import { appConfig } from "../../config";
import { primaryColor } from "../../theme/foundations/colors";
import { useEffect, useState } from "react";
import axios from "axios";


interface RevenueData {
  AC: number;
  DC: number;
}
function GridItem({ children, ...boxProps }: BoxProps & { children: React.ReactNode }) {
  return (
    <Box display="flex" sx={{ "& > *": { flexGrow: 1 } }} {...boxProps}>
      {children}
    </Box>
  );
}

export default function Revenue() {
  type revenueData ={
    avgYear :number,
    avgMonth:number,
    totalYear:number,
    totalMonth:number,
  }
  type Top5Revenue ={
    revenue:number,
    owner:string
  }
  type dataACandDC = {
    AC: number;
    DC: number;
}

  const PAGE_TITLE = "Revenue";
  const[revData,setRevData]=useState<revenueData | null>(null);
  const [top5revenueData, setTop5RevenueData] = useState<Top5Revenue[] | null>(null);
  const [MonthrevenueData, setMonthRevenueData] = useState({});
  const [dataAC,setdata]=useState< dataACandDC|undefined>(
    { AC: 0, DC: 0 } 
  )
  const AC = dataAC?.AC ?? 0;
const DC = dataAC?.DC ?? 0;

useEffect(()=>{
  getRevenueData()
  top5revenue()
  data()
  monthRevenue()

},[])

const getRevenueData = async()=>{
 await axios.get('https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/revenue/calculate').then((res)=>{
  setRevData(res.data.data);
 }).catch((err)=>{
  console.log(err);
 })
}
const top5revenue=async()=>{
await axios.get('https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/revenue/top5revenue').then((res)=>{
  setTop5RevenueData(res.data.data);
 
}).catch((error)=>{
  console.log(error);
})
}
const data =async()=>{
  await axios.get("https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/revenue/typeRevenues").then((res)=>{
    setdata(res.data.data);
  })
}
const monthRevenue=async()=>{
  await axios.get('https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/revenue/months')
  .then((res)=>{
    setMonthRevenueData(res.data.data);
    console.log(MonthrevenueData);
    console.log(Object.values(MonthrevenueData));
    console.log(Object.entries(MonthrevenueData));

  })
  .catch((err)=>{
    console.log(err);
  })
}
console.log(Object.values(MonthrevenueData));
  return (
    <>
      <Head>
        <title>{`${PAGE_TITLE} | ${appConfig.title}`}</title>
      </Head>

      <Box
        as="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="space-md"
        px="space-md"
        py="space-sm"
      >
        <Heading as="h1" size="lg">
          {PAGE_TITLE}
        </Heading>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="space-md" p="space-md" pt="0">
        <GridItem gridColumn={{ base: "span 12", lg: "span 3" }}>
          <Card border="1px" borderColor="primary.main" p="space-md" bgColor="bg.clear">
            <Box mb="space-xs">
              <Text color="primary.dark" fontWeight="semibold">
                Total Revenue
              </Text>{" "}
              <Text as="span" fontSize="sm">
                (Current month)
              </Text>
            </Box>
            <Box>
              <Text as="span" fontFamily="heading" fontSize="3xl" fontWeight="bold">
                {revData?.totalMonth}
              </Text>{" "}
              <Text as="span" fontSize="sm" fontWeight="medium">
                EGP
              </Text>
            </Box>
          </Card>
        </GridItem>

        <GridItem gridColumn={{ base: "span 12", lg: "span 3" }}>
          <Card border="1px" borderColor="primary.main" p="space-md" bgColor="bg.clear">
            <Box mb="space-xs">
              <Text color="primary.dark" fontWeight="semibold">
                Avg. Revenue / Session
              </Text>{" "}
              <Text as="span" fontSize="sm">
                (Current month)
              </Text>
            </Box>
            <Box>
              <Text as="span" fontFamily="heading" fontSize="3xl" fontWeight="bold">
                {revData?.avgMonth.toFixed(1)}
              </Text>{" "}
              <Text as="span" fontSize="sm" fontWeight="medium">
                EGP / Session
              </Text>
            </Box>
          </Card>
        </GridItem>

        <GridItem gridColumn={{ base: "span 12", lg: "span 3" }}>
          <Card border="1px" borderColor="primary.main" p="space-md" bgColor="bg.clear">
            <Box mb="space-xs">
              <Text color="primary.dark" fontWeight="semibold">
                Total Revenue
              </Text>{" "}
              <Text as="span" fontSize="sm">
                (This Year)
              </Text>
            </Box>
            <Box>
              <Text as="span" fontFamily="heading" fontSize="3xl" fontWeight="bold">
               {revData?.totalYear}
              </Text>{" "}
              <Text as="span" fontSize="sm" fontWeight="medium">
                EGP
              </Text>
            </Box>
          </Card>
        </GridItem>

        <GridItem gridColumn={{ base: "span 12", lg: "span 3" }}>
          <Card border="1px" borderColor="primary.main" p="space-md" bgColor="bg.clear">
            <Box mb="space-xs">
              <Text color="primary.dark" fontWeight="semibold">
                Avg. Revenue / Session
              </Text>{" "}
              <Text as="span" fontSize="sm">
              (This Year)
              </Text>
            </Box>
            <Box>
              <Text as="span" fontFamily="heading" fontSize="3xl" fontWeight="bold">
                {revData?.avgYear.toFixed(1)}
              </Text>{" "}
              <Text as="span" fontSize="sm" fontWeight="medium">
                EGP / Session
              </Text>
            </Box>
          </Card>
        </GridItem>

        <GridItem gridColumn={{ base: "span 12", lg: "span 6" }}>
          <Card border="1px" borderColor="border" p="space-md" bgColor="bg.clear">
            <Box mb="space-xs">
              <Text as="span" color="primary.dark" fontWeight="semibold">
                Revenue By Charger
              </Text>{" "}
              <Text as="span" fontSize="sm">
                (Current month)
              </Text>
            </Box>
            <Chart
              type="pie"
              height={250}
              options={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                },
                dataLabels: {
                  formatter(val: number, opts: any) {
                    return opts.w.config.series[opts.seriesIndex].toLocaleString() + " EGP";
                  },
                  offsetY: -25,
                },
                plotOptions: {
                  pie: {
                    dataLabels: {
                      offset: -40,
                    },
                  },
                },
                labels: ["AC Revenue", "DC Revenue"],
              }}
              series={[AC / (AC + DC),
                DC / (AC + DC)]
              }
            
            />
          </Card>
        </GridItem>

        <GridItem gridColumn={{ base: "span 12", lg: "span 6" }}>
          <Card border="1px" borderColor="border" p="space-md" bgColor="bg.clear">
            <Box mb="space-xs">
              <Text as="span" color="primary.dark" fontWeight="semibold">
                Top 5 Revenue By Owner
              </Text>{" "}
              <Text as="span" fontSize="sm">
                (Current month)
              </Text>
            </Box>
            <Chart
              type="bar"
              height={250}
              options={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                },
                plotOptions: {
                  bar: {
                    barHeight: "50%",
                    dataLabels: {
                      position: "bottom",
                    },
                    horizontal: true,
                  },
                },
                tooltip: {
                  y: {
                    formatter: (val: number) => val.toLocaleString("en") + " EGP",
                  },
                },
                dataLabels: {
                  offsetX: 25,
                  formatter: (val) => val.toLocaleString() + " EGP",
                },
                xaxis: {
                 
                  categories: top5revenueData?.map((i) => i.owner) || [],
                },
              }}
              series={[{ name: "Revenue", data: top5revenueData?.map((i) => i.revenue) || [], color: primaryColor[500] }]}
            />
          </Card>
        </GridItem>

        <GridItem gridColumn="span 12">
          <Card border="1px" borderColor="border" p="space-lg" bgColor="bg.clear" h="full">
            <Box mb="space-xs">
              <Text as="span" color="primary.dark" fontWeight="semibold">
                Monthly Revenue
              </Text>{" "}
              <Text as="span" fontSize="sm">
                (Last 12 months)
              </Text>
            </Box>
            <Chart
              type="bar"
              height={300}
              options={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                plotOptions: {
                  bar: {
                    columnWidth: "40%",
                  },
                },
                tooltip: {
                  y: {
                    formatter: (val: number) => val.toLocaleString("en") + " EGP",
                  },
                },
                xaxis: {
                  categories: MonthrevenueData && Object.keys(MonthrevenueData).length > 0 ? Object.keys(MonthrevenueData) : [], // Fallback to empty array
                },
                yaxis: {
                  labels: {
                    formatter: (val: number) => val.toLocaleString("en") + " EGP",
                  },
                },
              }}
              series={[
                {
                  name: "Total Revenue",
                  data: Object.values(MonthrevenueData).length > 0
                  ? Object.values(MonthrevenueData).map((item) => (item as RevenueData).AC + (item as RevenueData).DC|| 0) 
: [],                              },
                {
                  name: "AC Revenue",
                  data: Object.values(MonthrevenueData).length > 0
                  ? Object.values(MonthrevenueData).map((item) => (item as RevenueData).AC || 0) 
: [],                },
                {
                  name: "DC Revenue",
                  data: Object.values(MonthrevenueData).length > 0
                  ? Object.values(MonthrevenueData).map((item) => (item as RevenueData).DC || 0) : [],   
                             },
              ]}
            />
          </Card>
        </GridItem>
      </Box>
    </>
  );
}

Revenue.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
