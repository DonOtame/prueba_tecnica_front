import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { CommentItem, ErrorResponse } from '@app/core/models';
import { ToastService, SwalService, PostDataService, AuthFacadeService } from '@app/core/services';
import { OptionsMenuComponent } from '@app/shared/components/options-menu/options-menu.component';
import { handleAsync, handleError } from '@app/shared/utils';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'comment-item',
  imports: [CommonModule, OptionsMenuComponent, CommentFormComponent],
  templateUrl: './comment-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentItemComponent {
  private toast = inject(ToastService);
  private swal = inject(SwalService);
  private postData = inject(PostDataService);
  private authFacade = inject(AuthFacadeService);

  public comment = input.required<CommentItem>();
  public postId = input.required<number>();

  public editingCommentId = input.required<number | null>();
  public setEditingCommentId = input.required<(id: number | null) => void>();

  public activeMenuCommentId = input.required<number | null>();
  public setActiveMenuCommentId = input.required<(id: number | null) => void>();

  public isEditing = computed(() => this.editingCommentId() === this.comment().id);
  public isMenuOpen = computed(() => this.activeMenuCommentId() === this.comment().id);
  public isAuthor = computed(() => this.authFacade.getUsername() === this.comment().authorUsername);

  public menuOptions = [
    {
      label: 'commentItem.editComment',
      action: () => this.openEdit(),
    },
    {
      label: 'commentItem.deleteComment',
      action: () => this.deleteComment(),
    },
  ];

  public closeEdit() {
    this.setEditingCommentId()(null);
  }

  public openEdit() {
    this.setEditingCommentId()(this.comment().id);
  }

  private async deleteComment(): Promise<void> {
    const confirmed = await this.swal.delete();
    if (!confirmed) return;

    const result = await handleAsync(
      this.postData.deleteComment(this.postId(), this.comment().id)
      // this.toast,
      // 'TOAST.DELETE_COMMENT_ERROR'
    );
    if ((result as ErrorResponse)?.status) {
      handleError(result as ErrorResponse, this.toast, 'DELETE_COMMENT');
      return;
    }

    this.toast.show('TOAST.DELETE_COMMENT_SUCCESS', 'success');
  }
}
