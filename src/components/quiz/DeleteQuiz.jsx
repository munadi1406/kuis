import {
    AlertDialog,
    AlertDialogAction,
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


const DeleteQuiz = ({ isOpen, data, setIsOpen }) => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (id_quiz) => {
            const isDelete = await axios.delete(`/api/quiz?id=${id_quiz}`)
            return isDelete.data
        },
        onSuccess: (data) => {
            window.location.href = '/dashboard'
        },
        onError: (error) => {
            toast({
                title: "Gagal Menghapus Kuis",
                desc: error.response.data.message,


            })
        }
    })
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
{/* {console.log(data)} */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda Yakin Ingin Menghapus Kuis {data.title} ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Semua jawaban terkait {data.title} akan ikut terhapus !!!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <ButtonLoader text={"Hapus"} className={"bg-red-500 hover:bg-white hover:bg-red-500/60 border "} loading={isPending} onClick={() => mutate(data.id)} />

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteQuiz