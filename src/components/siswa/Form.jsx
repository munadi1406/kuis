import ButtonLoader from "../ButtonLoader.jsx";
import { DialogFooter } from "../ui/dialog.jsx";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { Textarea } from "../ui/textarea.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { useEffect, useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "../ui/skeleton.jsx";


const SearchForm = ({ open, setIsOpen, setIdUser }) => {

    const [searchData, setSearchData] = useState([])
    const getUserData = async (query) => {
        try {
            const response = await axios.get(`/api/user/search?search=${query}`);
            const dataSearch = response.data.data;

            setSearchData(dataSearch);
            return dataSearch;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error; // Menangani atau lempar kesalahan
        }
    };
    const handleSearchUsers = useMutation({
        mutationFn: async (username) => {
            const dataSearch = await getUserData(username);
            return dataSearch;
        },
    });

    let searchTimeout;
    const search = (e) => {
        const query = e.target.value;
        if (query.length > 3) {

            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            searchTimeout = setTimeout(async () => {
                handleSearchUsers.mutate(query);
            }, 2000);
        } else {

        }
    };




    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[80vw]">
                <DialogHeader>
                    <DialogTitle>Cari Akun</DialogTitle>
                    <DialogDescription>
                        Cari Akun User Untuk Menautkan Dengan Data Siswa
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label htmlFor="search">Search</Label>
                    <Input
                        type="search"
                        id="search"
                        placeholder="Masukan Nama Lengkap Siswa"
                        onChange={search}
                    />
                </div>
                {handleSearchUsers.isPending ? (
                    <div className="space-y-2">
                        <Skeleton className="w-full h-[100px] rounded-md" />
                        <Skeleton className="w-full h-[100px] rounded-md" />
                        <Skeleton className="w-full h-[100px] rounded-md" />
                    </div>) : (
                    <div className="max-h-[400px] overflow-y-scroll space-y-2">
                        {searchData.length > 0 && searchData.map((e) => (
                            <div key={e.id_user} className="bg-blue-400  rounded-md p-2 hover:bg-blue-600 cursor-pointer" onClick={() => {
                                setIsOpen(false);
                                setIdUser({ idUser: e.id_user, email: e.email });
                            }}>
                                <h3 className="text-xl font-bold text-white">{e.nama_lengkap}</h3>
                                <h3 className="text-xs font-italic text-white">{e.email}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>

    )
}




const Form = ({ mutate, isLoading, isEdit, currentData, updateGuru }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState({ idUser: "", email: "" });
    const [formData, setFormData] = useState({
        nisn: '',
        namaLengkap: '',
        alamat: '',
        jenisKelamin: '',
        idKelas: 0,
        idUser: null,
        noTelepon:'',
        noTeleponOrtu:''

    });

    // Debugging untuk memastikan data tersedia
    useEffect(() => {
        if (isEdit && currentData) {
            // console.log(currentData)
            setFormData({
                lastNisn: currentData.siswa.nisn,
                nisn: currentData.nisn,
                namaLengkap: currentData.siswa.nama_lengkap,
                alamat: currentData.siswa.alamat,
                jenisKelamin: currentData.siswa.jenis_kelamin,
                tanggalLahir: currentData.siswa.tanggal_lahir,
                idKelas: currentData.id_kelas,
                idUser: currentData.siswa.detail_user?.id_user || null,
                noTelepon:currentData.siswa.no_hp || null,
                noTeleponOrtu:currentData.siswa.no_hp_ortu || null,
            });
            setUserData({ idUser: currentData.siswa.detail_user?.id_user, email: currentData.siswa.detail_user?.email })
        }
    }, [isEdit, currentData]);
   
    useEffect(() => {

        if (userData.idUser) {

            setFormData(prevData => ({
                ...prevData,
                idUser: userData.idUser
            }));
        }
    }, [userData]);



   
    const dataKelas = useQuery({
        queryKey: ["kelasForm"],
        queryFn: async () => {
            const datas = await axios.get("/api/kelas/all");
            return datas.data;
        },
    });


    useEffect(()=>{
        console.log({formData})
    },[formData])

    // Handle perubahan nilai input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            updateGuru.mutate(formData);
        } else {
            
            mutate(formData);
        }
    };

    return (
        <>
            <form autoComplete="false" onSubmit={handleSubmit} method="post" required>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="nip" className="text-right">
                            NISN
                        </Label>
                        <Input
                            id="nip"
                            name="nisn"
                            type="number"
                            className="col-span-3"
                            defaultValue={isEdit ? currentData.nisn : ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="namaLengkap" className="text-right">
                            Nama Lengkap
                        </Label>
                        <Input
                            id="namaLengkap"
                            name="namaLengkap"
                            type="text"
                            className="col-span-3"
                            defaultValue={isEdit ? formData.namaLengkap : ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="tanggalLahir" className="text-right">
                            Tanggal Lahir
                        </Label>
                        <Input
                            id="tanggalLahir"
                            name="tanggalLahir"
                            type="date"
                            className="col-span-3"
                            defaultValue={isEdit ? formData.tanggalLahir : ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="alamat" className="text-right">
                            Alamat
                        </Label>
                        <Textarea
                            id="alamat"
                            name="alamat"
                            className="col-span-3"
                            defaultValue={isEdit ? formData.alamat : ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label className="text-right">
                            Jenis Kelamin
                        </Label>

                        <Select onValueChange={(e) => handleChange({ target: { name: "jenisKelamin", value: e } })} value={isEdit ? formData.jenisKelamin : ""} required>
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder={'Jenis kelamin'} />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="Laki-laki" >Laki Laki</SelectItem>
                                <SelectItem value="Perempuan" >Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full gap-1.5">
                        <Label htmlFor="Deskripsi">Kelas</Label>
                        {dataKelas.isSuccess && (
                            <Select
                                disabled={dataKelas.isLoading}
                                required
                                value={dataKelas.isSuccess && formData.idKelas ? `${dataKelas.data.data.find(e => e.id === formData.idKelas)?.kelas}` : ''}
                                onValueChange={(e) => {
                                    const idKelas = dataKelas.isSuccess && dataKelas.data.data.find(data => data.kelas === e)?.id;
                                    handleChange({ target: { name: "idKelas", value: idKelas } });
                                }}
                            >
                                <SelectTrigger className="w-full"  >
                                    <SelectValue placeholder={"Pilih Kelas"} />

                                </SelectTrigger>
                                <SelectContent>
                                    {dataKelas.isSuccess &&
                                        dataKelas.data.data.map(({ id, kelas }, i) => (
                                            <SelectItem value={kelas} key={i} id={i}>{kelas}</SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        )}

                    </div>
                    <div>
                        <Label htmlFor="noTelepon" className="text-right">
                            No Telepon
                        </Label>
                        <Input
                            id="noTelepon"
                            name="noTelepon"
                            type="number"
                            className="col-span-3"
                            defaultValue={isEdit ? formData.noTelepon : ''}
                            onChange={handleChange}
                            placeholder="Isi Jika Ada"
                        />
                    </div>
                    <div>
                        <Label htmlFor="noTeleponOrtu" className="text-right">
                            No Telepon Orang Tua
                        </Label>
                        <Input
                            id="noTeleponOrtu"
                            name="noTeleponOrtu"
                            type="number"
                            className="col-span-3"
                            defaultValue={isEdit ? formData.noTeleponOrtu : ''}
                            onChange={handleChange}
                            placeholder="Isi Jika Ada"
                        />
                    </div>
                    {isEdit && (
                        <div className="space-y-2">
                            <Label htmlFor="namaLengkap" className="text-right">
                                Tautkan Siswa Dengan User
                            </Label>
                            <Input
                                readOnly={true}
                                defaultValue={userData.idUser}
                                onChange={handleChange}
                                id="namaLengkap"
                                name="idUser"
                                type="text"
                                className="col-span-3"
                                placeholder="Cari Akun"
                                onClick={() => {
                                    setIsOpen(true)
                                }}
                            />
                            {userData.email && (
                                <>
                                    <p className="text-gray-500 text-sm text-italic ">Siswa Ini Akan Tertaut Dengan {userData?.email}</p>
                                    <p className="text-red-600 text-sm cursor-pointer underline" onClick={() => setUserData({ idUser: "", email: "" })}>Batal</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <ButtonLoader text={isEdit ? "Update Data" : "Tambah Data"} loading={isEdit ? updateGuru.isPending : isLoading} />
                </DialogFooter>
            </form>
            <SearchForm open={isOpen} setIsOpen={setIsOpen} setIdUser={setUserData} />
        </>
    )
}

export default Form