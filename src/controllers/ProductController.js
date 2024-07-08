import BaseController from './BaseController';
import Product from '../models/Product';
// create class product with CRUD

export default class ProductController extends BaseController {
    constructor() {
        super(Product);
    }
}