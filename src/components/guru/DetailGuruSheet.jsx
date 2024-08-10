import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { localTime } from "@/utils/localTime"
import { Button, buttonVariants } from "../ui/button"


const DetailGuruSheet = ({ open, setOpen, data }) => {

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{data.nama_lengkap}</SheetTitle>
                    <SheetDescription>
                        detail data guru {data.nama_lengkap}
                    </SheetDescription>
                </SheetHeader>
                <div className="pt-2 shadow-md overflow-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">NIP</td>
                                <td className="border border-gray-300 p-2 text-gray-700">{data.nip}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Nama Lengkap</td>
                                <td className="border border-gray-300 p-2 text-gray-700">{data.nama_lengkap}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">alamat</td>
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
                                <td className="border border-gray-300 p-2 text-gray-700">Status akun guru</td>
                                <td className="border border-gray-300 p-2 text-gray-700 ">
                                    {data.detail_user ? `${data.detail_user.email}` : "Guru Tidak Punya Akun"}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-gray-700">Progress Guru</td>
                                <td className="border border-gray-300 p-2 text-gray-700">
                                    {data.detail_user ?
                                        <a href={`/progres/guru/${data.nip}`} className={buttonVariants()}>Lihat Progress Guru</a>
                                    : "Guru Tidak Punya Akun"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default DetailGuruSheet