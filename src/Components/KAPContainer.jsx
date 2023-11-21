import React from "react";

export default function KAPContainer({
  children,
  title,
  date,
  name,
  stockCodes,
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
      <div>{stockCodes}</div>
      <div style={{ textAlign: "center" }}>
        <h2>{title}</h2>
        <p>{name}</p>
      </div>
      <div>
        <p>{date}</p>
      </div>
    </div>
  );
}
