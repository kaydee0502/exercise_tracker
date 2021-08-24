let res = [
  {
    count: 4,
    _id: "612525237258796aa44366a1",
    username: "kaydee",
    log: [
      {
        _id: "612525980142ec36f0ada28e",
        description: "W211",
        duration: 90,
        date: "2021-08-23T18:30:00.000Z",
      },
      {
        _id: "612525b70142ec36f0ada290",
        description: "lmfao",
        duration: 23,
        date: "2021-11-11T00:00:00.000Z",
      },
      {
        _id: "612525f80142ec36f0ada293",
        description: "lmfaowda",
        duration: 111,
        date: "2022-02-11T00:00:00.000Z",
      },
      {
        _id: "612526260142ec36f0ada296",
        description: "weeewew",
        duration: 43,
        date: "2011-11-11T00:00:00.000Z",
      },
    ],
    __v: 0,
  },
];
res[0].log.map((e) => {
    e.date = new Date(e.date)
})

console.log(res[0].log)

let lol2 = res[0].log.filter((e) => {
    return e.date > new Date
})

console.log(lol2)

