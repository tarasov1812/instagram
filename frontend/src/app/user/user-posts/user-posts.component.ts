import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../service/post.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit {

  isUserPostsLoaded = false;
  // @ts-ignore
  posts: Post [];

  constructor(private postService: PostService,
              private imageService: ImageUploadService,
              private commentService: CommentService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.postService.getPostForCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getImagesToPosts(this.posts);
        this.getCommentsToPosts(this.posts);
        this.isUserPostsLoaded = true;
      });
  }

  getImagesToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.imageService.getImageToPost(p.id)
        // @ts-ignore
        .subscribe(data => {
          p.image = data.imageBytes;
        });
    });
  }


  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.commentService.getCommentToPost(p.id)
        .subscribe(data => {
          p.comments = data;
        });
    });
  }

  removePost(post: Post, index: number): void {
    console.log(post);
    const result = confirm('Do you really want to delete this post?');
    if (result) {
      // @ts-ignore
      this.postService.delete(post.id)
        .subscribe(() => {
          this.posts.splice(index, 1);
          this.notificationService.showSnackBar('Post deleted');
        });
    }
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  deleteComment(commentId: number | undefined, postIndex: number, commentIndex: number): void {
    const post = this.posts[postIndex];
    if (commentId !== undefined) {
      this.commentService.deleteComment(commentId)
        .subscribe(() => {
          this.notificationService.showSnackBar('Comment removed');
          // @ts-ignore
          post.comments.splice(commentIndex, 1);
        });
    } else {
      this.notificationService.showSnackBar('Error while removing comment');
    }
  }

}
