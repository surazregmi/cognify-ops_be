import Joi from "joi";

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

// ✅ Validator for creating a new project
export const validateCreateProject = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required().messages({
      "string.base": "Project name must be a string",
      "string.max": "Project name can be at most 255 characters",
      "any.required": "Project name is required",
    }),
    description: Joi.string().allow("", null).optional().messages({
      "string.base": "Description must be a string",
    }),
  });

  return schema.validate(data, options);
};

// ✅ Validator for updating an existing project
export const validateUpdateProject = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().max(255).optional().messages({
      "string.base": "Project name must be a string",
      "string.max": "Project name can be at most 255 characters",
    }),
    description: Joi.string().allow("", null).optional().messages({
      "string.base": "Description must be a string",
    }),
  });

  return schema.validate(data, options);
};
