import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button, buttonVariants } from "@/components/ui/button";
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu";
  import { localTime } from "@/utils/localTime";
  import { Badge } from "@/components/ui/badge";
  import WithQuery from "@/utils/WithQuery";
  import DeleteQuiz from "@/components/quiz/DeleteQuiz";
  import { useState } from "react";
  
  export const getStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (now >= start && now <= end) {
      return "Buka";
    }
    return "Tutup";
  };
  const QuizCard = ({ data }) => {
    // Fungsi untuk menentukan status
    const [isDelete, setIsDelete] = useState(false);
    const [currentData, setCurrentData] = useState({ id: 0, title: "" })
  
  
  
    const status = getStatus(data.startDate, data.endDate);
    const truncateDesc = (desc, wordLimit) => {
      const words = desc.split(' ');
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
      }
      return desc;
    };
    const handleClick = (e) => {
      setIsDelete(!isDelete)
      setCurrentData({ id: e.id, title: e.title });
    }
    const truncatedDesc = truncateDesc(data.desc, 25);
  
    return (
      <>
        <DeleteQuiz isOpen={isDelete} data={currentData} setIsOpen={setIsDelete} />
        <ContextMenu>
          <ContextMenuTrigger>
            <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <div>
                  <div className="flex flex-wrap gap-2 py-2">
                    <CardTitle>{data.title}</CardTitle>
                    <Badge variant={`${status == "Buka" ? 'primary' : 'destructive'}`}>{status}</Badge>
                  </div>
                  <div className="flex gap-2 py-2 flex-wrap">
                    <Badge className={"bg-blue-600"}>Kelas {data.kelas.kelas}</Badge>
                    <Badge className={"bg-green-600"}>{data.mapel.mapel}</Badge>
                    <Badge className={"bg-yellow-500"}>TH : {data.tahun_ajaran.nama}</Badge>
                  </div>
                  <CardDescription>{`${localTime(data.start_quiz)} - ${localTime(data.end_quiz)}`}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 justify-start items-start">
                  <p className="text-xs">
                    {truncatedDesc}
                  </p>
                  <div className="w-full border">
                    <a
                      href={`/kuis/${data.id}`}
                      className={buttonVariants({ className: "w-full" })}
                    >
                      Lihat Selengkapnya
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <a href={`/kuis/${data.id}`}>Detail</a>
            </ContextMenuItem>
            <ContextMenuItem className="bg-red-500 text-white" onClick={() => handleClick({ id:data.id, title:data.id })}>Hapus</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </>
    );
  };
  
  
  
  
  export default WithQuery(QuizCard);
  