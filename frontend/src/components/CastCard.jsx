import { Card, Image, Text } from "@chakra-ui/react";

export default function CastCard({ actorName, characterName, img, id }) {
  return (
    <Card.Root
      maxW="sm"
      width="auto"
      height="auto"
      margin="1em"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Card.Header p="0" height="55%">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${img}`}
          alt={`Image for ${actorName}`}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Card.Header>

      <Card.Body p="3" flex="1">
        <Text fontSize="md" fontWeight="bold" noOfLines={2}>
          {actorName}
        </Text>
        <Text fonrSize="sm">{characterName}</Text>
      </Card.Body>
    </Card.Root>
  );
}
