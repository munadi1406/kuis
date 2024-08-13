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
} from "@/components/ui/dialog";
import { Button } from "../ui/button.jsx";
import { Suspense, lazy, useEffect, useState } from "react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import WithQuery from "@/utils/WithQuery";
import { localTime } from "../../utils/localTime.js";
import { toast } from "../ui/use-toast.js";
import ButtonLoader from "../ButtonLoader.jsx";
import ClipLoader from "react-spinners/ClipLoader.js";
const Form = lazy(() => import("./Form.jsx"));
import { Badge } from "../ui/badge.jsx";
const DeleteAlert =lazy(()=>import( "./DeleteAlert.jsx"));



const TahunAjaranData = ({ role }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [currentData, setCurrentData] = useState({});
    const [query, setQuery] = useState("");
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
   
    const [filter, setFilter] = useState("")
    const {
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["siswa"],
        queryFn: async ({ pageParam }) => {
            const response = await axios.get(
                `/api/tahunajaran?id=${pageParam || 0}&search=${query}`
            );
            return response.data;
        },
        getNextPageParam: (lastPage) => lastPage.data.lastId,
        staleTime: 5000,
        initialPageParam: 0,
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (formData) => {

            const insertSiswa = await axios.post("api/tahunajaran", formData);
            return insertSiswa;
        },
        onSuccess: (data) => {
            refetch();
            setIsDialogOpen(false);
            setFormData({
                nip: '',
                namaLengkap: '',
                alamat: '',
                jenisKelamin: ''
            })
            toast({
                title: "Berhasil",
                description: data.data.message,
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
    const deleteTahunAjaran = useMutation({
        mutationFn: async (id) => {
            const isDelete = await axios.delete(`api/tahunajaran?id=${id}`);
            return isDelete;
        },
        onSuccess: (data) => {
            refetch();
            setDialogDeleteOpen(false);
            toast({
                title: "Berhasil",
                description: data.data.message,
            });
        },
        onError: (error) => {
            toast({
                title: "Gagal",
                variant: "destructive",
                description: `${error.response.data.message}`,
            });
        },
    });
    const [isEdit, setIsEdit] = useState(false)


    const updateGuru = useMutation({
        mutationFn: async (formData) => {

            const isUpdate = await axios.put(`api/tahunajaran`, formData);
            return isUpdate;
        },
        onSuccess: (data) => {
            refetch();
            setIsDialogOpen(false);
            toast({
                title: "Berhasil",
                description: data.data.message,
            });
        },
        onError: (error) => {

            toast({
                title: "Gagal",
                variant: "destructive",
                description: error.response.data.message,
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
    }, [query, filter]);

   
  


    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <div>
            <div className="w-full flex justify-between items-end  border-b  p-2">
                <div className="flex gap-2">
                    <div>
                        <Label htmlFor="search">Search</Label>
                        <Input
                            type="search"
                            id="search"
                            placeholder="Tahun Ajaran"
                            onChange={search}
                        />
                    </div>

                </div>
                <div className="flex items-end justify-end gap-2">
                    {role === "admin" && (
                        <>

                            <Dialog open={isDialogOpen} onOpenChange={() => { setIsDialogOpen(!isDialogOpen), setIsEdit(false) }} >
                                <DialogTrigger asChild>
                                    <Button variant="outline" onClick={() => { setMsg(null), setIsDialogOpen(true) }}>
                                        Tambah Data
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[80vw] overflow-y-scroll max-h-screen">
                                    <DialogHeader>
                                        <DialogTitle>{isEdit ? "Edit Data Tahun Ajaran" : "Tambah Data Tahun Ajaran"}</DialogTitle>
                                        <DialogDescription className="text-red-600 text-xs">
                                            {msg}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Suspense fallback={<ClipLoader />}>
                                        <Form mutate={mutate} isLoading={isPending} isEdit={isEdit} currentData={currentData} updateGuru={updateGuru} />
                                    </Suspense>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}

                </div>
            </div>
            <Table>
                <TableCaption>Daftar Tahun Ajaran</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Tahun Awal</TableHead>
                        <TableHead>Tahun Akhir</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.pages &&
                        data.pages
                            .flatMap((page) => page.data.data)
                            .map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{e.nama}</TableCell>
                                    <TableCell>{e.tahun_awal}</TableCell>
                                    <TableCell>{e.tahun_akhir}</TableCell>
                                    <TableCell>
                                        <div>
                                            {e.status ? <Badge className={"bg-green-600"}>Aktif</Badge> : <Badge className={"bg-red-600"}>Tidak Aktif</Badge>}
                                        </div>
                                    </TableCell>
                                    <TableCell>{localTime(e.created_at)}</TableCell>
                                    <TableCell className="flex  items-center gap-2 flex-wrap">
                                        <Button
                                            onClick={() => {
                                                setIsEdit(true)
                                                setIsDialogOpen(true)
                                                setCurrentData({ ...e });
                                                setMsg(null)
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <Button onClick={() =>{setDialogDeleteOpen(true),setCurrentData(e)}} variant="destructive">
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

<Suspense> 
    <DeleteAlert data={currentData} isOpen={dialogDeleteOpen} setIsOpen={setDialogDeleteOpen} deleteData={deleteTahunAjaran}/>
</Suspense>
        </div>
    );
};

export default WithQuery(TahunAjaranData);
