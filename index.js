/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(dataArrays) {
    let newArray = []
    for (let i = 0; i < dataArrays.length; i++) {
        let employeeRecord = createEmployeeRecord(dataArrays[i])
        newArray.push(employeeRecord)
    }
    return newArray
}
// it adds a timeIn event Object to an employee's record of timeInEvents when provided
// an employee record and Date/Time String and returns the updated record
function createTimeInEvent(dateStamp) {
    let hour = dateStamp.substring(11)
    let date = dateStamp.substring(0, 10)
    let timeInEventObj = {
        type: "TimeIn",
        hour: ~~hour,
        date: date
    }
    this["timeInEvents"].push(timeInEventObj)
    return this
}

function createTimeOutEvent(dateStamp) {
    let hour = dateStamp.substring(11)
    let date = dateStamp.substring(0, 10)
    let timeOutEventObj = {
        type: "TimeOut",
        hour: ~~hour,
        date: date
    }
    this["timeOutEvents"].push(timeOutEventObj)
    return this
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
function hoursWorkedOnDate(dateStamp) {
    let timeInEvents = this["timeInEvents"]
    let timeOutEvents = this["timeOutEvents"]
    for (let i = 0; i < timeInEvents.length; i++) {
        let dateIn = timeInEvents[i]["date"]
        if (dateIn === dateStamp) {
            let hoursWorked = (timeOutEvents[i]["hour"] - timeInEvents[i]["hour"]) / 100
            return hoursWorked
        }
    }
}

function wagesEarnedOnDate(dateStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp)
    let payRate = this["payPerHour"]
    return hoursWorked * payRate
}

function findEmployeeByFirstName(srcArray, firstName) {
    for (let i = 0; i < srcArray.length; i++) {
        if (firstName === srcArray[i].firstName) {
            return srcArray[i]
        }
    }
}

function calculatePayroll(employeeRecord) {
    return employeeRecord.reduce((total, record) => {
        return total + allWagesFor.call(record)
    }, 0)

}
