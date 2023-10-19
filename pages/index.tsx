import { useRouter } from "next/router";
import { BoardFinder } from "@/src/Domain/Board/Service/BoardFinder";
import Head from "next/head";

export async function getServerSideProps() {
  const boardFinder = new BoardFinder();
  const propBoard = await boardFinder.findBoards();
  return {
    props: { propBoard }, // will be passed to the page component as props
  };
}

export default function KanbanBoard({ propBoard }: any) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Board </title>
      </Head>
      <div className="">
        <h1 className="text-2xl font-bold mb-4 text-white ">Kanban Board</h1>
        <div className="flex space-x-4">
          {propBoard.map((board: any) => (
            <div
              key={board.id}
              className="w-1/3 cursor-pointer"
              onClick={() => {
                router.push("/board_detail?id=" + board.id);
              }}
            >
              <div className="bg-gray-500 hover:bg-gray-600 p-8 mb-4 rounded-lg text-center flex items-center justify-center">
                <h2 className="text-lg font-bold text-white">{board.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
KanbanBoard.auth = true;
