import { useTypedSelector } from '../hooks/useTypedSelector';
import React, { useEffect } from 'react';
import { useAction } from '../hooks/useAction';

const TodoList: React.FC = () => {
  const { error, limit, loading, page, todos } = useTypedSelector(
    (state) => state.todo
  );
  const pages = [1, 2, 3, 4, 5];
  const { fetchTodo, setTodoPage } = useAction();

  useEffect(() => {
    fetchTodo(page, limit);
  }, [page]);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.id} - {todo.title}
        </div>
      ))}
      <div style={{ display: 'flex' }}>
        {pages.map((p) => (
          <div
            onClick={() => setTodoPage(p)}
            style={{
              border: p === page ? '2px solid red' : '1px solid gray',
              padding: '10px',
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
