import { NameValue } from './name.value';

export class SqlParameter
{
  public Name: string;
  public Description: string;
  public Code: string;
  public Values: NameValue[];
  public IsMandatory: boolean;
  public DefaultValue: string;
  public RelatedFeatures: string[];
}