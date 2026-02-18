const STORAGE_KEY = 'portfolio_local_db';
const USER_KEY = 'portfolio_local_user';
const LOGS_KEY = 'portfolio_navigation_logs';
const ARTICLE_FILE_MODULES = import.meta.glob('../content/articles/*.json', { eager: true });

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const getNow = () => new Date().toISOString();

const slugify = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const clone = (value) => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const getDefaultDb = () => ({
  Article: [],
  ArticleOverrides: {},
  ArticleDeletedIds: [],
  Bookmark: [],
  Comment: [],
  Newsletter: [],
  ContactSubmission: [],
});

const normalizeArticle = (article, fallbackId) => {
  const id = article?.id || article?.slug || fallbackId;
  return {
    id,
    title: article?.title || '',
    slug: article?.slug || id,
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    author: article?.author || 'Local Author',
    category: article?.category || 'Technical',
    tags: Array.isArray(article?.tags) ? article.tags : [],
    published: article?.published ?? true,
    cover_image: article?.cover_image || '',
    read_time: Number.isFinite(article?.read_time) ? article.read_time : 5,
    created_date: article?.created_date || article?.published_date || getNow(),
    published_date: article?.published_date || article?.created_date || getNow(),
    ...article,
    id,
  };
};

const getFileArticles = () => {
  const entries = Object.entries(ARTICLE_FILE_MODULES).map(([path, module]) => {
    const filename = path.split('/').pop()?.replace('.json', '') || createId();
    const payload = module?.default ?? module;
    return normalizeArticle(payload || {}, filename);
  });

  const deduped = new Map();
  for (const article of entries) {
    deduped.set(article.id, article);
  }
  return [...deduped.values()];
};

const readDb = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultDb();
    }
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultDb(),
      ...parsed,
    };
  } catch {
    return getDefaultDb();
  }
};

const writeDb = (db) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

const getEffectiveArticles = (db) => {
  const fileArticles = getFileArticles();
  const deletedIds = new Set(db.ArticleDeletedIds || []);
  const overrides = db.ArticleOverrides || {};
  const localArticles = db.Article || [];

  const fileBackedArticles = fileArticles
    .filter((article) => !deletedIds.has(article.id))
    .map((article) => ({ ...article, ...(overrides[article.id] || {}) }));

  const merged = new Map();
  [...fileBackedArticles, ...localArticles].forEach((article) => {
    merged.set(article.id, article);
  });

  return [...merged.values()];
};

const sortItems = (items, sort) => {
  if (!sort) return items;
  const descending = sort.startsWith('-');
  const field = descending ? sort.slice(1) : sort;
  return [...items].sort((a, b) => {
    const aValue = a?.[field];
    const bValue = b?.[field];
    if (aValue === bValue) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;
    if (aValue > bValue) return descending ? -1 : 1;
    return descending ? 1 : -1;
  });
};

const matchesFilter = (item, filters = {}) =>
  Object.entries(filters).every(([key, value]) => item?.[key] === value);

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    return null;
  }
  const defaultUser = {
    id: 'local-admin',
    email: 'admin@local.dev',
    full_name: 'Local Admin',
    role: 'admin',
  };
  localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
  return defaultUser;
};

