import News from "../models/News.js";

// traer noticias
export const getNewsItems = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener noticias" });
  }
};

// Crear la
export const createNewsItem = async (req, res) => {
  try {
    const { title, image } = req.body;
    

    const news = await News.create({
      title,
      image,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error al crear noticia" });
  }
};