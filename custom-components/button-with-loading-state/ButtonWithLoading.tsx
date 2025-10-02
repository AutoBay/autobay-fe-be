import { Button } from "@/components/ui/button";
import Loader from "../Loader/Loader";

type ButtonWithLoadingProps = {
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  loading: boolean;
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({ className, type, variant, loading, text, icon, onClick }) => {
  return (
    <Button className={className} onClick={onClick} type={type} variant={variant}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {icon} {text}
        </>
      )}
    </Button>
  );
};

export default ButtonWithLoading;
