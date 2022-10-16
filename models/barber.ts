import { Schema, model } from 'mongoose';
import { IBarber } from '../utils/interfaces/barber-interface';

// Schema corresponding to the document interface.
const barberSchema = new Schema<IBarber>({
    name: { 
        type: String, 
        required: true,
    },
    sex: { 
        type: String, 
        required: true,
    },
    image: { 
        type: String, 
        required: false,
    },
});

barberSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

// Model.
export const Barber = model<IBarber>('barbers', barberSchema);