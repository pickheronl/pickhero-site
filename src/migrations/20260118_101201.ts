import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` ADD \`badge\` text DEFAULT 'Contact';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` ADD \`title\` text DEFAULT 'Neem contact met ons op';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` ADD \`subtitle\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` DROP COLUMN \`badge\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` DROP COLUMN \`subtitle\`;`)
}
