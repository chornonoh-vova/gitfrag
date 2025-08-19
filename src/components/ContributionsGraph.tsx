import "./ContributionsGraph.css";

export function ContributionsGraph({
  contributions,
}: {
  contributions: string;
}) {
  return (
    <div className="contributions-graph-wrapper">
      <pre>{contributions}</pre>
    </div>
  );
}
