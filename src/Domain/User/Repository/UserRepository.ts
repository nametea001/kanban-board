import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt"; //hash and compare
export class UserRepository {
  private prisma = new PrismaClient();

  async userInsert(data: any) {
    let resData: any = null;
    try {
      if ("password" in data) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
        resData = await this.prisma.users.create({
          data: data,
          select: {},
        });
      }
    } catch (err) {
      // console.log(err);
      resData = null;
    }
    this.prisma.$disconnect();
    return resData;
  }

  async userEdit(data: any, userId: number) {
    let resData: any = null;
    try {
      resData = await this.prisma.users.update({
        where: { id: userId },
        data: data,
        select: {
          id: true,
          username: true,
          first_name: true,
          last_name: true,
        },
      });
    } catch (err) {
      resData = null;
    }
    this.prisma.$disconnect();
    return resData;
  }

  async changePassword(data: any, userId: number) {
    let resData: any = null;
    try {
      if ("password" in data) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
        resData = await this.prisma.users.update({
          where: { id: userId },
          data: data,
          select: {
            id: true,
          },
        });
      } else {
        resData = null;
      }
    } catch (err) {
      resData = false;
    }
    this.prisma.$disconnect();
    return resData;
  }

  async findUsers(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.user_id) {
      param.push({ id: Number(data.user_id) });
    }
    if (data.username) {
      param.push({ username: data.username.toString() });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty

    let user: any;
    try {
      user = await this.prisma.users.findMany({
        where: whereData,
        select: {
          id: true,
          username: true,
          first_name: true,
          last_name: true,
        },
      });
    } catch (err) {
      user = null;
    }
    this.prisma.$disconnect();
    return user;
  }

  async findUserForCheckRegister(data: any) {
    //  praram controll
    let param: any[] = [];
    if (data.user_id) {
      param.push({ id: Number(data.user_id) });
    }
    if (data.username) {
      param.push({ username: data.username.toString() });
    }
    let whereData = param.length !== 0 ? { AND: param } : {}; //check param is empty
    let user: any;
    try {
      user = await this.prisma.users.findFirst({
        where: whereData,
        select: {
          id: true,
        },
      });
    } catch (err) {
      user = null;
    }
    this.prisma.$disconnect();
    return user;
  }

  async checkLogin(username: string, password: string) {
    if (username !== "" && password !== "") {
      let user: any;
      try {
        user = await this.prisma.users.findFirst({
          where: {
            username: `${username}`,
          },
          select: {
            id: true,
            username: true,
            password: true,
            first_name: true,
            last_name: true,
          },
        });
      } catch {
        user = null;
      }

      this.prisma.$disconnect();
      if (user && bcrypt.compareSync(password, user.password)) {
        delete user.password;
        return user;
      }
      return user;
    }
  }

  async getUpdateByID(userID: number) {
    let user: any;
    try {
      user = await this.prisma.users.findFirst({
        where: { id: userID },
        select: {
          id: true,
          username: true,
          password: true,
          first_name: true,
          last_name: true,
        },
      });
    } catch {
      user = null;
    }
    this.prisma.$disconnect();
    return user;
  }
}
