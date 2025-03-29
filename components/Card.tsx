import Image from "next/image"
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const Card = ({ card }: { card: ProductCard }) => {
  return (
    <div className="cont1 w-fit flex flex-col items-center justify-between gap-2 sm:gap-3">
      <Image src={card.image} alt="green_bukey" height={200} width={200} className="rounded-lg size-36" />
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-medium sm:font-semibold sm:text-lg w-32 sm:w-52 text-wrap ">{card.name}</span>
          <span className="text-p9 sm:font-medium">{card.price}</span>
        </div>
        <button className="text-p6 cursor-pointer">
          {true ? <IoHeart className="size-5 sm:size-7" /> : <IoHeartOutline className="size-5 sm:size-7" />}
        </button>
      </div>

      <button className="nav-btn">Buy</button>
    </div>
  )
}

export default Card