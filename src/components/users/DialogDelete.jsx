import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../ui/use-toast"
import axios from "axios"
import ButtonLoader from "../ButtonLoader"


const DialogDelete = ({ isOpen, data, setIsOpen ,refetch}) => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (id) => {
            const isDelete = await axios.delete(`/api/user/delete?id=${id}`)
            return isDelete.data
        },
        onSuccess: (data) => {
            // window.location.href = '/users'
            setIsOpen(false)
            refetch("")
        },
        onError: (error) => {
            toast({
                title: "Gagal",
                desc: error.response.data.message,


            })
        }
    })
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda Yakin Ingin Menghapus akun {data.username} ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Semua data terkait {data.username} akan ikut terhapus !!!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <ButtonLoader text={"Hapus"} className={"bg-red-500  hover:bg-red-600 border "} disabled={isPending} loading={isPending} onClick={() => mutate(data.id)} />

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogDelete