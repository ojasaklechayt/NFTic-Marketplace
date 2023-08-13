'use client'
import Image from "next/image";
import Navbar from "./navbar";
import Cat from "../public/cat.png";
import { useRouter } from 'next/navigation'
export default function Home() {
  let router = useRouter();
  return (
    <div className="homepage">
      <div className="absolute">
        <div className="relative">
        </div>
      </div>
      <Navbar router = {router} />
      <div className="flex flex-col justify-start items-center poppins h-[746px]">
        <h1 className="text-[1.6rem] md:text-[3rem] text-center mt-20">NFTic<br/> Marketplace</h1>
        <h3 className="text-[1.4rem]">Express your NFT love</h3>
        <Image src={Cat} alt="Cute Cat" className="pt-[60px] md:pt-[0px] w-[1000px] lg:w-[100%] opacity-60 md:ml-[-200px]" /> 
      </div>
    </div>
  );
}
