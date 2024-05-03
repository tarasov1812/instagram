package com.example.demo.facade;

import com.example.demo.dto.PostDTO;
import com.example.demo.entity.Post;
import org.springframework.stereotype.Component;

@Component
public class PostFacade {
    public PostDTO postToPostDTO(Post post){
        PostDTO postDTO = new PostDTO();
        postDTO.setUsername(post.getUser().getUsername());
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setCaption(post.getCaption());
        postDTO.setLikes(post.getLikes());
        postDTO.setUserLiked(post.getLikedUsers());
        postDTO.setLocation(post.getLocation());

        return postDTO;
    }
}
