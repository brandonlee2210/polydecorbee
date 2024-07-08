// create class base with CRUD

class BaseController {
  k;
  constructor(model) {
    this.model = model;

    // Bind methods to the class instance
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async create(req, res) {
    let data = req.body;
    let newDocument = new this.model(data);
    let result = await newDocument.save();
    return res.status(201).json(result);
  }

  async getById(req, res) {
    let id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    let document = await this.model.findById(id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json(document);
  }

  update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async getAll(reqest, response) {
    let res = await this.model.find();

    // handle pagination
    let page = parseInt(reqest.query.page) || 1;
    let limit = parseInt(reqest.query.limit) || 10;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let results = {};

    results.total = res.length;
    results.data = res.slice(startIndex, endIndex);
    results.currentPage = page;
    results.pages = Math.ceil(results.total / limit);

    return response.status(200).json(results);
  }
}

export default BaseController;
