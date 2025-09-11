import { Injectable, inject, signal } from '@angular/core';
import { PostItemData } from '../models';
import { PostService } from './post.service';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root',
})
export class PostDataService {
  private postApi = inject(PostService);
  private commentApi = inject(CommentService);

  public posts = signal<PostItemData[]>([]);
  public isLoading = signal(false);

  async getPosts() {
    this.isLoading.set(true);
    const response = await this.postApi.getPosts();
    const data = response.data ?? [];
    this.posts.set(this.sortPosts(data));
    this.isLoading.set(false);
  }

  async getPostById(postId: number) {
    const response = await this.postApi.getPostById(postId);
    if (response.data) this.replacePostInList(postId, response.data);
  }

  async createPost(title: string, content: string) {
    await this.postApi.createPost(title, content);
    this.getPosts();
  }

  async updatePost(postId: number, title: string, content: string) {
    await this.postApi.updatePost(postId, title, content);
    this.getPostById(postId);
  }

  async deletePost(postId: number) {
    await this.postApi.deletePost(postId);
    this.removePost(postId);
  }

  async createComment(postId: number, content: string) {
    await this.commentApi.createComment(postId, content);
    this.getPostById(postId);
  }

  async updateComment(postId: number, commentId: number, content: string) {
    await this.commentApi.updateComment(postId, commentId, content);
    this.getPostById(postId);
  }

  async deleteComment(postId: number, commentId: number) {
    await this.commentApi.deleteComment(postId, commentId);
    this.getPostById(postId);
  }

  private replacePostInList(postId: number, newPost: PostItemData) {
    this.posts.set(this.posts().map((post) => (post.id === postId ? newPost : post)));
  }

  private removePost(postId: number) {
    this.posts.set(this.posts().filter((post) => post.id !== postId));
  }

  private sortPosts(posts: PostItemData[]): PostItemData[] {
    return [...posts].sort((a, b) => b.id - a.id);
  }
}
