import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const Cards = ({ title, date, skor, id }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card>  
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 justify-center items-center ">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {skor}
              </h1>
              <div className="w-full border">
                <a
                  href={`/kuis/${id}`}
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
          <a href={`/kuis/${id}`}>Detail</a>
        </ContextMenuItem>
        <ContextMenuItem className="bg-red-500 text-white">Hapus</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Cards;
