import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`cta_text\` text DEFAULT 'Start gratis proefperiode',
  	\`cta_link\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_callout_order_idx\` ON \`pages_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_callout_parent_id_idx\` ON \`pages_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_callout_path_idx\` ON \`pages_blocks_callout\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_callout\`;`)
}
