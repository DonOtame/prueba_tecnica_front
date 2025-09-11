import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { ApiService } from '.';
import { MessageResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends ApiService {
  private baseUrl = environment.baseUrl + '/posts';

  public createComment(postId: number, content: string): Promise<MessageResponse> {
    return this.request<MessageResponse>(`${this.baseUrl}/${postId}/comments`, {
      method: 'POST',
      body: { postId, content },
    });
  }

  public updateComment(
    postId: number,
    commentId: number,
    content: string
  ): Promise<MessageResponse> {
    return this.request<MessageResponse>(`${this.baseUrl}/${postId}/comments/${commentId}`, {
      method: 'PUT',
      body: { content },
    });
  }

  public deleteComment(postId: number, commentId: number): Promise<void> {
    return this.request<void>(`${this.baseUrl}/${postId}/comments/${commentId}`, {
      method: 'DELETE',
    });
  }
}
