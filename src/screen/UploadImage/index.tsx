import { useCloudinary } from '@/hooks/useCloudinary'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileUp } from 'lucide-react'
import { api } from '@/lib/api'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ImageProps {
  id: string
  name: string
  url: string
}

export default function UploadImageScreen() {
  const { uploadImage, removeImage } = useCloudinary()
  const [file, setFile] = useState<File>()

  const { data: images, isFetching } = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const response = await api.get<ImageProps[]>('/images')
      return response.data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const handleRemoveImage = () => {
    setFile(undefined)
  }

  const handleUploadImage = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    uploadImage(formData)
    setFile(undefined)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="mx-auto flex max-w-[600px] flex-col gap-8 pb-12">
      <div className="mt-3 flex flex-col">
        <h1 className="text-2xl font-bold">Upload Images</h1>
        <p className="text-sm text-zinc-400">
          Faça upload de imagens para o seu projeto
        </p>
      </div>
      {!file && !isFetching && (
        <div
          {...getRootProps()}
          className="shandow flex h-[140px] items-center justify-center rounded-md bg-zinc-300 text-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="size-7 text-zinc-800">Solte a imagem aqui...</p>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <FileUp className="size-7 text-zinc-800" />
              <div className="text-lg text-zinc-800">
                <p>Arraste e solte as imagens aqui</p>
                <p className="font-semibold">
                  Renomei a imagem para o nome do projeto
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {file && (
        <div className="flex flex-col gap-3">
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="h-[300px] w-full rounded-md object-contain"
          />
          <div className="flex justify-end gap-3">
            <Button variant="destructive" onClick={handleRemoveImage}>
              Remover imagem
            </Button>
            <Button onClick={handleUploadImage}>Salvar imagem</Button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">Imagens salvas</h2>
        {images && (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="flex flex-col text-center">
                <img
                  src={image.url}
                  alt="preview"
                  className="h-[100px] w-full rounded-md object-contain"
                />
                <span className="text-lg text-zinc-500">{image.name}</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Deletar</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Tem certeza que deseja apagar essa imagem?
                      </DialogTitle>
                      <DialogDescription>
                        Essa ação não pode ser desfeita e a imagem será apagada
                        definitivamente.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Fechar
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeImage(image.name)}
                        >
                          Deletar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
