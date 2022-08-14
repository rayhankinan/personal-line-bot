import { FlexContainer } from '@line/bot-sdk'

import { Assignment } from '../models/assignment'
import { headingComponent, deadlineComponent, separatorComponent, textComponent } from './assignment-component'

export const assignmentContainer = (major: string, year: number, period: string, assignments: Assignment[]) => {
    const container: FlexContainer = {
        type: 'bubble',
        header: {
            type: 'box',
            layout: 'vertical',
            contents: [
                headingComponent(major, year, period)
            ]
        },
        body: {
            type: 'box',
            layout: 'vertical',
            contents: assignments.map((assignment) => ({
                type: 'box',
                layout: 'horizontal',
                contents: [
                    deadlineComponent(assignment),
                    separatorComponent(), 
                    textComponent(assignment)
                ]
            }))
        }
    }

    return container
}