import React from "react";
import { useTable, Column } from "react-table";

/**
 * Container for table
 * Copied from: https://www.bacancytechnology.com/blog/react-table-tutorial
 * @param {columns, data} columns and data with column header descriptors (find them in companiesTableColumns.tsx) and data (obtained from API)
 * @returns table constructed
 */
const TableContainer = ({ columns, data }: { columns: readonly Column<{}>[], data: readonly {}[] }) => {
  /**
   * useTable (from react-table documentation):
   * is the root hook for React Table. 
   * To use it, pass it with an options object with at least a columns and data value, followed by any 
   * React Table compatible hooks you want to use.
   * columns -> Headers for columns and data management description (thorugh the method Cell)
   * data -> json object with corresponding data.
   * Object properties have to match accessor from Headers list.
   */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })
  //return table built
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            //@ts-ignore
            <tr key={`hg${index}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, indexCol) => (
                //@ts-ignore
                <th key={`hgc${index}${indexCol}`} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            /**
             * rows (from react-table documentation):
             * An array of materialized row objects from the original data array and columns passed into the table options
             */
            rows.map((row, index) => {
              /**
               * prepareRow (from react-table documentation):
               * This function is responsible for lazily preparing a row for rendering.
               * Any row that you intend to render in your table needs to be passed to this function before every render.
               */
              prepareRow(row);
              //setup object that will be displayed
              return (
                //@ts-ignore
                <tr key={`row${index}`} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    //@ts-ignore
                    return <td key={`cell${index}`} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  )
}
export default TableContainer