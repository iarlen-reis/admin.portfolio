import { convertStatus } from '@/utils/convertStatus'
import { Dot, Github, Rocket } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { convertType } from '@/utils/convertType'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import useProjects from '@/hooks/useProjects'
import { api } from '@/lib/api'
import clsx from 'clsx'

interface ProjectProps {
  id: string
  name: string
  type: string
  active: boolean
  image: string
  deploy: string
  github: string
  finished: string
  started: string
  description: string
  technologies: string[]
}

export default function ProjectDetail() {
  const { id } = useParams()
  const { disableProject, enableProject } = useProjects()

  const { data: project } = useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const response = await api.get<ProjectProps>(`/projects/${id}`)

      return response.data
    },
  })

  return (
    <div className="mx-auto mt-4 max-w-[600px] pb-12">
      {project && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-zinc-400">
              {convertType(project.type)} |
              <span
                className={clsx('ml-2', {
                  'text-green-500': project.active,
                  'text-red-500': !project.active,
                })}
              >
                {convertStatus(project.active)}
              </span>
            </p>
            <p className="text-zinc-400">
              {project?.started} - {project.finished}
            </p>
          </div>
          <div className="w-full">
            <img
              src={project.image}
              alt={`Imagem do projeto ${project?.name}`}
              className="w-full rounded-md shadow"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="destructive">
              <a href={project.deploy} target="_blank" rel="noreferrer">
                <Rocket className="size-5" />
              </a>
            </Button>
            <Button asChild>
              <a href={project.github} target="_blank" rel="noreferrer">
                <Github className="size-5" />
              </a>
            </Button>
          </div>
          <ul className="grid grid-cols-3">
            {project.technologies.map((technology) => (
              <li key={technology} className="flex items-center gap-1">
                <Dot className="size-5" />
                {technology}
              </li>
            ))}
          </ul>
          <p>{project.description}</p>
          <div className="flex items-center justify-end gap-3">
            <Button>
              <Link to={`/projects/${id}/edit`}>Editar</Link>
            </Button>
            {project.active ? (
              <Button
                variant="destructive"
                onClick={() => disableProject(project.id)}
              >
                Desativar
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => enableProject(project.id)}
              >
                Ativar
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
