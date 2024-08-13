import {
    AlertDialog,

    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import ButtonLoader from "../ButtonLoader"


const DeleteAlert = ({ isOpen, data, setIsOpen,deleteData }) => {
    
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda Yakin Ingin Menghapus Data Tahun Ajaran {data.nama} ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Semua data yang berkaitan dengan tahun ajaran {data.nama} akan terhapus, data data yang terhapus yaitu data siswa,quiz
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <ButtonLoader text={"Hapus"} className={"bg-red-500 hover:bg-white hover:bg-red-500/60 border "}  loading={deleteData.isPending} onClick={()=> {deleteData.mutate(data.id)}}/>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAlert