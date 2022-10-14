// Interface representing a document in MongoDB.
export interface IUser {
    _id?: string,
    name: string;
    email: string;
    password: string;
    role: string;
  }