interface TodoDeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  todoTitle: string;
  loading?: boolean;
}

const TodoDeleteConfirmation = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  todoTitle,
  loading = false
}: TodoDeleteConfirmationProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">할일 삭제</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              disabled={loading}
            >
              <span className="sr-only">닫기</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <p className="text-gray-700">
              <span className="font-semibold">"{todoTitle}"</span> 할일을 정말 삭제하시겠습니까?
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              이 작업은 되돌릴 수 없습니다.
            </p>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? '삭제 중...' : '삭제'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDeleteConfirmation;