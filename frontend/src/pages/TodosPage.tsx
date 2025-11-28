import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../services/api';
import { useAuthStore } from '../store/authStore';
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types';
import TodoAddModal from '../components/todo/TodoAddModal';
import TodoEditModal from '../components/todo/TodoEditModal';
import TodoDeleteConfirmation from '../components/todo/TodoDeleteConfirmation';
import Layout from '../components/common/Layout';

const TodosPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuthStore();
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch todos
  const {
    data: todos = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos,
    enabled: isAuthenticated && !authLoading, // Only fetch if authenticated
  });

  // Mutation for creating a new todo
  const createTodoMutation = useMutation({
    mutationFn: (newTodo: CreateTodoRequest) => todoApi.createTodo(newTodo),
    onSuccess: () => {
      // Invalidate and refetch todos
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsAddModalOpen(false);
    },
    onError: (error) => {
      console.error('Failed to create todo:', error);
      alert('할일 생성에 실패했습니다.');
    },
  });

  // Mutation for updating a todo
  const updateTodoMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoRequest }) =>
      todoApi.updateTodo(id, data),
    onSuccess: () => {
      // Invalidate and refetch todos
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditTodo(null);
    },
    onError: (error) => {
      console.error('Failed to update todo:', error);
      alert('할일 수정에 실패했습니다.');
    },
  });

  // Mutation for deleting a todo
  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => todoApi.deleteTodo(id),
    onSuccess: () => {
      // Invalidate and refetch todos
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTodoToDelete(null);
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error);
      alert('할일 삭제에 실패했습니다.');
      setTodoToDelete(null);
    },
  });

  const handleSaveTodo = (todoData: CreateTodoRequest) => {
    createTodoMutation.mutate(todoData);
  };

  const handleSaveEditTodo = (todoId: string, todoData: UpdateTodoRequest) => {
    updateTodoMutation.mutate({ id: todoId, data: todoData });
  };

  const handleDeleteTodo = (todo: Todo) => {
    setTodoToDelete(todo);
  };

  const handleConfirmDelete = () => {
    if (todoToDelete) {
      deleteTodoMutation.mutate(todoToDelete.id);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect effect will handle this
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600">에러 발생</h2>
          <p className="mt-2 text-gray-600">
            {error instanceof Error ? error.message : '할일 목록을 불러오는데 실패했습니다.'}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">할일 목록</h1>
            <p className="mt-2 text-sm text-gray-700">
              할일을 관리하세요
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              새 할일 추가
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">등록된 할일이 없습니다.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              첫 할일 추가하기
            </button>
          </div>
        ) : (
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <ul role="list" className="divide-y divide-gray-200">
                    {todos && Array.isArray(todos) && todos
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) // Sort by due date
                      .map((todo) => (
                        <li key={todo.id} className="px-6 py-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center">
                                <h3 className="text-sm font-medium text-gray-900 truncate">{todo.title}</h3>
                                {todo.description && (
                                  <p className="mt-1 text-sm text-gray-500 ml-2">{todo.description}</p>
                                )}
                              </div>
                              <div className="mt-2 flex">
                                <p className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  시작: {new Date(todo.startDate).toLocaleDateString()}
                                </p>
                                <p className="ml-2 text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded">
                                  마감: {new Date(todo.dueDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex space-x-2">
                              <button
                                onClick={() => setEditTodo(todo)}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDeleteTodo(todo)}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Todo Modal */}
        <TodoAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveTodo}
          loading={createTodoMutation.isPending}
        />

        {/* Edit Todo Modal */}
        <TodoEditModal
          isOpen={!!editTodo}
          onClose={() => setEditTodo(null)}
          onSave={handleSaveEditTodo}
          todo={editTodo}
          loading={updateTodoMutation.isPending}
        />

        {/* Delete Confirmation Dialog */}
        <TodoDeleteConfirmation
          isOpen={!!todoToDelete}
          onClose={() => setTodoToDelete(null)}
          onConfirm={handleConfirmDelete}
          todoTitle={todoToDelete?.title || ''}
          loading={deleteTodoMutation.isPending}
        />
      </div>
    </Layout>
  );
};

export default TodosPage;