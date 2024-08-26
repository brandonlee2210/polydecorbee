import BaseController from "./BaseController.js";
import VariantProduct from "../models/VariantProduct.js";

export default class VariantController extends BaseController {
  constructor() {
    super(VariantProduct);
  }

  async getAll(reqest, response) {
    let res = await VariantProduct.find();

    // handle pagination
    let page = parseInt(reqest.query.page) || 1;
    let limit = parseInt(reqest.query.limit) || 100;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let results = {};

    results.total = res.length;

    results.data = res.slice(startIndex, endIndex);

    // sap xep theo id
    results.data = results.data.sort((a, b) => a._id - b._id);

    let pagination = {
      current: page,
      pageSize: limit,
      total: res.length,
    };

    results.pagination = pagination;

    return response.status(200).json(results);
  }
}
