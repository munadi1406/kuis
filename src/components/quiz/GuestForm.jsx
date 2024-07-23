import WithQuery from "@/utils/WithQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ButtonLoader from "../ButtonLoader";
import { Button } from "../ui/button";

const GuestForm = ({id}) => {
  const [msg,setMsg] = useState("")
  const [token, setToken] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault()
      const datas = await axios.post("/api/quiz/guest", {
        token,
        namaLengkap,
      });
      return datas.data;
    },
    onSuccess:async  (data) => {
      const auth  = await axios.post('/api/auth/signin',{
        email:data.email,
        password:data.password
      })
      window.location.href = `/take/${id}`;
    },
    onError: (error) => {
      setMsg(error.response.data.message)
    },
  });

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Anda Belum Login</DialogTitle>
          <DialogDescription>
            Silahkan Login Terlebih Dahulu{" "}
            <a href="/" className="text-blue-600 underline">
              Login
            </a>
            , Jika Belum Memiliki Akun Anda Bisa Membuatnya{" "}
            <a href="/register" className="text-blue-600 underline">
              Disini
            </a>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={mutate} className="space-y-2">
          <p>
            Anda Juga Bisa Langsung Mengerjakan Kuis Dengan Mengisi Data Dibawah
            Ini
          </p>
          {msg&& (
            <p className="text-red-400 ">{msg}</p>
          )}
          <Label>Nama Lengkap</Label>
          <Input
            placeholder="Nama Lengkap"
            type="text"
            required
            onChange={(e) => setNamaLengkap(e.target.value)}
          />
          <Label>Token Kuis</Label>
          <Input
            placeholder="Token Kuis"
            type="text"
            required
            onChange={(e) => setToken(e.target.value)}
          />
        <ButtonLoader
          text={"Kerjakan"}
          loading={isPending}
          type="submit"
        />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithQuery(GuestForm);
