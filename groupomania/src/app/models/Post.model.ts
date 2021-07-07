import { User } from "./User.model";
import { Comment } from "./Comment.model";

export class Post {
id: number;
title: string;
content: string;
imageUrl: string;
UserId: number;
User: User;
Comments: Comment[];
createdAt: Date;
updatedAt: Date;
}