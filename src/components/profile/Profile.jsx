import WithQuery from '@/utils/WithQuery'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Textarea } from '../ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ButtonLoader from '../ButtonLoader'
import { useState } from 'react'
import { toast } from '../ui/use-toast'





const ProfileData = ({ idUser }) => {
    const [password, setPassword] = useState({});
    const [username,setUsername] = useState("")
    const [msg, setMsg] = useState("");
    const [msgUsername,setMsgUsername] = useState("")
    const handleChangePassword = (e) => {
        const name = e.target.name;
        setPassword((prev) => ({
            ...prev,
            [name]: e.target.value,
        }));
    };
    const changePassword = useMutation({
        mutationFn: async (e) => {
            e.preventDefault();
            setMsg("")
            const changePassword = axios.post("api/user/password-ad", {
                ...password,
                id: idUser,
            });

            return changePassword;
        },
        onSuccess: () => {
            setMsg("Password Berhasil Di Ganti");
            window.location.href = '/api/auth/signout';
        },
        onError: (error) => {
            setMsg(error.response.data.message);
        },
    });
    const changeUsername = useMutation({
        mutationFn: async (e) => {
            e.preventDefault();
           
            setMsgUsername("")
            const changePassword = axios.put("api/profile/username", {
                username,
                id: idUser,
            });

            return changePassword;
        },
        onSuccess: () => {
            setMsgUsername("Username Berhasil Di Ganti");
        },
        onError: (error) => {
            setMsgUsername(error.response.data.message);
        },
    });
    const { data, isLoading } = useQuery({
        queryKey: ['idUser'], queryFn: async () => {
            const data = await axios.get(`/api/profile?id=${idUser}`)
            return data.data.data
        }
    })
    const dataKelas = useQuery({
        queryKey: ["kelasForm"],
        queryFn: async () => {
            const datas = await axios.get("/api/kelas/all");
            return datas.data;
        },
    });
    if (isLoading) {
        return <div>Loading....</div>
    }
    return (
        <div className='space-y-5'>

            <div className="bg-white shadow-md rounded-md p-2 font-poppins">
                
                <form className='space-y-2' onSubmit={changeUsername.mutate}>
                    <p className='text-red-600 italic text-sm'>{msgUsername}</p>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" readOnly={true} defaultValue={data.email} />
                    </div>
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username"  defaultValue={data.username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <ButtonLoader text={"Edit"} loading={changeUsername.isPending} />
                </form>
            </div>
            <div className="bg-white shadow-md rounded-md p-2 font-poppins">

                {data.guru ? (
                    <>
                        <Badge>Anda Terdaftar Sebagai Guru</Badge>
                        <div className='space-y-2'>
                            <div>
                                <Label htmlFor="nip">NIP</Label>
                                <Input type="number" name="nip" defaultValue={data.guru.nip} readOnly />
                            </div>
                            <div>
                                <Label htmlFor="namaGuru">Nama Lengkap Guru</Label>
                                <Input type="text" name="namaGuru" defaultValue={data.guru.nama_lengkap} readOnly />
                            </div>
                            <div>
                                <Label htmlFor="alamat" className="text-right">
                                    Alamat
                                </Label>
                                <Textarea
                                    id="alamat"
                                    name="alamat"
                                    className="col-span-3"
                                    defaultValue={data.guru.alamat}
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label className="text-right">
                                    Jenis Kelamin
                                </Label>
                                <Select defaultValue={data.guru.jenis_kelamin} disabled>
                                    <SelectTrigger className="w-full" >
                                        <SelectValue placeholder={'Jenis kelamin'} />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="Laki-laki" >Laki Laki</SelectItem>
                                        <SelectItem value="Perempuan" >Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <p className='text-md font-semibold text-red-600 italic'>Jika data tidak sesuai silahkan hubungi admin</p>
                        </div>
                    </>
                ) : data.siswa[0] ? (
                    <div className='space-y-4'>
                        <Badge>Anda Terdaftar Sebagai Siswa</Badge>
                        <div>
                            <Label htmlFor="nip" className="text-right">
                                NISN
                            </Label>
                            <Input
                                id="nip"
                                name="nisn"
                                type="number"
                                className="col-span-3"
                                defaultValue={data.siswa[0].nisn}

                                readOnly
                            />
                        </div>
                        <div>
                            <Label htmlFor="namaLengkap" className="text-right">
                                Nama Lengkap Siswa
                            </Label>
                            <Input
                                id="namaLengkap"
                                name="namaLengkap"
                                type="text"
                                className="col-span-3"
                                defaultValue={data.siswa[0].nama_lengkap}
                                readOnly
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
                                defaultValue={data.siswa[0].tanggal_lahir}
                                readOnly
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
                                defaultValue={data.siswa[0].alamat}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label className="text-right">
                                Jenis Kelamin
                            </Label>

                            <Select defaultValue={data.siswa[0].jenis_kelamin} disabled>
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
                                    disabled={true}
                                    defaultValue={dataKelas.isSuccess && data.siswa[0].id_kelas ? `${dataKelas.data.data.find(e => e.id === data.siswa[0].id_kelas)?.kelas}` : ''}
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
                        <p className='text-md font-semibold text-red-600 italic'>Jika data tidak sesuai silahkan hubungi admin</p>
                    </div>
                ) : (
                    <>
                        <p>Untuk Mengkaitkan Akun anda dengan data guru/siswa silahkan masukkan NIP(Guru) Dan NISN (Siswa)</p>
                        <Input type="text" />
                    </>
                )}

            </div>
            <div className="bg-white shadow-md rounded-md p-2 font-poppins">
                <form className='space-y-2' onSubmit={changePassword.mutate}>
                    <h1 className='text-3xl'>Ganti Password</h1>
                    <p className='text-md italic text-red-500'>{msg}</p>
                    <div>
                        <Label htmlFor="password">Password Baru</Label>
                        <Input type="password" name="password" onChange={handleChangePassword} />
                    </div>
                    <div>
                        <Label htmlFor="namaLengkap">Konfirmasi Password Baru</Label>
                        <Input type="password" name="confirmPassword" onChange={handleChangePassword} />
                    </div>
                    <ButtonLoader text={"Ganti Password"} loading={changePassword.isPending} />
                </form>
            </div>
        </div>
    )
}

export default WithQuery(ProfileData)