# Date Time Picker

[![Greenkeeper badge](https://badges.greenkeeper.io/YozhikM/dtpicker.svg)](https://greenkeeper.io/)

The calendar is written using the React library. Can be used both as a common calendar, and as a date time picker with range.
There is a possibility to choose a date by days, months, years and decades.
The date can be changed in the input.

![DateTimePicker](http://mysolaris.xyz/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202017-10-16%20%D0%B2%204.26.32%20%D0%9F%D0%9F.png)


## Usage

1. `git clone https://github.com/YozhikM/dtpicker.git`
2. `npm install`
3. `npm start` *or* `yarn start`
4. `npm test` *or* `yarn test`

To use static typing, make sure [that you have installed Flow](https://flow.org/en/docs/install).

## API

#### `highlight`
Highlights the days. By default is `new Date()`. It can be a single date or an array of dates

#### `value`
Displayed months on the calendar. By default is `new Date()`

#### `time`
When the value is set to `true`, the time in hours and minutes will be displayed, as well as the ability to change it. By default is `false`

#### `isSingleCalendar`
When set to `true`, a single calendar will be displayed without the ability to select a date range. By default is `false`

![DateTimePicker](http://mysolaris.xyz/single.png)

## Locales

To work with dates, use the library [date-fns](https://date-fns.org). Localization can be changed in a file `src/components/Calendar/format.js`
