// Перші три цифри id - перша літера категорії в кодуванні ASC-II. Наступні - порядковий номер
const categories = {
	expenses: [
	{ id: 1011, name: "Basic expences"},
	{ id: 1012, name: "Products"},
	{ id: 1013, name: "Car"},
	{ id: 1014, name: "Self care"},
	{ id: 1015, name: "Child care"},
	{ id: 1016, name: "Household products"},
	{ id: 1017, name: "Education"},
	{ id: 1018, name: "Leisure"},
	{ id: 1019, name: "Other expencses"},
	],

	income: [
	{ id: 1051, name: "Regular Income"},
	{ id: 1052, name: "Inregular Income"},
	],
};

module.exports = categories;