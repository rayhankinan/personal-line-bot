import { Client, ClientConfig, EventMessage, TextEventMessage } from '@line/bot-sdk'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Between } from 'typeorm'
import createHttpError from 'http-errors'
import moment from 'moment'

import { clientConfig } from '../config/line-config'
import { Assignment } from '../models/assignment'

class WebhookService {
    client: Client

    constructor(clientConfig: ClientConfig) {
        this.client = new Client(clientConfig)
    }

    async message(replyToken: string, message: EventMessage) {
        const { text } = message as TextEventMessage
        const regex: RegExp = /ada deadline apa s?aja untuk ([A-Z]+) ([0-9]+) (.*)/i

        if (!regex.test(text)) {
            throw createHttpError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
        }

        const [ major, yearStr, period ] = regex.exec(text)
        const year = +yearStr

        switch (period.toLowerCase()) {
            case 'hari ini': {
                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        }
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })

                break
            }

            case 'besok': {
                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        }
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })

                break
            }
                

            case 'minggu ini': {
                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        }
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })
                
                break
            }

            case 'minggu depan': {
                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        }
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })
                
                break
            }

            case 'bulan ini': {
                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        }
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })
                
                break
            }

            case 'sejauh ini': {
                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        }
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })
                
                break
            }

            default: {
                throw createHttpError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
            }
        }
    }

    async follow() {

    }

    async unfollow() {

    }

    async join() {

    }

    async leave() {

    }
}

export const webhookService = new WebhookService(clientConfig)