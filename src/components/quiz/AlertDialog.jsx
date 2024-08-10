import {
    AlertDialog as AlertDiaglogS,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "../ui/button";

const AlertDialog = ({ id, msg, userId }) => {
    return (
        <AlertDiaglogS open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{msg}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Terima kasih telah mengerjakan kuis. Kami berharap nilai Anda
                        bagus! Anda bisa melihat hasil Anda dengan mengklik tombol di
                        bawah ini.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <a href={`/result/${id}/${userId}`} className={buttonVariants()} onClick={() => {
                        localStorage.removeItem(id)
                    }}>
                        Lihat Nilai
                    </a>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDiaglogS>
    )
}

export default AlertDialog