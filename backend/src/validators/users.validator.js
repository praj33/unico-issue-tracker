const { z } = require('zod');

const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(150)
});

module.exports = {
  createUserSchema
};