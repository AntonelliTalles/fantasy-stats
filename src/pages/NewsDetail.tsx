import React from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const newsData = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/600',
    title: 'Notícia 1',
    subtitle: 'Subtítulo da notícia 1',
    caption: 'Legenda da imagem da notícia 1',
    content: 'Texto completo da notícia 1',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/600',
    title: 'Notícia 2',
    subtitle: 'Subtítulo da notícia 2',
    caption: 'Legenda da imagem da notícia 2',
    content: 'Texto completo da notícia 2',
  },
];

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const news = newsData.find(news => news.id.toString() === id);

  if (!news) {
    return <Text>Notícia não encontrada</Text>;
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={2}>{news.title}</Heading>
      <Text mb={4}>{news.subtitle}</Text>
      <Image src={news.imageUrl} alt={news.title} mb={2} />
      <Text mb={4} fontStyle="italic">{news.caption}</Text>
      <Text>{news.content}</Text>
    </Box>
  );
};

export default NewsDetail;
