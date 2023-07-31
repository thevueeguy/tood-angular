import { Component, Output, EventEmitter } from '@angular/core';
import { Todo } from '../types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  public todos: Todo[] = [];
  public filteredTodos: Todo[] = [];
  public remainingNum: number = 0;

  public status: string = "";

  constructor( ) { }

  ngOnInit() {
    this.loadAllTodoList();
  }

  loadAllTodoList() {
    this.filteredTodos = this.todos;
    this.remainingNum = this.todos.filter(todo => !todo.completed).length;
  }

  onEnterAddTodo(value: string) {
    if(value === "")
    return;
    this.todos.push({id: this.todos.length+1, content: value, completed: false});
    this.remainingNum = this.todos.filter(todo => !todo.completed).length;
  }
  
  onClickTodoComplete(value: number) {
    let idx = this.todos.findIndex((todo => todo.id == value));
    this.todos[idx].completed = true;

    this.remainingNum = this.todos.filter(todo => !todo.completed).length;
  }

  filterTodos(status: string) {
    return this.todos.filter(todo => {
        if(status === "Active") 
          return !todo.completed
        else if(status === "Completed")
          return todo.completed
        else
          return true;
    }) 
  }

  onClickClear() {
    this.todos = this.todos.filter((todo => todo.completed !== true));
    this.remainingNum = this.todos.filter(todo => !todo.completed).length;
  }

  onClickAll() {
    this.status = "";
  }

  onClickActive() {
    this.status = "Active";
  }

  onClickComplete() {
    this.status = "Completed";
  }
}
