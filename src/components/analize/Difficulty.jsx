import HtmlRender from '@/utils/HtmlRender'
import WithQuery from '@/utils/WithQuery'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '../ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { lazy, Suspense } from 'react'
import { Skeleton } from '../ui/skeleton'
import { printDifficulty } from './print'
const Card = lazy(() => import('../users/CardUser'))

const Difficulty = ({ id }) => {

    const { data, isLoading } = useQuery({
        queryKey: [`id-a-${id}`], queryFn: async () => {
            const data = await axios.get(`/api/analisis/difficulty?id=${id}`)
            return data.data
        }
    })

    if (isLoading) {
        return <div>Loading....</div>
    }


    return (
        <div>
            <h1 className='text-2xl font-semibold'>Analisis {data.title}</h1>
            <Suspense fallback={
            <div className='grid md:grid-cols-3 gap-2 p-2 grid-cols-1'>
                <Skeleton className={"w-full h-[100px] rounded-md"}/>
                <Skeleton className={"w-full h-[100px] rounded-md"}/>
                <Skeleton className={"w-full h-[100px] rounded-md"}/>
            </div>}>
                <div className='grid md:grid-cols-3 gap-2 p-2 grid-cols-1'>
                    <Card title={`Rata Rata Kesulitan Kuis (${data.overallDifficulty})`} value={data.averageDifficulty} />
                    <Card title={"Rata Rata Sukses"} value={data.overallSuccessRate} />
                    <Card title={data.readyToProceed} value={""} />
                </div>
                <div className="mt-4 text-center text-lg text-red-500">
                    {parseFloat(data.overallSuccessRate) > 70
                        ? "Kuis dianggap sukses karena rata-rata sukses lebih dari 70%."
                        : "Kuis belum sukses karena rata-rata sukses kurang dari 70%."}
                </div>
            </Suspense>
            <Button onClick={()=>printDifficulty(data.title,data.id)}>Cetak</Button>
            <Table>
                <TableCaption>Analisis Kesulitan Soal</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Soal</TableHead>
                        <TableHead>Kesulitan</TableHead>
                        <TableHead>Detail Kesulitan</TableHead>
                        <TableHead>Hasil</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data.map((item, index) => (<TableRow key={index}>
                        <TableCell className="font-medium"><HtmlRender data={item.soal} /></TableCell>
                        <TableCell className="font-medium">{item.kesulitan}</TableCell>
                        <TableCell className="font-medium">{item.detailKesulitan}</TableCell>
                        <TableCell className="font-medium">{item.hasil}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default WithQuery(Difficulty)