import type { InputHTMLAttributes } from "react";

// InputPair가 input의 prop은 뭐든지 입력받을 수 있음.
export default function InputPair({
  label,
  description,
  textArea = false,
  ...rest
}: {
  label: string;
  description?: string;
  textArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className="space-y-2 flex flex-col">
      <label htmlFor={rest.id} className="flex flex-col gap-1">
        {label}
        <small className="text-muted-foreground">{description}</small>
      </label>
      {textArea ? (
        <textarea
          rows={4}
          className="min-h-[240px] resize-none p-3"
          {...rest}
        />
      ) : (
        <input className="p-3" {...rest} />
      )}
    </div>
  );
}
