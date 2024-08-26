import BaseController from "./BaseController.js";
import Variant from "../models/Variant.js";
// create class Variant with CRUD

export default class VariantController extends BaseController {
  constructor() {
    super(Variant);
  }

  // add list variant to collection
  async addListVariant(request, response) {
    let { products } = request.body;
    // check if name is exist
    let res = await products.map((variant) => {
      if (!variant.name) {
        return response.status(400).json({ message: "Name is required" });
      }
      return variant;
    });
    res = await Promise.all(res);
    let savedVariants = await Variant.insertMany(res);
    return response.status(201).json(savedVariants);
  }

  async getAllPaginationFiltered(request, response) {
    let { keyword, color, material, price, page, limit } = request.body;

    // start filter and paginate
    // find all variants thats contain keyword, color, material, not find when them null

    if (!keyword) {
      keyword = "";
    }

    if (!color) {
      color = "";
    }

    if (!material) {
      material = "";
    }

    if (!price) {
      price = [0, 10000000000000];
    }

    let startPrice = price[0];
    let endPrice = price[1];

    // find variant that contains keyword, color, material

    let res = await Variant.find().sort({ _id: -1 });

    res = res.filter((variant) => {
      return (
        variant.name.toLowerCase().includes(keyword) &&
        variant.variants.some(
          (v) =>
            v.color.toLowerCase().includes(color.toLowerCase()) &&
            v.material.toLowerCase().includes(material.toLowerCase()) &&
            v.price >= startPrice &&
            v.price <= endPrice // check quantity > 0
          // check all variant have quantity > 0
        )
      );
    });

    // console.log(res);

    // handle pagination
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 2;
    // let startIndex = (page - 1) * limit;
    // let endIndex = page * limit;
    let startIndex = (page - 1) * limit;
    let endIndex = startIndex + limit;
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

  async getAllVariantNoPagination(req, res) {
    const variants = await Variant.find();
    return res.status(200).json(variants);
  }
}
