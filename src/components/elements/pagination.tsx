import { Box, Button, Center, Select } from "@chakra-ui/react";
import React from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

type PaginationProps = {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
};

const Pagination = ({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalItems,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Center flexDirection="column" gap="space-sm" p="space-md">
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap="space-xs" maxW="lg">
          <Select
            maxW="32"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            mr="space-sm"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </Select>
        </Box>
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap="space-xs" maxW="lg">
          <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
          <TbPlayerTrackPrev />
          

          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i ? "solid" : "ghost"}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1} {/* Display 1-based index */}
            </Button>
          ))}
          <Button onClick={handleNextPage} disabled={currentPage >= totalPages - 1} ml="space-sm">
          <TbPlayerTrackNext />

          </Button>
        </Box>
      </Center>
     
    </>
  );
};

export default Pagination;
