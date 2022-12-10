const RequestError = require('./RequestError')
// Функція приймає два аргумента (number) year - від 1970 до поточного, month - від 1 до 12 включно.
const getDates = (year, month) => {

    const now = new Date()
    const yearNow = now.getFullYear();
    // Якщо не передана рік і місяць початкова дата - дата поточний_рік.поточний_місяць.01 кінцева дата - поточна.
    if (!year && !month) {
        const month = now.getMonth();
        const startDate = new Date(yearNow, month);
        return { startDate, endDate: now }
    };
    
    // Якщо передан рік, а місяць не передан, то початкова дата - year.01.01, кінцева (year+1).01.01
    if (year && !month) {
        const startDate = new Date(year, 0);
        const endDate = new Date(year + 1, 0);
        return { startDate, endDate }
    }

    //Якщо передали рік та місяць, то початкова дата - перший день місяця даного року, кінцева дата - перший день наступного місяця даного року
    // Місяці рахуються від 1 до 12.
    if (year && month) {
        const startDate = new Date(year, month - 1);
        const endDate = month === 12 ? new Date(year + 1, 0) : new Date(year, month);
        return { startDate, endDate }
    }

    // Якщо в параметрах передали тільки місяць, то рік обираємо поточний
    const startDate = new Date(yearNow, month-1);
    return { startDate, endDate: now }
}

module.exports = getDates;