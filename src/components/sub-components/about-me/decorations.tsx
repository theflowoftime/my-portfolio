import Matrix from "../matrix-shape-generator";

const Rectangle = () => {
  return (
    <div
      className="md:block hidden absolute top-[15%] -translate-x-1/2 left-0 shadow-sm shadow-black h-[9.69rem] w-[9.69rem] 
                   before:content-[''] before:absolute before:inset-0 before:-z-10
           before:bg-gradient before:bg-[length:400%_400%] before:opacity-90 before:animate-gradient"
    />
  );
};

export default function Decorations() {
  return (
    <>
      <Rectangle />
      <Matrix
        className="absolute right-0 hidden md:grid top-1/2"
        rows={5}
        columns={5}
      />
    </>
  );
}
