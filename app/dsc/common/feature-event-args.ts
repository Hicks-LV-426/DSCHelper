export class FeatureEventArgs
{
  constructor(features: string[], ensure: string, credentialName: string)
  {
    this.features = features;
    this.ensure = ensure;
    this.credentialName = credentialName;
  }
  features: string[];
  ensure: string;
  credentialName: string;
}