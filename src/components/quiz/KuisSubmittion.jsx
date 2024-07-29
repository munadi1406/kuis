import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button, buttonVariants } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WithQuery from "@/utils/WithQuery";
import { generatePdf } from "./generatePdf";
import { Skeleton } from "@/components/ui/skeleton"
import {

  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { localTime } from "@/utils/localTime";
import { calculateDuration, getConclusion } from "@/utils/calculateDuration";




const KuisSubmittion = ({ id, title }) => {
  const [quizData, setQuizData] = useState([])

  const { data, isLoading, error } = useQuery({
    queryKey: [`kuis${id}`], queryFn: async () => {
      const submittionData = await axios.get(`/api/score?id=${id}`)
      

      return submittionData.data.data
    }, refetchInterval: 5000
  })

  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [detailData, setDetailData] = useState({})
  const handleIsDetail = (data) => {
    setDetailData(data)
    setDetailIsOpen(!detailIsOpen)
  }

  const detailAnswer = useQuery({
    queryKey: [`data-${detailData.userId}`], queryFn: async () => {
      const { data } = await axios.get(`/api/answer/status?id_u=${detailData.userId}&id_q=${id}`)
      return data.data
    },
    enabled: !!detailData.userId && !!id,
  })


  const columns = [
    {
      accessorKey: 'namaLengkap',
      header: ({ column }) => {
        return (
          <div

            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Lengkap

          </div>
        )
      },
      cell: ({ row }) => <div className="Capitalize">{row.getValue("namaLengkap")}</div>,

    },
    {
      accessorFn: row => (row.score / row.total) * 100,
      id: 'nilai',
      cell: ({ row }) => (row.original.score / row.original.total * 100).toFixed(1),
      header: ({ column }) => (
        <div
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nilai
        </div>
      ),
    },

    {
      accessorKey: 'Aksi',
      cell: ({ row }) => <Button onClick={() => handleIsDetail(row.original)}>Detail</Button>
      ,
      header: '',
    },

  ];
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data: quizData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  })

  useEffect(() => {
    if (!isLoading) {
      setQuizData(data)
    }
  }, [isLoading, data])

  const [duration, setDuration] = useState(null);

  useEffect(() => {
    
    if (detailAnswer.isSuccess ) {
      const { hours, minutes, seconds } = calculateDuration(detailAnswer.data.created_at, detailAnswer.data.updated_at);
      // console.log(hours, minutes)
      setDuration({ hours, minutes, seconds });
    }
  }, [detailAnswer.isSuccess]);

  if (isLoading) {
    return <Skeleton className="w-full h-[300px] rounded-md" />
  }


  return (
    <div className="w-full border rounded-md ">
     
        <Sheet open={detailIsOpen} onOpenChange={setDetailIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detail {detailData.namaLengkap}</SheetTitle>
          </SheetHeader>
          <div className="pt-2 bg-white rounded-lg shadow-md">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left text-gray-600">Deskripsi</th>
                  <th className="border border-gray-300 p-2 text-left text-gray-600">Nilai</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-gray-700">Nama Lengkap</td>
                  <td className="border border-gray-300 p-2 text-gray-700">{detailData.namaLengkap}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-gray-700">Jumlah Soal</td>
                  <td className="border border-gray-300 p-2 text-gray-700">{detailData.total}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-gray-700">Jumlah Jawaban Benar</td>
                  <td className="border border-gray-300 p-2 text-gray-700">{detailData.score}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-gray-700">Jumlah Jawaban Salah Atau Tidak Terjawab</td>
                  <td className="border border-gray-300 p-2 text-gray-700">{detailData.total - detailData.score}</td>
                </tr>
                <tr> 
                  <td className="border border-gray-300 p-2 text-gray-700">Nilai</td>
                  <td className="border border-gray-300 p-2 text-gray-700">{(detailData.score / detailData.total * 100).toFixed(1)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-gray-700">Di Kerjakan Pada</td>
                  <td className="border border-gray-300 p-2 text-gray-700">{!detailAnswer.isFetched ? 'Loading...' : localTime(detailAnswer.data.created_at)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-gray-700">Selesai Pada</td>
                  <td className="border border-gray-300 p-2 text-gray-700">
                    {!detailAnswer.isFetched
                      ? 'Loading...'
                      : localTime(detailAnswer.data.updated_at)
                       }
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-gray-700">Durasi Pengerjaan</td>
                  <td className="border border-gray-300 p-2 text-gray-700">
                    {duration
                      ? `${duration.hours} jam ${duration.minutes} menit ${duration.seconds} detik`
                      : 'Belum selesai'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-gray-700">Keterangan</td>
                  <td className="border border-gray-300 p-2 text-gray-700">{getConclusion(detailData.score, detailData.total)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-gray-700">Lihat Jawaban</td>
                  <td className="border border-gray-300 p-2 text-gray-700">
                    <a href={`/result/${id}/${detailAnswer?.data?.id_user}`} className={buttonVariants()} target="_blank">Jawaban</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </SheetContent>
      </Sheet>
      
      <div className="w-full flex justify-between items-end  border-b  p-2">
        <div >
          <Label htmlFor="search">Search</Label>
          <Input placeholder="Filter Nama Lengkap..."
            value={(table.getColumn("namaLengkap")?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn("namaLengkap")?.setFilterValue(event.target.value)
            }
            className="max-w-sm" />
        </div>
        <div className="flex items-end justify-end gap-2">
          <Button className="w-max h-[40px]" onClick={() => generatePdf(title, id)}>Cetak Nilai</Button>

        </div>
      </div>
      {/* <Table>
        <TableCaption>Daftar Hasil Kuis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead >Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ id_user, namaLengkap, score, total }, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{namaLengkap}</TableCell>
              <TableCell>{(score / total * 100).toFixed(1)}</TableCell>
              <TableCell >
                <Button>Detail</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}

      <div className="min-h-[600px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default WithQuery(KuisSubmittion);
