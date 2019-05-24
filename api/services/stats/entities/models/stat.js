const modelFactory = require('@pdc/shared/providers/mongo/model-factory');
const StatSchema = require('../schemas/stat');

module.exports = modelFactory('Statistics', {
  schema: StatSchema,
});
