import React from 'react';
import { Box, Image, Text, Link as ChakraLink, Spinner } from '@chakra-ui/react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchNews } from '../api/news';
import { News } from 'types/news';

const NewsList = () => {
  const { data, error, isLoading }: UseQueryResult<News[]> = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading news</div>;

  return (
    <Box>
      {data?.map((newsItem) => (
        <Box key={newsItem.id} display="flex" mb={4}>
          <Image src={newsItem.imageUrl} alt={newsItem.title} boxSize="64px" objectFit="cover" mr={4} />
          <Box>
            <ChakraLink href={`/news/${newsItem.id}`} fontSize="xl" fontWeight="bold">
              {newsItem.title}
            </ChakraLink>
            <Text>{newsItem.summary}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default NewsList;
