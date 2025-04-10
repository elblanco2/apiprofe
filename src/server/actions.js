import HttpError from '@wasp/core/HttpError.js';

export const createResource = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to create a resource');
  }

  const { title, description, content, type, tags, difficulty } = args;

  if (!title || !description || !content || !type || !difficulty) {
    throw new HttpError(400, 'All required fields must be provided');
  }

  const resource = await context.entities.Resource.create({
    data: {
      title,
      description,
      content,
      type,
      tags: tags || [],
      difficulty,
      author: {
        connect: { id: context.user.id }
      }
    }
  });

  return resource;
};

export const updateResource = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to update a resource');
  }

  const { id, title, description, content, type, tags, difficulty } = args;

  // Check if resource exists and belongs to user
  const resource = await context.entities.Resource.findUnique({
    where: { id },
    include: { author: true }
  });

  if (!resource) {
    throw new HttpError(404, 'Resource not found');
  }

  if (resource.author.id !== context.user.id && context.user.role !== 'ADMIN') {
    throw new HttpError(403, 'You are not authorized to update this resource');
  }

  // Update the resource
  const updatedResource = await context.entities.Resource.update({
    where: { id },
    data: {
      title: title || resource.title,
      description: description || resource.description,
      content: content || resource.content,
      type: type || resource.type,
      tags: tags || resource.tags,
      difficulty: difficulty || resource.difficulty,
    }
  });

  return updatedResource;
};

export const deleteResource = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to delete a resource');
  }

  const { id } = args;

  // Check if resource exists and belongs to user
  const resource = await context.entities.Resource.findUnique({
    where: { id },
    include: { author: true }
  });

  if (!resource) {
    throw new HttpError(404, 'Resource not found');
  }

  if (resource.author.id !== context.user.id && context.user.role !== 'ADMIN') {
    throw new HttpError(403, 'You are not authorized to delete this resource');
  }

  // Delete the resource
  await context.entities.Resource.delete({
    where: { id }
  });

  return { success: true };
};

export const createCanvasToken = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to create a Canvas token');
  }

  const { name, token, domain } = args;

  if (!name || !token || !domain) {
    throw new HttpError(400, 'All required fields must be provided');
  }

  // Create the Canvas token
  const canvasToken = await context.entities.CanvasToken.create({
    data: {
      name,
      token,
      domain,
      user: {
        connect: { id: context.user.id }
      }
    }
  });

  // For security, don't return the actual token
  return {
    id: canvasToken.id,
    name: canvasToken.name,
    domain: canvasToken.domain,
    isActive: canvasToken.isActive,
    createdAt: canvasToken.createdAt
  };
};

export const deleteCanvasToken = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to delete a Canvas token');
  }

  const { id } = args;

  // Check if token exists and belongs to user
  const token = await context.entities.CanvasToken.findUnique({
    where: { id },
    include: { user: true }
  });

  if (!token) {
    throw new HttpError(404, 'Canvas token not found');
  }

  if (token.user.id !== context.user.id && context.user.role !== 'ADMIN') {
    throw new HttpError(403, 'You are not authorized to delete this token');
  }

  // Delete the token
  await context.entities.CanvasToken.delete({
    where: { id }
  });

  return { success: true };
};
