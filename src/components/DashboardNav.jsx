import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
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

import ButtonLabel from "./ButtonLabel";

const DashboardNav = ({ title }) => {
  return (
    <div className="flex justify-between py-2 md:p-0 p-2 md:border-b-0 border-b-2 border-black md:relative sticky top-0 bg-white/90 backdrop-blur-sm z-10">
      <h1 className="capitalize scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <div className=" gap-2 md:flex hidden">
        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: "outline" })}>
            Kerjakan Kuis
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
        <Link
          to={"/history"}
          text={"History Pengerjaan Kuis"}
          variants={"outline"}
        />
        <Link to={"/createKuis"} text={"Buat Kuis"} />
      </div>
      <div className="md:hidden gap-2 flex">
        <Dialog>
          <DialogTrigger className="flex justify-center items-center ">
            <ButtonLabel
              text={"Kerjakan Kuis"}
              trigger={
                <span className="material-symbols-outlined">commit</span>
              }
            />
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

        <a href="/history">
          <ButtonLabel
            text={"History Pengerjaan Kuis"}
            trigger={
              <span className="material-symbols-outlined">schedule</span>
            }
          />
        </a>
        <a href="/createKuis">
          <ButtonLabel
            text={"Buat Kuis"}
            trigger={
              <span className="material-symbols-outlined">add_circle</span>
            }
          />
        </a>
      </div>
    </div>
  );
};

export default DashboardNav;
