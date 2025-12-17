import { useContext, useState } from 'react';
import { LocaleContext } from './context';
import { Calendar } from './calendar';
import classes from './calendar.module.sass';
import { useDateInput } from './useDateInputHook';

export function DemoCalendarPage() {
  const
    [locale, setLocale] = useState('ru');

  return <>
    <label>
      locale:
      <select value={locale} onChange={event => setLocale(event.target.value)}>
        {['ru', 'en', 'ar', 'zh', 'ko', 'ja']
          .map(l => <option key={l} value={l}>{l}</option>)}
      </select>
    </label>
    <hr />
    Цель занятия: <input type='date' />

    <h1>Demo Calendar</h1>
    <LocaleContext value={locale}>
      <main className={classes.flex}>
        <DemoResult />
        <DemoPopUp />
        <DemoSelectDay />

        <Demo2 />
        <Demo1 />
      </main>
    </LocaleContext>
  </>
}


function Demo1() {
  return <fieldset>
    <LocaleContext value='ja'>
      <Calendar date={new Date} className={classes.custom} />
    </LocaleContext>
  </fieldset>
}

function Demo2() {
  const
    { ref, date } = useDateInput()
  // [date, setDate] = useState(new Date);
  return <fieldset>
    {/* <input type="month" value={DateToYYYYMM(date)} onInput={event => setDate(YYYYMMToDate(event.target.value))} /> */}
    <input type="month" ref={ref} />
    <Calendar date={date} />
  </fieldset>
}

// function DateToYYYYMM(date) {
//   return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
// }
// function YYYYMMToDate(str) {
//   const [year, month] = str.split('-');
//   return new Date(year, month - 1, 1);
// }
function DemoSelectDay() {
  const
    locale = useContext(LocaleContext),
    [date, setDate] = useState(new Date);

  return <fieldset>
    date: {date.toLocaleDateString(locale)}
    <SelectDay date={date} setDate={setDate} />
  </fieldset>
}

function SelectDay({ date, setDate }) {
  return <div onClick={
    event => {
      const day = +event.target.closest('td[data-day]')?.dataset?.day;
      if (day)
        setDate(new Date(date.getFullYear(), date.getMonth(), day))
    }
  }>
    <Calendar date={date} />
  </div>
}



export function PopupWindow({ children }) {
  return <div className={classes.popup}>
    {children}
  </div>
}

function DemoPopUp() {
  const
    [visible, setVisible] = useState(false);
  return <fieldset>
    <legend>demo pop-up</legend>
    <button onClick={() => setVisible(true)}>open</button>
    {visible && <PopupWindow>
      <button onClick={() => setVisible(false)}>close</button>
      <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-4 mb-3 text-link dark:text-link-dark w-24 lg:w-28 self-center text-sm mr-0 flex origin-center transition-all ease-in-out"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
    </PopupWindow>}
  </fieldset>;
}

function DemoResult() {
  const
    [date, setDate] = useState(new Date),
    [open, setOpen] = useState(false),
    onClick1 = () => setOpen(true),
    onClick2 = () => setOpen(false);
  return <fieldset >
    <legend>Итог</legend>
    <div
      onClick={onClick1}
      className={classes.dateselector}
    >
      {date.toLocaleDateString()}
    </div>
    <div onClick={onClick2}>
      {open && <PopupWindow>
        <SelectDay date={date} setDate={setDate} />
      </PopupWindow>}
    </div>
  </fieldset>
}