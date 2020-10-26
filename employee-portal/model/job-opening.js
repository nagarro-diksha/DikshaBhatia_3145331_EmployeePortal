const mongoose = require('mongoose');
const schema = mongoose.Schema;

/*create a collection named jobOpeningSchema with 
the following field attributes to store data.*/
const jobOpeningSchema = new schema({
    projectName:{
        type: String,
        required: true
      },
      clientName:{
        type: String,
        required: true
      },
      roleName:{
        type: String,
        required: true
      },
      jobDescription:{
        type: String,
        required: true
      },
      technologyStack:{
        type: String,
        required: true
      },
      status:{
        type: String,
        required: true
      },
      createdBy:{
        type: String,
        required: true
      }
});
var jobOpeningModel = mongoose.model('jobOpening', jobOpeningSchema)
module.exports = jobOpeningModel;
