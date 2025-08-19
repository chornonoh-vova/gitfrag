import { Spinner } from "./Spinner";
import "./ContributionsLoading.css";

export function ContributionsLoading() {
  return (
    <div className="contributions-loading-wrapper">
      <Spinner />
    </div>
  );
}
