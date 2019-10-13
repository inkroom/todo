// task辅助函数
import dayjs from 'dayjs';


/**
 * 获取距今多少天时要完成的任务
 * @param {*} task 任务
 * @param {*} date 和今天的间隔数量
 */
export function getDateTask(task, date) {
    let format = 'YYYY-MM-DD'
    //如果使用date没有效果，只能用day或d
    let day = dayjs().add(date, 'd').format(format)
    console.log(`${dayjs().format(format)},第${date}天,format ${day}`)
    return task.filter((v, i) => {
        console.log(`当前=${dayjs(v.time).format(format)},应该=${day},result=${dayjs(v.time).format(format) == day},title=${v.title}`)

        return dayjs(v.time).format(format) == day;
    })
}


/**
 * 
 * 获取今天之前未完成的任务
 * @param {Array} task 任务
 */
export function getBeforeTask(task) {
    let today = dayjs();
    return task.filter((v, i) => {
        return dayjs(v.time).isBefore(today, 'date');
    })
}

/**
 * 
 * 获取距今天多少天之后需要完成的任务
 * @param {Array} task 任务
 */
export function getAfterTask(task) {
    let today = dayjs();
    return task.filter((v, i) => {
        return dayjs(v.time).isBefore(today, 'date');
    })
}
