import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

const CardUser = ({ title, value }) => {
  return (
    <Card className="flex justify-center items-center flex-col p-2">
      <CardContent >
        <div className="flex flex-col gap-2 justify-center items-center ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {value}
          </h1>
        </div>
      </CardContent>
      <CardFooter className=" p-0 m-0">
        <CardTitle className="text-center">{title}</CardTitle>
      </CardFooter>
    </Card>
  ); 
};

export default CardUser;
