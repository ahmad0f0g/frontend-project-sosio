import en from "../locales/en.json" assert { type: "json" };
import id from "../locales/id.json" assert { type: "json" };

const language = (req, res, next) => {
  const lang = req.headers["accept-language"] || "id";

  req.t = (key) => {
    if (lang.startsWith("en")) return en[key] || key;
    return id[key] || key;
  };

  next();
};

export default language;
