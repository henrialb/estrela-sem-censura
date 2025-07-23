import { useState } from 'react';
import { publicApi } from '@/lib/api';
import type { Post } from '@/types';
import { isFacebookUrl } from '@/utils/urlValidator';

interface AddPostProps {
  onPostAdded: (post: Post) => void;
}

export const AddPost = ({ onPostAdded }: AddPostProps) => {
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    if (!isFacebookUrl(newPost)) {
      alert('Por favor, insere um URL válido do Facebook.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await publicApi.post(`/posts`, {
        url: newPost,
      });

      onPostAdded(response.data);
      setNewPost('');
    } catch (error) {
      console.error('Failed to add post:', error);
      alert('Falha ao adicionar publicação. Tenta novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="font-black text-xl mb-2">Adicionar Publicação</h2>
      <p>
        Se ainda não a encontras nesta página, cola aqui o URL da publicação que queres comentar
      </p>
      <form onSubmit={handleSubmitComment} className="flex space-x-2 mt-4">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="URL da publicação do Facebook"
          className="flex-1 border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !newPost.trim()}
          className="bg-blue-600 hover:bg-blue-700 hover:not-disabled:cursor-pointer disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          {isSubmitting ? 'A publicar...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
};
