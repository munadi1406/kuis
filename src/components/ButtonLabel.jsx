import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button,buttonVariants } from "./ui/button";

const ButtonLabel = ({ text, trigger }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={buttonVariants({variant:"outline" ,className:"text-xl"})} asChild>
          {trigger}
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonLabel;
