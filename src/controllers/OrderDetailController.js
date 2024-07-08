// Tao class tu base
import BaseController from './BaseController';
import OrderDetail from '../models/OrderDetail';
// create class OrderDetail with CRUD

export default class OrderDetailController extends BaseController {
    constructor() {
        super(OrderDetail);
    }
}