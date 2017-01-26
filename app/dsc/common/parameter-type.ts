export class ParameterType {
  public static STRING : string = "String";
  public static NUMBER : string = "Number";
  public static BOOLEAN : string = "Boolean";
  public static PASSWORD : string = "Password";
  public static getTypes() : string[]
  {
    return [this.STRING, this.NUMBER, this.BOOLEAN];
  }
}