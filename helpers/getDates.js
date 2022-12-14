const RequestError = require('./RequestError')
// Функція приймає два аргумента (number) year - від 1970 до поточного, month - від 1 до 12 включно.
const getDates = (year, month) => {
    const now = new Date()
    const yearNow = now.getFullYear();

    // Якщо не передана рік і місяць початкова дата - дата поточний_рік.поточний_місяць.01 кінцева дата - поточна.
    if (!year && !month) {
        const startDate = new Date(`${yearNow}-01-01T02:00`);
        return { startDate, endDate: now }
    };
    
    // Якщо передан рік, а місяць не передан, то початкова дата - year.01.01, кінцева (year+1).01.01
    if (year && !month) {
        const startDate = new Date(`${year}-01-01T02:00`);
        const endDate = new Date(`${+year + 1}-01-01T02:00`);
        return { startDate, endDate }
    }

    //Якщо передали рік та місяць, то початкова дата - перший день місяця даного року, кінцева дата - перший день наступного місяця даного року
    // Місяці рахуються від 1 до  12.
    if (year && month) {
        const strMonth = +month < 10 ? "0" + month : month;
        let endDateStr = "";
        let strMonthCurrent = month;

        if (month === "12") {
            endDateStr = `${+year + 1}-01-01T02:00`;
        } else {
            strMonthCurrent = +month < 9 ? `0${+month + 1}` : `${+month + 1}`
            endDateStr = `${year}-${strMonthCurrent}-01T02:00`;
        };
        const startDate = new Date(`${year}-${strMonth}-01T04:00`);
        const endDate = new Date(endDateStr);
        return { startDate, endDate }
    }

    // Якщо в параметрах передали тільки місяць, то рік обираємо поточний
    const strMonth = +month < 10 ? "0" + month : month;
    const startDate = new Date(`${yearNow}-${strMonth}-01T02:00`);
    return { startDate, endDate: now }
}

module.exports = getDates;