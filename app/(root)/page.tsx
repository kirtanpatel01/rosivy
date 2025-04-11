import { auth } from "@/auth";
import Card from "@/components/Card";
import { products } from "@/lib/constants";

export default async function Home() {
  // const session = await auth();
  // {
  //   user: {
  //     name: 'Kirtan Patel',
  //     email: 'kjpatel200022@gmail.com',
  //     image: 'https://lh3.googleusercontent.com/a/ACg8ocLfPrPwAmAOS0XwXFqGkV4JIhQuAw3MVSMiNEvajfr5qBvN7XfzXQ=s96-c'
  //   },
  //   expires: '2025-04-30T07:38:08.915Z'
  // }
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