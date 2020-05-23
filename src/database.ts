import mongoose from 'mongoose';

const uri:string = process.env['MONGODB'] || 'mongodb://localhost/typeScriptApp';

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(result => console.log('Database is up!'))
    .catch(err => console.log(err))
