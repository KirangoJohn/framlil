import React from "react";

export default function StatCard({title,value}) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <h3>{value}</h3>
      </div>
    </div>
  )
}