import { Card, Image, Text } from "@chakra-ui/react";

export default function CastCard({ actorName, characterName, img, id }) {
  return (
    <Card.Root
      width="auto"
      height="30rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Card.Header p="0" height="65%">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${img}`}
          alt={`Image for ${actorName}`}
          objectFit="cover"
          width="100%"
          height="100%"
          onClick={() => window.open(`https://www.themoviedb.org/person/${id}`)}
        />
      </Card.Header>

      <Card.Body p="3" flex="1">
        <Text fontSize="md" fontWeight="bold">
          {actorName}
        </Text>
      </Card.Body>
    </Card.Root>
  );
}
