const { Op } = require('sequelize');

/**
 * Универсальная функция для генерации условий фильтрации
 * @param {Object} query - объект параметров запроса (req.query)
 * @param {Array} allowedFields - список полей, которые можно фильтровать
 * @returns {Object} - объект условий для Sequelize
 */
async function buildFilters(query, allowedFields) {
  const filters = {};
  const operators = ['Gt', 'Gte', 'Lt', 'Lte', 'Eq', 'Like'];

  allowedFields.forEach(field => {
    operators.forEach(op => {
      const key = `${field}${op}`;

      if (query[key] !== undefined) {
        const sequelizeOp = Op[op.toLowerCase()];

        filters[field] = {
          ...(filters[field] || {}),
          [sequelizeOp]: op === 'Like' ? `%${query[key]}%` : query[key],
        };
      }
    });
    // Точное соответствие без операторов (например, ?field=value)
    if (query[field] !== undefined && filters[field] === undefined) {
      filters[field] = query[field];
    }
  });

  return filters;
}

module.exports = { buildFilters };
