import { useId, type ComponentPropsWithRef } from "react";

export function UsernameInput({
  id,
  label,
  ...rest
}: ComponentPropsWithRef<"input"> & {
  label: string;
}) {
  const generatedId = useId();

  const inputId = id ?? generatedId;

  return (
    <div className="form-group">
      <label htmlFor={inputId}>{label}</label>
      <input className="form-control" id={inputId} {...rest} />
    </div>
  );
}
