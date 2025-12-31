import Image from "next/image";

export default function ClientLogo() {
  return (
    <div id="client-logo">
      {/* <img
        src="/iestacio_logo.png"
        alt="ies estació logo"
        className="w-[100px] h-20 xl:w-[153px] xl:h-[100px]"
      /> */}
      <Image
        src="/iestacio_logo.png"
        alt="ies estació logo"
        width={153}
        height={100}
      />
    </div>
  );
}
