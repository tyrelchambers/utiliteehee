import { toast } from "sonner";

export const copy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};
