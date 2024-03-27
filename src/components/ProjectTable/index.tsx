import { Settings, Edit, MonitorOff, MonitorCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useProjects from '@/hooks/useProjects'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import clsx from 'clsx'

interface ProjectProps {
  id: string
  name: string
  type: string
  image: string
  active: boolean
  deploy: string
  finished: string
}

interface ProjectTableProps {
  projects: ProjectProps[]
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const { disableProject, enableProject } = useProjects()

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Deploy in</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects &&
          projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="max-w-[120px]">
                <Link to={`/projects/${project.id}`} className="line-clamp-1">
                  {project.id}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </TableCell>
              <TableCell
                className={clsx('font-medium', {
                  'text-red-500': !project.active,
                  'text-green-500': project.active,
                })}
              >
                {project.active ? 'Ativo' : 'Inativo'}
              </TableCell>
              <TableCell>{project.type}</TableCell>
              <TableCell>
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600"
                >
                  {project.deploy}
                </a>
              </TableCell>
              <TableCell className="flex w-fit gap-4">
                <Popover>
                  <PopoverTrigger>
                    <Settings className="size" />
                  </PopoverTrigger>
                  <PopoverContent className="flex w-fit items-center gap-3 rounded-md  bg-black/30 p-2">
                    <Button variant="default" asChild>
                      <Link
                        to={`/projects/${project.id}/edit`}
                        className="flex items-center gap-2 text-blue-500"
                      >
                        <Edit className="size-5" />
                      </Link>
                    </Button>
                    {project.active ? (
                      <Button
                        variant="destructive"
                        onClick={() => disableProject(project.id)}
                      >
                        <MonitorOff className="size-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        onClick={() => enableProject(project.id)}
                      >
                        <MonitorCheck className="size-4" />
                      </Button>
                    )}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
