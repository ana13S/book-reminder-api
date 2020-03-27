import {Entity, model, property} from '@loopback/repository';

@model()
export class Book extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    default: " ",
  })
  title: string;

  @property({
    type: 'string',
  })
  author?: string;

  @property({
    type: 'number',
    default: 0,
  })
  pages?: number;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  started: boolean;

  @property({
    type: 'number',
    required: true,
    default: 1,
  })
  priorityLevel: number;


  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
