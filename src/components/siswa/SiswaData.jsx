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
import Charts from "react-apexcharts";

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
import { Badge } from "../ui/badge.jsx";
import ButtonLoader from "../ButtonLoader.jsx";



const SiswaData = ({ role }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [currentData, setCurrentData] = useState({});
    const [query, setQuery] = useState("");
    const [sheetOpen, setSheetOpen] = useState(false);
    const [filterJenisKelamin, setFilterJenisKelamin] = useState("")
    const handleDetail = (data) => {
        setSheetOpen(!sheetOpen)
        setCurrentData({ ...data })
    }
    const [filter, setFilter] = useState("")
    const [filterTa, setFilterTa] = useState("")
    const {
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        refetch,
        isSuccess

    } = useInfiniteQuery({
        queryKey: [`siswa-${query}-${filter}-${filterTa}-${filterJenisKelamin}`],
        queryFn: async ({ pageParam }) => {
            const response = await axios.get(
                `/api/siswa?id=${pageParam || 0}&search=${query}&filter=${filter}&ta=${filterTa}&jk=${filterJenisKelamin}`
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
    }, [query, filter, filterTa, filterJenisKelamin]);

    const dataKelas = useQuery({
        queryKey: ["kelasForm"],
        queryFn: async () => {
            const datas = await axios.get("/api/kelas/all");
            return datas.data;
        },
    });
    const dataTa = useQuery({
        queryKey: ["tahunAjaran"],
        queryFn: async () => {
            const datas = await axios.get("/api/tahunajaran/all");
            return datas.data.data;
        },
    });

    const dataPrint = useMutation({
        mutationFn: async () => {
            const datas = await axios.get(
                `/api/siswa?search=${query}&filter=${filter}&ta=${filterTa}&p=true&jk=${filterJenisKelamin}`
            );
            return datas.data.data;
        },
        onSuccess: (data) => {
            const title = `${filterTa && `TA ${filterTa}`} ${filter && `Kelas ${getKelasName(filter)}`}`

            generatePdf(title, getKelasName, data)
        },
       
    });
    const handlePrint = () => {
        dataPrint.mutate()
    }

    const getKelasName = (idKelas) => {
        if (dataKelas.isSuccess) {
            return `${dataKelas.data.data.find(datas => datas.id === idKelas)?.kelas}`
        }
    }

    const genderStats = isSuccess ? data.pages[0].data.genderStats : []
    const labels = genderStats.map(stat => `${stat.gender}`);
   
    const datas = genderStats.map(stat => stat.count);



    return (
        <div>
            <div className="w-full flex flex-wrap gap-2 md:justify-between items-end  border-b  p-2">
                <div className="w-full pb-4">
                    <Charts type="bar"
                        options={{
                            chart: {
                                type: 'bar',
                                height: 380
                            },
                            plotOptions: {
                                bar: {
                                    columnWidth: '45%',
                                    distributed: true,
                                    borderRadius:10
                                }
                            },
                            colors: ['#33b2df', '#546E7A'
                            ],
                            dataLabels: {
                                enabled: true
                            },

                            stroke: {
                                width: 1,
                                colors: ['#fff']
                            },
                            xaxis: {
                                categories: labels,
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
                                    show: false,
                                    formatter: function (val) {
                                        return val + "%";
                                    }
                                }

                            },

                            title: {
                                text: `Statistik Gender ${filter && `Kelas ${getKelasName(filter)}`} ${filterTa && `TA ${filterTa}`}`,
                                align: 'center',
                                floating: true
                            },


                        }}
                        series={[
                            {
                                data: datas
                            },
                        ]}
                        height={350} />
                </div> 
                <div className="grid md:grid-cols-4 gap-2 grid-cols-2">
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
                                    if (e === "semua") {
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
                    <div>
                        <Label className="text-right">
                            Filter Jenis Kelamin
                        </Label>

                        <Select onValueChange={(e) => {
                            if (e === "semua") {
                                setFilterJenisKelamin("")
                                return
                            }
                            setFilterJenisKelamin(e)
                        }}>
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder={'Jenis kelamin'} />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="semua" >Semua</SelectItem>
                                <SelectItem value="Laki-laki" >Laki Laki</SelectItem>
                                <SelectItem value="Perempuan" >Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <Label htmlFor="Deskripsi">Filter TA</Label>

                        {dataTa.isSuccess && (
                            <Select
                                disabled={dataTa.isLoading}
                                required
                                onValueChange={(e) => {
                                    if (e === "semua") {
                                        setFilter("")
                                        return
                                    }
                                    const nama = dataTa.isSuccess && dataTa.data.data.find(datas => datas.nama === e).nama
                                    setFilterTa(nama)
                                }}
                            >
                                <SelectTrigger className="w-full"  >
                                    <SelectValue placeholder={"Pilih TA"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"semua"} >Semua</SelectItem>
                                    {dataTa.isSuccess &&
                                        dataTa.data.data.map(({ id, nama }, i) => (
                                            <SelectItem value={nama} key={i} id={i}>{nama}</SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        )}

                    </div>
                </div>
                <div className="flex items-end justify-end gap-2">
                    {role === "admin" && (
                        <>
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
                        </>
                    )}
                    <div>

                        <ButtonLoader onClick={() => handlePrint()} text={"Cetak"} loading={dataPrint.isPending} disabled={!data || data?.length <= 0} />
                    </div>
                </div>
            </div>
            <Table>
                <TableCaption>Daftar Siswa</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>NISN</TableHead>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>Jenis Kelamin</TableHead>
                        <TableHead>Kelas</TableHead>
                        <TableHead>TA</TableHead>
                        <TableHead>Akun</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isSuccess &&
                        data.pages
                            .flatMap((page) => page.data.data)
                            .map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{e.nisn}</TableCell>
                                    <TableCell>{e.siswa.nama_lengkap}</TableCell>
                                    <TableCell>{e.siswa.jenis_kelamin}</TableCell>
                                    <TableCell>{`${getKelasName(e.id_kelas)} `}</TableCell>
                                    <TableCell>{`${e.tahun_ajaran.nama}`}</TableCell>
                                    <TableCell >{e.siswa.detail_user ? <Badge className={"bg-green-600"}>{e.siswa.detail_user.email}</Badge> : '-'}</TableCell>
                                    <TableCell>{localTime(e.siswa.created_at)}</TableCell>
                                    <TableCell>{localTime(e.siswa.updated_at)}</TableCell>
                                    <TableCell className="flex  items-center gap-2 flex-wrap">
                                        {role === "admin" &&
                                            <Button
                                                onClick={() => {
                                                    setIsEdit(true)
                                                    setIsDialogOpen(true)
                                                    setCurrentData({ ...e });
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        }
                                        <Button className="bg-blue-600" onClick={() => handleDetail(e)}>
                                            Detail
                                        </Button>
                                        {role === "admin" &&
                                            <Button onClick={() => deleteSiswa.mutate(e.nisn)} variant="destructive">
                                                Hapus
                                            </Button>
                                        }
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

            </Suspense>

        </div>
    );
};

export default WithQuery(SiswaData);
