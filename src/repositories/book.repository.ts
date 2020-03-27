import {DefaultCrudRepository} from '@loopback/repository';
import {Book, BookRelations} from '../models';
import {BookDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.title,
  BookRelations
> {
  constructor(
    @inject('datasources.bookDb') dataSource: BookDbDataSource,
  ) {
    super(Book, dataSource);
  }
}
