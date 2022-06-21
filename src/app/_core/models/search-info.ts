interface ISearchInfo {
  checkIn?: Date,
  checkOut?: Date,
  adultsNum?: number,
  childrenNum?: number,
  infantsNum?: number,
  petsNum?: number
}

export class SearchInfo implements ISearchInfo {
  checkIn = new Date();
  checkOut = new Date();
  adultsNum = 0;
  childrenNum = 0;
  infantsNum = 0;
  petsNum = 0;

  constructor() {
    this.checkOut.setDate(this.checkIn.getDate() + 1);
  }
}

export const searchInfo = new SearchInfo()
