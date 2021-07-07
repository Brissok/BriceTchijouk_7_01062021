import { User } from "./User.model";

export class Comment {
    id: number;
    text: string;
    UserId: number;
    User: User;
    PostId: number;
    createdAt: Date;
    updatedAt: Date;
    }