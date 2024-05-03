import React from 'react'
import { IPill } from './types'
import classNames from 'classnames';

const Pill: React.FC<IPill> = ({
    title,
    color,
}) => {
    const pillClass = classNames({
      "w-max text-white font-jost text-xs mb-1 p-1.5 rounded": true,
      "bg-red-500": color === "red",
      "bg-yellow-500": color === "yellow",
      "bg-green-600": color === "green",
    });
    return (
        <div className={pillClass}>
          {title}
        </div>
      )
}

export default Pill