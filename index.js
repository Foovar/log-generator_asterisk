/**
 * @description 
 *
 * @package
 * @author Alumnos de Mainframe, grupo Central Telefonica - 2017
 */

"use strict";
const faker = require("faker")
const _ = require("lodash")
const limit = 50000 // cantidad de filas
//const fs = require("fs");

const users = Array(limit).fill(0).map((u, i) => ({ name: faker.name.firstName().toLowerCase(), id: i + 2000, ip: faker.internet.ip(), port: _.random(1024, 49151) }))

let i = 0, src, _dst, dst, dcontext, clid, channel, dstchannel, disposition, answer, end,
  lastapp, lastdata, chc = i, duration,
  start, _date, billsec;

for (; i < limit; i++ , chc++) {
  src = users[i].name;
  _dst = _.sample(users.filter(e => e.id != users[i].id))
  _dst = (Math.random() * 50) <= 1 ? { name: "soporte", id: 123 } : _dst;

  dst = _dst.id
  dcontext = "from-internal"
  clid = src
  lastapp = _.sample(["Dial", "Dial", "Dial", "Playback"])
  channel = `SIP/${src}-${hex(chc)}`
  dstchannel = lastapp == "Dial" ? `SIP/${_dst.name}-${hex(++chc)}` : "";
  lastdata = lastapp != "Dial" ? "no-answer" : `SIP/${_dst.name}`
  //21/06/2017  04:28:37
  _date = new Date((_date || new Date).getTime() + _.random(30 * 1E3, 5 * 60 * 1E3))

  disposition = _.sample([...("ANSWERED,".repeat(15)).split(","), "NO ANSWER", "BUSY", "CONGESTION", "FAILED"].filter(e => !!e))
  disposition = disposition == "CONGESTION" || disposition == "FAILED" ? _.random(5) == 1 ? disposition : _.sample(["ANSWERED", "NO ANSWER", "BUSY"]) : disposition
  answer = disposition == "ANSWERED" ? new Date(_date.getTime() + _.random(2 * 1E3, 50 * 1E3)) : "";
  end = !answer ? new Date(_date.getTime() + _.random(2 * 1E3, 30 * 1E3)) : new Date(_date.getTime() + _.random(10 * 1E3, 60 * 60 * 1E3))
  start = _date
  billsec = !answer ? 0 : end - answer;
  duration = (!answer ? end - start : billsec + (answer - start)) / 1E3;
  billsec /= 1E3;

  billsec >= 0 && duration > 0 && console.log([src, dst, dcontext, clid,
    channel, dstchannel, lastapp, lastdata,
    start.toLocaleString(),
    answer.toLocaleString(),
    end.toLocaleString(),
    Math.ceil(duration),
    Math.ceil(billsec),
    disposition,
    "DOCUMENTATION",
    Math.ceil(start.getTime() / 1E3) + "." + i,
    users[i].ip,
    users[i].port
  ].join(","));
}


function hex(a) {
  let h = a.toString(16)
  return "00000000".substr(h.length) + h;
}
