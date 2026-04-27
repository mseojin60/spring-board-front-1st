import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

interface Post {
  id: number;
  content: string;
  authorEmail: string;
  likeCount: number;
  liked: boolean;
  commentCount: number;
  createdAt: string;
}

interface Props {
  post: Post;
  myEmail: string;
  onRefresh: () => void;
}

export default function PostCard({ post, myEmail, onRefresh }: Props) {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const isAuthor = post.authorEmail === myEmail;

  const handleLike = async () => {
    if (post.liked) {
      await axiosInstance.delete(`/api/likes/${post.id}`);
    } else {
      await axiosInstance.post(`/api/likes/${post.id}`);
    }
    onRefresh();
  };

  const handleDelete = async () => {
    if (!confirm("게시물을 삭제할까요?")) return;
    await axiosInstance.delete(`/api/posts/${post.id}`);
    onRefresh();
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    await axiosInstance.post(`/api/comments/${post.id}`, { content: comment });
    setComment("");
    setShowComment(false);
    onRefresh();
  };

  return (
    <div className="bg-[#161b22] border border-gray-700 rounded-xl p-4">
      {/* 작성자 + 삭제 */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-cyan-400">{post.authorEmail}</span>
        {isAuthor && (
          <button
            onClick={handleDelete}
            className="text-xs text-gray-600 hover:text-red-400 transition"
          >
            삭제
          </button>
        )}
      </div>

      {/* 본문 */}
      <p className="text-gray-300 text-base mb-3 whitespace-pre-wrap">
        {post.content}
      </p>

      {/* 액션 */}
      <div className="flex gap-5 border-t border-gray-700 pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm transition ${post.liked ? "text-red-400" : "text-gray-600 hover:text-red-400"}`}
        >
          {post.liked ? "♥" : "♡"} {post.likeCount}
        </button>
        <button
          onClick={() => setShowComment(!showComment)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-cyan-400 transition"
        >
          💬 {post.commentCount}
        </button>
      </div>

      {/* 댓글 입력 */}
      {showComment && (
        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 bg-[#0d1117] border border-gray-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-cyan-500 text-gray-300 placeholder-gray-600 transition"
            placeholder="댓글을 입력하세요..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleComment}
            className="bg-cyan-500 hover:bg-cyan-400 text-[#0d1117] font-bold px-3 py-1.5 rounded-lg text-sm transition"
          >
            등록
          </button>
        </div>
      )}
    </div>
  );
}
