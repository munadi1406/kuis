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
import { localTime } from "@/utils/localTime";
import { Badge } from "./ui/badge";

export const getStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now >= start && now <= end) {
    return "Buka";
  }
  return "Tutup";
};
const Cards = ({ title, startDate, endDate, skor, id ,desc}) => {
  // Fungsi untuk menentukan status

  const status = getStatus(startDate, endDate);
  const truncateDesc = (desc, wordLimit) => {
    const words = desc.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return desc;
  };

  const truncatedDesc = truncateDesc(desc, 25);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card>
          <CardHeader>
            <div>
              <div className="flex flex-wrap gap-2 py-2">
                <CardTitle>{title}</CardTitle>
                <Badge variant={`${status == "Buka" ? 'primary' : 'destructive'}`}>{status}</Badge>
              </div>
              <CardDescription>{`${localTime(startDate)} - ${localTime(endDate)}`}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 justify-start items-start">
              <p className="text-xs">
              {truncatedDesc}
              </p>
              {/* <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {skor}
              </h1> */}

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
