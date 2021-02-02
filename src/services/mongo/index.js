import mongoose from 'mongoose'

export default class Mongo {
    static async connect(){
        const str = process.env.USER_DB.toString()
        const opt = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        try {
            await this.disconnect()
            await mongoose.connect(str, opt)
            mongoose.connection.on('error', err => {
                throw err
            })
        } catch (err) {
            if(err.message){
                console.log(err.message)
            } else {
                console.log(err)
            }
        }

    }

    static async disconnect(){
        
        try {
            await mongoose.connection.close()
        } catch (err) {
            return err
        }
        
    }

}