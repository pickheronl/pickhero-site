import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_benefits_order_idx\` ON \`pages_blocks_hero_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_benefits_parent_id_idx\` ON \`pages_blocks_hero_benefits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge\` text,
  	\`title\` text NOT NULL,
  	\`title_highlight\` text,
  	\`description\` text,
  	\`cta_text\` text DEFAULT 'Start gratis proefperiode',
  	\`image_id\` integer,
  	\`mobile_image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`mobile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_image_idx\` ON \`pages_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_mobile_image_idx\` ON \`pages_blocks_hero\` (\`mobile_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge\` text DEFAULT 'Functies',
  	\`title\` text,
  	\`title_highlight\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_order_idx\` ON \`pages_blocks_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_parent_id_idx\` ON \`pages_blocks_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_path_idx\` ON \`pages_blocks_features\` (\`_path\`);`)
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
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_stats_order_idx\` ON \`pages_blocks_stats_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_stats_parent_id_idx\` ON \`pages_blocks_stats_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_order_idx\` ON \`pages_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_parent_id_idx\` ON \`pages_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_path_idx\` ON \`pages_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge\` text DEFAULT 'The proof is in the pudding',
  	\`title\` text,
  	\`title_highlight\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_pricing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge\` text DEFAULT 'Prijzen',
  	\`title\` text,
  	\`title_highlight\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_pricing_order_idx\` ON \`pages_blocks_pricing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pricing_parent_id_idx\` ON \`pages_blocks_pricing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pricing_path_idx\` ON \`pages_blocks_pricing\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`cta_text\` text DEFAULT 'Start gratis proefperiode',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_order_idx\` ON \`pages_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_parent_id_idx\` ON \`pages_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_path_idx\` ON \`pages_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Veelgestelde vragen',
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`features_id\` integer,
  	\`integrations_id\` integer,
  	\`testimonials_id\` integer,
  	\`pricing_plans_id\` integer,
  	\`faq_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`features_id\`) REFERENCES \`features\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`integrations_id\`) REFERENCES \`integrations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pricing_plans_id\`) REFERENCES \`pricing_plans\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_id\`) REFERENCES \`faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_features_id_idx\` ON \`pages_rels\` (\`features_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_integrations_id_idx\` ON \`pages_rels\` (\`integrations_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_testimonials_id_idx\` ON \`pages_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pricing_plans_id_idx\` ON \`pages_rels\` (\`pricing_plans_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_faq_id_idx\` ON \`pages_rels\` (\`faq_id\`);`)
  await db.run(sql`CREATE TABLE \`integrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`category\` text,
  	\`description\` text,
  	\`url\` text,
  	\`is_active\` integer DEFAULT true,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`integrations_logo_idx\` ON \`integrations\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`integrations_updated_at_idx\` ON \`integrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`integrations_created_at_idx\` ON \`integrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`features\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`icon\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`extended_description\` text,
  	\`image_id\` integer,
  	\`is_active\` integer DEFAULT true,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`features_image_idx\` ON \`features\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`features_updated_at_idx\` ON \`features\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`features_created_at_idx\` ON \`features\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author_name\` text NOT NULL,
  	\`author_role\` text,
  	\`company\` text,
  	\`avatar_id\` integer,
  	\`rating\` numeric DEFAULT 5,
  	\`is_active\` integer DEFAULT true,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_avatar_idx\` ON \`testimonials\` (\`avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pricing_plans_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_plans\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_plans_features_order_idx\` ON \`pricing_plans_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_plans_features_parent_id_idx\` ON \`pricing_plans_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_plans\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`price_monthly\` numeric,
  	\`price_discounted\` numeric,
  	\`is_enterprise\` integer DEFAULT false,
  	\`is_popular\` integer DEFAULT false,
  	\`cta_text\` text DEFAULT 'Start gratis proefperiode',
  	\`is_active\` integer DEFAULT true,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_plans_updated_at_idx\` ON \`pricing_plans\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pricing_plans_created_at_idx\` ON \`pricing_plans\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`faq\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`category\` text,
  	\`is_active\` integer DEFAULT true,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`faq_updated_at_idx\` ON \`faq\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faq_created_at_idx\` ON \`faq\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`navigation_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_items_order_idx\` ON \`navigation_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_parent_id_idx\` ON \`navigation_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cta_text\` text DEFAULT 'Gratis proberen',
  	\`login_text\` text DEFAULT 'Inloggen',
  	\`login_url\` text DEFAULT 'https://app.pickhero.nl',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_social_links_order_idx\` ON \`footer_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_social_links_parent_id_idx\` ON \`footer_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_legal_links_order_idx\` ON \`footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_parent_id_idx\` ON \`footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`copyright\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pages_id\` integer REFERENCES pages(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`integrations_id\` integer REFERENCES integrations(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`features_id\` integer REFERENCES features(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`testimonials_id\` integer REFERENCES testimonials(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pricing_plans_id\` integer REFERENCES pricing_plans(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`faq_id\` integer REFERENCES faq(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_integrations_id_idx\` ON \`payload_locked_documents_rels\` (\`integrations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_features_id_idx\` ON \`payload_locked_documents_rels\` (\`features_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pricing_plans_id_idx\` ON \`payload_locked_documents_rels\` (\`pricing_plans_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faq_id_idx\` ON \`payload_locked_documents_rels\` (\`faq_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_hero_benefits\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_integrations\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pricing\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`integrations\`;`)
  await db.run(sql`DROP TABLE \`features\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`pricing_plans_features\`;`)
  await db.run(sql`DROP TABLE \`pricing_plans\`;`)
  await db.run(sql`DROP TABLE \`faq\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`navigation_items\`;`)
  await db.run(sql`DROP TABLE \`navigation\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_social_links\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
