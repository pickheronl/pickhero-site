import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_intro\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_intro_order_idx\` ON \`pages_blocks_intro\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_intro_parent_id_idx\` ON \`pages_blocks_intro\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_intro_path_idx\` ON \`pages_blocks_intro\` (\`_path\`);`)
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
  await db.run(sql`CREATE TABLE \`pages_blocks_story\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_order_idx\` ON \`pages_blocks_story\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_parent_id_idx\` ON \`pages_blocks_story\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_path_idx\` ON \`pages_blocks_story\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_pricing_page\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge\` text DEFAULT 'Prijzen',
  	\`title\` text,
  	\`subtitle\` text,
  	\`show_filters\` integer DEFAULT true,
  	\`show_comparison\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_pricing_page_order_idx\` ON \`pages_blocks_pricing_page\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pricing_page_parent_id_idx\` ON \`pages_blocks_pricing_page\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pricing_page_path_idx\` ON \`pages_blocks_pricing_page\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_intro\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_story_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_story\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pricing_page\`;`)
}
