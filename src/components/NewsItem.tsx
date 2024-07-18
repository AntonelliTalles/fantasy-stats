// src/components/NewsItem.tsx

import React from 'react';
import { Box, Image, Link, Text } from '@chakra-ui/react';

interface NewsItemProps {
  imageUrl: string;
  title: string;
  summary: string;
  link: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ imageUrl, title, summary, link }) => {
  return (
    <Box display="flex" alignItems="center" mb={4}>
      <Image src={imageUrl} boxSize="64px" alt={title} />
      <Box ml={4}>
        <Link href={link} fontWeight="bold" fontSize="lg">
          {title}
        </Link>
        <Text mt={2}>{summary}</Text>
      </Box>
    </Box>
  );
};

export default NewsItem;
