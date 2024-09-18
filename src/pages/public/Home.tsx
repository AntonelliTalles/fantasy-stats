import React from 'react';
import { Flex, Box, Heading, Grid } from '@chakra-ui/react';
import Carousel from '../../components/Carousel';
import NewsItem from '../../components/NewsItem';

const newsData = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/64',
    title: 'Notícia 1',
    summary: 'Resumo da notícia 1',
    link: '/news/1',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/64',
    title: 'Notícia 2',
    summary: 'Resumo da notícia 2',
    link: '/news/2',
  },
];

const Home: React.FC = () => {
  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
      <Box w="full" maxW="container.lg" mb={8}>
        <Carousel />
      </Box>
      <Box w="full" maxW="container.lg">
        <Heading as="h2" size="lg" mb={6}>Últimas Notícias</Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
          {newsData.map(news => (
            <NewsItem
              key={news.id}
              imageUrl={news.imageUrl}
              title={news.title}
              summary={news.summary}
              link={news.link}
            />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Home;
