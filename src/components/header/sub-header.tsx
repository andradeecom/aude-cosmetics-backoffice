import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

type SubHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export const SubHeader = ({ title, description, actions }: SubHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" className="cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && (
          <>
            <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
            <p className="text-muted-foreground">{description}</p>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
};
