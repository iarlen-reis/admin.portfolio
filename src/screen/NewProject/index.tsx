import { FormProvider, useForm } from 'react-hook-form'
import TextAreaField from '@/components/TextAreaField'
import SelectField from '@/components/SelectField'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import TextField from '@/components/TextField'
import useProjects from '@/hooks/useProjects'
import { api } from '@/lib/api'

interface ProjectProps {
  name: string
  type: string
  image: string
  deploy: string
  github: string
  finished: string
  started: string
  description: string
  technologies: string
}

interface ImageProps {
  id: string
  name: string
  url: string
}

export default function NewProjectScreen() {
  const { createProject } = useProjects()
  const methods = useForm<ProjectProps>()

  const { data: images } = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const response = await api.get<ImageProps[]>('/images')

      return response.data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const handleCreateProject = (data: ProjectProps) => {
    createProject({
      ...data,
      technologies: data.technologies.split(', '),
    })
  }

  return (
    <div className="flex w-full flex-col gap-8 pb-12">
      <div className="mt-3 flex flex-col">
        <h1 className="text-2xl font-bold">Criar um novo projeto</h1>
        <p className=" text-zinc-400">Crie um novo projeto de forma fácil</p>
      </div>
      <form
        onSubmit={methods.handleSubmit(handleCreateProject)}
        className="flex w-full flex-col gap-3"
      >
        <FormProvider {...methods}>
          <div className="grid grid-cols-2 gap-4">
            <TextField name="name" label="Nome do projeto" type="text" />
            <TextField name="type" label="Tipo de projeto" type="text" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField name="deploy" label="Link para deploy" type="text" />
            <TextField name="github" label="Link para github" type="text" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField name="started" label="Iniciado em" type="text" />
            <TextField name="finished" label="Finalizado em" type="text" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectField name="image" label="Imagem" options={images} />
            <TextField name="technologies" label="Tecnologias" type="text" />
          </div>
          <TextAreaField name="description" label="Descricão" />
        </FormProvider>
        <div className="flex justify-end">
          <Button type="submit">Criar projeto</Button>
        </div>
      </form>
    </div>
  )
}
