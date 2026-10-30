// URL chuẩn của ứng dụng; page và route registry cùng dùng để tránh lệch đường dẫn.
export const ROUTE_PATHS = {
    home: '/',
    userDocuments: '/my-documents',
    documentTemplateCatalog: '/document-templates',
    documentEditor: '/documents/:documentId/editor',
    presentationTemplateCatalog: '/presentation-templates',
} as const;
