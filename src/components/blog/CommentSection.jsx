import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { MessageCircle, Trash2, CheckCircle, Clock, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { content } from '../content';

export default function CommentSection({ articleId }) {
  const commentContent = content.commentSection;
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  // Check if user is authenticated
  React.useEffect(() => {
    apiClient.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  // Fetch comments
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', articleId],
    queryFn: async () => {
      const allComments = await apiClient.entities.Comment.filter({ article_id: articleId }, '-created_date');
      // Show all comments to admin, only approved to regular users
      if (user?.role === 'admin') {
        return allComments;
      }
      return allComments.filter(c => c.approved);
    },
    enabled: !!articleId,
  });

  // Create comment mutation
  const createComment = useMutation({
    mutationFn: async (content) => {
      return await apiClient.entities.Comment.create({
        article_id: articleId,
        content,
        approved: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
      setNewComment('');
      toast.success(commentContent.messages.submitted);
    },
    onError: () => {
      toast.error(commentContent.messages.submitFailed);
    },
  });

  // Approve comment mutation (admin only)
  const approveComment = useMutation({
    mutationFn: async (commentId) => {
      return await apiClient.entities.Comment.update(commentId, { approved: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
      toast.success(commentContent.messages.approved);
    },
  });

  // Delete comment mutation (admin only)
  const deleteComment = useMutation({
    mutationFn: async (commentId) => {
      return await apiClient.entities.Comment.delete(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
      toast.success(commentContent.messages.deleted);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    createComment.mutate(newComment);
  };

  const formatCommentDate = (value) => {
    if (!value) return 'Unknown date';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return 'Unknown date';
    return format(parsed, 'MMM d, yyyy • h:mm a');
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {commentContent.title} ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      {user ? (
        <Card className="p-6 mb-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder={commentContent.placeholder}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-4 min-h-[100px]"
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
            <Button 
              type="submit" 
              disabled={!newComment.trim() || createComment.isPending}
              style={{ 
                background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
                color: 'white'
              }}
            >
              {createComment.isPending ? commentContent.submitting : commentContent.post}
            </Button>
          </form>
        </Card>
      ) : (
        <Card className="p-6 mb-8 text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>{commentContent.loginRequired}</p>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <p style={{ color: 'var(--text-tertiary)' }}>{commentContent.loading}</p>
        ) : comments.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)' }}>{commentContent.empty}</p>
        ) : (
          comments.map((comment) => (
            <Card 
              key={comment.id} 
              className="p-6"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: comment.approved ? 'var(--border-color)' : 'var(--accent-secondary)',
                borderWidth: '2px'
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent-primary)' }}>
                    <UserCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {comment.created_by}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {formatCommentDate(comment.created_date)}
                    </p>
                  </div>
                </div>

                {/* Admin moderation controls */}
                {user?.role === 'admin' && (
                  <div className="flex gap-2">
                    {!comment.approved && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => approveComment.mutate(comment.id)}
                        disabled={approveComment.isPending}
                        style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {commentContent.approve}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (confirm(commentContent.deleteConfirm)) {
                          deleteComment.mutate(comment.id);
                        }
                      }}
                      disabled={deleteComment.isPending}
                      style={{ borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Pending indicator for admin */}
              {user?.role === 'admin' && !comment.approved && (
                <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-md w-fit" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-secondary) 20%, transparent)' }}>
                  <Clock className="w-4 h-4" style={{ color: 'var(--accent-secondary)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--accent-secondary)' }}>
                    {commentContent.pending}
                  </span>
                </div>
              )}

              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {comment.content}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}