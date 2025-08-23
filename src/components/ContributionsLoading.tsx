import { Spinner } from "./Spinner";
import classes from "./ContributionsLoading.module.css";

export function ContributionsLoading() {
  return (
    <div className={classes.contributionsLoading}>
      <Spinner />
    </div>
  );
}
