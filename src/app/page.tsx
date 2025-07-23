'use client';

import { useEffect, useState } from 'react';
import { HeaderBar } from '@/components/HeaderBar';
import PostCard from '@/components/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import { publicApi } from '@/lib/api';
import type { Comment, Post } from '@/types';
import { AddPost } from '@/components/AddPost';

export default function Home() {
  const { loading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect runs only once on mount
  useEffect(() => {
    if (!loading) {
      fetchPosts();
    }
  }, [loading]);

  useEffect(() => {
    // Parse Facebook embeds after posts load
    if (posts.length > 0 && window.FB) {
      window.FB.XFBML.parse();
    }
  }, [posts]);

  const fetchPosts = async () => {
    try {
      const response = await publicApi.get('/posts');

      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleCommentAdded = (postId: string, newComment: Comment) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
  };

  const handlePostAdded = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeaderBar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AddPost onPostAdded={handlePostAdded} />
        {postsLoading ? (
          <div className="text-center py-8">
            <div className="text-xl">Loading posts...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-xl text-gray-600">No posts available.</div>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onCommentAdded={handleCommentAdded} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
