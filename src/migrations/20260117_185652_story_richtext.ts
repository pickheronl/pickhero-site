import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_story_paragraphs\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story\` ADD \`content\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_story_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`is_highlighted\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_story\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_paragraphs_order_idx\` ON \`pages_blocks_story_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_paragraphs_parent_id_idx\` ON \`pages_blocks_story_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story\` DROP COLUMN \`content\`;`)
}
