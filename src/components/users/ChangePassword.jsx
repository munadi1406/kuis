import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const ChangePassword = ({ isDialogOpen, setIsDialogOpen, data }) => {
  const [datas, setdata] = useState({});
  const [msg, setMsg] = useState();
  const { toast } = useToast();
  const handleChange = (e) => {
    const name = e.target.name;
    setdata((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const changePassword = axios.post("api/user/password-ad", {
        ...datas,
        id: data.id,
      });

      return changePassword;
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      toast({
        title: "Berhasil",
        description: `Password Untuk ${data.username} Berhasil Di Ganti`,
      });
    },
    onError: (error) => {
      setMsg(error.response.data.message);
    },
  });
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ganti Password {data.username}</DialogTitle>
            <DialogDescription className="text-red-600 text-xs">
              {msg}
            </DialogDescription>
          </DialogHeader>
          <form autoComplete="false" onSubmit={mutate} method="post">
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="col-span-3"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confPassword" className="text-right">
                  Konfirmasi Password
                </Label>
                <Input
                  id="confPassword"
                  type="password"
                  className="col-span-3"
                  onChange={handleChange}
                  name="confirmPassword"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
