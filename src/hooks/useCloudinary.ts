import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface UseCloudinaryProps {
  uploadImage: (file: FormData) => void
}

export const useCloudinary = (): UseCloudinaryProps => {
  const queryClient = useQueryClient()

  const { mutate: uploadImage } = useMutation({
    mutationFn: async (file: FormData) => {
      const response = await api.post('/upload', file)

      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] })

      toast.success('Imagem salva com sucesso!', {
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })
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

  return {
    uploadImage,
  }
}
