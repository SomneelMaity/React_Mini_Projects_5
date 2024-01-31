import React, { useState } from "react";

export default function Table() {
  const [dataTable, setDataTable] = useState([
    { date: "2022-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-02", views: 150, article: "Article 2" },
    { date: "2023-09-02", views: 120, article: "Article 3" },
    { date: "2020-09-03", views: 200, article: "Article 4" },
  ]);

  const sortByDate = () => {
    const sortedData = [...dataTable].sort((a, b) => {
      // Sort by date in descending order
      const dateComparison = new Date(b.date) - new Date(a.date);
      if (dateComparison !== 0) {
        return dateComparison;
      }

      // If dates are the same, sort by views in descending order
      return b.views - a.views;
    });

    setDataTable(sortedData);
  };

  const sortByViews = () => {
    const sortedData = [...dataTable].sort((a, b) => {
      // Sort by views in descending order
      const viewsComparison = b.views - a.views;
      if (viewsComparison !== 0) {
        return viewsComparison;
      }

      // If views are the same, sort by date in descending order
      return new Date(b.date) - new Date(a.date);
    });

    setDataTable(sortedData);
  };

  
  return <>
  <h1>Date and Views Table</h1>
  <button onClick={sortByDate}>Sort by Date</button>
  <button onClick={sortByViews}>Sort by Views</button>
  <table>
  <thead>
          <tr>
            <th>Date</th>
            <th>Views</th>
            <th>Article</th>
          </tr>
        </thead>
        <tbody>
          {dataTable.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.views}</td>
              <td>{row.article}</td>
            </tr>
          ))}
        </tbody>
  </table>
  </>;
}
