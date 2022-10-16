// Interface representing a document in MongoDB.
export interface IUser {
    _id?: string,
    name: string;
    email: string;
    password?: string;
    role: string;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}

