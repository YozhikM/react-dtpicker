# Date Time Picker

[![DeepScan Grade](https://deepscan.io/api/projects/1543/branches/5299/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=1543&bid=5299)
![FlowType compatible](https://img.shields.io/badge/flowtype-compatible-brightgreen.svg)

The calendar is written using the React library. Can be used both as a common calendar, and as a date time picker with range.
There is a possibility to choose a date by days, months, years and decades.
The date can be changed in the input.

![DateTimePicker](http://mysolaris.xyz/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202017-10-16%20%D0%B2%204.26.32%20%D0%9F%D0%9F.png)

## Usage

1.  `git clone https://github.com/YozhikM/dtpicker.git`
2.  `npm install`
3.  `npm start` _or_ `yarn start`
4.  `npm test` _or_ `yarn test`

## API

### `highlight`

Highlights the days.

```js
highlight?: { min: Date, max: Date }
```

### `value`

Displayed months on the calendar.

```js
value?: { min: string, max: string }
```

### `time`

When the value is set to `true`, the time in hours and minutes will be displayed, as well as the ability to change it. By default is `false`.

```js
time?: boolean
```

### `minDate` && `maxDate`

The latest dates for the calendar. All events, like clicking, navigating through the interface, will be unavailable.

```js
minDate?: Date,
maxDate?: Date
```

### `singleCalendar`

When set to `true`, a single calendar will be displayed without the ability to select a date range. By default is `false`.

```js
singleCalendar?: boolean
```

### `onChange()`

```js
onChange?: (Event, { min: string, max: string }) => void;
```

### `onSubmit()`

```js
onSubmit?: (Event, { min: string, max: string }) => void;
```

### `toggleCalendar()`

```js
toggleCalendar?: () => void;
```

![DateTimePicker](http://mysolaris.xyz/single.png)
