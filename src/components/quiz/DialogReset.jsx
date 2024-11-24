import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { useMutation } from "@tanstack/react-query";
  import { toast } from "../ui/use-toast";
  import axios from "axios";
  import ButtonLoader from "../ButtonLoader";
  
  const DialogReset = ({ isOpen, data, setIsOpen }) => {
    console.log(data)
    const { mutate, isPending } = useMutation({
      mutationFn: async (resetData) => {
        const reset = await axios.post("/api/answer/reset", {
          nisn: resetData.nisn,
          idQuiz: resetData.idQuiz,
        });
        return reset.data;
      },
      onSuccess: (data) => {
        toast({
          title: "Berhasil",
          description: data.message,
        });
        setIsOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Gagal",
          variant: "destructive",
          description: error.response?.data?.message || "Terjadi kesalahan.",
        });
      },
    });
  
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda Yakin Ingin Mereset Jawaban Kuis{" "}
              <span className="font-bold">{data.namaLengkap}</span>?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Tindakan ini akan:
          </AlertDialogDescription>
          {/* Pisahkan <ul> dari <p> */}
          <ul className="list-disc list-inside mt-2 text-sm">
            <li>
              Mereset semua jawaban terkait kuis untuk siswa{" "}
              <span className="font-bold">{data.namaLengkap}</span>.
            </li>
            <li>
              Memberikan kesempatan kepada siswa untuk melakukan{" "}
              <span className="font-bold">remedial</span>.
            </li>
            <li>
              Nilai akhirnya akan diubah menjadi nilai maksimal dari{" "}
              <span className="font-bold">KKM ({data.kkm})</span>.
            </li>
          </ul>
          <p className="mt-4 text-red-500 font-semibold">
            Pastikan bahwa waktu pengerjaan kuis masih tersedia sebelum melakukan
            reset!
          </p>
          <p className="mt-2">
            Reset ini hanya berlaku untuk kuis{" "}
            <span className="font-bold">"{data.title}"</span>.
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <ButtonLoader
              text={"Reset"}
              className={
                "bg-red-500 text-white hover:bg-white hover:text-red-500 hover:bg-red-500/60 border"
              }
              loading={isPending}
              onClick={() => mutate(data)}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default DialogReset;
  