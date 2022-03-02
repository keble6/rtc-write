let stringIn = ""
let command = ""
function setDate () {
    DS3231.dateTime(
    parseFloat(stringIn.substr(6, 4)),
    parseFloat(stringIn.substr(4, 2)),
    parseFloat(stringIn.substr(2, 2)),
    DS3231.day(),
    DS3231.hour(),
    DS3231.minute(),
    0
    )
    basic.showNumber(DS3231.date())
    basic.showNumber(DS3231.month())
    basic.showNumber(DS3231.year())
}
function setTime () {
    DS3231.dateTime(
    DS3231.year(),
    DS3231.month(),
    DS3231.date(),
    DS3231.day(),
    parseFloat(stringIn.substr(2, 2)),
    parseFloat(stringIn.substr(4, 2)),
    0
    )
    basic.showNumber(DS3231.hour())
    basic.showNumber(DS3231.minute())
}
serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), function () {
    stringIn = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    command = stringIn.substr(0, 2)
    if (command == "st") {
        setTime()
    }
    if (command == "sd") {
        setDate()
    }
})
