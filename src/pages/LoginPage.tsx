import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);
      navigate("/");
    } catch {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="bg-[#161b22] border border-gray-700 rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1 text-center text-white">
          로그인
        </h1>
        <p className="text-center text-cyan-400 text-sm mb-6">SpringBoard</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <input
          className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 mb-3 outline-none focus:border-cyan-500 text-gray-300 placeholder-gray-600 transition"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 mb-4 outline-none focus:border-cyan-500 text-gray-300 placeholder-gray-600 transition"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0d1117] font-bold rounded-lg py-2 transition"
        >
          로그인
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          계정이 없으신가요?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
