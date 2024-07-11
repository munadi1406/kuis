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
  DialogFooter
} from "@/components/ui/dialog";

export default function UsersData({ data }) {
  return (
    <div className="border rounded-md">
      <div className="w-full flex justify-between items-end  border-b  p-2">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input type="search" id="search" placeholder="Search" />
        </div>
        <div className="flex items-end justify-end gap-2">
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Buat Akun</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Buat Akun</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div>
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" className="col-span-3" />
                </div>
                <div>
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input id="password" type="password" className="col-span-3" />
                </div>
                <div>
                  <Label htmlFor="confPassword" className="text-right">
                    Konfirmasi Password
                  </Label>
                  <Input
                    id="confPassword"
                    type="password"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Buat Akun </Button>
              </DialogFooter>
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
                {new Date(last_sign_in_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
