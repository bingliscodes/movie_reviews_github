import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { ModifyListButton } from "./ModifyListButtons";

export default function SearchResultsPreviewCard({
  title,
  img,
  year,
  mediaType,
  mediaId,
}) {
  return (
    <Flex
      // These dimensions affect the individual movie cards
      width="100%"
      height="auto"
      bg="gray.900"
      color="white"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      p={2}
      gap={4}
      alignItems="flex-start"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500/${img}`}
        alt={`Cover image for ${title}`}
        objectFit="cover"
        width="60px"
        height="90px"
        borderRadius="md"
        flexShrink={0}
      />
      <Box flex="1" overflow="hidden">
        <Text fontWeight="bold" fontSize="md" noOfLines={2}>
          {title}
        </Text>
        <Text fontSize="xs" color="gray.400">
          {year}
        </Text>
        <ModifyListButton mediaType={mediaType} type="wish" mediaId={mediaId} />
      </Box>
    </Flex>
  );
}
