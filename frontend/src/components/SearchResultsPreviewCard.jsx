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
      bg="bg.menuItem"
      width="100%"
      color="text"
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
      <Box flex="1">
        <Text fontWeight="bold" fontSize="md" noOfLines={2}>
          {title}
        </Text>
        <Text fontSize="xs" color="text">
          {year}
        </Text>
        <ModifyListButton
          mediaType={mediaType}
          listType="wishlist"
          mediaId={mediaId}
        />
      </Box>
    </Flex>
  );
}
