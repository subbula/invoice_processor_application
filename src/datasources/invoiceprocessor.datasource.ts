import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'invoiceprocessor',
  connector: 'postgresql',
  // url: 'postgres://userIEY:miKOMYqf65e1Rjrn@localhost/sampledb',
  url: 'postgres://userIEY:miKOMYqf65e1Rjrn@postgresql.dw-cp4ba.svc.cluster.local/sampledb',
  host: 'localhost',
  port: 5432,
  user: 'userIEY',
  password: 'miKOMYqf65e1Rjrn',
  database: 'sampledb'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class InvoiceprocessorDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'invoiceprocessor';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.invoiceprocessor', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
