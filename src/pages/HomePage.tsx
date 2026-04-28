import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

interface Post {
  id: number;
  content: string;
  email: string;
  likeCount: number;
  liked: boolean;
  commentCount: number;
  createdAt: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const myEmail = localStorage.getItem("email") || "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await axiosInstance.get("/api/posts");
    setPosts(res.data.content ?? res.data);
  };

  useEffect(() => {
    const load = async () => {
      fetchPosts();
    };
    load();
  }, []);

  const handlePost = async () => {
    if (!content.trim()) return;
    try {
      await axiosInstance.post("/api/posts", { content });
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error("게시 실패:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* GNB */}
      <nav className="bg-[#161b22] border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-lg text-cyan-400 tracking-wider">
            SpringBoard
          </span>
          <div className="flex items-center gap-3 text-sm">
            {myEmail ? (
              <>
                <span className="text-gray-500">{myEmail}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-400 transition"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-cyan-400 transition"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="bg-cyan-500 hover:bg-cyan-400 text-[#0d1117] font-bold px-3 py-1 rounded-lg transition"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-4">
        {/* 글쓰기 박스 */}
        <div className="bg-[#161b22] border border-gray-700 rounded-xl p-4 mb-4">
          <textarea
            className="w-full resize-none outline-none text-gray-300 placeholder-gray-600 text-base bg-transparent"
            rows={3}
            placeholder="무슨 생각을 하고 계신가요?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePost}
              className="bg-cyan-500 hover:bg-cyan-400 text-[#0d1117] font-bold px-5 py-1.5 rounded-full text-sm transition"
            >
              게시하기
            </button>
          </div>
        </div>

        {/* 피드 */}
        <div className="flex flex-col gap-3">
          {posts.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              myEmail={myEmail}
              onRefresh={fetchPosts}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
