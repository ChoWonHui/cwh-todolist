import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mt-4">페이지를 찾을 수 없습니다</p>
        <p className="text-gray-500 mt-2">요청하신 페이지가 존재하지 않습니다.</p>
        <div className="mt-8 space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            이전 페이지
          </button>
          <button
            onClick={() => navigate('/todos')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
}
