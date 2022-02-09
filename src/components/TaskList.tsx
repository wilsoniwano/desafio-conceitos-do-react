import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle !== "") {
      const generateId = new Date().getTime();

      const newTask = {
        id: generateId,
        title: newTaskTitle,
        isComplete: false,
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    let newArray: Task[] = [];

    tasks.forEach((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }

      newArray.push(item);
    });

    setTasks(newArray);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    let newArray: Task[] = [];

    newArray = tasks.filter((obj) => obj.id !== id);

    setTasks(newArray);
  }

  function hidePlaceholder() {
    return tasks.length > 0;
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <form
          className="input-group"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Adicionar nova task"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
            aria-label="Adicionar task"
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </form>
      </header>

      <main>
        <p className={hidePlaceholder() ? "hidden" : "placeholder"}>
          Nenhuma task criada. Crie sua primeira task no campo acima.
        </p>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                  <span className="task-label">{task.title}</span>
                </label>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
                aria-label={`Excluir task ${task.title}`}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
