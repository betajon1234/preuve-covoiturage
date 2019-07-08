export const applicationCreateSchema = {
  $id: 'application.create',
  type: 'object',
  required: ['name', 'operator', 'permissions'],
  additionalProperties: false,
  properties: {
    name: { macro: 'varchar' },
    operator: { macro: 'objectid' },
    permissions: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      additionalItems: false,
      items: {
        type: 'string',
      },
    },
  },
};
