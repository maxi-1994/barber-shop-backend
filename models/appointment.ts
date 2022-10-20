import{ Schema, model } from 'mongoose';
import { IAppointment } from '../utils/interfaces/appointment-interface'

// Schema corresponding to the document interface.
const appointmentSchema: Schema<IAppointment> = new Schema<IAppointment>({
    service: {
        type: String,
        required: true,
    },
    professional: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    clientNumber: {
        type: Number,
        required: false,
    },
    clientEmail: {
        type: String,
        required: true,
    },
    clientComment: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: true,
        default: 'pendiente',
    }
});

appointmentSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

// Model.
export const Appointment = model<IAppointment>('appointment', appointmentSchema);