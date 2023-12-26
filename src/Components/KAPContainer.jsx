import React from "react";

export default function KAPContainer({
  children,
  title,
  date,
  name,
  stockCodes,
  sentiment,
}) {
  return (
    <div
      className="border-2 p-3 m-3"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="w-10">{stockCodes}</div>
      <div style={{ textAlign: "left" }} className="w-3/5">
        <h2>{title}</h2>
        <p>{name}</p>
      </div>
      <div>{sentiment}</div>
      <div>
        <p>{date}</p>
      </div>
    </div>
  );
}
