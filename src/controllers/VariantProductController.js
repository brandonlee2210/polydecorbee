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

  async getAllColor(request, response) {
    try {
      const colors = await VariantProduct.find({
        variantProductType: "color",
      });
      if (colors.length === 0) {
        return response.status(404).json({ message: "No color found" });
      }
      return response.status(200).json(colors);
    } catch (error) {
      console.error("Error fetching colors:", error);
      response.status(500).json({ message: error.message });
    }
  }

  async getAllMaterial(reqest, response) {
    try {
      const materials = await VariantProduct.find({
        variantProductType: "material",
      });
      if (materials.length === 0) {
        return response.status(404).json({ message: "No material found" });
      }
      return response.status(200).json(materials);
    } catch (error) {
      console.error("Error fetching materials:", error);
      response.status(500).json({ message: error.message });
    }
  }
}
