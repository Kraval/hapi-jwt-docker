'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgModel = new Schema({  
  name: { type: String, required: true, index: { unique: true }},
  description: { type: String },
  code: { type: String, required: true },
  url: { type: String, required: true },
  type:{type:String,
    enum: ['employer', 'insurance', 'health system']}
});

module.exports = mongoose.model('Organization', orgModel, 'organizations'); 