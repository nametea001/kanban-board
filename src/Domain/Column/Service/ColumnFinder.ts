import { ColumnRepository } from "../Repository/ColumnRepository";

export class ColumnFinder {
  private columnRepository = new ColumnRepository();

  async findColumns() {
    return await this.columnRepository.findColumns();
  }
}
