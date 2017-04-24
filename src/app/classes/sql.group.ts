import { SqlVersion } from './sql.version';
import { SqlFeature } from './sql.feature';
import { SqlParameter } from './sql.parameter';
import { NameValue } from './name.value';

export class SqlGroup
{
  public Versions: SqlVersion[];
  public Features: SqlFeature[];
  public Parameters: SqlParameter[];
}