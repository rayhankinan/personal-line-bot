import { DataSource } from 'typeorm'

import { dataConfig } from './config/data-config'

export const dataSource = new DataSource(dataConfig)