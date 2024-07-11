import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,

} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "./Link";

const DashboardNav = ({ title }) => {
  return (
    <div className="flex justify-between py-2">
      <h1 className="capitalize scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">Kerjakan Kuis</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Kerjakan Kuis</DialogTitle>
              
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="">
                <Label htmlFor="name" className="text-right">
                  Masukkan Token Kuis
                </Label>
                <Input id="token" className="col-span-3" />
              </div>
            </div>
            <div>
              <Button type="submit" className="border">
                Kerjakan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Link to={"/history"} text={"History Pengerjaan Kuis"} variants={"outline"}/>
        <Link to={"/createKuis"} text={"Buat Kuis"} />
      </div>
    </div>
  );
};

export default DashboardNav;
