import ProjectTable from './components/ProjectTable'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import MenuTools from '@/components/MenuTools'
import { api } from '@/lib/api'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface ProjectProps {
  id: string
  name: string
  type: string
  image: string
  active: boolean
  deploy: string
  finished: string
}

interface PaginationProps {
  total: number
  pages: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface ProjectPaginationProps {
  pagination: PaginationProps
  projects: ProjectProps[]
}

function App() {
  const [searchParams] = useSearchParams()

  const filter = searchParams.get('filter') ?? ''
  const page = Number(searchParams.get('page') ?? 1)

  const { data: projects } = useQuery<ProjectPaginationProps>({
    queryKey: ['projects', page, filter],
    queryFn: async () => {
      const response = await api.get(
        `/admin/projects?page=${page}&filter=${filter}`,
      )
      return response.data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  return (
    <div className="flex flex-col gap-4 py-3 pb-12">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Seus projetos</h1>
        <p>Gerencie seus projetos</p>
      </div>
      <MenuTools />
      <ProjectTable projects={projects?.projects || []} />
      <div className="flex self-end">
        <Pagination className="w-fit">
          <PaginationContent>
            {projects?.pagination.hasPrevious && (
              <PaginationItem>
                <PaginationPrevious
                  to={`?filter=${filter}&page=${page - 1}`}
                ></PaginationPrevious>
              </PaginationItem>
            )}
            {projects?.pagination.pages && projects?.pagination.pages > 1 && (
              <PaginationItem>
                <PaginationLink to={`?filter=${filter}&page=${page}`}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )}
            {projects?.pagination.hasNext && (
              <PaginationItem>
                <PaginationNext
                  to={`?filter=${filter}&page=${page + 1}`}
                ></PaginationNext>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default App
