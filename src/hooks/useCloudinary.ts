import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { toast } from 'sonner'

interface UseCloudinaryProps {
  uploadImage: (file: FormData) => void
  removeImage: (slug: string) => void
}

export const useCloudinary = (): UseCloudinaryProps => {
  const queryClient = useQueryClient()

  const { mutate: uploadImage } = useMutation({
    mutationFn: async (file: FormData) => {
      const response = await api.post('/uploads', file)

      return response.data
    },
    onSuccess: () => {
      setTimeout(() => {
        toast.success('Imagem salva com sucesso!', {
          action: {
            label: 'Fechar',
            onClick: () => toast.dismiss(),
          },
        })
        queryClient.invalidateQueries({ queryKey: ['images'] })
      }, 3000)
    },
    onError: () => {
      toast.error('Erro ao salvar imagem, tente novamente.', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },
  })

  const { mutate: removeImage } = useMutation({
    mutationFn: async (slug: string) => {
      const response = await api.delete(`/uploads/${slug}`)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] })

      toast.success('Imagem apagada com sucesso!', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },
    onError: () => {
      toast.error('Erro ao apagar imagem, tente novamente.', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
    },
  })

  return {
    uploadImage,
    removeImage,
  }
}
