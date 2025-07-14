// Deep merge function
export const deepMerge = (...objects) => {
  const isObject = (obj) => 
    obj && typeof obj === "object" && !Array.isArray(obj);
    
  return objects.reduce((acc, obj) => {
    if (!isObject(obj)) return acc;
    
    Object.keys(obj).forEach((key) => {
      if (isObject(acc[key]) && isObject(obj[key])) {
        acc[key] = deepMerge(acc[key], obj[key]);
      } else {
        acc[key] = obj[key];
      }
    });
    return acc;
  }, {});
};