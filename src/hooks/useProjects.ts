import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '@/lib/api'
import { toast } from 'sonner'

interface ProjectProps {
  id?: string
  title: string
  type: string
  status?: boolean
  image: string
  deploy: string
  github: string
  finished: string
  started: string
  description: string
  technologies: string[]
}

interface UseProjectsProps {
  createProject: (data: ProjectProps) => void
  editProject: (data: ProjectProps) => void
  disableProject: (id: string) => void
  enableProject: (id: string) => void
}

export default function useProjects(): UseProjectsProps {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const filter = searchParams.get('filter') ?? ''
  const page = Number(searchParams.get('page') ?? 1)

  const { mutate: createProject } = useMutation({
    mutationFn: async (data: ProjectProps) => {
      const response = await api.post<ProjectProps>('/admin/projects', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      return response.data
    },
    onSuccess: (data: ProjectProps | undefined) => {
      toast.success('Projeto criado com sucesso!', {
        description: 'Redirecionando para o sistema.',
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
      queryClient.invalidateQueries({ queryKey: ['projects'] })

      navigate(`/projects/${data?.id}`)
    },
    onError: () => {
      toast.error('Erro ao criar projeto, tente novamente.', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },
  })

  const { mutate: editProject } = useMutation({
    mutationFn: async (data: ProjectProps) => {
      const response = await api.put<ProjectProps>(
        `/admin/projects/${data.id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )

      return response.data
    },
    onSuccess: (data: ProjectProps | undefined) => {
      queryClient.invalidateQueries({ queryKey: ['projects', page, filter] })
      queryClient.invalidateQueries({ queryKey: ['projects', data?.id] })

      toast.success('Projeto editado com sucesso!', {
        description: `O projeto ${data?.title} foi editado.`,
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })

      navigate(`/projects/${data?.id}`)
    },

    onError: () => {
      toast.error('Erro ao editar projeto, tente novamente.', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },
  })

  const { mutate: disableProject } = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete<ProjectProps>(
        `/admin/projects/${id}/disable`,
        {
          withCredentials: true,
        },
      )

      return response.data
    },
    onSuccess: (data: ProjectProps | undefined) => {
      queryClient.invalidateQueries({ queryKey: ['projects', page, filter] })
      queryClient.invalidateQueries({ queryKey: ['projects', data?.id] })

      toast.success('Projeto desativado com sucesso!', {
        description: `O projeto ${data?.title} foi desativado.`,
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },
    onError: () => {
      toast.error('Erro ao desativar projeto, tente novamente.', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },
  })

  const { mutate: enableProject } = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch<ProjectProps>(
        `/admin/projects/${id}/enable`,
      )

      return response.data
    },
    onSuccess: (data: ProjectProps | undefined) => {
      queryClient.invalidateQueries({ queryKey: ['projects', page, filter] })
      queryClient.invalidateQueries({ queryKey: ['projects', data?.id] })

      toast.success('Projeto ativado com sucesso!', {
        description: `O projeto ${data?.title} foi ativado.`,
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },
    onError: () => {
      toast.error('Erro ao ativar projeto, tente novamente.', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },
  })

  return {
    editProject,
    createProject,
    disableProject,
    enableProject,
  }
}
