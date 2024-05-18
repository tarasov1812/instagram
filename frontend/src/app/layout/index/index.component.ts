import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/Post";
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";
import {PostService} from "../../service/post.service";
import {CommentService} from "../../service/comment.service";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  isPostsLoaded = false;
  // @ts-ignore
  posts: Post[];
  isUserLoaded = false;
  // @ts-ignore
  user: User;

  constructor(private userService: UserService,
              private postService: PostService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private imageUploadService: ImageUploadService) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getImageToPosts(this.posts);
        this.getCommentsToPosts(this.posts);
        this.isPostsLoaded = true;
      });
    this.userService.getCurrentUser()
      .subscribe(data => {
          console.log(data);
          this.user = data;
          this.isUserLoaded = true;
      });
  }

  getImageToPosts(posts: Post[] | undefined): void {
      // @ts-ignore
    posts.forEach(post => {
      this.imageUploadService.getImageToPost(post.id)
        // @ts-ignore
              .subscribe(data => {
                  post.image = data.imageBytes;
              });
      });
  }

  getCommentsToPosts(posts: Post[] | undefined): void {
      // @ts-ignore
    posts.forEach(post => {
          this.commentService.getCommentToPost(post.id)
              .subscribe(data => {
                  post.comments = data;
              });
      });
  }

  likePost(postId: number | undefined, postIndex: number): void {
      // @ts-ignore
    const post = this.posts[postIndex];
      console.log(post);

      // @ts-ignore
    if(!post.usersLiked.includes(this.user.username)) {
          // @ts-ignore
      this.postService.likePost(postId, this.user.username)
            .subscribe(()=> {
                // @ts-ignore
              post.usersLiked.push(this.user.username);
              this.notificationService.showSnackBar('Post liked');
            });
      }
    else {
      // @ts-ignore
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          // @ts-ignore
          const index = post.usersLiked.indexOf(this.user.username, 0);
          if(index > -1) {
              // @ts-ignore
              post.usersLiked.splice(index, 1);
          }
        });
    }
  }

  postComment(message: string, postId: number | undefined, postIndex: number): void {
    // @ts-ignore
    const post = this.posts[postIndex];
    console.log(post);
      // @ts-ignore
      this.commentService.addCommentToPost(postId, message)
          .subscribe(data => {
            console.log(data);
            // @ts-ignore
            post.comments.push(data);
          });
  }

  formatImg(img: any): any{
    if(img == null){
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

}
