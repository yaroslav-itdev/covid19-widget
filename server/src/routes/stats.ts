import { Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';
import axios, { AxiosResponse } from 'axios'
import moment from 'moment'
import { getAlpha3Code } from 'i18n-iso-countries'
import config from '../config'
import { IStat, StatResult } from '../entities/Stat'
import { DATE_FILTER_FORMAT, DEFAULT_COUNTRY_CODE_LANG } from '../shared/constants'

// Init shared
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const { startDate, endDate }: any = req.query
    const mStartDate = moment(startDate, DATE_FILTER_FORMAT)
    const mEndDate = moment(endDate, DATE_FILTER_FORMAT)

    const statsByCountries = await axios.get(config.statsUrl)
        .then((response: AxiosResponse) => response.data)
        .catch(() => {})

    const result: StatResult[] = []

    for (let countryName in statsByCountries) {
        const stats: IStat[] = statsByCountries[countryName] || []
        const alpha3ContryCode = getAlpha3Code(countryName, DEFAULT_COUNTRY_CODE_LANG)
        const statsSummary: StatResult = stats.reduce((accumulator: StatResult, stat: IStat) => {
            if (moment(stat.date, DATE_FILTER_FORMAT).isBetween(mStartDate, mEndDate)) {
                accumulator.confirmed += stat.confirmed
                accumulator.recovered += stat.recovered
                accumulator.deaths += stat.deaths
            }

            return accumulator
        }, { country: alpha3ContryCode, confirmed: 0, recovered: 0, deaths: 0 })

        result.push(statsSummary)
    }

    return res.status(OK).json(result);
});

export default router;
