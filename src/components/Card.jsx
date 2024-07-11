import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

const Cards = ({ title, date, skor, id }) => {
  return (
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
            <Button className="w-full">Lihat Selengkapnya</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cards;
