import type { LocationQueryValue } from 'vue-router'
import type { ResDetailType } from '@/api/modules/resource'

export interface DetailFileProps {
  rescode: string | null | LocationQueryValue[]
  restype: ResDetailType
}
