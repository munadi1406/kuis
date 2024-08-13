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
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { Badge } from "../ui/badge";
import { toast } from "../ui/use-toast";
import ButtonLoader from "../ButtonLoader";




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
  const resetAnswer = useMutation({
    mutationFn: async (resetData) => {
      const reset = await axios.post('/api/answer/reset', {
        nisn: resetData.nisn,
        idQuiz: resetData.idQuiz
      })
      return reset.data
    },
    onSuccess: (data) => {
     
      toast({
        title: "Berhasil",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  })
  const resetAll = useMutation({
    mutationFn: async () => {
      const reset = await axios.post('/api/answer/resetAll', {
        idQuiz: id
      })
      return reset.data
    },
    onSuccess: (data) => {
      
      toast({
        title: "Berhasil",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  })



  const detailAnswer = useQuery({
    queryKey: [`data-${detailData.nisn}`], queryFn: async () => {
      const { data } = await axios.get(`/api/answer/status?id_u=${detailData.nisn}&id_q=${id}`)
      return data.data
    },
    enabled: !!detailData.nisn && !!id,
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
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <div

            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status Pengerjaan

          </div>
        )
      },
      cell: ({ row }) => <div className="Capitalize">
        {row.getValue("status") ? <Badge className={"bg-green-600"}>Sudah Mengerjakan</Badge> : <Badge className={"bg-red-600"}>Belum Mengerjakan</Badge>}
      </div>,

    },
    {
      accessorKey: 'Aksi',
      cell: ({ row }) =>
        row.getValue('status') ? <div className="flex flex-wrap gap-2">
          <Button onClick={() => handleIsDetail(row.original)}>Detail</Button>
          <Button className={"bg-blue-600"} disabled={resetAnswer.isPending} onClick={() => resetAnswer.mutate({ nisn: row.original.nisn, idQuiz: id })} >Reset</Button>
        </div> : "Detail Tidak Tersedia"

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

    if (detailAnswer.isSuccess) {
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
        <SheetContent className="overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Detail {detailData.namaLengkap}</SheetTitle>
          </SheetHeader>
          <div className="pt-2 shadow-md ">
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
                    <a href={`/result/${id}/${detailAnswer?.data?.nisn}`} className={buttonVariants()} target="_blank">Jawaban</a>
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
        <ButtonLoader className="w-max h-[40px] bg-red-600" onClick={() => resetAll.mutate()} text={"Reset Semua Jawaban"} loading={resetAll.isPending} disabled={resetAll.isPending}/>

        </div>
      </div>
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
