import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import WithQuery from "@/utils/WithQuery";
import axios from "axios";
import { DialogDescription } from "@radix-ui/react-dialog";
const LocalTime = ({ isoDateString }) => {
  const [localTimeString, setLocalTimeString] = useState("");

  useEffect(() => {
    const localTime = new Date(isoDateString).toLocaleString();
    setLocalTimeString(localTime);
  }, [isoDateString]);

  return <div>{localTimeString}</div>;
};
const UsersData = ({ data }) => {
  const [datas, setdata] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    setdata((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  const mutation = useMutation({
    mutationFn: async (event) => {
      event.preventDefault();
      const regist = await axios.post(`api/auth/register`, datas);
      return regist;
    },
    onSuccess: (data) => {
      // window.location.href = "/";
      setIsDialogOpen(false);
      window.location.reload();
      console.log(data)
    },
    onError: (error) => {
      setMsg(error.response.data.message);
     
    },
  });

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  return (
    <div className="border rounded-md">
      <div className="w-full flex justify-between items-end  border-b  p-2">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input type="search" id="search" placeholder="Search" />
        </div>
        <div className="flex items-end justify-end gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Buat Akun</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Buat Akun</DialogTitle>
                <DialogDescription className="text-red-600 text-xs">{msg}</DialogDescription> 
              </DialogHeader>
              <form autoComplete="false" onSubmit={mutation.mutate} method="post">
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="col-span-3"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      className="col-span-3"
                      onChange={handleChange}
                    />
                  </div>
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
                      name="passwordConfirm"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Buat Akun </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button className="w-max ">Cetak</Button>
        </div>
      </div>
      <Table>
        <TableCaption>Daftar Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Last Sign In</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ email, last_sign_in_at }) => (
            <TableRow key={email}>
              <TableCell className="font-medium">{email}</TableCell>
              <TableCell>
                <LocalTime isoDateString={last_sign_in_at} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default WithQuery(UsersData);
