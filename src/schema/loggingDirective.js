const { mapSchema, MapperKind, getDirective } = require("@graphql-tools/utils");
const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { AuthenticationError } = require("apollo-server-errors");
const { DirectiveLocation, GraphQLDirective, defaultFieldResolver } = require("graphql");
const { ResolverLog } = require('Models');
const {performance} = require('perf_hooks');

const loggingDirective = (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName);
      const { resolve: prevResolve = defaultFieldResolver } = fieldConfig;

      if (directive) {
        fieldConfig.resolve = async (source, args, context, info) => {
          const startTime = new Date();
          const t0 = performance.now();
          const resolvedValue = await prevResolve(source, args, context, info);
          const t1 = performance.now();
          const endTime = new Date();
          const { fieldName, variableValues } = info;

          const resolved = await ResolverLog.create({
            name: fieldName,
            arguments: JSON.stringify(variableValues) ?? '',
            context: JSON.stringify(context) ?? '',
            returnValue: JSON.stringify(resolvedValue) ?? '',
            startTime,
            endTime,
            executionTime: Math.ceil(t1 - t0),
          });
          console.log(resolved);

          return resolvedValue;
        }
        return fieldConfig;
      }
    }
  })
}

module.exports = loggingDirective;
