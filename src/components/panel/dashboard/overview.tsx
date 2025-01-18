"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "05.12",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "09.12",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "13.12",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "17.12",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "21.12",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "25.12",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "29.12",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "02.01",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "06.01",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "10.01",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "14.01",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "18.01",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={value => `${value}`}
        />
        <Bar dataKey="total" fill="#fabe25" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
