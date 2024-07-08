import BaseController from './BaseController';
import Order from '../models/Order';
// create class Order with CRUD

export default class OrderController extends BaseController {
    constructor() {
        super(Order);
    }
}