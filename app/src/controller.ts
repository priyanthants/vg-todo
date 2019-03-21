import * as express from 'express';

let todos: any[] = [{ id: 1, todo: 'design database',status:true}];

class Controller {
    public path = '/todo';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllTodo);
        this.router.get(this.path + "/:id", this.getOneTodo);
        this.router.post(this.path, this.createATodo);
        this.router.put(this.path + "/:id", this.updateATodo);
        this.router.delete(this.path + "/:id", this.deleteTodo);
    }

    getAllTodo = (request: express.Request, response: express.Response) => {
        response.send(todos);
    }

    getOneTodo = (request: express.Request, response: express.Response) => {
        let id: number = request.params.id;
        let employee: any = todos.filter(ele => ele.employeeId == id)[0];
        if (employee) {
            response.send(employee);
        } else {
            response.send("Employee not Found.");
        }
    }

    deleteTodo = (request: express.Request, response: express.Response) => {
        let id: number = request.params.id;
        let employee: any = todos.filter(ele => ele.employeeId == id)[0];
        if (employee) {
            todos.splice(todos.indexOf(employee), 1);
            response.send(true);
        } else {
            response.send(false);
        }
    }

    createATodo = (request: express.Request, response: express.Response) => {
        const employee: any = request.body;
        employee.employeeId = todos.length + 1;
        todos.push(employee);
        response.send(employee);
    }

    updateATodo = (request: express.Request, response: express.Response) => {
        let id: number = request.params.id;
        const data: any = request.body;
        let employee: any = todos.filter(ele => ele.employeeId == id)[0];
        if (employee) {
            data.employeeId = employee.employeeId;
            todos[todos.indexOf(employee)] = data;
            response.send(true);
        }
        response.send(false);
    }
}

export default Controller;