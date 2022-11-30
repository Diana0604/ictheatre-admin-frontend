import React from "react";
import { addCompany, deleteCompany, saveCompany } from '../../api/database';
import { ICompanyProperties } from '../../types/types.database';
import { cellValue } from "../../types/types.table";

/**
 * Table descriptor object.
 * Cell describes what goes in each cell.
 * It can either be:
 * - Input object -> displaying some information related to a company
 * - Button object -> Either Save / Delete to save changes made to company or delete company alltogether
 */
export default [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ cell }: { cell: any }) => {
      return (<input defaultValue={cell.value} onChange={(e) => { cell.value = e.target.value }}></input>)
    }
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ cell }: { cell: any }) => {
      return (<input defaultValue={cell.value} onChange={(e) => { cell.value = e.target.value }}></input>)
    }
  },
  {
    Header: "Initial Price Per Share",
    accessor: "initPricePerShare",
    Cell: ({ cell }: { cell: any }) => {
      if (cell.value === undefined) cell.value = 0;
      return (<input defaultValue={cell.value} onChange={(e) => { cell.value = e.target.value }}></input>)
    }
  },
  {
    Header: "Tendency",
    accessor: "tendency",
    Cell: ({ cell }: { cell: any }) => {
      if (cell.value === undefined) cell.value = "0"
      return <select defaultValue={cell.value} onChange={(e) => { cell.value = e.target.value }}>
        <option value="0">Neutral</option>
        <option value="1">Up</option>
        <option value="-1">Down</option>
      </select>
    }
  },
  {
    Header: "Save",
    accessor: "save",
    Cell: ({ cell }: { cell: any }) => {
      const handleSaveChanges = () => {
        //transforming table rows into json object is a bit bleh. I should work on making this all more beautiful.
        //FIRST -> get all rows
        const newCompany = cell.row.cells.map((cellValue: cellValue) => {
          if (cellValue.column.id != 'delete' && cellValue.column.id != 'save')
            return [cellValue.column.id, cellValue.value]
          if (cellValue.column.id === 'save' && cell.value != undefined) return ['id', cell.value]
        })
        //SECOND => trim rows that are not relevant
        const newCompanyObject = Object.fromEntries(newCompany.filter((value: cellValue) => {
          return value != undefined
        }))
        //THIRD => Add current price equal to init price
        newCompanyObject.currentPricePerShare = newCompanyObject.initPricePerShare
        //FOURTH => Send to API
        if (cell.value != undefined) {
          saveCompany(newCompanyObject as ICompanyProperties)
          alert('copmany information has been saved in database')
        }
        else
          addCompany(newCompanyObject as ICompanyProperties).then((added) => {
            if (added) window.location.reload();
          })
      }
      return <button onClick={() => { handleSaveChanges() }}>Save Changes</button>
    },
  },
  {
    Header: "Delete",
    accessor: "delete",
    Cell: ({ cell }: { cell: any }) => {
      const handleDelete = () => {
        //delete company from database. If cannot delete company will stay there.
        deleteCompany(cell.value).then((deleted) => {
          if (deleted) window.location.reload();
        })
      }
      return (<button disabled={cell.value === undefined} onClick={() => { handleDelete() }} value="delete" >
        Delete
      </button>
      )
    },
  },
  /*
  {
    Header: 'Complexity',
    accessor: 'complexity'
  }
  */
];
