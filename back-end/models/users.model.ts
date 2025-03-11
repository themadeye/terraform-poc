import * as mongoose from 'mongoose';

const createUserModel = () => {
    let schema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        password: {
            type: String,
            required: [true, 'Please enter an password'],
            minLength: [6, 'Mininum password length is 6 characters']
        }
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        Object.assign(object, {id: _id});
        return object;
    });

    return mongoose.model('users', schema);
}

export default createUserModel;