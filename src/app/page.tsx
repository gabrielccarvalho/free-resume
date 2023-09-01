import { Header } from '@/components/header'
import { FAQ, Jumbotron, Plans, Process } from '@/containers'

export default function Home() {
  return (
    <>
      <Header />
      <Jumbotron />
      <Process />
      <Plans />
      <FAQ />
    </>
  )
}
