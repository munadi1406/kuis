import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, 
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const EditMapel = ({ isDialogOpen, setIsDialogOpen, data, mutate }) => {
  const [datas,setDatas] = useState();
  
  const handleChange = (e) => {
    
    const name = e.target.name;
    setHpData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  const [kelas, setKelas] = useState();
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Kelas {data.kelas}</DialogTitle>
          <DialogDescription className="text-red-600 text-xs">
            {/* {msg} */}
          </DialogDescription>
        </DialogHeader>
        <form
          autoComplete="false"
          onSubmit={(e) => mutate.mutate({e, id: data.id, kelas })}
          method="post"
        >
          <div className="grid gap-4 py-4">
            <div>
            <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="imei" className="text-right">
                     IMEI
                    </Label>
                    <Input
                      id="imei"
                      name="imei"
                      type="text"
                      className="col-span-3"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="merk" className="text-right">
                     merk
                    </Label>
                    <Input
                      id="merk"
                      name="merk"
                      type="text"
                      className="col-span-3"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="harga" className="text-right">
                     harga
                    </Label>
                    <Input
                      id="harga"
                      name="harga"
                      type="number"
                      className="col-span-3"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tanggalPembuatan" className="text-right">
                     tanggal pembuatan
                    </Label>
                    <Input
                      id="tanggalPembuatan"
                      name="tanggalPembuatan"
                      type="date"
                      className="col-span-3"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-right">
                     foto
                    </Label>
                    <Input
                      id="email"
                      name="foto"
                      type="file"
                      className="col-span-3"
                      onChange={(e) => setFoto(e.target.files[0])}
                      required
                    />
                  </div>
                </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update kelas</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMapel;
