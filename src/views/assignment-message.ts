import { FlexMessage } from '@line/bot-sdk'

import { Assignment } from '../models/assignment'
import { assignmentContainer } from './assignment-container'

export const assignmentMessage = (major: string, year: number, period: string, assignments: Assignment[]) => {
    const message: FlexMessage = {
        type: 'flex',
        altText: 'assignments',
        contents: assignmentContainer(major, year, period, assignments)
    }

    return message
}