// Type checking utilities
export const typeChecks = {
  isArray: (value) => Array.isArray(value),
  isObject: (value) => 
    value && typeof value === "object" && !Array.isArray(value),
  isString: (value) => typeof value === "string",
  isNumber: (value) => typeof value === "number" && !isNaN(value),
  isFunction: (value) => typeof value === "function",
  isBoolean: (value) => typeof value === "boolean",
  isNull: (value) => value === null,
  isUndefined: (value) => value === undefined,
  isEmpty: (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' || Array.isArray(value)) 
      return value.length === 0;
    if (typeof value === 'object') 
      return Object.keys(value).length === 0;
    return false;
  },
  getType: (value) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }
};