import WithQuery from "@/utils/WithQuery";
import {
  Dialog,
  DialogContent,
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
  const [namaLengkap,setNamaLengkap] = useState("")
  const [role,setRole] = useState("")

  const { mutate,isPending } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault()
      const setRole = await axios.post("api/user/user-role", {
        role,
        id,
        namaLengkap
      });
      return setRole;
    },
    onSuccess: () => {
      setIsOpen(false);
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: `Internal Server Error`,
      });
    },
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deskripsikan Diri Anda</DialogTitle>
        </DialogHeader>
        <form className="w-full space-y-2" onSubmit={mutate}>
          <Label>Nama Lengkap</Label>
          <Input placeholder="Masukkan Nama Lengkap Anda" type="text" onChange={(e)=>setNamaLengkap(e.target.value)}/>
          <Select onValueChange={(e)=>setRole(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Silahkan Pilih Peran Anda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Guru">Guru</SelectItem>
              <SelectItem value="Siswa">Siswa</SelectItem>
            </SelectContent>
            <ButtonLoader text={"Simpan"} loading={isPending}/>
          </Select>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithQuery(RoleDialog);
