import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { MessageResponse, PostItem, PostsList } from '../models';
import { ApiService } from '.';

@Injectable({
  providedIn: 'root',
})
export class PostService extends ApiService {
  private baseUrl = environment.baseUrl + '/posts';

  public getPosts(): Promise<PostsList> {
    return this.request<PostsList>(`${this.baseUrl}`, {
      method: 'GET',
    });
  }

  public getPostById(id: number): Promise<PostItem> {
    return this.request<PostItem>(`${this.baseUrl}/${id}`, {
      method: 'GET',
    });
  }

  public createPost(title: string, content: string): Promise<MessageResponse> {
    return this.request<MessageResponse>(`${this.baseUrl}`, {
      method: 'POST',
      body: { title, content },
    });
  }

  public updatePost(id: number, title: string, content: string): Promise<MessageResponse> {
    return this.request<MessageResponse>(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      body: { title, content },
    });
  }

  public deletePost(id: number): Promise<void> {
    return this.request<void>(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }
}
