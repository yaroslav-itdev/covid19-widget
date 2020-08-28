import { Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';
import axios, { AxiosResponse } from 'axios'
import moment from 'moment'
import { getAlpha2Code } from 'i18n-iso-countries'
import config from '../../config'
import { IStat, StatResult } from '../../entities/Stat'
import { DATE_FILTER_FORMAT, DEFAULT_COUNTRY_CODE_LANG } from '../../shared/constants'
import summarizeNumericalFields from "../../shared/summarizeNumericalFields";

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
        const alpha3ContryCode = getAlpha2Code(countryName, DEFAULT_COUNTRY_CODE_LANG)
        const statsSummary: StatResult = summarizeNumericalFields(
            stats,
            ['confirmed', 'recovered', 'deaths'],
            (stat: IStat) => moment(stat.date, DATE_FILTER_FORMAT).isBetween(mStartDate, mEndDate, null, '[]'),
        )

        if (statsSummary.confirmed) {
            statsSummary.code = alpha3ContryCode
            result.push(statsSummary)
        }
    }

    return res.status(OK).json(result);
});

export default router;
