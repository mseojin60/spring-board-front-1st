// axios 기본 설정 + JWT 인터셉터
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env 파일에서 API 기본 URL을 가져옴
  timeout: 60000,
});

// 요청 인터셉터 - JWT 토큰을 헤더에 자동으로 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // JWT 토큰을 로컬 스토리지에서 가져옴
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
  }
  return config;
});

// 응답 인터셉터 - 401 Unauthorized 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // 토큰 삭제
      window.location.href = "/login"; // 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error); // 다른 에러는 그대로 반환
  },
);

export default axiosInstance;
