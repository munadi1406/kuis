import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { localTime } from "@/utils/localTime"
import { Button, buttonVariants } from "../ui/button"


const DetailSiswaSheet = ({ open, setOpen, data,getKelasName }) => {
    
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{data.nama_lengkap}</SheetTitle>
                    <SheetDescription>
                        detail data siswa {data.nama_lengkap}
                    </SheetDescription>
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
                                <td className="border border-gray-300 p-2 text-gray-700">NISN</td>
                                <td className="border border-gray-300 p-2 text-gray-700">{data.nisn}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Nama Lengkap</td>
                                <td className="border border-gray-300 p-2 text-gray-700">{data.nama_lengkap}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Kelas</td>
                                <td className="border border-gray-300 p-2 text-gray-700">{getKelasName(data.id_kelas)}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Alamat</td>
                                <td className="border border-gray-300 p-2 text-gray-700">{data.alamat}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Jenis Kelamin</td>
                                <td className="border border-gray-300 p-2 text-gray-700">{data.jenis_kelamin}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Created At</td>
                                <td className="border border-gray-300 p-2 text-gray-700">{localTime(data.created_at)}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Updated At</td>
                                <td className="border border-gray-300 p-2 text-gray-700">{localTime(data.updated_at)}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Akun</td>
                                <td className="border border-gray-300 p-2 text-gray-700">
                                  {data.detail_user ? `${data.detail_user.email}` : "siswa tidak punya akun"}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Progress Siswa</td>
                                <td className="border border-gray-300 p-2 text-gray-700">
                             
                                    <a className={buttonVariants()} href={`/progres/siswa/${data.nisn}`}>Lihat Progress Siswa</a>
                              
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default DetailSiswaSheet