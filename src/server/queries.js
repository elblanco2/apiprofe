import HttpError from '@wasp/core/HttpError.js';

export const getResources = async (args, context) => {
  const { type, difficulty, searchTerm } = args || {};
  
  let query = {};
  
  if (type) {
    query.type = type;
  }
  
  if (difficulty) {
    query.difficulty = difficulty;
  }
  
  if (searchTerm) {
    query.OR = [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } },
      { tags: { has: searchTerm } }
    ];
  }
  
  const resources = await context.entities.Resource.findMany({
    where: query,
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          username: true
        }
      }
    }
  });
  
  return resources;
};

export const getResourceById = async (args, context) => {
  const { id } = args;

  const resource = await context.entities.Resource.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          username: true
        }
      }
    }
  });

  if (!resource) {
    throw new HttpError(404, 'Resource not found');
  }

  return resource;
};

export const getUserProfile = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to access your profile');
  }

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          contributions: true,
          canvasTokens: true
        }
      }
    }
  });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return {
    ...user,
    contributionsCount: user._count.contributions,
    canvasTokensCount: user._count.canvasTokens
  };
};

export const getCanvasTokens = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to access your Canvas tokens');
  }

  const tokens = await context.entities.CanvasToken.findMany({
    where: { userId: context.user.id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      domain: true,
      isActive: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return tokens;
};

export const getUserResources = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to view your resources');
  }

  const { type, difficulty } = args || {};
  
  let query = {
    authorId: context.user.id
  };
  
  if (type) {
    query.type = type;
  }
  
  if (difficulty) {
    query.difficulty = difficulty;
  }
  
  const resources = await context.entities.Resource.findMany({
    where: query,
    orderBy: { createdAt: 'desc' }
  });
  
  return resources;
};
