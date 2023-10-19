import { ColumnRepository } from "../Repository/ColumnRepository";

export class ColumnUpdater {
  private columnReposotory = new ColumnRepository();

  async columnInsert(data: any, columnID: number, updateBy: number) {
    let row = this.MapToRow(data, updateBy, true);
    return await this.columnReposotory.columnInsert(row);
  }
  async columnEdit(data: any, columnID: number, updateBy: number) {
    let row = this.MapToRow(data, updateBy);
    return await this.columnReposotory.columnInsert(row);
  }

  private MapToRow(data: any, updateBy: number, create: boolean = false) {
    let result: any = {};
    if ("board_id" in data) {
      result.board_id = data.board_id;
    }
    if ("name" in data) {
      result.name = data.name;
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
