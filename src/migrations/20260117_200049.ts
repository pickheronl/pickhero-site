import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_title\` text DEFAULT 'Stuur ons een bericht',
  	\`form_description\` text,
  	\`submit_button_text\` text DEFAULT 'Verstuur bericht',
  	\`info_title\` text DEFAULT 'Contactgegevens',
  	\`show_map\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_section_order_idx\` ON \`pages_blocks_contact_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_section_parent_id_idx\` ON \`pages_blocks_contact_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_section_path_idx\` ON \`pages_blocks_contact_section\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_contact_section\`;`)
}
