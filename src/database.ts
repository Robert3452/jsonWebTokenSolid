import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/typeScriptApp', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(result => console.log('Database is up!'))
    .catch(err => console.log(err))
