import { useAuthentication } from '@/hooks/useAuthentication'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'

export default function Header() {
  const { handleLogout, isAuthenticated } = useAuthentication()

  return (
    <header className="w-full bg-zinc-900 py-4">
      <div className="container mx-auto flex items-center justify-between px-3">
        <Link to="/">
          <h1 className="text-base font-bold uppercase text-white transition-all hover:opacity-80">
            Admin.Portfolio
          </h1>
        </Link>
        <ul>
          {isAuthenticated && (
            <li>
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <LogOut className="size-3" />
                Sair
              </Button>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}
