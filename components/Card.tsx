import Image from "next/image"
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const Card = ({ card }: { card: ProductCard }) => {
  return (
    <div className="cont1 w-fit flex flex-col items-center justify-between gap-2 md:gap-3">
      <Image src={card.image} alt="green_bukey" height={200} width={200} className="rounded-lg size-40 min-[300px]:size-28 min-[345px]:size-32 md:size-44" />
      <div className="w-full flex items-center justify-between border p-2 sm:p-2 rounded-lg border-p4 bg-p2/10">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm min-[345px]:base w-28 min-[300px]:w-20 min-[345px]:w-24 md:w-32 truncate">{card.name}</span>
          <span className="text-p9 md:font-medium text-sm min-[345px]:base">{card.price}</span>
        </div>
        <button className="text-p6 cursor-pointer">
          {true ? <IoHeart className="size-5 md:size-6" /> : <IoHeartOutline className="size-5 md:size-6" />}
        </button>
      </div>

      <button className="nav-btn">Buy</button>
    </div>
  )
}

export default Card