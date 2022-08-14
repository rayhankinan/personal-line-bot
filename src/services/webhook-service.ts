import { Client, ClientConfig, EventMessage, TextEventMessage } from '@line/bot-sdk'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Between, MoreThanOrEqual } from 'typeorm'
import createHttpError from 'http-errors'
import moment from 'moment'

import { clientConfig } from '../config/line-config'
import { Assignment } from '../models/assignment'
import { assignmentMessage } from '../views/assignment-message'

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
                const now = moment().toDate()
                const nextMidnight = moment().endOf('day').toDate()

                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        },
                        deadline: Between(now, nextMidnight)
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })

                const message = assignmentMessage(major, year, period, assignments)

                await this.client.replyMessage(replyToken, message)

                break
            }

            case 'besok': {
                const tomorrow = moment().endOf('day').toDate()
                const tomorrowMidnight = moment().add(1, 'day').endOf('day').toDate()

                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        },
                        deadline: Between(tomorrow, tomorrowMidnight)
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })

                const message = assignmentMessage(major, year, period, assignments)

                await this.client.replyMessage(replyToken, message)

                break
            }
                

            case 'minggu ini': {
                const now = moment().toDate()
                const thisWeek = moment().endOf('week').toDate()

                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        },
                        deadline: Between(now, thisWeek)
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })

                const message = assignmentMessage(major, year, period, assignments)

                await this.client.replyMessage(replyToken, message)
                
                break
            }

            case 'minggu depan': {
                const thisWeek = moment().endOf('week').toDate()
                const nextWeek = moment().add(1, 'week').endOf('week').toDate()

                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        },
                        deadline: Between(thisWeek, nextWeek)
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })

                const message = assignmentMessage(major, year, period, assignments)

                await this.client.replyMessage(replyToken, message)
                
                break
            }

            case 'bulan ini': {
                const now = moment().toDate()
                const thisMonth = moment().endOf('month').toDate()

                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        },
                        deadline: Between(now, thisMonth)
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })

                const message = assignmentMessage(major, year, period, assignments)

                await this.client.replyMessage(replyToken, message)
                
                break
            }

            case 'sejauh ini': {
                const now = moment().toDate()

                const assignments = await Assignment.find({
                    where : {
                        coursegrade: {
                            grade : {
                                major,
                                year
                            }
                        },
                        deadline: MoreThanOrEqual(now)
                    },
                    relations: {
                        coursegrade: {
                            grade: true
                        }
                    },
                    cache: true
                })

                const message = assignmentMessage(major, year, period, assignments)

                await this.client.replyMessage(replyToken, message)
                
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