export const defaultEinnahmen = [
  {
    id: 1,
    name: "Morgen",
    zeit: "08:00",
    farbe: "weiss",
    dosis: "2 weisse + 1 blaue",
    status: "genommen",
    bestaetigt_um: "08:02"
  },
  {
    id: 2,
    name: "Mittag",
    zeit: "12:00",
    farbe: null,
    dosis: "1 rote",
    status: "offen",
    bestaetigt_um: null
  },
  {
    id: 3,
    name: "Abend",
    zeit: "19:00",
    farbe: null,
    dosis: "1 weisse + 1 gelbe",
    status: "offen",
    bestaetigt_um: null
  }
];

export const defaultWochenHistorie = {
  mo: "erledigt",
  di: "erledigt",
  mi: "erledigt",
  do: "heute",
  fr: "offen",
  sa: "offen",
  so: "offen"
};

export const defaultPerson = { name: "Mama", alter: 78 };
