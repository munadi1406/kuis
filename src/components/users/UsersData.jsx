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
import { useEffect, useState, useRef, lazy } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import WithQuery from "@/utils/WithQuery";
import axios from "axios";
import { DialogDescription } from "@radix-ui/react-dialog";
const ChangePassword = lazy(() => import("./ChangePassword"));
import {
  Select, 
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "../ui/use-toast";
import {  generatePdf } from "./generatePdf";


const UsersData = () => {
  const [datas, setdata] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogPasswordOpen, setIsDialogPasswordOpen] = useState(false);
  const [userData, setUserdata] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [editUser, setEditUser] = useState({ username: "", id: 0 });
  const handleClickEditUser = ({ username, id }) => {
    setEditUser({
      username,
      id,
    });
  };
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    setdata((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  const tableRef = useRef();

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
    },
    onError: (error) => {
      setMsg(error.response.data.message);
    },
  });
  const roleChange = useMutation({
    mutationFn: async (datas) => {
      const changeRole = await axios.post(`api/user/role`, datas);
      return changeRole;
    },
    onSuccess: (data) => {
      toast({
        title: "Berhasil",
        description: `Role Berhasil Di ubah`,
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Role Gagal Di ubah`,
      });
    },
  });
  const getUserData = async (query) => {
    try {
      const response = await axios.get(`/api/user/data?search=${query}`);
      const dataSearch = response.data.data;
      
      setUserdata(dataSearch);
      return dataSearch;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error; // Menangani atau lempar kesalahan
    }
  };

  const handleSearchUsers = useMutation({
    mutationFn: async (username) => {
      const dataSearch = await getUserData(username);
      return dataSearch;
    },
  });

  let searchTimeout;
  const search = (e) => {
    const query = e.target.value;
    if (query.length > 3) {
      setIsSearch(true);
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(async () => {
        handleSearchUsers.mutate(query);
      }, 2000);
    } else {
      setIsSearch(false);
    }
  };

  useEffect(() => {
    if (!isSearch) {
      getUserData("");
    }
  }, [isSearch]);

  return (
    <div className="border rounded-md">
      <div className="w-full flex justify-between items-end  border-b  p-2">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            type="search"
            id="search"
            placeholder="Search"
            onChange={search}
          />
        </div>
        <div className="flex items-end justify-end gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                Buat Akun
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Buat Akun</DialogTitle>
                <DialogDescription className="text-red-600 text-xs">
                  {msg}
                </DialogDescription>
              </DialogHeader>
              <form
                autoComplete="false"
                onSubmit={mutation.mutate}
                method="post"
              >
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>Cetak</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
              <DialogHeader>
                <DialogTitle>Cetak</DialogTitle>
              </DialogHeader>
              <div>
                <div ref={tableRef}>
                  <div className="w-full mb-4 text-center text-xl font-semibold uppercase underline underline-offset-2">
                    Laporan Surat Masuk
                  </div>
                  <table className="border-collapse border border-black w-full">
                    <thead>
                      <tr>
                        <th className="border border-black py-2">No</th>
                        <th className="border border-black py-2">Username</th>
                        <th className="border border-black py-2">Email</th>
                        <th className="border border-black py-2">Role</th>
                      </tr>
                    </thead>

                    <tbody>
                      {userData &&
                        userData.map(
                          ({ email, username, role, id }, i) =>
                            role !== "admin" && (
                              <tr key={i}>
                                <td
                                  className={
                                    "border border-black text-center p-1 "
                                  }
                                >
                                  {i + 1}
                                </td>
                                <td className={"border border-black p-1"}>
                                  {username}
                                </td>
                                <td className={"border border-black p-1"}>
                                  {email}
                                </td>
                                <td className={"border border-black p-1"}>
                                  {role}
                                </td>
                              </tr>
                            )
                        )}
                    </tbody>
                  </table>
                </div>
                {/* <ReactToPrint
                  trigger={() => {
                    return <a href="#">Print this out!</a>;
                  }}
                  // content={() => tableRef.current}
                /> */}
              </div>
              <Button className="w-max " onClick={() => generatePdf(userData)}>
                Cetak
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table>
        <TableCaption>Daftar Users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {userData &&
            userData.map(
              ({ email, username, role, id_user }, i) =>
                (
                  <TableRow key={email}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium">{username}</TableCell>
                    <TableCell className="font-medium">{email}</TableCell>
                    <TableCell className="font-medium">
                      <Select
                        onValueChange={(e) =>
                          roleChange.mutate({ role: e, id:id_user })
                        }
                        disabled={roleChange.isPending}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={role} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin" >
                            Admin
                          </SelectItem>
                          <SelectItem value="users" > 
                            Users
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setIsDialogPasswordOpen(true),
                            handleClickEditUser({
                              username: username,
                              id:id_user,
                            });
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )
            )}
        </TableBody>
      </Table>
      <ChangePassword
        isDialogOpen={isDialogPasswordOpen}
        setIsDialogOpen={setIsDialogPasswordOpen}
        data={editUser}
      />
    </div>
  );
};
export default WithQuery(UsersData);