const auth = {
  async me() {
    const user = getStoredUser();
    if (!user) {
      const error = new Error('Authentication required');
      error.status = 401;
      throw error;
    }
    return clone(user);
  },
  logout(redirectUrl) {
    localStorage.removeItem(USER_KEY);
    if (redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }
    window.location.reload();
  },
  redirectToLogin(redirectUrl) {
    const user = {
      id: 'local-admin',
      email: 'admin@local.dev',
      full_name: 'Local Admin',
      role: 'admin',
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  },
};

const createEntityApi = (entityName) => ({
  async list(sort) {
    const db = readDb();
    const items = entityName === 'Article' ? getEffectiveArticles(db) : (db[entityName] || []);
    return clone(sortItems(items, sort));
  },
  async filter(filters = {}, sort) {
    const db = readDb();
    const source = entityName === 'Article' ? getEffectiveArticles(db) : (db[entityName] || []);
    const items = source.filter((item) => matchesFilter(item, filters));
    return clone(sortItems(items, sort));
  },
  async get(id) {
    const db = readDb();
    const source = entityName === 'Article' ? getEffectiveArticles(db) : (db[entityName] || []);
    const item = source.find((entry) => entry.id === id);
    if (!item) {
      const error = new Error(`${entityName} not found`);
      error.status = 404;
      throw error;
    }
    return clone(item);
  },
  async create(payload) {
    const db = readDb();
    const user = getStoredUser();
    const generatedId = createId();
    const articleId =
      entityName === 'Article'
        ? (payload?.id || payload?.slug || slugify(payload?.title) || generatedId)
        : generatedId;
    const item = {
      id: articleId,
      created_date: getNow(),
      created_by: user?.full_name || user?.email || 'Local User',
      ...payload,
    };

    if (entityName === 'Article' && import.meta.env.DEV) {
      const fileName = slugify(item.slug || item.title || item.id);
      if (!fileName) {
        const error = new Error('Article needs a valid title or slug');
        error.status = 400;
        throw error;
      }

      const response = await fetch('/__local/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: item, fileName }),
      });

      if (!response.ok) {
        const error = new Error('Failed to save article JSON file');
        error.status = response.status;
        throw error;
      }

      db.Article = [
        ...(db.Article || []).filter((entry) => entry.id !== item.id),
        item,
      ];
      writeDb(db);

      return clone(item);
    }

    db[entityName] = [...(db[entityName] || []), item];
    writeDb(db);
    return clone(item);
  },
  async update(id, payload) {
    const db = readDb();
    const items = db[entityName] || [];
    const index = items.findIndex((entry) => entry.id === id);
    if (entityName === 'Article' && index === -1) {
      const fileArticle = getFileArticles().find((entry) => entry.id === id);
      if (!fileArticle) {
        const error = new Error(`${entityName} not found`);
        error.status = 404;
        throw error;
      }
      const override = {
        ...(db.ArticleOverrides?.[id] || {}),
        ...payload,
        id,
        updated_date: getNow(),
      };
      db.ArticleOverrides = {
        ...(db.ArticleOverrides || {}),
        [id]: override,
      };
      writeDb(db);
      return clone({ ...fileArticle, ...override });
    }
    if (index === -1) {
      const error = new Error(`${entityName} not found`);
      error.status = 404;
      throw error;
    }
    const updatedItem = {
      ...items[index],
      ...payload,
      id,
      updated_date: getNow(),
    };
    items[index] = updatedItem;
    db[entityName] = items;
    writeDb(db);
    return clone(updatedItem);
  },
  async delete(id) {
    const db = readDb();
    const items = db[entityName] || [];
    if (entityName === 'Article') {
      const localItemExists = items.some((entry) => entry.id === id);
      if (localItemExists) {
        db[entityName] = items.filter((entry) => entry.id !== id);
      } else {
        const deletedIds = new Set(db.ArticleDeletedIds || []);
        deletedIds.add(id);
        db.ArticleDeletedIds = [...deletedIds];
        if (db.ArticleOverrides?.[id]) {
          const { [id]: _, ...rest } = db.ArticleOverrides;
          db.ArticleOverrides = rest;
        }
      }
    } else {
      db[entityName] = items.filter((entry) => entry.id !== id);
    }
    writeDb(db);
    return { success: true };
  },
});

const appLogs = {
  async logUserInApp(pageName) {
    const existing = JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
    existing.push({
      id: createId(),
      page: pageName,
      at: getNow(),
    });
    localStorage.setItem(LOGS_KEY, JSON.stringify(existing.slice(-500)));
    return { success: true };
  },
};

export const apiClient = {
  auth,
  entities: {
    Article: createEntityApi('Article'),
    Bookmark: createEntityApi('Bookmark'),
    Comment: createEntityApi('Comment'),
    Newsletter: createEntityApi('Newsletter'),
    ContactSubmission: createEntityApi('ContactSubmission'),
  },
  appLogs,
};
