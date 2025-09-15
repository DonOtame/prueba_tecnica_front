import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService, PostDataService, ToastService } from '@app/core/services';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-gif/loading-spinner.component';
import { handleAsync, handleError } from '@app/shared/utils';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostItemComponent } from '../post-item/post-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorResponse } from '@app/core/models';

@Component({
  selector: 'app-posts-list',
  imports: [PostItemComponent, PostFormComponent, LoadingSpinnerComponent, TranslateModule],
  templateUrl: './posts-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PostsListComponent implements OnInit {
  private authFacade = inject(AuthFacadeService);
  private router = inject(Router);
  private postData = inject(PostDataService);
  private toast = inject(ToastService);

  public isLoading = this.postData.isLoading;
  public posts = this.postData.posts;

  async ngOnInit() {
    await handleAsync(
      this.postData.getPosts()
      //  this.toast,
      //  'TOAST.POSTS_ERROR'
    );
  }

  public async logout(): Promise<void> {
    const result = await handleAsync(
      this.authFacade.logout()
      // this.toast,
      // 'TOAST.LOGOUT_ERROR'
    );

    if ((result as ErrorResponse)?.status) {
      handleError(result as ErrorResponse, this.toast, 'LOGOUT');
      return;
    }

    this.toast.show('TOAST.LOGOUT_SUCCESS', 'success');
    this.router.navigate(['/login']);
  }
}
