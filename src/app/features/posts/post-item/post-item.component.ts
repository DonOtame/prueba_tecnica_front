import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  input,
  signal,
  computed,
} from '@angular/core';
import { PostItemData, CommentItem } from '@app/core/models';
import { ToastService, PostDataService } from '@app/core/services';
import { CommentFormComponent } from '@app/features/comments/comment-form/comment-form.component';
import { CommentListComponent } from '@app/features/comments/comment-list/comment-list.component';
import { OptionsMenuComponent } from '@app/shared/components/options-menu/options-menu.component';
import { handleAsync } from '@app/shared/utils';
import { TranslateModule } from '@ngx-translate/core';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'post-item',
  imports: [
    CommentListComponent,
    CommentFormComponent,
    OptionsMenuComponent,
    PostFormComponent,
    TranslateModule,
  ],
  templateUrl: './post-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostItemComponent implements OnInit {
  private toast = inject(ToastService);
  private postData = inject(PostDataService);

  public postItem = input.required<PostItemData>();

  public commentsOpen = signal(false);
  public isEditing = signal(false);

  public comments = computed(() => this.sortComments(this.postItem().comments ?? []));

  public menuOptions = [
    { label: 'postItem.editPost', action: () => this.isEditing.set(true) },
    { label: 'postItem.deletePost', action: () => this.deletePost() },
  ];

  ngOnInit() {
    handleAsync(this.postData.getPostById(this.postItem().id), this.toast, 'TOAST.POST_ERROR');
  }

  private async deletePost(): Promise<void> {
    await handleAsync(
      this.postData.deletePost(this.postItem().id),
      this.toast,
      'TOAST.DELETE_POST_ERROR'
    );

    this.toast.show('TOAST.DELETE_POST_SUCCESS', 'success');
  }

  private sortComments(comments: CommentItem[]): CommentItem[] {
    return [...comments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}
