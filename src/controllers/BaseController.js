// create class base with CRUD

class BaseController {
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
    try {
      let id = req?.params?.id;

      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }

      let document = await this.model.findById(id);

      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      return res.status(200).json(document);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req, res) {
    let id = req?.params?.id;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    let data = req.body;
    if (!data) {
      return res.status(400).json({ message: "No data provided" });
    }
    if (data.length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    // Update the document with the provided data

    let updatedDocument = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json(updatedDocument);
  }

  async delete(req, res) {
    let rowDeleted = await this.model.findByIdAndDelete(req.params.id);
    // console.log(rowDeleted, "row deleted");
    return res.status(200).json(rowDeleted);
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

    results.data = results.data.sort((a, b) => b._id - a._id);

    let pagination = {
      current: page,
      pageSize: limit,
      total: res.length,
    };

    results.pagination = pagination;

    return response.status(200).json(results);
  }

  async deleteAll(req, res) {
    // delete all
    let rowsDeleted = await this.model.deleteMany({});

    // log the number of rows deleted
    // console.log(rowsDeleted, "rows deleted");
    return res.status(200).json(rowsDeleted);
  }

  async getAllPagination(request, response) {
    let res = await this.model.find();

    // handle pagination
    let page = parseInt(request.query.page) || 1;
    let limit = parseInt(request.query.limit) || 10;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let results = {};

    results.total = res.length;
    results.data = res.slice(startIndex, endIndex);

    // sap xep theo id
    results.data = results.data.sort((a, b) => a._id - b._id);

    let pagination = {
      current: page,
      pageSize: 5,
      total: results.data.length,
    };

    results.pagination = pagination;

    return response.status(200).json(results);
  }
}

export default BaseController;
