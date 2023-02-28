import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IncomingPost, Post } from "../models/post.model";
import { Comment } from "../models/comment.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PostsService {
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts/';
    constructor(private http: HttpClient) {}

    getAllPosts(): Observable<IncomingPost[]> {
        return this.http.get<IncomingPost[]>(this.baseUrl);
    }

    getPostComments(id: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.baseUrl}${id}/comments`);
    }

    createPost(post: Post) {
        return this.http.post(this.baseUrl, post, {headers: {'Content-type': 'application/json'}});
    }

    searchPostsByTitle(keyword: string): Observable<IncomingPost[]> {
        return this.http.get<IncomingPost[]>(`${this.baseUrl}?title_like=${keyword}`)
    }
}