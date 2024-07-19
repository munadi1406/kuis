import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "./ui/button";

const ButtonLoader = ({ text, loading,className, ...props }) => {
  return (
    <Button {...props} className={`space-x-2 gap-2 flex ${className}`}>
        {text}
      <ClipLoader
        color={"white"}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Button>
  );
};

export default ButtonLoader;
