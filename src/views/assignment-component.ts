import { FlexComponent } from '@line/bot-sdk'
import moment from 'moment'

import { Assignment } from '../models/assignment'

export const headingComponent = (major: string, year: number, period: string) => {
    const component: FlexComponent = {
        type: 'text',
        text: `Deadline ${major} ${year} untuk ${period.toLowerCase()}`,
        wrap: true,
        size: 'xl',
        weight: 'bold'
    }

    return component
}

export const deadlineComponent = (assignment: Assignment) => {
    const component: FlexComponent = {
        type: 'text',
        text: `${moment(assignment.deadline).format('DD MMM YY HH:mm')}`,
        size: 'lg',
        weight: 'bold',
        align: 'center',
        wrap: true,
        flex: 1
    }

    return component
}

export const separatorComponent = () => {
    const component: FlexComponent = {
        type: 'separator',
        margin: 'xxl',
        color: '#FFFFFF'
    }

    return component
}

export const textComponent = (assignment: Assignment) => {
    const component: FlexComponent = {
        type: 'text',
        text: `${assignment.title}: ${assignment.description}`,
        wrap: true,
        flex: 2
    }

    return component
}