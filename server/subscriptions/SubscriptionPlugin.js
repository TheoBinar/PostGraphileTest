const { makeExtendSchemaPlugin, gql, embed } = require("graphile-utils");

// const clientTopicFromContext = async (_args, context, _resolveInfo) => {
//     if (context.id) {
//         return `graphql:clients:${context.id}`;
//     } else {
//         throw new Error("You're not logged in");
//     }
// };

module.exports = makeExtendSchemaPlugin(({ pgSql: sql }) => ({
    typeDefs: gql`
    type ClientSubscriptionPayload {
      # This is populated by our resolver below
      client: Client

      # This is returned directly from the PostgreSQL subscription payload (JSON object)
      #event: String
    }

    type ProjectSubscriptionPayload{
      # This is populated by our resolver below
      project: Project
      
      # This is returned directly from the PostgreSQL subscription payload (JSON object)
      #event: String
    }
    
    extend type Subscription {
      clientSubscription: ClientSubscriptionPayload  
      projectSubscription: ProjectSubscriptionPayload
    }
  `, resolvers: {
        ClientSubscriptionPayload: {
            async client(
                event,
                _args,
                _context,
                { graphile: { selectGraphQLResultFromTable } }
            ) {
                const rows = await selectGraphQLResultFromTable(
                    sql.fragment`grapgql.clients`,
                    (tableAlias, sqlBuilder) => {
                        sqlBuilder.where(
                            sql.fragment`${tableAlias}.id = ${sql.value(event.subject)}`
                        );
                    }
                );
                return rows[0];
            },
        },
        ProjectSubscriptionPayload: {
            async project(
                event,
                _args,
                _context,
                { graphile: { selectGraphQLResultFromTable } }
            ) {
                const rows = await selectGraphQLResultFromTable(
                    sql.fragment`grapgql.projects`,
                    (tableAlias, sqlBuilder) => {
                        sqlBuilder.where(
                            sql.fragment`${tableAlias}.id = ${sql.value(event.subject)}`
                        );
                    }
                );
                return rows[0];
            },
        }
    },
}));