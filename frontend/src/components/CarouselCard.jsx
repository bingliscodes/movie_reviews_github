import {
  Card,
  Image,
  Text,
  CardBody,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export default function CarouselCard({ title, img, rating, releaseDate, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <Card
      maxW="sm"
      width="auto"
      height="auto"
      margin="1em"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      onClick={handleClick}
    >
      <CardHeader p="0" height="55%">
        <Image
          src={img}
          alt={`Cover image for ${title}`}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </CardHeader>

      <CardBody p="3" flex="1">
        <Text fontSize="md" fontWeight="bold" noOfLines={2}>
          {title}
        </Text>
      </CardBody>

      <CardFooter p="3" justifyContent="space-between">
        <Text fontSize="sm">⭐ {Math.round(rating * 10) / 10}</Text>
        <Text fontSize="sm">{new Date(releaseDate).toLocaleDateString()}</Text>
      </CardFooter>
    </Card>
  );
}
