export class FirewallRuleEventArgs
{
  private _present: boolean;
  public get present(): boolean
  {
    return this._present;
  }
  private _enabled: boolean;
  public get enabled(): boolean
  {
    return this._enabled;
  }
  private _builtIn: boolean;
  public get builtIn(): boolean
  {
    return this._builtIn;
  }
  private _name: string;
  public get name(): string
  {
    return this._name;
  }

  private constructor() { }

  public static getBuiltIn(name: string, enabled: boolean): FirewallRuleEventArgs
  {
    var e = new FirewallRuleEventArgs();
    e._builtIn = true;
    e._name = name;
    e._present = true;
    e._enabled = enabled;
    return e;
  }
}