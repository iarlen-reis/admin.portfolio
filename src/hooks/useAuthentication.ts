import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { isAxiosError } from 'axios'
import { api } from '@/lib/api'
import { toast } from 'sonner'

interface LoginProps {
  email: string
  password: string
}

interface UseAuthenticationProps {
  handleLogout: () => void
  isAuthenticated: boolean
  handleLogin: (data: LoginProps) => void
}

export const useAuthentication = (): UseAuthenticationProps => {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['token'])

  const isAuthenticated = !!cookies.token

  const handleLogin = async (data: LoginProps) => {
    try {
      const response = await api.post('/users/auth', data)

      setCookie('token', response.data.Token, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
      })

      toast.success('Login efetuado com sucesso!', {
        description: 'Redirecionando para o sistema.',
        action: {
          label: 'Fechar',
          onClick: () => toast.dismiss(),
        },
      })

      return navigate('/')
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error('Usuário ou senha inválidos.', {
          description: 'Corrija os dados e tente novamente.',
          action: {
            label: 'Fechar',
            onClick: () => toast.dismiss(),
          },
        })
      }
    }
  }
  const handleLogout = () => {
    setCookie('token', '', { path: '/' })
  }

  return {
    handleLogin,
    handleLogout,
    isAuthenticated,
  }
}
