export class StringExtensions
{
  public static isNullOrEmpty(value: string): boolean
  {
    return (value === undefined || value === null || value.trim().length === 0);
  }
}