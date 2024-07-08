import BaseController from './BaseController';
import Image from '../models/Image';
// create class Image with CRUD

export default class ImageController extends BaseController {
    constructor() {
        super(Image);
    }
}