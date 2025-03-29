import Card from "@/components/Card";
import { products } from "@/lib/constants";

export default function Home() {
  return (
    <div className="cont bg-p1">
      <ul className="flex flex-wrap justify-evenly gap-4 md:gap-8 p-4 md:p-8">
        {products.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </ul>
    </div>
  );
}