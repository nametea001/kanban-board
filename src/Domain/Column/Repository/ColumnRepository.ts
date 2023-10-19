import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt"; //hash and compare
export class ColumnRepository {
  private prisma = new PrismaClient();

  async columnInsert(data: any) {
    let resData: any = null;
    try {
      resData = await this.prisma.columns.create({
        data: data,
        select: {
          id: true,
          name: true,
        },
      });
    } catch (err) {
      resData = null;
    }
    this.prisma.$disconnect();
    return resData;
  }

  async columnEdit(data: any, columnID: number) {
    let resData: any = null;
    try {
      resData = await this.prisma.columns.update({
        where: { id: columnID },
        data: data,
        select: {},
      });
    } catch (err) {
      resData = null;
    }
    this.prisma.$disconnect();
    return resData;
  }

  async findColumns() {
    let column: any;
    try {
      column = await this.prisma.columns.findMany({
        select: {
          id: true,
          name: true,
        },
      });
    } catch (err) {
      column = null;
    }
    this.prisma.$disconnect();
    return column;
  }
}
