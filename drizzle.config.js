/** @type {import('drizzle-kit').Config} */
export default {
    dialect: 'postgresql', // Specify the dialect here
    schema: "./configs/schema.js",
    dbCredentials: {
        url: 'postgresql://shortify_main_owner:XpC9gdLtOTH8@ep-dry-mud-a549kigt.us-east-2.aws.neon.tech/shortify_main?sslmode=require',
    },
};


