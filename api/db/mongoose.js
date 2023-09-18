const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager', 
                    { useNewUrlParser: true }).then(() => {
                        console.log('Connected to MongoDB succesfully');
                    }).catch((error) => {
                        console.log('Error while attempting to connect to MongoDB');
                        console.log(error);
                    });

module.exports = {
    mongoose
};