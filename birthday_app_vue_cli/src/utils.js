function getDatesAsMiliseconds(formattedBirthDate){
  const allDatesInMiliseconds = [formattedBirthDate].map(s => {
    return (moment(s, "DD/MM/YYYY")._d.getTime()) - Date.now();
  });
  return allDatesInMiliseconds;
}

function getDaysInTheFuture(allDatesInMiliseconds) {
  //this checks if the value in milisseconds is positive(in the future), or negative(in the past), and filters just the positive values
  const datesInFutureInMiliseconds = allDatesInMiliseconds.filter(value => value > 0);
  return datesInFutureInMiliseconds;
}

function convertMilisecondsToDate(datesInFutureInMiliseconds) {
  const converted = datesInFutureInMiliseconds.map(n => n + Date.now());
  return converted;
}

function parseDates(converted){
  const parsed = converted.map(n => moment(n).format("DD/MM/YYYY"));
  return parsed;
}

function allDates(pastDaysInMs){
  return (new Date(parseFloat(pastDaysInMs) + Date.now()));
}

function getCurrentDayInDateFormat(){
  let d = new Date();
  d.setHours(0,0,0,0);
  return new Date(d);
}

function isPropertyEmpty(property) {
  return property.length === 0
}

function buildObject(firebaseData){
  for (let i = 0; i < firebaseData.length; i++) {
    let birthDay = firebaseData[i].birthDay;
    let birthMonth = moment().month(firebaseData[i].birthMonth).format("M");
    let name = firebaseData[i].name;
    let formattedBirthDate = birthDay + '/' + birthMonth;
    firebaseData[i].birthdaysInMiliseconds = getDatesAsMiliseconds(formattedBirthDate);
    firebaseData[i].birthdaysInFuture = getDaysInTheFuture(firebaseData[i].birthdaysInMiliseconds);
    firebaseData[i].converted = convertMilisecondsToDate(firebaseData[i].birthdaysInFuture);
    firebaseData[i].parsed = parseDates(firebaseData[i].converted);
    //if "converted" property is empty (meaning the date is in the past, give it a huge value so that it goes
    //to the end of the list with the "sortedObjects" parsing function)
    if (isPropertyEmpty(firebaseData[i].converted) && !(allDates(firebaseData[i].birthdaysInMiliseconds).getTime() === getCurrentDayInDateFormat().getTime())){
       firebaseData[i].converted = 9999999999999999;
    }
  }
  let sortedObjects = firebaseData.sort((a, b) => (a.converted > b.converted) ? 1 : -1)
  //console.log(firebaseData)

  return firebaseData;
}

export {
  buildObject
};
