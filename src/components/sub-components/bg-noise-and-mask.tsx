import Rays from "./hero/masks";

export default function Noise() {
  return (
    <>
      <div className="absolute inset-0 z-0 min-h-screen opacity-10">
        <div className="absolute inset-0 bg-repeat bg-[length:150px_auto] bg-left-top bg-[url('/noise.png')]" />
      </div>
      <Rays />
    </>
  );
}
