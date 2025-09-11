import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommentItem } from '@app/core/models';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'comment-list',
  imports: [CommentItemComponent],
  templateUrl: './comment-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent {
  public postId = input.required<number>();
  public comments = input<CommentItem[]>([]);

  public editingCommentId = signal<number | null>(null);
  public activeMenuCommentId = signal<number | null>(null);

  public setEditingCommentId = (id: number | null) => {
    this.editingCommentId.set(id);
  };

  public setActiveMenuCommentId = (id: number | null) => {
    this.activeMenuCommentId.set(id);
  };
}
