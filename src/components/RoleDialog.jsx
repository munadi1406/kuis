import WithQuery from "@/utils/WithQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ButtonLoader from "./ButtonLoader";

const RoleDialog = ({ open, id }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [nisnOrNip, setNisnOrNip] = useState("")
  const [role, setRole] = useState("")
  const [msg,setMsg] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault()
      const setRole = await axios.post("api/user/user-role", {
        role,
        id,
        nisnOrNip
      });
      return setRole;
    },
    onSuccess: () => {
      window.location.reload()
    },
    onError: (error) => {
     setMsg(error.response.data.message)
    },
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Siliahkan isi data berikut untuk memvalidasi anda warga SDN Pingaran Ulu</DialogTitle>
          <DialogDescription className="text-red-600">{msg}</DialogDescription>
        </DialogHeader>
        <form className="w-full space-y-2" onSubmit={mutate}>
          <Label>Peran Anda Di SDN Pingaran Ulu</Label>
          <Select onValueChange={(e) => setRole(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Silahkan Pilih Peran Anda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Guru">Guru</SelectItem>
              <SelectItem value="Siswa">Siswa</SelectItem>
            </SelectContent>

          </Select>
          {role === "Guru" && (
            <>
              <Label>NIP</Label>
              <Input placeholder="Masukkan NIP Anda" type="number" onChange={(e) => setNisnOrNip(e.target.value)} required/>
            </>
          )}
          {role === "Siswa" && (
            <>
              <Label>NISN</Label>
              <Input placeholder="Masukkan NISN Anda" type="number" onChange={(e) => setNisnOrNip(e.target.value)} required/>
            </>
          )}
          <ButtonLoader text={"Simpan"} loading={isPending} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithQuery(RoleDialog);
