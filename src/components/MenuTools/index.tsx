import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Filter } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function MenuTools() {
  return (
    <div className="flex items-center justify-end gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <Filter className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link to="?filter=web">Web</Link>
            </Button>
            <Button asChild>
              <Link to="?filter=backend">Back-end</Link>
            </Button>
            <Button asChild>
              <Link to="?filter=mobile">Mobile</Link>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Button asChild>
        <Link to="/projects/new">Novo Projeto</Link>
      </Button>
    </div>
  )
}
