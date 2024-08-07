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
import { generatePdf } from "./generatePdf.js";
import ButtonLoader from "../ButtonLoader.jsx";
import ClipLoader from "react-spinners/ClipLoader.js";
const DetailSiswaSheet = lazy(() => import("./DetailSiswaSheet.jsx"));
const Form = lazy(() => import("./Form.jsx"));
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const Print = lazy(()=>import( "./Print.jsx"));


const SiswaData = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [currentData, setCurrentData] = useState({});
    const [query, setQuery] = useState("");
    const [dialogPrint,setDiaglogPrint] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const handleDetail = (data) => {
        setSheetOpen(!sheetOpen)
        setCurrentData({ ...data })
    }
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
                `/api/siswa?id=${pageParam || 0}&search=${query}&filter=${filter}`
            );
            return response.data;
        },
        getNextPageParam: (lastPage) => lastPage.data.lastId,
        staleTime: 5000,
        initialPageParam: 0,
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (formData) => {

            const insertSiswa = await axios.post("api/siswa", formData);
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
    const deleteSiswa = useMutation({
        mutationFn: async (nisn) => {
            const isDelete = await axios.delete(`api/siswa?nisn=${nisn}`);
            return isDelete;
        },
        onSuccess: (data) => {
            refetch();
            toast({
                title: "Berhasil",
                description: data.data.message,
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
    const [isEdit, setIsEdit] = useState(false)


    const updateGuru = useMutation({
        mutationFn: async (formData) => {

            const isUpdate = await axios.put(`api/siswa`, formData);
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

    const dataKelas = useQuery({
        queryKey: ["kelasForm"],
        queryFn: async () => {
            const datas = await axios.get("/api/kelas/all");
            return datas.data;
        },
    });

const getKelasName = (idKelas) => {
        if (dataKelas.isSuccess) {
            return `${dataKelas.data.data.find(datas => datas.id === idKelas)?.kelas}`
        }
    }


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
                            placeholder="Nama Lengkap"
                            onChange={search}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="Deskripsi">Filter Kelas</Label>
                        {dataKelas.isSuccess && (
                            <Select
                                disabled={dataKelas.isLoading}
                                required
                                onValueChange={(e) => {
                                    if(e === "semua"){
                                        setFilter("")
                                        return
                                    }
                                    const idKelas = dataKelas.isSuccess && dataKelas.data.data.find(datas => datas.kelas === e).id
                                    setFilter(idKelas)
                                }}
                            >
                                <SelectTrigger className="w-full"  >
                                    <SelectValue placeholder={"Pilih Kelas"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"semua"} >Semua</SelectItem>
                                    {dataKelas.isSuccess &&
                                        dataKelas.data.data.map(({ id, kelas }, i) => (
                                            <SelectItem value={kelas} key={i} id={i}>{kelas}</SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        )}

                    </div>
                </div>
                <div className="flex items-end justify-end gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={() => { setIsDialogOpen(!isDialogOpen), setIsEdit(false) }} >
                        <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => { setMsg(null), setIsDialogOpen(true) }}>
                                Tambah Data Siswa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[80vw] overflow-y-scroll max-h-screen">
                            <DialogHeader>
                                <DialogTitle>{isEdit ? "Edit Data Siswa" : "Tambah Data Siswa"}</DialogTitle>
                                <DialogDescription className="text-red-600 text-xs">
                                    {msg}
                                </DialogDescription>
                            </DialogHeader>
                            <Suspense fallback={<ClipLoader />}>
                                <Form mutate={mutate} isLoading={isPending} isEdit={isEdit} currentData={currentData} updateGuru={updateGuru} />
                            </Suspense>
                        </DialogContent>
                    </Dialog>
                    <Button
                        onClick={() => setDiaglogPrint(true)}
                        disabled={!data || data.length <= 0}
                    >
                        Cetak
                    </Button>
                </div>
            </div>
            <Table>
                <TableCaption>Daftar Siswa</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>NISN</TableHead>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>Kelas</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.pages &&
                        data.pages
                            .flatMap((page) => page.data.data)
                            .map((e, i) => (
                                <TableRow key={e.nisn}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{e.nisn}</TableCell>
                                    <TableCell>{e.nama_lengkap}</TableCell>
                                    <TableCell>{getKelasName(e.id_kelas)}</TableCell>
                                    <TableCell>{localTime(e.created_at)}</TableCell>
                                    <TableCell>{localTime(e.updated_at)}</TableCell>
                                    <TableCell className="flex  items-center gap-2 flex-wrap">
                                        <Button
                                            onClick={() => {
                                                setIsEdit(true)
                                                setIsDialogOpen(true)
                                                setCurrentData({ ...e });
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button className="bg-blue-600" onClick={() => handleDetail(e)}>
                                            Detail
                                        </Button>
                                        <Button onClick={() => deleteSiswa.mutate(e.nisn)} variant="destructive">
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
                <DetailSiswaSheet open={sheetOpen} setOpen={setSheetOpen} data={currentData} getKelasName={getKelasName} />
                <Print open={dialogPrint} setOpen={setDiaglogPrint} dataKelas={dataKelas} getKelasName={getKelasName}/>
            </Suspense>

        </div>
    );
};

export default WithQuery(SiswaData);
