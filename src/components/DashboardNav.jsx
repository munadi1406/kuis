import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "./Link";

import ButtonLabel from "./ButtonLabel";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import WithQuery from "@/utils/WithQuery";
import ButtonLoader from "./ButtonLoader";
import TakeQuiz from "./quiz/TakeQuiz";

const DashboardNav = ({ title, role }) => {
  const [token, setToken] = useState("")
  const [msg, setMsg] = useState("")
  const [dataQuiz, setDataQuiz] = useState({});
  const [status, setStatus] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault()
    
      const take = await axios.post('/api/quiz/take', {
        tokenQuiz: token
      })
      return take.data
    }, onSuccess: (data) => {
      setDataQuiz(data.data)
      setStatus(true);
    }, onError: (error) => {
      setMsg(error.response.data.message);

    }

  })





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
            <TakeQuiz isPending={isPending} mutate={mutate} setToken={setToken} data={dataQuiz} msg={msg} status={status}/>
          </DialogContent>
        </Dialog>

        <Link
          to={"/history"}
          text={"History Pengerjaan Kuis"}
          variants={"outline"}
        />

        {role !== "Siswa" && <Link to={"/createKuis"} text={"Buat Kuis"} />}
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
            <TakeQuiz isPending={isPending} mutate={mutate} setToken={setToken} data={dataQuiz} msg={msg} status={status}/>
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
        {role !== "Siswa" && (
          <a href="/createKuis">
            <ButtonLabel
              text={"Buat Kuis"}
              trigger={
                <span className="material-symbols-outlined">add_circle</span>
              }
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default WithQuery(DashboardNav);
