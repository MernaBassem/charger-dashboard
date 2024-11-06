import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Pagination from "../../components/elements/pagination";
import Layout from "../../components/layout/layout";
import SessionsFilters from "../../components/sessions/sessions-filters";
import SessionsTable from "../../components/sessions/sessions-table";
import { appConfig } from "../../config";
import { Session } from "../../types/session";

export default function Sessions() {
  const PAGE_TITLE = "Sessions";
  const [sessionData, setSessionData] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // 0-based indexing
  const [pageSize, setPageSize] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSessionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  const getSessionData = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        "https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/sessions",
        {
          params: {
            page: currentPage + 1, // API expects 1-based indexing
            limit: pageSize,
          },
        }
      );
      setSessionData(res.data.data.sessions);
      setFilteredSessions(res.data.data.sessions); // Ensure filters are applied here if needed
      setTotalItems(res.data.data.totalItems);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
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
      </Box>

      <Card bgColor="bg.clear">
        <SessionsFilters
          setFilteredSessions={setFilteredSessions}
          sessionData={sessionData}
        />
        <SessionsTable
          sessionData={filteredSessions}
          currentPage={currentPage}
          pageSize={pageSize}
          isLoading={isLoading}
        />
        <Pagination
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
        />
      </Card>
    </>
  );
}

Sessions.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ---------------------------
// import { Box, Card, Heading } from "@chakra-ui/react";
// import Head from "next/head";
// import { useEffect, useState } from "react";
// import TablePagination from "../../components/elements/table-pagination";
// import Layout from "../../components/layout/layout";
// import SessionsFilters from "../../components/sessions/sessions-filters";
// import SessionsTable from "../../components/sessions/sessions-table";
// import { appConfig } from "../../config";
// import { Session } from "../../types/session";
// import axios from "axios";

// export default function Sessions() {
//   const PAGE_TITLE = "Sessions";
//   const [sessiondata, setSessionData] = useState<Session[]>([]);
//   const [filteredSessions, setFilteredSessions] = useState<Session[]>(sessiondata);
//   const [currentPagee, setCurrentPagee] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(20);
//   const currentPageStartIndex = currentPagee * pageSize; //0 20 40
//   const currentPageEndIndex = currentPageStartIndex + pageSize; //20 40 60
//   // const currentTotalPages = Math.ceil(filteredSessions.length / pageSize); // 2 2
//   const [currentTotalPages,setcurrentTotalPages]=useState(1); // 2 2
//   console.log('pageSize',pageSize);
//   // console.log('currentPageStartIndex',currentPageStartIndex);
//   // console.log('currentPageEndIndex',currentPageEndIndex);
//   useEffect(() => {
//     getSessionData();

//   }, []);
//   useEffect(() => {
//     if(currentTotalPages >1){
//       getSessionData();

//     }
//   }, [currentPage,currentPageStartIndex,currentPageEndIndex]);

//   const getSessionData = async () => {
//     try {
//       const res = await axios.get('https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/sessions', {
//         params: {
//           page: currentPage , // API expects page to start from 1
//           limit: pageSize,
//         }
//       });
//       console.log("inside currentPage",currentPage);
//       console.log("inside pageSize",pageSize);
//       setSessionData(res.data.data.sessions);
//       setFilteredSessions(res.data.data.sessions);
//       console.log("res.data.data.currentPage",res.data.data);
//       // setCurrentPagee(res.data.data.currentPage);
//       setCurrentPage(res.data.data.currentPage);
//       setcurrentTotalPages(res.data.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching session data:', error);
//     }
//   };
//   console.log(currentPage);  //1
//   console.log(currentTotalPages);  //2
//   console.log(pageSize);//20

//   console.log(currentPageStartIndex); //0  //20
// console.log(currentPageEndIndex); //20 40
//   return (
//     <>
//       <Head>
//         <title>{`${PAGE_TITLE} | ${appConfig.title}`}</title>
//       </Head>

//       <Box
//         as="header"
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         gap="space-md"
//         px="space-md"
//         py="space-sm"
//       >
//         <Heading as="h1" size="lg">
//           {PAGE_TITLE}
//         </Heading>
//       </Box>

//       <Card bgColor="bg.clear">
//         <SessionsFilters
//           setFilteredSessions={setFilteredSessions}
//           currentPageStartIndex={currentPageStartIndex}
//           currentPageEndIndex={currentPageEndIndex}
//         />
//         <SessionsTable
//           filteredSessions={filteredSessions}
//           currentPageStartIndex={currentPageStartIndex}
//           currentPageEndIndex={currentPageEndIndex}
//         />
//         <TablePagination
//           pageSize={pageSize}
//           setPageSize={setPageSize}
//           currentPage={currentPagee}
//           setCurrentPage={setCurrentPagee}
//           currentTotalPages={currentTotalPages}
//         />
//       </Card>
//     </>
//   );
// }

// Sessions.getLayout = function (page: React.ReactElement) {
//   return <Layout>{page}</Layout>;
// };

