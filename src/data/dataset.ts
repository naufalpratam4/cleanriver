const dataset = [
  {
    no: 1,
    name: "Ambar",
    temperature: 15,
    turbidity: 4,
    solid: 750,
    distance: 20,
    terrain: 7,
    debit: 38,
  },
  {
    no: 2,
    name: "Anjar",
    temperature: 10,
    turbidity: 1,
    solid: 245,
    distance: 900,
    terrain: 1,
    debit: 43,
  },
  {
    no: 3,
    name: "Bado",
    temperature: 12,
    turbidity: 2,
    solid: 300,
    distance: 210,
    terrain: 9,
    debit: 27,
  },
  {
    no: 4,
    name: "Bima",
    temperature: 20,
    turbidity: 5,
    solid: 550,
    distance: 500,
    terrain: 6,
    debit: 5,
  },
  {
    no: 5,
    name: "Cengker",
    temperature: 18,
    turbidity: 1,
    solid: 805,
    distance: 150,
    terrain: 7,
    debit: 42,
  },
  {
    no: 6,
    name: "Danji",
    temperature: 24,
    turbidity: 3,
    solid: 700,
    distance: 300,
    terrain: 3,
    debit: 43,
  },
  {
    no: 7,
    name: "Eroh",
    temperature: 17,
    turbidity: 4,
    solid: 900,
    distance: 410,
    terrain: 8,
    debit: 16,
  },
  {
    no: 8,
    name: "Fujran",
    temperature: 10,
    turbidity: 2,
    solid: 400,
    distance: 200,
    terrain: 3,
    debit: 42,
  },
  {
    no: 9,
    name: "Ijilan",
    temperature: 25,
    turbidity: 1,
    solid: 150,
    distance: 220,
    terrain: 2,
    debit: 33,
  },
  {
    no: 10,
    name: "Jambang Wengi",
    temperature: 13,
    turbidity: 4,
    solid: 950,
    distance: 230,
    terrain: 1,
    debit: 41,
  },
  {
    no: 11,
    name: "Kadrenan",
    temperature: 15,
    turbidity: 5,
    solid: 1000,
    distance: 120,
    terrain: 1,
    debit: 40,
  },
  {
    no: 12,
    name: "Lawang Ombo",
    temperature: 17,
    turbidity: 2,
    solid: 315,
    distance: 650,
    terrain: 3,
    debit: 28,
  },
  {
    no: 13,
    name: "Mambulee",
    temperature: 14,
    turbidity: 1,
    solid: 140,
    distance: 170,
    terrain: 9,
    debit: 45,
  },
  {
    no: 14,
    name: "Moke",
    temperature: 23,
    turbidity: 2,
    solid: 230,
    distance: 120,
    terrain: 5,
    debit: 25,
  },
  {
    no: 15,
    name: "Uranggi",
    temperature: 25,
    turbidity: 4,
    solid: 425,
    distance: 470,
    terrain: 3,
    debit: 11,
  },
  {
    no: 16,
    name: "Pranjeng",
    temperature: 21,
    turbidity: 1,
    solid: 200,
    distance: 200,
    terrain: 9,
    debit: 46,
  },
  {
    no: 17,
    name: "Rendo",
    temperature: 11,
    turbidity: 3,
    solid: 600,
    distance: 550,
    terrain: 6,
    debit: 5,
  },
  {
    no: 18,
    name: "Suliwangi",
    temperature: 13,
    turbidity: 2,
    solid: 400,
    distance: 300,
    terrain: 6,
    debit: 24,
  },
  {
    no: 19,
    name: "Tumbang",
    temperature: 19,
    turbidity: 5,
    solid: 880,
    distance: 700,
    terrain: 1,
    debit: 9,
  },
  {
    no: 20,
    name: "Uba Sadi",
    temperature: 20,
    turbidity: 1,
    solid: 220,
    distance: 238,
    terrain: 1,
    debit: 47,
  },
  {
    no: 21,
    name: "Hari",
    temperature: 10,
    turbidity: 2,
    solid: 339,
    distance: 410,
    terrain: 8,
    debit: 23,
  },
  {
    no: 22,
    name: "Sumpur",
    temperature: 12,
    turbidity: 3,
    solid: 561,
    distance: 497,
    terrain: 4,
    debit: 45,
  },
  {
    no: 23,
    name: "Bantal",
    temperature: 19,
    turbidity: 4,
    solid: 120,
    distance: 222,
    terrain: 9,
    debit: 33,
  },
  {
    no: 24,
    name: "Lelangi",
    temperature: 15,
    turbidity: 1,
    solid: 674,
    distance: 659,
    terrain: 1,
    debit: 38,
  },
  {
    no: 25,
    name: "Masang",
    temperature: 17,
    turbidity: 5,
    solid: 980,
    distance: 492,
    terrain: 5,
    debit: 31,
  },
  {
    no: 26,
    name: "Mangau",
    temperature: 13,
    turbidity: 3,
    solid: 908,
    distance: 149,
    terrain: 3,
    debit: 30,
  },
  {
    no: 27,
    name: "Rami",
    temperature: 21,
    turbidity: 5,
    solid: 582,
    distance: 144,
    terrain: 6,
    debit: 43,
  },
  {
    no: 28,
    name: "Manna",
    temperature: 23,
    turbidity: 2,
    solid: 437,
    distance: 522,
    terrain: 7,
    debit: 12,
  },
  {
    no: 29,
    name: "Angke",
    temperature: 14,
    turbidity: 1,
    solid: 228,
    distance: 306,
    terrain: 2,
    debit: 26,
  },
  {
    no: 30,
    name: "Ciliwung",
    temperature: 25,
    turbidity: 4,
    solid: 383,
    distance: 287,
    terrain: 10,
    debit: 42,
  },
  {
    no: 31,
    name: "Citanduy",
    temperature: 20,
    turbidity: 3,
    solid: 353,
    distance: 45,
    terrain: 8,
    debit: 20,
  },
  {
    no: 32,
    name: "Cibanten",
    temperature: 18,
    turbidity: 4,
    solid: 711,
    distance: 651,
    terrain: 4,
    debit: 8,
  },
  {
    no: 33,
    name: "Dumoga",
    temperature: 11,
    turbidity: 2,
    solid: 126,
    distance: 425,
    terrain: 9,
    debit: 34,
  },
  {
    no: 34,
    name: "Ongkak",
    temperature: 16,
    turbidity: 5,
    solid: 169,
    distance: 273,
    terrain: 1,
    debit: 10,
  },
  {
    no: 35,
    name: "Tandono",
    temperature: 24,
    turbidity: 1,
    solid: 629,
    distance: 294,
    terrain: 5,
    debit: 16,
  },
  {
    no: 36,
    name: "Bailang",
    temperature: 22,
    turbidity: 2,
    solid: 352,
    distance: 237,
    terrain: 3,
    debit: 22,
  },
  {
    no: 37,
    name: "Ayong",
    temperature: 18,
    turbidity: 5,
    solid: 247,
    distance: 345,
    terrain: 6,
    debit: 6,
  },
  {
    no: 38,
    name: "Sedang",
    temperature: 25,
    turbidity: 1,
    solid: 455,
    distance: 272,
    terrain: 7,
    debit: 21,
  },
  {
    no: 39,
    name: "Topadu",
    temperature: 17,
    turbidity: 4,
    solid: 125,
    distance: 685,
    terrain: 2,
    debit: 24,
  },
  {
    no: 40,
    name: "Alo",
    temperature: 11,
    turbidity: 3,
    solid: 384,
    distance: 39,
    terrain: 10,
    debit: 14,
  },
];

export default dataset;
