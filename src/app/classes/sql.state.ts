export class SqlState
{
  version: string = '';

  /* FEATURES */
  features: string[] = [];
  hasFeature(feature: string): boolean
  {
    return this.features.indexOf(feature) > -1;
  }
  addFeature(feature: string)
  {
    if (this.hasFeature(feature)) return;

    this.features.push(feature);
  }
  removeFeature(feature: string)
  {
    if (!this.hasFeature(feature)) return;

    this.features.splice(this.features.indexOf(feature));
  }
}