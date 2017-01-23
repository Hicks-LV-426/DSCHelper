export class Parameter {
  name : string;
  type : string;
  value : string;
  serialize() : string
  {
    switch (this.type) {
      case "boolean":
        return `$${this.name} = $${this.value};`;
      case "number":
        return `$${this.name} = ${this.value};`;
      default:
        return `$${this.name} = "${this.value};"`;
    }
  }
}