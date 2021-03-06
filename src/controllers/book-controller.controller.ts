import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Book} from '../models';
import {BookRepository} from '../repositories';

export class BookControllerController {
  constructor(
    @repository(BookRepository)
    public bookRepository : BookRepository,
  ) {}

  @post('/book-reminder', {
    responses: {
      '200': {
        description: 'Book model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBook',
            
          }),
        },
      },
    })
    book: Book,
  ): Promise<Book> {
    return this.bookRepository.create(book);
  }

  @get('/book-reminder/count', {
    responses: {
      '200': {
        description: 'Book model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Book) where?: Where<Book>,
  ): Promise<Count> {
    return this.bookRepository.count(where);
  }

  @get('/book-reminder', {
    responses: {
      '200': {
        description: 'Array of Book model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Book, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Book) filter?: Filter<Book>,
  ): Promise<Book[]> {
    return this.bookRepository.find(filter);
  }

  @patch('/book-reminder', {
    responses: {
      '200': {
        description: 'Book PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Book,
    @param.where(Book) where?: Where<Book>,
  ): Promise<Count> {
    return this.bookRepository.updateAll(book, where);
  }

  @get('/book-reminder/{id}', {
    responses: {
      '200': {
        description: 'Book model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Book, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Book, {exclude: 'where'}) filter?: FilterExcludingWhere<Book>
  ): Promise<Book> {
    return this.bookRepository.findById(id, filter);
  }

  @patch('/book-reminder/{id}', {
    responses: {
      '204': {
        description: 'Book PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Book,
  ): Promise<void> {
    await this.bookRepository.updateById(id, book);
  }

  @put('/book-reminder/{id}', {
    responses: {
      '204': {
        description: 'Book PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() book: Book,
  ): Promise<void> {
    await this.bookRepository.replaceById(id, book);
  }

  @del('/book-reminder/{id}', {
    responses: {
      '204': {
        description: 'Book DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bookRepository.deleteById(id);
  }
}
