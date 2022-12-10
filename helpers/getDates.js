
// Функція приймає два аргумента (number) year - від 1970 до поточного, month - від 0 до 11 включно.
const getDates = (year, month) => {

    const now = new Date()
    // Якщо не передана рік і місяць початкова дата - дата поточний рік, поточний місяць, 1 число, 00м, 00с, 000мс. кінцева дата - поточна
    if (!year && !month) {
        
        const year = now.getFullYear();
        const month = now.getMonth();
        const startDate = new Date(year, month);
        return { startDate, endDate: now }
    };
    
    // Якщо передан рік, а місяць не передан, то початкова дата - рік.01.01:00:00:000
    // Місяці рахуються від 0. 0 - Січень, 1- Лютий, 2 - Березень
    if (year && !month) {
        
        if (typeof (year) !== 'number') return NAN;
        if (year < 1970 || year > now.getFullYear()) return ;

        const startDate = new Date(year, 0);
        const endDate = new Date(year + 1, 0);
        return { startDate, endDate }
    }

    //Якщо передали рік та місяць, то початкова дата - перший день місяця даного року, кінцева дата - перший день наступного місяця даного року
    // Місяці рахуються від 1. 1 - Січень, 2- Лютий, 3 - Березень ... 12 - Грудень
    if (year && month) {

        if ((typeof (year) !== 'number')||(typeof (month) !== 'number')) return NAN;
        if (year < 1970 || year > now.getFullYear()) return undefined;
        if (month < 1 || month > 12) return undefined;
        console.log('month', month, 'year', year);
        const startDate = new Date(year, month - 1);
        const endDate = month === 12 ? new Date(year + 1, 0) : new Date(year, month);
        return { startDate, endDate }
    }

    // Якщо в параметрах передали тільки місяць, то рік обираємо поточний
    const yearDefault = now.getFullYear();
    const startDate = new Date(yearDefault, month-1);
    return { startDate, endDate: now }
}

module.exports = getDates;