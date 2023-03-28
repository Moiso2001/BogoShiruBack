import { ValidateDeletedDocumentsMiddleware } from './validate-deleted-documents.middleware';

describe('ValidateDeletedDocumentsMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateDeletedDocumentsMiddleware()).toBeDefined();
  });
});
