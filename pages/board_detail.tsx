import React, { useState, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { BoardFinder } from "@/src/Domain/Board/Service/BoardFinder";
import { GetServerSidePropsContext } from "next/types";
import Head from "next/head";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const boardFinder = new BoardFinder();
  const { id } = query;
  const propBoard = await boardFinder.findBoardAndDetail(Number(id));

  return {
    props: { propBoard },
  };
}

export default function BoardDetail({ propBoard }: any) {
  const [columns, setColumns] = useState(propBoard.columns); // Initial columns

  const [nameColumnAdd, setNameColumnAdd] = useState<string>(""); // Initial columns

  const handleAddColumn = () => {
    const newColumnName = window.prompt("Enter the column name:");
    if (newColumnName) {
      setColumns([...columns, { name: newColumnName, tasks: [] }]);
    }
  };

  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>{propBoard.name}</title>
      </Head>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">{propBoard.name}</h1>
        <DndContext>
          <div ref={boardRef} className="flex">
            {columns.map((column: any, index: number) => (
              <div
                className="p-4 bg-gray-100 rounded-md shadow-md m-2 w-80 min-w-[20%]"
                key={index}
              >
                <h2 className="text-xl font-semibold mb-4 text-black flex justify-center">
                  {column.name}
                </h2>
                <SortableContext
                  items={column.tasks.map((task: any) => task.id)}
                >
                  {column.tasks.map((task: any, taskIndex: number) => {
                    const {
                      attributes,
                      listeners,
                      setNodeRef,
                      transform,
                      transition,
                    } = useSortable({
                      id: task.id,
                    });

                    return (
                      <div
                        key={task.id}
                        ref={setNodeRef}
                        {...attributes}
                        {...listeners}
                        style={{
                          transform: transform
                            ? `translate(${transform.x}px, ${transform.y}px)`
                            : "",
                          transition,
                        }}
                        className="p-4 bg-white rounded-md shadow-md m-2"
                      >
                        <p className="text-lg">{task.title}</p>
                        <p className="text-gray-500">{task.description}</p>
                        <button className="mt-2 text-red-600 hover:underline">
                          Delete
                        </button>
                      </div>
                    );
                  })}
                </SortableContext>
                <button
                  className="btn bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    setNameColumnAdd("");
                    const modal: any =
                      document.getElementById("add_task_modal");
                    modal?.showModal?.(); // Use optional chaining
                  }}
                >
                  Add Task
                </button>
              </div>
            ))}
            <button
              className="btn m-2 bg-green-500 hover:bg-green-600 text-white"
              onClick={() => {
                setNameColumnAdd("");
                const modal: any = document.getElementById("add_column_modal");
                modal?.showModal?.(); //
              }}
            >
              Add Column
            </button>
          </div>
        </DndContext>
      </div>

      {/* model add Column*/}
      <dialog id="add_column_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Column</h3>
          <div className="mt-3">
            <div className="w-full">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full mt-1"
                value={nameColumnAdd}
                onChange={(e) => {
                  setNameColumnAdd(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              {nameColumnAdd !== "" ? (
                <button
                  className="btn bg-green-500 hover:bg-green-600 text-white mr-2"
                  onClick={async () => {
                    const url = `api/tasks/add_task`;
                    try {
                      const res = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          board_id: propBoard.id,
                          name: nameColumnAdd,
                        }), // Replace with your request data
                      });

                      if (res.ok) {
                        // Successful response
                        const resData = await res.json();
                        const column = resData.column;
                        column.tasks = [];
                        setColumns([...columns, column]);
                      } else {
                        // Handle HTTP error responses
                        console.error(
                          "HTTP error:",
                          res.status,
                          res.statusText
                        );
                      }
                    } catch (error) {
                      // Handle network or other errors
                      console.error("Error:", error);
                    }
                  }}
                >
                  Add
                </button>
              ) : null}
              <button className="btn bg-red-500 hover:bg-red-600 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* model add task*/}
      <dialog id="add_task_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Task</h3>
          <div className="mt-3">
            <div className="w-full">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full mt-1"
              />
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn bg-green-500 hover:bg-green-600 text-white mr-2"
                onClick={() => {}}
              >
                Add
              </button>
              <button className="btn bg-red-500 hover:bg-red-600 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

BoardDetail.auth = true;
