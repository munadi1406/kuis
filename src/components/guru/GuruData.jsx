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
import { Button } from "../ui/button";
import { Suspense, lazy, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import WithQuery from "@/utils/WithQuery";
import { localTime } from "./../../utils/localTime.js";
import { toast } from "../ui/use-toast.js";
import { generatePdf } from "./generatePdf.js";
import ButtonLoader from "../ButtonLoader.jsx";
import ClipLoader from "react-spinners/ClipLoader.js";
const DetailGuruSheet = lazy(() => import("./DetailGuruSheet.jsx"));
const Form = lazy(() => import("./Form.jsx"));



const GuruData = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [currentData, setCurrentData] = useState({});
    const [query, setQuery] = useState("");
   
    const [sheetOpen, setSheetOpen] = useState(false);
    const handleDetail = (data) => {
        setSheetOpen(!sheetOpen)
        setCurrentData({ ...data })
    }

    const {
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["guru"],
        queryFn: async ({ pageParam }) => {
            const response = await axios.get(
                `/api/guru?id=${pageParam || 0}&search=${query}`
            );
            return response.data;
        },
        getNextPageParam: (lastPage) => lastPage.data.lastId,
        staleTime: 5000,
        initialPageParam: 0,
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (formData) => {
            
            const insertGuru = await axios.post("api/guru", formData);
            return insertGuru;
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
    const deleteGuru = useMutation({
        mutationFn: async (nip) => {
            const isDelete = await axios.delete(`api/guru?nip=${nip}`);
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
    const [isEdit,setIsEdit] = useState(false)


    const updateGuru = useMutation({
        mutationFn: async (formData) => {
           
            const isUpdate = await axios.put(`api/guru`, formData);
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
                        placeholder="Nama Lengkap"
                        onChange={search}
                    />
                </div>
                <div className="flex items-end justify-end gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={()=>{setIsDialogOpen(!isDialogOpen),setIsEdit(false)}} >
                        <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                                Tambah Data Guru
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[80vw] overflow-y-scroll max-h-screen">
                            <DialogHeader>
                                <DialogTitle>{isEdit ? "Edit Data Guru" : "Tambah Data Guru"}</DialogTitle>
                                <DialogDescription className="text-red-600 text-xs">
                                    {msg}
                                </DialogDescription>
                            </DialogHeader>
                            <Suspense fallback={<ClipLoader />}>
                                <Form  mutate={mutate}  isLoading={isPending} isEdit={isEdit} currentData={currentData} updateGuru={updateGuru}/>
                            </Suspense>
                        </DialogContent>
                    </Dialog>
                    <Button
                        onClick={() => generatePdf()}
                        disabled={!data || data.length <= 0}
                    >
                        Cetak
                    </Button>
                </div>
            </div>
            <Table>
                <TableCaption>Daftar Guru</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>NIP</TableHead>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.pages &&
                        data.pages
                            .flatMap((page) => page.data.data)
                            .map((e, i) => (
                                <TableRow key={e.nip}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{e.nip}</TableCell>
                                    <TableCell>{e.nama_lengkap}</TableCell>
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
                                        <Button onClick={() => deleteGuru.mutate(e.nip)} variant="destructive">
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
                <DetailGuruSheet open={sheetOpen} setOpen={setSheetOpen} data={currentData} />
            </Suspense>
           
        </div>
    );
};

export default WithQuery(GuruData);
