import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await axiosInstance.post("/api/auth/signup", { email, password });
      navigate("/login");
    } catch {
      setError("회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="bg-[#161b22] border border-gray-700 rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1 text-center text-white">
          회원가입
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
          onClick={handleRegister}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0d1117] font-bold rounded-lg py-2 transition"
        >
          가입하기
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
