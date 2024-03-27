import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

export default function RootScreen() {
  const client = new QueryClient()

  return (
    <div className="w-full">
      <Header />
      <QueryClientProvider client={client}>
        <main className="container mx-auto px-3">
          <Outlet />
        </main>
      </QueryClientProvider>
      <Toaster />
    </div>
  )
}
