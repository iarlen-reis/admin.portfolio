import { FormProvider, useForm } from 'react-hook-form'
import TextAreaField from '@/components/TextAreaField'
import SelectField from '@/components/SelectField'
import { useQuery } from '@tanstack/react-query'
import TextField from '@/components/TextField'
import { Button } from '@/components/ui/button'
import useProjects from '@/hooks/useProjects'
import { useParams } from 'react-router-dom'
import { api } from '@/lib/api'

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

interface ImageProps {
  id: string
  name: string
  url: string
}

export default function ProjectEditScreen() {
  const methods = useForm<ProjectProps>()
  const { editProject } = useProjects()
  const { id } = useParams()

  const { data: images } = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const response = await api.get<ImageProps[]>('/images')

      return response.data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const { data: project } = useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const response = await api.get<ProjectProps>(`/projects/${id}`)

      return response.data
    },
  })

  const handleEditProject = (data: ProjectProps) => {
    editProject({
      ...data,
      id: project?.id,
      // @ts-expect-error next-line
      technologies: data.technologies.split(', ') as string[],
    })
  }

  return (
    <div className="mt-4 flex w-full flex-col gap-8 pb-12">
      {project && (
        <div className="flex w-full flex-col gap-5">
          <div className="mt-3 flex flex-col">
            <h1 className="text-2xl font-bold">Editar {project.name}</h1>
            <p className="text-zinc-400">
              Faça a edição do seu projeto de forma simples.
            </p>
          </div>
          <form
            className="flex flex-col gap-3"
            onSubmit={methods.handleSubmit(handleEditProject)}
          >
            <FormProvider {...methods}>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name="name"
                  label="Nome do projeto"
                  type="text"
                  defaultValue={project.name}
                />
                <TextField
                  name="type"
                  label="Tipo de projeto"
                  type="text"
                  defaultValue={project.type}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name="deploy"
                  label="Link para deploy"
                  type="text"
                  defaultValue={project.deploy}
                />
                <TextField
                  name="github"
                  label="Link para github"
                  type="text"
                  defaultValue={project.github}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name="started"
                  label="Inicado em"
                  type="text"
                  defaultValue={project.started}
                />
                <TextField
                  name="finished"
                  label="Finalizado em"
                  type="text"
                  defaultValue={project.finished}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  name="image"
                  label="Imagem"
                  defaultValue={project.image}
                  options={images}
                />
                <TextField
                  name="technologies"
                  label="Tecnologias"
                  type="text"
                  defaultValue={project.technologies
                    .map((tech) => tech)
                    .join(', ')}
                />
              </div>
              <TextAreaField
                name="description"
                label="Descricão"
                defaultValue={project.description}
              />
            </FormProvider>
            <div className="flex justify-end gap-4">
              <Button type="submit">Editar projeto</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
