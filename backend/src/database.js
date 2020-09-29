const mongoose = require('mongoose')

const URI = ('mongodb+srv://Admin-portafolio:CopwXtTTPs0lSTQj@cluster0.et7ld.mongodb.net/portafoliovirtual?retryWrites=true&w=majority')

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})
    .then(db=>console.log('db conectada'))
    .catch(error=>console.log(error))

module.exports=mongoose;