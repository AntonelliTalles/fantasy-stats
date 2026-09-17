import { useEffect, useMemo, useState } from 'react'

interface UsePaginationProps<T> {
  items: T[]
  itemsPerPage?: number
}

export function usePagination<T>({
  items,
  itemsPerPage = 10,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalItems = items.length

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / itemsPerPage)
  )

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1

  const endItem = Math.min(
    currentPage * itemsPerPage,
    totalItems
  )

  return {
    currentPage,
    setCurrentPage,

    totalPages,
    totalItems,

    paginatedItems,

    startItem,
    endItem,
  }
}