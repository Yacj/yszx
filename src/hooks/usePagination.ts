import { reactive } from 'vue'
import type { TdPaginationProps } from 'tdesign-vue-next/es/pagination/type'

interface PaginationOptions extends TdPaginationProps {}
interface DefaultPagination {
  total: number
  pageSizeOptions: TdPaginationProps['pageSizeOptions']
  pageSize: number
  currentPage: number
  options: PaginationOptions
}
interface PaginationData {
  total?: number
  currentPage?: number
  pageSizeOptions?: TdPaginationProps['pageSizeOptions']
  pageSize?: number
  options?: PaginationOptions
}

const defaultPagination: DefaultPagination = {
  total: 0,
  pageSizeOptions: [10, 20, 30, 50],
  pageSize: 10,
  currentPage: 1,
  options: {
    showJumper: true,
    totalContent: false,
    showFirstAndLastPageBtn: true,
  },
}

export function usePagination(data: PaginationData = {}) {
  const pagination = reactive({ ...defaultPagination, ...data })

  const handleSizeChange = (val: number) => {
    pagination.pageSize = val
  }

  const handleCurrentChange = (val: number) => {
    pagination.currentPage = val
  }

  const handlePageChange = (pageInfo: { current: number; pageSize: number }) => {
    pagination.currentPage = pageInfo.current
    pagination.pageSize = pageInfo.pageSize
  }
  return {
    pagination,
    handleSizeChange,
    handleCurrentChange,
    handlePageChange,
  }
}
