const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { postgraphile, makePluginHook } = require('postgraphile');
const { default: PgPubsub } = require("@graphile/pg-pubsub");
const SubscriptionPlugin = require('./subscriptions/SubscriptionPlugin');

const pluginHook = makePluginHook([PgPubsub]);
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(
    postgraphile(
        process.env.DATABASE_URL || "postgres://postgres:Test123@172.19.0.2:5432/grapgql",
        "public",
        {
            pluginHook,
            appendPlugins: [
                SubscriptionPlugin
            ],
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
            subscriptions: true,
        }
    )
);

app.listen(port, console.log(`Server running on port ${port}`));
