import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

interface ChildrenProps {
  children: React.ReactNode
}
export default function PrivateRoute({ children }: ChildrenProps) {
  const [cookies] = useCookies(['token'])

  return cookies.token ? <>{children}</> : <Navigate to="/login" />
}
