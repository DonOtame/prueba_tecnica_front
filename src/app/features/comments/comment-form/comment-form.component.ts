import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  output,
  signal,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentItem } from '@app/core/models';
import { PostDataService, ToastService } from '@app/core/services';
import { validateForm, handleAsync } from '@app/shared/utils';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'comment-form',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './comment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnInit {
  private postData = inject(PostDataService);
  private toast = inject(ToastService);

  public postId = input.required<number>();
  public comment = input<CommentItem>();

  public editClosed = output<void>();

  public maxLength = signal(300);

  public commentForm = new FormGroup({
    content: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(this.maxLength()),
      ],
    }),
  });

  ngOnInit() {
    if (this.comment()) this.initializeForm();
  }

  public async onSubmit() {
    if (!validateForm(this.commentForm, this.toast)) return;

    const { content } = this.commentForm.value;
    const comment = this.comment();

    await handleAsync(
      comment
        ? this.postData.updateComment(this.postId(), comment.id, content!)
        : this.postData.createComment(this.postId(), content!),
      this.toast,
      comment ? 'TOAST.UPDATE_COMMENT_ERROR' : 'TOAST.CREATE_COMMENT_ERROR'
    );
    this.onSuccess(!!comment);
  }

  onCancelEdit() {
    this.commentForm.reset();
    this.editClosed.emit();
  }

  private initializeForm() {
    const comment = this.comment();
    if (!comment) return;

    this.commentForm.setValue({
      content: comment.content,
    });
  }

  private onSuccess(isEdit: boolean) {
    this.toast.show(
      isEdit ? 'TOAST.UPDATE_COMMENT_SUCCESS' : 'TOAST.CREATE_COMMENT_SUCCESS',
      'success'
    );
    if (!isEdit) this.commentForm.reset();

    if (isEdit) this.editClosed.emit();
  }
}
