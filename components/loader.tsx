import Image from "next/image";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <Image
      src={"/icons/loading-circle.svg"}
      alt="loading-circle"
      width={50}
      height={50}
    />
  </div>
);

export default Loader;
