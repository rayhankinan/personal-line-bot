import { Client, ClientConfig, EventMessage, TextEventMessage } from '@line/bot-sdk'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'

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
            case 'hari ini':
                const assignmentsToday = await Assignment.find({
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

                return assignmentsToday

            case 'besok':
                const assignmentsTomorrow = await Assignment.find({
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

                return assignmentsTomorrow

            case 'minggu ini':
                const assignmentsThisWeek = await Assignment.find({
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
                
                return assignmentsThisWeek

            case 'minggu depan':
                const assignmentsNextWeek = await Assignment.find({
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
                
                return assignmentsNextWeek

            case 'bulan ini':
                const assignmentsThisMonth = await Assignment.find({
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
                
                return assignmentsThisMonth

            case 'sejauh ini':
                const assignmentsThisFar = await Assignment.find({
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
                
                return assignmentsThisFar

            default:
                throw createHttpError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
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