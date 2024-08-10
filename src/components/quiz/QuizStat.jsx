import WithQuery from "@/utils/WithQuery"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Skeleton } from "../ui/skeleton"
import { Suspense, lazy } from "react"
import SkeletonQuizStat from "./SkeletonQuizStat"
import { Button } from "react-day-picker"
const CardUser = lazy(() => import("../users/CardUser"))



const QuizStat = ({ id }) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`stat-${id}`], queryFn: async () => {
      const datas = await axios.get(`/api/quiz/stat?id=${id}`)
      return datas.data.data
    }
  })

  if (isLoading) {

    return <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
      <SkeletonQuizStat />
    </div>
  }
  if (isError) {
    return <Button onClick={refetch}>Refresh</Button>
  }


  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
      <Suspense fallback={<SkeletonQuizStat />}>

        <CardUser title={"Jumlah Kuis Dikerjakan"} value={data.quizSelesai} />
        <CardUser title={"Jumlah Kuis Belum Dikerjakan"} value={(data.siswaCount - data.quizSelesai)} />
        <CardUser title={"Nilai Tertinggi"} value={data.nilaiTertinggi} />
        <CardUser title={"Nilai Terendah"} value={data.nilaiTerendah} />
        <CardUser title={"Jumlah Siswa"} value={data.siswaCount} />
        <CardUser title={"Jumlah Soal"} value={data.totalQuestions} />
      </Suspense>
    </div>
  )
}

export default WithQuery(QuizStat)