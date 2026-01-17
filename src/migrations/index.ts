import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260116_120053 from './20260116_120053';
import * as migration_20260116_201734 from './20260116_201734';
import * as migration_20260116_210153 from './20260116_210153';
import * as migration_20260116_213059 from './20260116_213059';
import * as migration_20260116_213251 from './20260116_213251';
import * as migration_20260117_150230 from './20260117_150230';
import * as migration_20260117_185652_story_richtext from './20260117_185652_story_richtext';
import * as migration_20260117_200049 from './20260117_200049';
import * as migration_20260117_202734 from './20260117_202734';

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
    name: '20260116_213059',
  },
  {
    up: migration_20260116_213251.up,
    down: migration_20260116_213251.down,
    name: '20260116_213251',
  },
  {
    up: migration_20260117_150230.up,
    down: migration_20260117_150230.down,
    name: '20260117_150230',
  },
  {
    up: migration_20260117_185652_story_richtext.up,
    down: migration_20260117_185652_story_richtext.down,
    name: '20260117_185652_story_richtext',
  },
  {
    up: migration_20260117_200049.up,
    down: migration_20260117_200049.down,
    name: '20260117_200049',
  },
  {
    up: migration_20260117_202734.up,
    down: migration_20260117_202734.down,
    name: '20260117_202734'
  },
];
