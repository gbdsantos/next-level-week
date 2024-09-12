// import { useEffect, useState } from 'react'

import { CreateGoal } from './components/create-goal'
import { Dialog } from './components/ui/dialog'
import { EmptyGoals } from './components/empty-goals'
import { Summary } from './components/summary'
import { useQuery } from '@tanstack/react-query'

import { getSummary } from './http/get-summary'

// type SummaryResponse = {
//   completed: number
//   total: number
//   goalsPerDay: Record<
//     string,
//     {
//       id: string
//       title: string
//       completedAt: string
//     }[]
//   >
// }

export function App() {
  // FETCHING DATA WITH useEffect
  // const [summary, setSummary] = useState<SummaryResponse | null>(null)

  // useEffect(() => {
  //   fetch('http://localhost:3333/summary')
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       setSummary(data.summary)
  //     })
  // }, [])

  // FETCHING DATA WITH TANSTACK QUERY
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
