const mongoose = require('mongoose');

const { Schema } = mongoose;

const IncentiveParameterSchema = new Schema({
  varname: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  helper: String, // facultatif
  aom: Schema.Types.ObjectId, // facultatif
  formula: String, // facultatif
  internal: {
    type: Boolean,
    default: false,
    required: true,
  },
}, { id: false });

module.exports = IncentiveParameterSchema;
