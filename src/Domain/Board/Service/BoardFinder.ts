import { BoardRepository } from "../Repository/BoardRepository";

export class BoardFinder {
  private boardRepository = new BoardRepository();

  async getUpdateByID(boardID: number) {
    return await this.boardRepository.getUpdateByID(boardID);
  }

  async findBoards() {
    return await this.boardRepository.findBoards();
  }

  async findBoardAndDetail(boardID: number) {
    return await this.boardRepository.findBoardAndDetail(boardID);
  }
}
