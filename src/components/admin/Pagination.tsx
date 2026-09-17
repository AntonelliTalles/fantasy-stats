import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface PaginationProps {
  currentPage: number
  totalPages: number

  totalItems: number
  startItem: number
  endItem: number

  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  startItem,
  endItem,
  onPageChange,
}: PaginationProps) => {
  const activeBg = useColorModeValue('blue.500', 'blue.400')
  const activeColor = useColorModeValue('white', 'gray.900')

  const getVisiblePages = () => {
    const pages: number[] = []

    const start = Math.max(
      1,
      Math.min(currentPage - 2, totalPages - 4)
    )

    const end = Math.min(totalPages, start + 4)

    for (let page = start; page <= end; page++) {
      pages.push(page)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  if (totalItems === 0) {
    return null
  }

  return (
    <Flex
      mt={6}
      pt={4}
      borderTopWidth="1px"
      align={{ base: 'stretch', md: 'center' }}
      justify="space-between"
      direction={{ base: 'column', md: 'row' }}
      gap={4}
    >
      <Text
        fontSize="sm"
        color="gray.500"
        textAlign={{ base: 'center', md: 'left' }}
      >
        Mostrando{' '}
        <Text as="span" fontWeight="bold">
          {startItem}
        </Text>
        {' – '}
        <Text as="span" fontWeight="bold">
          {endItem}
        </Text>
        {' de '}
        <Text as="span" fontWeight="bold">
          {totalItems}
        </Text>{' '}
        registros
      </Text>

      <HStack
        spacing={2}
        justify={{ base: 'center', md: 'flex-end' }}
        flexWrap="wrap"
      >
        <Button
          size="sm"
          variant="outline"
          isDisabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
        >
          Anterior
        </Button>

        <ButtonGroup size="sm" isAttached={false}>
          {visiblePages.map((page) => {
            const isActive = page === currentPage

            return (
              <Button
                key={page}
                minW="36px"
                variant={isActive ? 'solid' : 'outline'}
                bg={isActive ? activeBg : undefined}
                color={isActive ? activeColor : undefined}
                _hover={
                  isActive
                    ? {
                        bg: activeBg,
                      }
                    : undefined
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            )
          })}
        </ButtonGroup>

        <Button
          size="sm"
          variant="outline"
          isDisabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
        >
          Próxima
        </Button>
      </HStack>
    </Flex>
  )
}

export default Pagination