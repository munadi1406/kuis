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
              <Label htmlFor="email" className="text-right">
                Kelas
              </Label>
              <Input
                id="email"
                name="email"
                type="text"
                className="col-span-3"
                onChange={(e) => setKelas(e.target.value)}
                defaultValue={data.kelas} 
              />
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
