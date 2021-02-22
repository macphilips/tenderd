import React from "react"
import { Moment } from "moment"
import style from "./Timeline.module.scss"

// Design from https://codepen.io/darcyvoutt/pen/ogPrpK

export type TimelineHistory = { time: Moment; title: string; subtext?: string }

export function Timeline(props: { label: string; history: TimelineHistory[] }) {
  return (
    <div className={style.root}>
      <label>{props.label}</label>
      <ul className={style.timeline}>
        {props.history.map(({ time, title, subtext }) => {
          return (
            <li
              key={time.toJSON()}
              className={style.event}
              data-date={time.format("DD/MM/YYYY HH:mm")}
            >
              <h3 className={style.title}>{title}</h3>
              {subtext && <p>{subtext}</p>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
