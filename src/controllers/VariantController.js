import BaseController from './BaseController';
import Variant from '../models/Variant';
// create class Variant with CRUD

export default class ImageController extends BaseController {
    constructor() {
        super(Variant);
    }
}