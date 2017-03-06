import { Option } from './option';

export class Optionset
{
  private options: Option[] = [];
  public getOptions(): Option[]
  {
    return this.options;
  }
  public setOption(name: string, value: string, asIs: boolean = false)
  {
    var option = this.getOption(name);
    if (option === undefined)
    {
      option = new Option();
      option.name = name;
      option.value = value;
      option.asIs = asIs;
      this.options.push(option);
    }
    else
    {
      option.value = value;
    }
  }
  public removeOption(name: string)
  {
    var option = this.options.findIndex(o => o.name === name);
    if (option != -1) this.options.splice(option, 1);
  }
  public getOption(name: string): Option
  {
    return this.options.find(o => o.name === name);
  }
  public getOptionValue(name: string): string
  {
    var option = this.getOption(name);
    if (option === undefined) return '';
    else return option.value;
  }

}