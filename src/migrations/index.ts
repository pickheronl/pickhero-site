import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260116_120053 from './20260116_120053';
import * as migration_20260116_201734 from './20260116_201734';
import * as migration_20260116_210153 from './20260116_210153';
import * as migration_20260116_213059 from './20260116_213059';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260116_120053.up,
    down: migration_20260116_120053.down,
    name: '20260116_120053',
  },
  {
    up: migration_20260116_201734.up,
    down: migration_20260116_201734.down,
    name: '20260116_201734',
  },
  {
    up: migration_20260116_210153.up,
    down: migration_20260116_210153.down,
    name: '20260116_210153',
  },
  {
    up: migration_20260116_213059.up,
    down: migration_20260116_213059.down,
    name: '20260116_213059'
  },
];
