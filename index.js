module.exports = function(start, increment) {
  // Parse the date.
  var d = new Date(start);
  // Determine day of week.
  var day = d.getUTCDay();
  // Determine sign.
  var sign = Math.sign(increment);
  var absIncrement = Math.abs(increment);

  var days = 0;

  // If increment is greater than or less than 0 and day of week is a
  // weekend, start with a buffer.
  if (day === 0 && sign === -1) {
    days = 1;
  } else if (day === 6 && sign === 1) {
    days = 1;
  }

  // Add padding for weekends.
  var paddedAbsIncrement = absIncrement;
  if (day !== 0 && day !== 6 && sign > 0) {
    paddedAbsIncrement += day;
  } else if (day !== 0 && day !== 6 && sign < 0) {
    paddedAbsIncrement += 6 - day;
  }
  var weekendsInbetween =
    Math.max(Math.floor(paddedAbsIncrement / 5) - 1, 0) +
    (paddedAbsIncrement > 5 && paddedAbsIncrement % 5 > 0 ? 1 : 0);

  // Add the increment and number of weekends.
  days += absIncrement + weekendsInbetween * 2;

  // Create a new date.
  d = new Date(d.valueOf() + 864E5 * days * sign);

  return d.toISOString().split('T')[0];
};

if (!Math.sign) {
  Math.sign = function(n) {
    return n === 0 ? 0 : n === Math.abs(n) ? 1 : -1;
  };
}
