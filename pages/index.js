import Image from 'next/image'
import { Inter } from 'next/font/google'
import DrawingCanvas from '@/components/DrawingCanvas'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center `}
    >
      <h1 className='text-3xl mb-10 mt-10'>DFA EDITOR</h1>
   <DrawingCanvas></DrawingCanvas>
    </main>
  )
}
