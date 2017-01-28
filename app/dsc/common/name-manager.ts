export class NameManager 
{
  names : Array<{id: string, name: string}> = [];
  incrementor : number = 1;

  getName(id : string, name : string, type: string) : string
  {
    var i = this.names.find(n => n.id === id);
    if(i != undefined) return i.name;

    var newName : string = `${name}${type}`;

    if(this.names.find(i => i.name === newName))
      newName = newName + this.incrementor++;
    
    return newName;
  }
}