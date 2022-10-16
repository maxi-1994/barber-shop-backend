import { Schema, model } from 'mongoose';
import { IUser } from '../utils/interfaces/user-interface';

// Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    name: { 
        type: String, 
        required: true,
    },
    email: { 
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'ADMIN_USER'
    }
});

userSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
});

// Model.
export const User = model<IUser>('users', userSchema);