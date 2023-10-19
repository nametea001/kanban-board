import { BoardRepository } from "../Repository/BoardRepository";

export class BoardUpdater {
  private boardReposotory = new BoardRepository();

  async boardEdit(data: any, boardId: number, updateBy: number) {
    let row = this.MapToRow(data, updateBy);
    return await this.boardReposotory.boardEdit(row, boardId);
  }

  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};

    if ("boardname" in data) {
      result.boardname = data.boardname;
    }
    if ("password" in data) {
      result.password = data.password;
    }
    if ("first_name" in data) {
      result.first_name = data.first_name;
    }
    if ("last_name" in data) {
      result.last_name = data.last_name;
    }

    if (Object.keys(result).length !== 0) {
      let dataTime = new Date();
      // dataTime.setHours(dataTime.getHours() + 7);

      if (create) {
        result.created_at = dataTime;
        result.created_user_id = updateBy;
      }
      result.updated_at = dataTime;
      result.updated_user_id = updateBy;
    }

    return result;
  }
}
