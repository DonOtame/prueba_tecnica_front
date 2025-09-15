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
import { ErrorResponse, PostItemData } from '@app/core/models';
import { PostDataService, ToastService } from '@app/core/services';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-gif/loading-spinner.component';
import { validateForm, handleAsync, wait, handleError } from '@app/shared/utils';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'post-form',
  imports: [ReactiveFormsModule, TranslateModule, LoadingSpinnerComponent],
  templateUrl: './post-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit {
  private postData = inject(PostDataService);
  private toast = inject(ToastService);

  public postItem = input<PostItemData>();

  public editClosed = output<void>();

  public formTitle = signal<string>('postForm.createPost');

  public isLoading = signal<boolean>(false);

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    content: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit() {
    if (this.postItem()) this.initializeForm();
  }

  async onSubmit() {
    if (!validateForm(this.postForm, this.toast)) return;

    const { title, content } = this.postForm.value;
    const post = this.postItem();
    this.isLoading.set(true);

    const result = await handleAsync(
      post
        ? this.postData.updatePost(post.id, title!, content!)
        : this.postData.createPost(title!, content!)
      // this.toast,
      // post ? 'TOAST.UPDATE_POST_ERROR' : 'TOAST.CREATE_POST_ERROR'
    );

    if ((result as ErrorResponse)?.status) {
      this.isLoading.set(false);
      handleError(result as ErrorResponse, this.toast, post ? 'UPDATE_POST' : 'CREATE_POST');
      return;
    }

    await wait(300);
    this.onSuccess(!!post);
    this.isLoading.set(false);
  }

  onCancelEdit() {
    this.postForm.reset();
    this.editClosed.emit();
  }

  private initializeForm() {
    const post = this.postItem();
    if (!post) return;

    this.postForm.setValue({
      title: post.title,
      content: post.content,
    });
    this.formTitle.set('postForm.editPost');
  }

  private onSuccess(isEdit: boolean) {
    this.toast.show(isEdit ? 'TOAST.UPDATE_POST_SUCCESS' : 'TOAST.CREATE_POST_SUCCESS', 'success');

    if (!isEdit) this.postForm.reset();

    if (isEdit) this.editClosed.emit();
  }
}
