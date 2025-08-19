import { useId, type ComponentPropsWithRef } from "react";

export function AlgorithmSelect({
  label,
  id,
  ...rest
}: ComponentPropsWithRef<"select"> & {
  label: string;
}) {
  const generatedId = useId();

  const selectId = id ?? generatedId;

  return (
    <div className="form-group">
      <label htmlFor={selectId}>{label}</label>
      <select className="form-select" id={selectId} {...rest}>
        <option value="bubble">Slow (legacy)</option>
        <option value="merge">Efficient</option>
        <option value="quick">Enterprise</option>
        <option value="radix">Turbo</option>
      </select>
    </div>
  );
}
