import { Box, filter, Tag, TagLabel, Text } from "@chakra-ui/react";

type FilterTagsProps = {
  filters: Record<string, string[]>;
};
export default function FilterTags({ filters }: FilterTagsProps) {
  const hasNoAppliedFilters = Object.keys(filters).every(
    (k) => filters[k].length === 0 || (filters[k].length === 1 && filters[k][0] === "")
  );


  return (
    <Box display="flex" alignItems="center" gap="space-xs">
      {hasNoAppliedFilters ? (
        <Text>No filters applied</Text>
      ) : (
        <>
          <Text>Applied filters: </Text>
          {Object.keys(filters).map((key) =>
            filters[key].map((o, i) => (
              <Tag key={i} variant="outline" borderRadius="full">
                <TagLabel textTransform="capitalize">
                  {key}:{" "}
                  <Text as="span" fontWeight="normal">
                    {o}
                  </Text>
                </TagLabel>
              </Tag>
            ))
          )}
        </>
      )}
    </Box>
  );
}
