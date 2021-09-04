const { mapSchema, MapperKind, getDirective } = require("@graphql-tools/utils");
const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { AuthenticationError } = require("apollo-server-errors");
const { DirectiveLocation, GraphQLDirective, defaultFieldResolver } = require("graphql");
const { User } = require('Models');

const isAuthenticatedDirective = (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName);
      const { resolve: prevResolve = defaultFieldResolver } = fieldConfig;

      if (directive) {
        fieldConfig.resolve = async (source, args, context, info) => {
          const { user: userContext } = context;
          console.log(JSON.stringify(info));
          
          const user = await User.findOne({
            where: {
              id: userContext?.id || null,
            },
          });

          if (!user) {
            throw new AuthenticationError('You must be logged in to access this resource.');
          }

          return prevResolve(source, args, context, info);
        }
        return fieldConfig;
      }
    }
  })
}

module.exports = isAuthenticatedDirective;
