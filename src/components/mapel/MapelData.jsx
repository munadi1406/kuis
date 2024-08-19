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
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import WithQuery from "@/utils/WithQuery";
import { localTime } from "./../../utils/localTime.js";
import { toast } from "../ui/use-toast.js";
import EditMapel from "./EditMapel.jsx";
import { generatePdf } from "./generatePdf.js";
import ButtonLoader from "../ButtonLoader.jsx";

const MapelData = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [mapel, setMapel] = useState("");
  const [msg, setMsg] = useState("");
  const [currentData, setCurrentData] = useState({ id: 0, mapel: 0 });
  const [query, setQuery] = useState("");

  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["mapel"],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(
        `/api/mapel?id=${pageParam || 0}&search=${query}`
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
      const createMapel = await axios.post("api/mapel", {
        mataPelajaran: mapel,
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
      const isDelete = await axios.delete(`api/mapel?id=${id}`);
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
    mutationFn: async ({ e, id, mapel }) => {
      e.preventDefault();
      const isUpdate = await axios.put(`api/mapel`, {
        id,
        mataPelajaran: mapel,
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
    if (query.length > 3) {
      // setIsSearch(true);
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

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <div className="w-full flex justify-between items-end  border-b  p-2">
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
                Buat Mapel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Buat Mapel</DialogTitle>
                <DialogDescription className="text-red-600 text-xs">
                  {msg}
                </DialogDescription>
              </DialogHeader>
              <form autoComplete="false" onSubmit={mutate} method="post">
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="email" className="text-right">
                      Mata Pelajaran
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      className="col-span-3"
                      onChange={(e) => setMapel(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Tambah Mapel</Button>
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
        <TableCaption>Daftar Mata Pelajaran</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Mapel</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.pages &&
            data.pages
              .flatMap((page) => page.data.data)
              .map(({ created_at, id, mapel }, i) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{mapel}</TableCell>
                  <TableCell>{localTime(created_at)}</TableCell>
                  <TableCell className="flex  items-center gap-2 flex-wrap">
                    <Button
                      onClick={() => {
                        setIsDialogEditOpen(true),
                          setCurrentData({ id, mapel });
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

export default WithQuery(MapelData);
