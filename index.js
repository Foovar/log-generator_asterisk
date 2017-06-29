/**
 * @description 
 *
 * @package
 * @author Alumnos de Mainframe, grupo Central Telefonica - 2017
 */

"use strict";
const faker = require("faker")
const _ = require("lodash")
const limit = 100 // cantidad de filas
const users = Array(limit).fill(0).map((u, i) => ({ name: faker.name.firstName().toLowerCase(), id: i + 2000 }))

let i = 0, src, _dst, dst, dcontext, clid, channel, dstchannel,
  lastapp, lastdata, chc = i,
  start, _date;

for (; i < limit; i++ , chc++) {
  src = users[i].name;
  _dst = _.sample(users.filter(e => e.id != users[i].id))
  dst = _dst.id
  dcontext = "from-internal"
  clid = src
  lastapp = _.sample(["Dial", "Dial", "Dial", "Playback"])
  channel = `SIP/${src}-${hex(chc)}`
  dstchannel = lastapp == "Dial" ? `SIP/${_dst.name}-${hex(++chc)}` : "";
  lastdata = lastapp != "Dial" ? "no-answer" : `SIP/${_dst.name}`
  //21/06/2017  04:28:37
  _date = new Date((_date || new Date ).getTime() + _.random(30 * 1E3, 5 * 60 * 1E3))

  //start = faker.date.between("2017-06-01", "2017-07-01")

  start = _date

  console.log([src, dst, dcontext, clid, channel, dstchannel, lastapp, lastdata, start.toLocaleString()].join(","))
}

function hex(a) {
  let h = a.toString(16)
  return "00000000".substr(h.length) + h;
}


