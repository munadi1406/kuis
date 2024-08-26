import WithQuery from "@/utils/WithQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ButtonLoader from "../ButtonLoader";
import { localTime } from "@/utils/localTime";


const GuestForm = ({ id, nisn, token, data }) => {
  const [msg, setMsg] = useState("")
  const [tokenV, setTokenV] = useState("");
  const [nisnV, setNISNV] = useState("");


  useEffect(() => {
    if (nisn && token) {
      setTokenV(token)
      setNISNV(nisn)
    }
  }, [token, nisn])

  const { mutate, isPending } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault()
      const datas = await axios.post("/api/quiz/guest", {
        token: tokenV,
        nisn: nisnV,
      });
      return datas.data;
    },
    onSuccess: async (data) => {
      localStorage.setItem(id, data.nisn)
      document.cookie = `${id}-status=true; path=/`;
      window.location.href = `/take/${id}`;
    },
    onError: (error) => {
      setMsg(error.response.data.message)
    },
  });
  const day = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', `jum'at`, 'sabtu']


 
  const [endQuiz,setEndQuiz] = useState()
  useEffect(()=>{
    const dy = new Date(data.end_quiz).getDay()
    let oke = `${day[dy]},${localTime(data.end_quiz)}`
    
    setEndQuiz(oke)
  },[data])


  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>
            <div className="space-y-2 text-gray-600">
              <div>
                <span className="font-semibold">Waktu Pengerjaan:</span> {data.waktu} menit
              </div>
              <div className="capitalize">
                <span className="font-semibold ">Waktu Berakhir Kuis:</span> {endQuiz}
              </div>
              <div>
                <span className="font-semibold">Jumlah Soal:</span> {data.questions.length}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={mutate} className="space-y-2">
          {msg && (
            <p className="text-red-400 capitalize">{msg}</p>
          )}
          <Label>NISN</Label>
          <Input
            placeholder="NISN"
            type="text"
            required
            value={nisnV}
            onChange={(e) => setNISNV(e.target.value)}
          />
          <Label>Token Kuis</Label>
          <Input
            placeholder="Token Kuis"
            type="text"
            required
            value={tokenV}
            onChange={(e) => setTokenV(e.target.value)}
          />
          <ButtonLoader
            text={"Kerjakan"}
            loading={isPending}
            type="submit"
          />
        </form>
        <DialogFooter>
          <div className="text-xs text-gray-600">
            <p> Kami Sangat Merekomendasikan anda membuat akun terlebih dahulu , jika sudah memiliki akun silahkan <a href="/" className="text-blue-600 underline">
              Login
            </a>
            </p>
            Jika Belum Memiliki Akun Anda Bisa Membuatnya{" "}
            <a href="/register" className="text-blue-600 underline">
              Disini
            </a>

          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithQuery(GuestForm);
