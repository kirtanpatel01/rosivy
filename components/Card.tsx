import Image from "next/image"
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const Card = ({ card }: { card: ProductCard }) => {
  return (
    <div className="cont1 w-fit flex flex-col items-center justify-between gap-2 md:gap-3">
      <Image src={card.image} alt="green_bukey" height={200} width={200} className="rounded-lg size-32 md:size-52" />
      <div className="w-full flex items-center justify-between border p-2 sm:p-4 rounded-lg border-p4 bg-p2/10">
        <div className="flex flex-col gap-1">
          <span className="font-medium md:font-semibold s text-sm md:text-lg w-32 md:w-32 truncate ">{card.name}</span>
          <span className="text-p9 md:font-medium text-xs">{card.price}</span>
        </div>
        <button className="text-p6 cursor-pointer">
          {true ? <IoHeart className="size-5 md:size-7" /> : <IoHeartOutline className="size-5 md:size-7" />}
        </button>
      </div>

      <button className="nav-btn">Buy</button>
    </div>
  )
}

export default Card