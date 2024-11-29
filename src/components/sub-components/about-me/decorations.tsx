import Matrix from "../matrix-shape-generator";

export default function Decorations() {
  return (
    <Matrix
      className="absolute right-0 hidden md:grid top-1/2"
      rows={5}
      columns={5}
    />
  );
}
