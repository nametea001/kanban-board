import type { NextApiRequest, NextApiResponse } from "next";
import { ColumnUpdater } from "@/src/Domain/Column/Service/ColumnUpdater";
import { getToken } from "next-auth/jwt";
import { UserType } from "@/src/Domain/User/Type/TyeUser";

export default async function addTask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405);
  }
  let tokenVerify: UserType | null = null;
  try {
    const temp: any = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (temp) {
      tokenVerify = temp.user;
    } else {
      return res.status(401);
    }
  } catch (err) {
    return res.status(401);
  }

  let viewData: any = {};
  const dataBody: any = req.body;
  const columnUpdater = new ColumnUpdater();
  const column = await columnUpdater.columnInsert(
    dataBody,
    dataBody.column_id,
    tokenVerify!.id
  );

  if (column) {
    viewData.message = "Add Column Successful";
    viewData.error = false;
    viewData.column = column;
    return res.status(200).send(viewData);
  } else {
    return res.status(500);
  }
}
