import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt"; //hash and compare
export class BoardRepository {
  private prisma = new PrismaClient();

  async boardInsert(data: any) {
    let resData: any = null;
    try {
      resData = await this.prisma.boards.create({
        data: data,
        select: {},
      });
    } catch (err) {
      // console.log(err);
      resData = null;
    }
    this.prisma.$disconnect();
    return resData;
  }

  async boardEdit(data: any, boardId: number) {
    let resData: any = null;
    try {
      resData = await this.prisma.boards.update({
        where: { id: boardId },
        data: data,
        select: {},
      });
    } catch (err) {
      resData = null;
    }
    this.prisma.$disconnect();
    return resData;
  }

  async findBoards() {
    let board: any;
    try {
      board = await this.prisma.boards.findMany({
        select: {
          id: true,
          name: true,
        },
      });
    } catch (err) {
      board = null;
    }
    this.prisma.$disconnect();
    return board;
  }

  async findBoardAndDetail(boardID: number) {
    let board: any;
    try {
      board = await this.prisma.boards.findFirst({
        where: { id: boardID },
        select: {
          id: true,
          name: true,
          columns: {
            select: {
              id: true,
              name: true,
              tasks: {
                select: {
                  id: true,
                  name: true,
                  position: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      board = null;
    }
    this.prisma.$disconnect();
    return board;
  }

  async getUpdateByID(boardID: number) {
    let board: any;
    try {
      board = await this.prisma.boards.findFirst({
        where: { id: boardID },
        select: {},
      });
    } catch {
      board = null;
    }
    this.prisma.$disconnect();
    return board;
  }
}
