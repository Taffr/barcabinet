import type { Maybe } from '../../util/Maybe';

export interface Addable<Document> {
  add(doc: Document): Promise<string>;
}

export interface GetAllable<Document> {
  getAll(): Promise<Document[]>;
}

export interface IdFindable<Document> {
  findById(id: string): Promise<Maybe<Document>>;
  findByIds(ids: string[]): Promise<Document[]>;
}

export interface NameFindable<Document> {
  findByName(name: string): Promise<Maybe<Document>>;
}
