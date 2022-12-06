import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import moment from 'moment';
import {Processedinvoices} from '../models';
import {ProcessedinvoicesRepository} from '../repositories';

export class InvoiceprocessorController {
  constructor(
    @repository(ProcessedinvoicesRepository)
    public processedinvoicesRepository : ProcessedinvoicesRepository,
  ) {}

  @post('/processedinvoices')
  @response(200, {
    description: 'Processedinvoices model instance',
    content: {'application/json': {schema: getModelSchemaRef(Processedinvoices)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Processedinvoices, {
            title: 'NewProcessedinvoices',
            exclude: ['executionid'],
          }),
        },
      },
    })
    processedinvoices: Omit<Processedinvoices, 'executionid'>,
  ): Promise<Processedinvoices> {
    return this.processedinvoicesRepository.create(processedinvoices);
  }

  @get('/processedinvoices/count')
  @response(200, {
    description: 'Processedinvoices model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Processedinvoices) where?: Where<Processedinvoices>,
  ): Promise<Count> {
    return this.processedinvoicesRepository.count(where);
  }

  @get('/processedinvoices')
  @response(200, {
    description: 'Array of Processedinvoices model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Processedinvoices, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Processedinvoices) filter?: Filter<Processedinvoices>,
  ): Promise<Processedinvoices[]> {
    return this.processedinvoicesRepository.find(filter);
  }

  @patch('/processedinvoices')
  @response(200, {
    description: 'Processedinvoices PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Processedinvoices, {partial: true}),
        },
      },
    })
    processedinvoices: Processedinvoices,
    @param.where(Processedinvoices) where?: Where<Processedinvoices>,
  ): Promise<Count> {
    return this.processedinvoicesRepository.updateAll(processedinvoices, where);
  }

  @get('/processedinvoices/{id}')
  @response(200, {
    description: 'Processedinvoices model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Processedinvoices, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Processedinvoices, {exclude: 'where'}) filter?: FilterExcludingWhere<Processedinvoices>
  ): Promise<Processedinvoices> {
    return this.processedinvoicesRepository.findById(id, filter);
  }

  @patch('/processedinvoices/{id}')
  @response(204, {
    description: 'Processedinvoices PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Processedinvoices, {partial: true}),
        },
      },
    })
    processedinvoices: Processedinvoices,
  ): Promise<void> {
    await this.processedinvoicesRepository.updateById(id, processedinvoices);
  }

  @put('/processedinvoices/{id}')
  @response(204, {
    description: 'Processedinvoices PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() processedinvoices: Processedinvoices,
  ): Promise<void> {
    await this.processedinvoicesRepository.replaceById(id, processedinvoices);
  }

  @del('/processedinvoices/{id}')
  @response(204, {
    description: 'Processedinvoices DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.processedinvoicesRepository.deleteById(id);
  }
  @get('/filteredInvoices')
  @response(200, {
    description: 'Filtered Invoices',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Processedinvoices, {includeRelations: true}),
        },
      },
    },
  })
  async getInvoices(
    @param.query.string('fromDate') fromDate: string,
    @param.query.string('toDate') toDate: string,
    @param.query.string('userid') userid: string
  ): Promise<any> {
    try {

      let startDate = fromDate;
      let endDate = toDate;
      startDate = moment(new Date(fromDate).toUTCString()).format("YYYY-MM-DD");
      endDate = (moment(new Date(toDate).toUTCString()).format("YYYY-MM-DD"));
      // let filters = {
      //   "userid": userid,
      //   "invoiceDate": {between: [startDate, endDate]}
      // }
      return this.processedinvoicesRepository.find({
        where: {
          "userid": userid,
          "invoiceDate": {between: [startDate, endDate]}
        }
      });
    } catch (e: any) {
      console.log(e);
      return "error";
    }
  }
}
