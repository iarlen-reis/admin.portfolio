import { useAuthentication } from '@/hooks/useAuthentication'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

interface LoginProps {
  email: string
  password: string
}

export default function LoginScreen() {
  const { handleLogin } = useAuthentication()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>()

  return (
    <div className="mx-auto mt-10 flex min-h-[300px] w-[400px] flex-col gap-5 rounded-lg bg-zinc-50 p-3 shadow-md">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-zinc-400">
          Faça login para acessar o sistema.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-3"
      >
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm uppercase text-zinc-500">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'E-mail obrigatório.' })}
            className="w-full rounded bg-zinc-200 px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm uppercase text-red-400">
              {errors.email.message}
            </p>
          )}
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm uppercase text-zinc-500">
            Senha
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Senha obrigatória.' })}
            className="w-full rounded bg-zinc-200 px-3 py-2"
          />
          {errors.password && (
            <p className="text-sm uppercase text-red-400">
              {errors.password.message}
            </p>
          )}
        </fieldset>
        <div className="flex justify-end">
          <Button type="submit">Entrar</Button>
        </div>
      </form>
    </div>
  )
}
