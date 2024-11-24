import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import WithQuery from "@/utils/WithQuery";
import { localTime } from "./../../utils/localTime.js";
import { toast } from "../ui/use-toast.js";
import EditMapel from "./EditMapel.jsx";
import { generatePdf } from "./generatePdf.js";
import ButtonLoader from "../ButtonLoader.jsx";
import Charts from "react-apexcharts";

const KelasData = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [kelas, setKelas] = useState("");
  const [msg, setMsg] = useState("");
  const [currentData, setCurrentData] = useState({ id: 0, kelas: 0 });
  const [query, setQuery] = useState("");

  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["kelas"],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(
        `/api/kelas?id=${pageParam || 0}&search=${query}`
      );
      return response.data;
    },

    getNextPageParam: (lastPage) => lastPage.data.lastId,
    staleTime: 5000,
    initialPageParam: 0,
  });

  const { mutate } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const createMapel = await axios.post("api/kelas", {
        dataKelas: kelas,
      });
      return createMapel;
    },
    onSuccess: (data) => {
      refetch();
      setIsDialogOpen(false);
      toast({
        title: "Berhasil",
        description: `Mata Pelajaran Berhasil Di Tambahkan`,
      });
    },
    onError: (error) => {
      setMsg(error.response.data.message);
      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Mata Pelajaran Gagal Di Tambahkan`,
      });
    },
  });
  const deleteMapel = useMutation({
    mutationFn: async (id) => {
      const isDelete = await axios.delete(`api/kelas?id=${id}`);
      return isDelete;
    },
    onSuccess: (data) => {
      refetch();
      toast({
        title: "Berhasil",
        description: `Mata Pelajaran Berhasil Di Hapus`,
      });
    },
    onError: (error) => {

      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Mata Pelajaran Gagal Di Hapus`,
      });
    },
  });
  const updateMapel = useMutation({
    mutationFn: async ({ e, id, kelas }) => {
      e.preventDefault();
      const isUpdate = await axios.put(`api/kelas`, {
        id,
        dataKelas: kelas,
      });
      return isUpdate;
    },
    onSuccess: (data) => {
      refetch();
      setIsDialogEditOpen(false);
      toast({
        title: "Berhasil",
        description: `Mata Pelajaran Berhasil Di Update`,
      });
    },
    onError: (error) => {

      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Mata Pelajaran Gagal Di Update`,
      });
    },
  });
  let searchTimeout;
  const search = (e) => {
    const query = e.target.value;
    if (query.length >= 1) {

      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(async () => {
        setQuery(query);
      }, 2000);
    } else {
      setQuery("");
    }
  };

  useEffect(() => {
    refetch();
  }, [query]);
  const statKelas = useQuery({
    queryKey: ["statKelas"],
    queryFn: async () => {
      const datas = await axios.get("/api/kelas/stat");
      return datas.data.data;
    },
  });
  // console.log('statKelas', statKelas.data)
  const [statKelasData, setStatKelasData] = useState({ labels: [], datas: [] })
  useEffect(() => {
    // console.log('data kkelas oke')
    // console.log(statKelas?.data?.length)
    if (statKelas.data) {
      // console.log("oke")
      const labels = statKelas?.data.data.map((item) => item.kelas); // Mengambil nama kelas
      // console.log({ labels });

      const datas = statKelas?.data.data.map((stat) => stat.totalSiswa); // Mengambil total siswa di setiap kelas

      setStatKelasData({ labels, datas }); // Mengatur data ke state
    }
  }, [statKelas.data]);

  if (isLoading || statKelas.isLoading) {
    return <>Loading...</>;
  }


  return (
    <div>
      <div className="w-full flex flex-wrap gap-2 md:justify-between items-end  border-b  p-2">
        <div className="w-full pb-4">
        <Charts
  type="bar"
  options={{
    chart: {
      type: 'bar',
      height: 380
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true, // Mengaktifkan warna berbeda untuk setiap bar
        borderRadius: 10
      }
    },
    colors: ['#33b2df', '#546E7A', '#FF5733', '#28B463', '#8E44AD', '#F4D03F'], // Warna berbeda untuk setiap bar
    dataLabels: {
      enabled: true
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: statKelasData.labels, // Menetapkan label (nama kelas)
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true, // Menampilkan label Y-axis
        formatter: function (val) {
          return val; // Hanya menampilkan jumlah total siswa
        }
      }
    },
    title: {
      text: `Grafik Siswa`,
      align: 'center',
      floating: true
    },
  }}
  series={[
    {
      name: "Total Students", // Nama series
      data: statKelasData.datas, // Data array untuk total siswa
    },
  ]}
  height={350}
/>

        </div>
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            type="search"
            id="search"
            placeholder="Search"
            onChange={search}
          />
        </div>
        <div className="flex items-end justify-end gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                Buat Kelas
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Buat kelas</DialogTitle>
                <DialogDescription className="text-red-600 text-xs">
                  {msg}
                </DialogDescription>
              </DialogHeader>
              <form autoComplete="false" onSubmit={mutate} method="post">
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="email" className="text-right">
                      Kelas
                    </Label>
                    <Input
                      id="email"
                      name="kelas"
                      type="text"
                      className="col-span-3"
                      onChange={(e) => setKelas(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Tambah Kelas</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => generatePdf(data.pages)}
            disabled={!data || data.length <= 0}
          >
            Cetak
          </Button>
        </div>
      </div>
      <Table>
        <TableCaption>Daftar Kelas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Laki-laki</TableHead>
            <TableHead>Perempuan</TableHead>
            <TableHead>Total Siswa</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.pages &&
            data.pages
              .flatMap((page) => page.data.data)
              .map(({ created_at, id, kelas, totalLakiLaki, totalPerempuan, totalSiswa }, i) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{kelas}</TableCell>
                  <TableCell>{totalLakiLaki}</TableCell>
                  <TableCell>{totalPerempuan}</TableCell>
                  <TableCell>{totalSiswa}</TableCell>
                  <TableCell>{localTime(created_at)}</TableCell>
                  <TableCell className="flex items-center gap-2 flex-wrap">
                    <Button
                      onClick={() => {
                        setIsDialogEditOpen(true),
                          setCurrentData({ id, kelas });
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => deleteMapel.mutate(id)} variant="destructive">
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <ButtonLoader
          text={`${isFetchingNextPage ? "Loading..." : "Load More"}`}
          loading={isFetchingNextPage}
          onClick={fetchNextPage}
          disabled={isFetchingNextPage}
        />
      )}
      <EditMapel
        isDialogOpen={isDialogEditOpen}
        setIsDialogOpen={setIsDialogEditOpen}
        data={currentData}
        mutate={updateMapel}
      />
    </div>
  );
};

export default WithQuery(KelasData);
