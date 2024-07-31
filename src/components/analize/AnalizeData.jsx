import HtmlRender from '@/utils/HtmlRender'
import WithQuery from '@/utils/WithQuery'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '../ui/button';
import { printAnalize } from './printAnalize';

const AnalizeData = ({ id }) => {

  const { data, isLoading } = useQuery({
    queryKey: [`id-a-${id}`], queryFn: async () => {
      const data = await axios.get(`/api/analisis?id=${id}`)
      return data.data
    }
  })

  if (isLoading) {
    return <div>Loading....</div>
  }


  return (
    <div>
     
      <Button onClick={()=>printAnalize(data.title,id)}>Cetak</Button>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Analisis Soal Paling Sering Salah </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Pertanyaan</TableHead>
              <TableHead>Hasil</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium"><HtmlRender data={item.soal} /></TableCell>
                <TableCell className="font-medium">{item.hasil}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>

    </div>
  )
}

export default WithQuery(AnalizeData)