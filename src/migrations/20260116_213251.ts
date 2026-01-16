import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`navigation_items_submenu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`internal_link_id\` integer,
  	\`external_url\` text,
  	\`anchor\` text,
  	\`open_in_new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_items_submenu_items_order_idx\` ON \`navigation_items_submenu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_submenu_items_parent_id_idx\` ON \`navigation_items_submenu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_submenu_items_internal_link_idx\` ON \`navigation_items_submenu_items\` (\`internal_link_id\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_navigation_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`internal_link_id\` integer,
  	\`external_url\` text,
  	\`anchor\` text,
  	\`open_in_new_tab\` integer DEFAULT false,
  	\`has_submenu\` integer DEFAULT false,
  	FOREIGN KEY (\`internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_navigation_items\`("_order", "_parent_id", "id", "label", "link_type", "internal_link_id", "external_url", "anchor", "open_in_new_tab", "has_submenu") SELECT "_order", "_parent_id", "id", "label", "link_type", "internal_link_id", "external_url", "anchor", "open_in_new_tab", "has_submenu" FROM \`navigation_items\`;`)
  await db.run(sql`DROP TABLE \`navigation_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_navigation_items\` RENAME TO \`navigation_items\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`navigation_items_order_idx\` ON \`navigation_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_parent_id_idx\` ON \`navigation_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_internal_link_idx\` ON \`navigation_items\` (\`internal_link_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`navigation_items_submenu_items\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_navigation_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_navigation_items\`("_order", "_parent_id", "id", "label", "link") SELECT "_order", "_parent_id", "id", "label", "link" FROM \`navigation_items\`;`)
  await db.run(sql`DROP TABLE \`navigation_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_navigation_items\` RENAME TO \`navigation_items\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`navigation_items_order_idx\` ON \`navigation_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_parent_id_idx\` ON \`navigation_items\` (\`_parent_id\`);`)
}
