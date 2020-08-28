import { ObjectWithAnyProp } from './types'

export default (
    data: ObjectWithAnyProp[],
    fields: string[],
    condition = (_: any) => true
) => {
    const initialState: ObjectWithAnyProp = {}
    fields.forEach((field: string) => initialState[field] = 0)

    return data.reduce((accumulator: any, item: ObjectWithAnyProp) => {
        if (condition(item)) {
            fields.forEach((field: string) => accumulator[field] += item[field] || 0)
        }

        return accumulator
    }, initialState)
}
