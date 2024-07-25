import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WithQuery from "@/utils/WithQuery";
import { generatePdf } from "./generatePdf";


const KuisSubmittion = ({ id,title }) => {
  console.log(id)
  const { data, isLoading, error } = useQuery({
    queryKey: [`kuis${id}`], queryFn: async () => {
      const submittionData = await axios.get(`/api/score?id=${id}`)
      return submittionData.data.data
    }, refetchInterval: 5000
  })
  console.log(error)
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full border rounded-md ">
      {console.log(data)}
      <div className="w-full flex justify-between items-end  border-b  p-2">
        <div >
          <Label htmlFor="search">Search</Label>
          <Input type="search" id="search" placeholder="Search" />
        </div>
        <div className="flex items-end justify-end gap-2">
          <Button className="w-max h-[40px]" onClick={()=>generatePdf(title,id)}>Cetak</Button>
          <Button className="w-max h-[40px]" >Cetak Soal</Button>
        </div>
      </div>
      <Table>
        <TableCaption>Daftar Hasil Kuis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ id_user, namaLengkap, score, total }, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{namaLengkap}</TableCell>
              <TableCell>{(score / total * 100).toFixed(1)}</TableCell>
              <TableCell className="text-right">
                oke
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default WithQuery(KuisSubmittion);
