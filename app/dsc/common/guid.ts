export class Guid {
  public static getNewId() : string
  {
     return (new Date().toISOString());
  }
}