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

const RoleDialog = ({open,id}) => {
    console.log({open})
    const [isOpen,setIsOpen] = useState(open);

    const {mutate} = useMutation({
        mutationFn:async(e)=>{
            const setRole = await axios.post('api/user/user-role',{
                role:e,
                id
            })
            return setRole
        },
        onSuccess:()=>{
            setIsOpen(false);
        },
        onError:()=>{
            toast({
                title: "Gagal",
                description: `Internal Server Error`,
              });
        }
    })
 
  return (
    <Dialog open={isOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deskripsikan Diri Anda</DialogTitle>
        </DialogHeader> 
        <div className="w-full ">
        <Select onValueChange={mutate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Silahkan Pilih Peran Anda" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Guru">Guru</SelectItem>
            <SelectItem value="Siswa">Siswa</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WithQuery(RoleDialog);
