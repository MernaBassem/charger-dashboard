import {
  Box,
  BoxProps,
  Card,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Select,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import {
  TbBolt,
  TbChargingPile,
  TbChartBar,
  TbPlugConnected,
} from "react-icons/tb";
import Chart from "../components/elements/chart";
import Layout from "../components/layout/layout";
import { appConfig } from "../config";

// import { chargerStatusUiMapping, chargerStatuses } from "../data/chargers";

import {
  monthlyEnergy,
  monthlyRevenue,
  totalChargers,
  totalEnergy,
  totalRevenue,
  totalSessions,
} from "../data/charts";

function GridItem({
  children,
  ...boxProps
}: { children: React.ReactNode } & BoxProps) {
  return (
    <Box display="flex" sx={{ "& > *": { flexGrow: 1 } }} {...boxProps}>
      {children}
    </Box>
  );
}

export default function Overview() {
  const PAGE_TITLE = "Overview";
  const [period, setPeriod] = useState("LAST_12_MONTHS");
  const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
  };
  const periods: Record<string, string> = {
    LAST_30_DAYS: "Last 30 days",
    LAST_12_MONTHS: "Last 12 months",
    ALL_TIME: "All time",
  };

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
        <Box>
          <FormControl display="flex" alignItems="baseline">
            <FormLabel>Period</FormLabel>
            <Select
              value={period}
              onChange={handleChangePeriod}
              bgColor="bg.clear"
            >
              <option value="LAST_30_DAYS">{periods["LAST_30_DAYS"]}</option>
              <option value="LAST_12_MONTHS">
                {periods["LAST_12_MONTHS"]}
              </option>
              <option value="ALL_TIME">{periods["ALL_TIME"]}</option>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box px="space-md">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="space-sm"
        >
          <GridItem gridColumn={{ base: "span 12", lg: "span 3" }}>
            <Card
              display="flex"
              flexDirection="column"
              p="space-sm"
              bgColor="bg.clear"
            >
              <HStack justifyContent="space-between" gap="space-sm">
                <Box>
                  <Text fontSize="lg" fontWeight="medium">
                    Total Chargers
                  </Text>
                </Box>
                <Center borderRadius="md" p="space-xs" bgColor="primary.100">
                  <Icon as={TbChargingPile} boxSize="6" color="primary.dark" />
                </Center>
              </HStack>
              <Heading as="h6" size="lg">
                {totalChargers.toLocaleString()}
              </Heading>
            </Card>
          </GridItem>
          <GridItem gridColumn={{ base: "span 12", lg: "span 3" }}>
            <Card
              display="flex"
              flexDirection="column"
              p="space-sm"
              bgColor="bg.clear"
            >
              <HStack justifyContent="space-between" gap="space-sm">
                <Box>
                  <Text fontSize="lg" fontWeight="medium">
                    Total Sessions
                  </Text>
                  <Box as="span" fontSize="xs">
                    {periods[period]}
                  </Box>
                </Box>
                <Center borderRadius="md" p="space-xs" bgColor="primary.100">
                  <Icon as={TbPlugConnected} boxSize="6" color="primary.dark" />
                </Center>
              </HStack>
              <Heading as="h6" size="lg">
                {totalSessions[period].toLocaleString()}
              </Heading>
            </Card>
          </GridItem>
          <GridItem gridColumn={{ base: "span 12", lg: "span 3" }}>
            <Card
              display="flex"
              flexDirection="column"
              p="space-sm"
              bgColor="bg.clear"
            >
              <HStack justifyContent="space-between" gap="space-sm">
                <Box>
                  <Text fontSize="lg" fontWeight="medium">
                    Total Energy
                  </Text>
                  <Box as="span" fontSize="xs">
                    {periods[period]}
                  </Box>
                </Box>
                <Center borderRadius="md" p="space-xs" bgColor="primary.100">
                  <Icon as={TbBolt} boxSize="6" color="primary.dark" />
                </Center>
              </HStack>
              <Heading as="h6" size="lg">
                {totalEnergy[period].toLocaleString()}
                <Box as="span" fontSize="xs">
                  {" "}
                  kWh
                </Box>
              </Heading>
            </Card>
          </GridItem>
          <GridItem gridColumn={{ base: "span 12", lg: "span 3" }}>
            <Card
              display="flex"
              flexDirection="column"
              p="space-sm"
              bgColor="bg.clear"
            >
              <HStack justifyContent="space-between" gap="space-sm">
                <Box>
                  <Text fontSize="lg" fontWeight="medium">
                    Total Revenue
                  </Text>
                  <Box as="span" fontSize="xs">
                    {periods[period]}
                  </Box>
                </Box>
                <Center borderRadius="md" p="space-xs" bgColor="primary.100">
                  <Icon as={TbChartBar} boxSize="6" color="primary.dark" />
                </Center>
              </HStack>
              <Heading as="h6" size="lg">
                {totalRevenue[period].toLocaleString()}
                <Box as="span" fontSize="xs">
                  {" "}
                  EGP
                </Box>
              </Heading>
            </Card>
          </GridItem>
          <GridItem gridColumn={{ base: "span 12", lg: "span 4" }}>
            <Card p="space-sm" bgColor="bg.clear">
              <Text mb="space-sm" fontWeight="semibold">
                Charger Type
              </Text>
              <Chart
                type="pie"
                height={240}
                series={[16, 24]}
                options={{
                  chart: {
                    toolbar: {
                      show: true,
                    },
                  },
                  dataLabels: {
                    formatter(val: number, opts: any) {
                      return (
                        opts.w.config.series[
                          opts.seriesIndex
                        ].toLocaleString() + " Chargers"
                      );
                    },
                    offsetY: -25,
                  },
                  plotOptions: {
                    pie: {
                      dataLabels: {
                        offset: -20,
                      },
                    },
                  },
                  labels: ["AC", "DC"],
                  legend: {
                    position: "bottom",
                  },
                }}
              />
            </Card>
          </GridItem>

          <GridItem gridColumn={{ base: "span 12", lg: "span 4" }}>
            <Card p="space-sm" bgColor="bg.clear">
              <Text mb="space-sm" fontWeight="semibold">
                Charger Condition
              </Text>
              <Box display="flex" gap="space-sm">
                <Box w="50%" pt="space-sm" textAlign="center">
                  <Text fontWeight="medium">Functional</Text>
                  <Chart
                    type="radialBar"
                    height={200}
                    series={[80]}
                    options={{
                      chart: {
                        toolbar: {
                          show: true,
                        },
                      },
                      colors: ["#38A169"],
                      labels: ["32 Chargers"],
                      plotOptions: {
                        radialBar: {
                          dataLabels: {
                            name: {
                              show: true,
                              fontSize: "12px",
                              fontWeight: 400,
                              offsetY: 15,
                              color: "#000000",
                            },
                            value: {
                              fontSize: "18px",
                              fontWeight: 600,
                              offsetY: -25,
                            },
                          },
                          hollow: {
                            size: "60%",
                          },
                          track: {
                            background: "#C6F6D5",
                          },
                        },
                      },
                    }}
                  />
                </Box>
                <Box w="50%" pt="space-sm" textAlign="center">
                  <Text fontWeight="medium">Not Functional</Text>
                  <Chart
                    type="radialBar"
                    height={200}
                    series={[20]}
                    options={{
                      chart: {
                        toolbar: {
                          show: true,
                        },
                      },
                      colors: ["#F56565"],
                      labels: ["8 Chargers"],
                      plotOptions: {
                        radialBar: {
                          dataLabels: {
                            name: {
                              show: true,
                              fontSize: "12px",
                              fontWeight: 400,
                              offsetY: 15,
                              color: "#000000",
                            },
                            value: {
                              fontSize: "18px",
                              fontWeight: 600,
                              offsetY: -25,
                            },
                          },
                          hollow: {
                            size: "60%",
                          },
                          track: {
                            background: "#FED7D7",
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </GridItem>
          <GridItem gridColumn={{ base: "span 12", lg: "span 4" }}>
            <Card p="space-sm" bgColor="bg.clear">
              <Text mb="space-sm" fontWeight="semibold">
                Charger Status
              </Text>
              <Chart
                type="pie"
                height={240}
                series={[40, 30, 20, 10]}
                options={{
                  chart: {
                    toolbar: {
                      show: true,
                    },
                  },
                  // labels: chargerStatuses.map((s) => chargerStatusUiMapping[s].label),
                  legend: {
                    position: "bottom",
                  },
                  plotOptions: {
                    pie: {
                      dataLabels: {
                        offset: -10,
                      },
                    },
                  },
                }}
              />
            </Card>
          </GridItem>

          <GridItem gridColumn={{ base: "span 12", lg: "span 12" }}>
            <Card p="space-sm" bgColor="bg.clear">
              <Text mb="space-sm" fontWeight="semibold">
                Energy{" "}
                <Text as="span" fontSize="sm" fontWeight="normal">
                  (Last 12 months)
                </Text>
              </Text>
              <Chart
                type="bar"
                height={200}
                series={[
                  {
                    name: "Energy",
                    data: monthlyEnergy.map((item) => item.energy),
                  },
                ]}
                options={{
                  chart: {
                    toolbar: {
                      show: true,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  plotOptions: {
                    bar: {
                      columnWidth: "25%",
                    },
                  },
                  tooltip: {
                    y: {
                      formatter: (val) => val.toLocaleString("en") + " kWh",
                    },
                  },
                  xaxis: {
                    categories: monthlyEnergy.map((item) => item.month),
                  },
                  yaxis: {
                    labels: {
                      formatter: (val) => val.toLocaleString("en") + " kWh",
                    },
                  },
                }}
              />
            </Card>
          </GridItem>

          <GridItem gridColumn={{ base: "span 12", lg: "span 12" }}>
            <Card p="space-sm" bgColor="bg.clear">
              <Text mb="space-sm" fontWeight="semibold">
                Revenue{" "}
                <Text as="span" fontSize="sm" fontWeight="normal">
                  (Last 12 months)
                </Text>
              </Text>
              <Chart
                type="bar"
                height={200}
                series={[
                  {
                    name: "Revenue",
                    data: monthlyRevenue.map((item) => item.revenue),
                  },
                ]}
                options={{
                  chart: {
                    toolbar: {
                      show: true,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  plotOptions: {
                    bar: {
                      columnWidth: "25%",
                    },
                  },
                  tooltip: {
                    y: {
                      formatter: (val) => val.toLocaleString("en") + " EGP",
                    },
                  },
                  xaxis: {
                    categories: monthlyRevenue.map((item) => item.month),
                  },
                  yaxis: {
                    labels: {
                      formatter: (val) => val.toLocaleString("en") + " EGP",
                    },
                  },
                }}
              />
            </Card>
          </GridItem>
        </Box>
      </Box>
    </>
  );
}

Overview.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
