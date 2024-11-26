import Matrix from "../matrix-shape-generator";

const Rectangle = () => {
  return (
    <div className="md:block hidden absolute top-[15%] -translate-x-1/2 left-0 shadow-sm dark:shadow-white shadow-black h-[9.69rem] w-[9.69rem] border-purple-400 border-[0.05rem]" />
  );
};

export default function Decorations() {
  return (
    <>
      {/* <Rectangle /> */}
      <Matrix
        className="absolute right-0 hidden md:grid top-1/2"
        rows={5}
        columns={5}
      />
    </>
  );
}
