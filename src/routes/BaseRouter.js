import { Router } from "express";

import "../middlewares/authMiddleware.js";

class BaseRouter {
  constructor(controller, routeName) {
    this.router = Router();
    this.controller = controller;
    this.routeName = routeName;
    this.initRoutes();
  }

  initRoutes() {
    // Khởi tạo các routes cơ bản
    this.router.get(`/${this.routeName}`, this.controller.getAll);
    this.router.get(`/${this.routeName}/:id`, this.controller.getById);
    this.router.post(`/${this.routeName}`, this.controller.create);
    this.router.put(`/${this.routeName}/:id`, this.controller.update);
    this.router.delete(`/${this.routeName}/:id`, this.controller.delete);
    this.router.delete(`/${this.routeName}`, this.controller.deleteAll);
  }

  // return route
  get route() {
    return this.router;
  }

  // add custom router
  addRouter(method, path, handler) {
    this.router[method](path, handler);
  }

  getController() {
    return this.controller;
  }

  // get controller() {
  //   return this.controller;
  // }

  // set controller(controller) {
  //   this.controller = controller;
  // }
}

export default BaseRouter;

// Example usage:
