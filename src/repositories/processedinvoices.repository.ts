import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InvoiceprocessorDataSource} from '../datasources';
import {Processedinvoices, ProcessedinvoicesRelations} from '../models';

export class ProcessedinvoicesRepository extends DefaultCrudRepository<
  Processedinvoices,
  typeof Processedinvoices.prototype.executionid,
  ProcessedinvoicesRelations
> {
  constructor(
    @inject('datasources.invoiceprocessor') dataSource: InvoiceprocessorDataSource,
  ) {
    super(Processedinvoices, dataSource);
  }
}
