let stringIn = ""
let command = ""
let dataString = ""
let dataNumber = 0
function parseCommmand (command: string, number: number) {
    if (command == "sY") {
        DS3231.dateTime(
        number,
        DS3231.month(),
        DS3231.date(),
        DS3231.day(),
        DS3231.hour(),
        DS3231.minute(),
        0
        )
    } else if (command == "sM") {
        DS3231.dateTime(
        DS3231.year(),
        number,
        DS3231.date(),
        DS3231.day(),
        DS3231.hour(),
        DS3231.minute(),
        0
        )
    } else if (command == "sD") {
        DS3231.dateTime(
        DS3231.year(),
        DS3231.month(),
        number,
        DS3231.day(),
        DS3231.hour(),
        DS3231.minute(),
        0
        )
    } else if (command == "sh") {
        DS3231.dateTime(
        DS3231.year(),
        DS3231.month(),
        DS3231.date(),
        DS3231.day(),
        number,
        DS3231.minute(),
        0
        )
    } else if (command == "sm") {
        DS3231.dateTime(
        DS3231.year(),
        DS3231.month(),
        DS3231.date(),
        DS3231.day(),
        0,
        number,
        0
        )
    } else if (command == "dt") {
        serial.writeLine("" + leadingZero(DS3231.date()) + "/" + leadingZero(DS3231.month()) + "/" + DS3231.year() + "  " + leadingZero(DS3231.hour()) + ":" + leadingZero(DS3231.minute()) + ":" + leadingZero(DS3231.second()))
    } else {
        serial.writeLine("Invalid command")
    }
}
function leadingZero (num: number) {
    if (num < 10) {
        return "0" + num
    } else {
        return convertToText(num)
    }
}
basic.forever(function () {
    stringIn = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    if (stringIn.length >= 2) {
        command = stringIn.substr(0, 2)
        dataString = stringIn.substr(2, stringIn.length - 2)
        dataNumber = parseFloat(dataString)
        parseCommmand(command, dataNumber)
    }
})
