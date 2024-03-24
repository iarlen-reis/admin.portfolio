import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

export default function RootScreen() {
  return (
    <div className="w-full">
      <Header />
      <main className="container mx-auto px-3">
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}
