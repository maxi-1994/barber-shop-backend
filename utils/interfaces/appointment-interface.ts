export interface IAppointment {
    _id?: string;
    service: string;
    professional: string;
    date: string;
    hour: string;
    clientName: string;
    clientNumber?: number;
    clientEmail: string;
    clientComment?: string;
    state?: string;
};