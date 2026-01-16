import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_integrations_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge\` text DEFAULT 'Integraties',
  	\`title\` text,
  	\`subtitle\` text,
  	\`cta_text\` text DEFAULT 'Mis je een integratie?',
  	\`cta_link_text\` text DEFAULT 'Laat het ons weten',
  	\`cta_link\` text DEFAULT '/contact',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_integrations_ticker_order_idx\` ON \`pages_blocks_integrations_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_integrations_ticker_parent_id_idx\` ON \`pages_blocks_integrations_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_integrations_ticker_path_idx\` ON \`pages_blocks_integrations_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_integrations_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge\` text DEFAULT 'Integraties',
  	\`title\` text,
  	\`subtitle\` text,
  	\`show_filters\` integer DEFAULT true,
  	\`cta_text\` text DEFAULT 'Start gratis proefperiode',
  	\`cta_link\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_integrations_grid_order_idx\` ON \`pages_blocks_integrations_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_integrations_grid_parent_id_idx\` ON \`pages_blocks_integrations_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_integrations_grid_path_idx\` ON \`pages_blocks_integrations_grid\` (\`_path\`);`)
  await db.run(sql`DROP TABLE \`pages_blocks_integrations\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`cta_link\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`title_highlight\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta\` ADD \`cta_link\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_features\` DROP COLUMN \`title_highlight\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`title_highlight\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pricing\` DROP COLUMN \`title_highlight\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_integrations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge\` text DEFAULT 'Integraties',
  	\`title\` text,
  	\`title_highlight\` text,
  	\`subtitle\` text,
  	\`cta_text\` text DEFAULT 'Mis je een integratie? Laat het ons weten',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_integrations_order_idx\` ON \`pages_blocks_integrations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_integrations_parent_id_idx\` ON \`pages_blocks_integrations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_integrations_path_idx\` ON \`pages_blocks_integrations\` (\`_path\`);`)
  await db.run(sql`DROP TABLE \`pages_blocks_integrations_ticker\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_integrations_grid\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`title_highlight\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`cta_link\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_features\` ADD \`title_highlight\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`title_highlight\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pricing\` ADD \`title_highlight\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta\` DROP COLUMN \`cta_link\`;`)
}
