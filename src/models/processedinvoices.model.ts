import {Entity, model, property} from '@loopback/repository';

@model()
export class Processedinvoices extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  executionid?: number;

  @property({
    type: 'string',
    required: true,
  })
  fileid: string;

  @property({
    type: 'string',
    required: true,
  })
  fileName: string;

  @property({
    type: 'date',
    required: false,
  })
  invoiceDate: string;

  @property({
    type: 'string',
    required: false,
  })
  invoicenumber: string;

  @property({
    type: 'string',
    required: false,
  })
  invoiceAmount: string;

  @property({
    type: 'boolean',
    required: false,
  })
  isValidInvoice: boolean;

  @property({
    type: 'string',
    required: false,
  })
  errorMsg: string;

  @property({
    type: 'string',
    required: true,
  })
  processingState: string;

  @property({
    type: 'date',
    required: true,
  })
  createdtime: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedTime: string;

  @property({
    type: 'string',
    required: true,
  })
  userid: string;

  @property({
    type: 'string',
    required: false,
  })
  fileurl: string;


  constructor(data?: Partial<Processedinvoices>) {
    super(data);
  }
}

export interface ProcessedinvoicesRelations {
  // describe navigational properties here
}

export type ProcessedinvoicesWithRelations = Processedinvoices & ProcessedinvoicesRelations;
