'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authApi } from '@/lib/api';
import type { Comment, Post } from '@/types';

interface PostCardProps {
  post: Post;
  onCommentAdded: (postId: string, comment: Comment) => void;
}

export default function PostCard({ post, onCommentAdded }: PostCardProps) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const response = await authApi.post(`/posts/${post.id}/comments`, {
        content: newComment,
      });

      onCommentAdded(post.id, response.data);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      {/* Facebook Post Embed */}
      <div className="mb-4 flex justify-center">
        <div className="fb-post" data-href={post.permalink_url}></div>
      </div>

      {/* Comments Section */}
      <div className="pt-2">
        <h3 className="text-lg font-semibold mb-4">Comentários ({post.comments?.length})</h3>

        {/* Existing Comments */}
        <div className="space-y-3 mb-4">
          {post.comments?.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    {/** biome-ignore lint/performance/noImgElement: Needs config in next.config.ts */}
                    <img
                      src={comment.user.avatar_url}
                      alt={comment.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="font-semibold text-black">{comment.user.name}</div>
                  </div>
                  <div className="text-gray-800 text-lg">{comment.content}</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {new Date(comment.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        {user && (
          <form onSubmit={handleSubmitComment} className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreve o teu comentário, mesmo que incomode..."
              className="flex-1 border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="bg-blue-600 hover:bg-blue-700 hover:not-disabled:cursor-pointer disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              {isSubmitting ? 'A publicar...' : 'Publicar'}
            </button>
          </form>
        )}

        {!user && (
          <p className="text-gray-500 text-center py-4">Para comentar, entra com o Facebook.</p>
        )}
      </div>
    </div>
  );
}
