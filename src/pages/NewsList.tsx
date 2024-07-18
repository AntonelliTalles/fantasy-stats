// src/pages/NewsList.tsx

import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import NewsItem from '../components/NewsItem';

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
  // Adicione mais notícias conforme necessário
];

const NewsList: React.FC = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>Notícias</Heading>
      {newsData.map(news => (
        <NewsItem
          key={news.id}
          imageUrl={news.imageUrl}
          title={news.title}
          summary={news.summary}
          link={news.link}
        />
      ))}
    </Box>
  );
};

export default NewsList;
