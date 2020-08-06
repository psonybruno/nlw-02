import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    from: string,
    to: string,
    week_day: string
}

export default class ClassesController
{
    async index(request: Request, response: Response)
    {
        try {
            const filters = request.query;

            const subject = filters.subject as string;
            const time = filters.time as string;
            const week_day = filters.weekDay as string;

            if(!week_day || !subject || !time){
                return response.status(400).json({error: "Filters not found"})
            }

            const timeInMinutes = convertHourToMinutes(filters.time as string);

            const classes = await db('classes')
                .whereExists(function(){
                    this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                })
                .where('classes.subject', '=', subject)
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*']);

            if (classes.length > 0){
                return response.status(200).json(classes);
            }else{
                return response.status(200).json({});
            }

        } catch (error) {
            console.log(error)
            return response.status(404).json({msg: "Can't filter"});
        }

    }

    async create(request: Request, response: Response)
    {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const trx = await db.transaction();

        console.log(name)

        try {

            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });

            const user_id = insertedUsersIds[0];

            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id
            });

            const class_id = insertedClassesId[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                }
            })

            await trx('class_schedule').insert(classSchedule);

            await trx.commit();

            return response.status(201).send();

        } catch (error) {
            trx.rollback();
            console.log(error);
            return response.status(404).json({error: "unexpected error"})
        }



    }
}