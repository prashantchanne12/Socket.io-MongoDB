const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://prashant:admin@cluster0.nzsfk.mongodb.net/chatapp?retryWrites=true&w=majority';

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (e) {
        console.error(`Error: ${e.message}`);
        process.exit(1)
    }
}

module.exports = connectDB;