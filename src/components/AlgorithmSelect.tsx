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
        <option value="bubble">Slow 🐢</option>
        <option value="merge">Steady ⚖️</option>
        <option value="quick">Flash ⚡️</option>
        <option value="counting">Turbo 🚀</option>
      </select>
    </div>
  );
}
