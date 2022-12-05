// Перші три цифри id - перша літера категорії в кодуванні ASC-II. Наступні - порядковий номер
// ! Ідентифікатори повинні бути унікальними в усьому об'єкті categories

const expenses = {
	10101: "Main expenses",
	10102: "Products",
	10103: "Car",
	10104: "Self care",
	10105: "Child care",
	10106: "Household products",
	10107: "Education",
	10108: "Leisure",
	10109: "Other expenses",
	10110: "Entertainment"
};

const income = {
	10501: "Regular Income",
	10502: "Inregular Income",
};

const categories = {
	expenses,
	income
}

module.exports = categories;