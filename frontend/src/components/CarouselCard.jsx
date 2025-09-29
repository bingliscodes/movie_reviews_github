import { Card, Image, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export default function CarouselCard({ title, img, rating, releaseDate, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <Card.Root
      maxW="sm"
      width="auto"
      height="auto"
      margin="1em"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      onClick={handleClick}
    >
      <Card.Header p="0" height="55%">
        <Image
          src={img}
          alt={`Cover image for ${title}`}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Card.Header>

      <Card.Body p="3" flex="1">
        <Text fontSize="md" fontWeight="bold" noOfLines={2}>
          {title}
        </Text>
      </Card.Body>

      <Card.Footer p="3" justifyContent="space-between">
        <Text fontSize="sm">⭐ {Math.round(rating * 10) / 10}</Text>
        <Text fontSize="sm">{new Date(releaseDate).toLocaleDateString()}</Text>
      </Card.Footer>
    </Card.Root>
  );
}