// -------------------
// import { Box, Card, Heading } from "@chakra-ui/react";
// import Head from "next/head";
// import { useEffect, useState } from "react";
// import TablePagination from "../../components/elements/table-pagination";
// import Layout from "../../components/layout/layout";
// import SessionsFilters from "../../components/sessions/sessions-filters";
// import SessionsTable from "../../components/sessions/sessions-table";
// import { appConfig } from "../../config";
// import { Session } from "../../types/session";
// import axios from "axios";

// export default function Sessions() {
//   const PAGE_TITLE = "Sessions";
//   const [sessiondata, setSessionData] = useState<Session[]>([]);
//   const [filteredSessions, setFilteredSessions] = useState<Session[]>(sessiondata);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const currentPageStartIndex = currentPage * pageSize; //0 20 40
//   const currentPageEndIndex = currentPageStartIndex + pageSize; //20 40 60
//   const currentTotalPages = Math.ceil(filteredSessions.length / pageSize); // 2 2
//   const currentPages = Math.ceil((currentPageStartIndex / 20) + 1); // 1 2 3
// console.log('pageSize',pageSize);
// console.log('currentPageStartIndex',currentPageStartIndex);
// console.log('currentPageEndIndex',currentPageEndIndex);
//   useEffect(() => {
//     getSessionData();
//   }, [currentPages]);

//   const getSessionData = async () => {
//     await axios.get(`https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/sessions?page=currentPageStartIndex&limit=currentTotalPages`).then((res) => {
//       setSessionData(res.data.data.sessions);
//       setFilteredSessions(res.data.data.sessions);
//     });
//   };

//   return (
//     <>
//       <Head>
//         <title>{`${PAGE_TITLE} | ${appConfig.title}`}</title>
//       </Head>

//       <Box
//         as="header"
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         gap="space-md"
//         px="space-md"
//         py="space-sm"
//       >
//         <Heading as="h1" size="lg">
//           {PAGE_TITLE}
//         </Heading>
//       </Box>

//       <Card bgColor="bg.clear">
//         <SessionsFilters
//           setFilteredSessions={setFilteredSessions}
//           currentPageStartIndex={currentPageStartIndex}
//           currentPageEndIndex={currentPageEndIndex}
//         />
//         <SessionsTable
//           filteredSessions={filteredSessions}
//           currentPageStartIndex={currentPageStartIndex}
//           currentPageEndIndex={currentPageEndIndex}
//         />
//         <TablePagination
//           pageSize={pageSize}
//           setPageSize={setPageSize}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           currentTotalPages={currentTotalPages}
//         />
//       </Card>
//     </>
//   );
// }

// Sessions.getLayout = function (page: React.ReactElement) {
//   return <Layout>{page}</Layout>;
// };

// -----------------------------

// import { Box, Card, Heading } from "@chakra-ui/react";
// import Head from "next/head";
// import { useEffect, useState } from "react";
// import TablePagination from "../../components/elements/table-pagination";
// import Layout from "../../components/layout/layout";
// import SessionsFilters from "../../components/sessions/sessions-filters";
// import SessionsTable from "../../components/sessions/sessions-table";
// import { appConfig } from "../../config";
// import { Session } from "../../types/session";
// import axios from "axios";

// export default function Sessions() {
//   const PAGE_TITLE = "Sessions";
//   const [sessiondata, setSessionData] = useState<Session[]>([]);
//   const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     getSessionData();
//   }, [currentPage, pageSize]);

//   const getSessionData = async () => {
//     try {
//       const response = await axios.get('https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/sessions', {
//         params: {
//           page: currentPage + 1, // API expects page to start from 1
//           limit: pageSize,
//         }
//       });
//       console.log('API Response:', response.data);
//       const newSessions = response.data.data.sessions;
//       setSessionData(newSessions);
//       setFilteredSessions(newSessions);
//       setTotalItems(response.data.data.totalItems);
//       setTotalPages(response.data.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching session data:', error);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>{`${PAGE_TITLE} | ${appConfig.title}`}</title>
//       </Head>

//       <Box
//         as="header"
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         gap="space-md"
//         px="space-md"
//         py="space-sm"
//       >
//         <Heading as="h1" size="lg">
//           {PAGE_TITLE}
//         </Heading>
//       </Box>

//       <Card bgColor="bg.clear">
//         <SessionsFilters
//           setFilteredSessions={setFilteredSessions}
//           currentPageStartIndex={currentPage * pageSize}
//           currentPageEndIndex={(currentPage + 1) * pageSize}
//         />
//         <SessionsTable
//           filteredSessions={filteredSessions}
//           currentPageStartIndex={currentPage * pageSize}
//           currentPageEndIndex={(currentPage + 1) * pageSize}
//         />
//         <TablePagination
//           pageSize={pageSize}
//           setPageSize={setPageSize}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           currentTotalPages={totalPages}
//         />
//       </Card>
//     </>
//   );
// }

// Sessions.getLayout = function (page: React.ReactElement) {
//   return <Layout>{page}</Layout>;
// };
