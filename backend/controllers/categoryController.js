const Category = require("../models/categoryModel");

//GET /cat
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
   return res.json(categories);
  } catch (err) {
   return res.status(500).json({ error: err.message });
  }
};

//GET / cat 
exports.getCategoryByName = async (req, res) => {
  try {
    const {cat_name} = req.body;
    const category = await Category.getCategoryByName(cat_name);
    return res.json(category);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//POST /cat
exports.createCategory = async (req, res) => {
  const {cat_name} = req.body;
  if (!cat_name ||cat_name.trim() === "") {
        return res.status(400).json({ error: "A kategória neve nem lehet üres!" });
    }
  try {
    const id = await Category.createCategory(cat_name);
   return res.json({ message: "Category created", id });
  } catch (err) {
   return res.status(500).json({ error: err.message });
  }
};

//PUT /cat
exports.updateCategory= async(req, res) => {
    const { id } = req.params;
    const { cat_name } = req.body;
    if (!cat_name ||cat_name.trim() === "") {
        return res.status(400).json({ error: "A kategória neve nem lehet üres!" });
    }
    
    try {
        const category = await Category.updateCategory(id, cat_name);
        return res.status(200).json({info : "Kategória fríssítve!", data:category});
      } catch (err) {
       return res.status(err.status || 500).json({ error: err.message || err });
    }

}

//DELETE /cat
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
     try {
        const deleteCategory = await Category.deleteCategory(id);
        return res.status(200).json({info : "Szolgáltatás törölve!",data: deleteCategory});
      } catch (err) {
       return res.status(err.status || 500).json({ error: err.message || err });
      }
    
}


