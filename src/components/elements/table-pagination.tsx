import { Box, Button, Center, Select } from "@chakra-ui/react";

type TablePaginationProps = {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number; // 0-based index
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentTotalPages: number;
};

export default function TablePagination({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  currentTotalPages,
}: TablePaginationProps) {
  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {

    setPageSize(Number(e.target.value));
    setCurrentPage(0); // Reset to the first page

  };

  return (
    <Center flexDirection="column" gap="space-sm" p="space-md">
      <Select maxW="32" value={pageSize} onChange={handleChangePageSize}>
        {[20, 40, 60, 100].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </Select>
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap="space-xs" maxW="lg">
        {Array.from({ length: currentTotalPages }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i ? "solid" : "ghost"}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1} {/* Display 1-based index */}
          </Button>
        ))}
      </Box>
    </Center>
  );
}










// import { Box, Button, Center, Select } from "@chakra-ui/react";
// // const currentPageStartIndex = currentPage * pageSize; //0 20 40
// // const currentPageEndIndex = currentPageStartIndex + pageSize; //20 40 60
// // const currentTotalPages = Math.ceil(filteredSessions.length / pageSize); // 2 2
// // const currentPages = Math.ceil((currentPageStartIndex / 20 )+1); // 1  2  3
// type TablePaginationProps = {
//   pageSize: number;
//   setPageSize: React.Dispatch<React.SetStateAction<number>>;
//   currentPage: number;
//   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
//   currentTotalPages: number;
// };

// export default function TablePagination({
//   pageSize,
//   setPageSize,
//   currentPage,
//   setCurrentPage,
//   currentTotalPages,
// }: TablePaginationProps) {
//   const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setPageSize(Number(e.target.value));
//     setCurrentPage(0);
//   };

//   return (
//     <Center flexDirection="column" gap="space-sm" p="space-md">
//       <Select maxW="32" value={pageSize} onChange={handleChangePageSize}>
//         {[20, 40, 60, 100].map((pageSize) => (
//           <option key={pageSize} value={pageSize}>
//             Show {pageSize}
//           </option>
//         ))}
//       </Select>
//       <Box display="flex" justifyContent="center" flexWrap="wrap" gap="space-xs" maxW="lg">
//         {Array(currentTotalPages)
//           .fill(null)
//           .map((_, i) => (
//             <Button key={i} variant={currentPage === i ? "solid" : "ghost"} onClick={() => setCurrentPage(i)}>
//               {i + 1}
//             </Button>
//           ))}
//       </Box>
//     </Center>
//   );
// }
