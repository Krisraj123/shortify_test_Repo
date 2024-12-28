

import { varchar,boolean,pgTable,serial,json, timestamp } from "drizzle-orm/pg-core";

export const Users=pgTable('users',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('image_url'),
    subscription:boolean('subscription').default(false)
})

export const VideoData = pgTable('videoData', {
    id:serial('id').primaryKey(),
    script:json('script').notNull(),
    audioFileUrl:varchar('audioFileUrl').notNull(),
    caption:json('caption').notNull(),
    imageList:varchar('imageList').array(),
    createdBy:varchar('createdBy').notNull()
})
export const VideoDatas = pgTable('videoDatas', {
    id:serial('id').primaryKey(),
    script:json('script').notNull(),
    audioFileUrl:varchar('audioFileUrl').notNull(),
    caption:json('caption').notNull(),
    imageList:varchar('imageList').array(),
    createdBy:varchar('createdBy').notNull()
})

export const ImageGenerationTasks = pgTable('imageGenerationTasks', {
    id: serial('id').primaryKey(),
    taskId: varchar('taskId').notNull(),
    status: varchar('status').notNull(),
    prompt: varchar('prompt').notNull(),
    result: json('result'),
    error: varchar('error'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
});
