import React from "react";
import { deleteCompany, deleteSeller, saveCompany, saveSeller, saveShareBundle } from '../api/database';
import { ICompanyProperties } from '../types/types.database';
import { cellValue } from "../types/types.table";

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
    Header: "Save",
    accessor: "save",
    Cell: ({ cell }: { cell: any }) => {
      const handleSaveChanges = () => {
        //obtain all information on this row
        const sellerInformation = { name: '', id: cell.value }
        cell.row.cells.map((cellValue: cellValue) => {
          if (cellValue.column.id != 'delete' && cellValue.column.id != 'save') {
            if (cellValue.column.id === 'name') sellerInformation.name = cellValue.value
            else {
              console.log(cellValue.column)
              const id = cell.value as number * cellValue.column.id as number;
              const newBundle = { ownerId: cell.value, companyId: cellValue.column.id, quantity: cellValue.value, id: id }
              saveShareBundle(newBundle)
            }
          }
        })
        saveSeller(sellerInformation)
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
        deleteSeller(cell.value).then((deleted) => {
          if (deleted) window.location.reload();
        })
      }
      return (<button onClick={() => { handleDelete() }} value="delete" >
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
