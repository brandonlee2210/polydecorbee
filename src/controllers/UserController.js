import BaseController from './BaseController';
import User from '../models/User';
// create class product with CRUD

export default class UserController extends BaseController {
    constructor() {
        super(User);
    }
}