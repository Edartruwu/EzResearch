import { format } from "date-fns";

interface EditorDataProps {
  name: string;
  publishedAt: Date;
}

export default function EditorData({ name, publishedAt }: EditorDataProps) {
  const date = format(publishedAt, "MMMM dd, yyyy");

  return (
    <div className="flex flex-col gap-4 m-6">
      <p>{name}</p>
      <p>{date}</p>
    </div>
  );
}
