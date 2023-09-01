import { Header } from '@/components/header'
import { Jumbotron, Plans, Process } from '@/containers'

export default function Home() {
  return (
    <>
      <Header />
      <Jumbotron />
      <Process />
      <Plans />
    </>
  )
}
