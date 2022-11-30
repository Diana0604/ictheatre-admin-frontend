import React from "react";
import { addSeller, deleteSeller, saveSeller, saveShareBundle } from '../../api/database';
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
    Header: "Save",
    accessor: "save",
    Cell: ({ cell }: { cell: any }) => {
      const handleSaveChanges = () => {
        //obtain all information on this row
        if (cell.value != undefined) {
          const sellerInformation = { name: '', id: cell.value }
          console.log(cell.row.cells)
          cell.row.cells.map((cellValue: cellValue) => {
            if (cellValue.column.id != 'delete' && cellValue.column.id != 'save') {
              if (cellValue.column.id === 'name') {
                sellerInformation.name = cellValue.value
                if (sellerInformation.name === '') {
                  alert('Your selelr needs a name!')
                  return
                }
              }
              else {
                const newBundle = { ownerId: cell.value, companyId: cellValue.column.id, quantity: cellValue.value, initialQuantity: cellValue.value }
                saveShareBundle(newBundle)
              }
            }
          })
          saveSeller(sellerInformation)
          alert('seller information has been saved in database')
        } else {
          for (const cellValue of cell.row.cells) {
            if (cellValue.column.id === 'name') {
              if (cellValue.value === '') {
                alert('You need to give a name to your seller!')
                return;
              }
              addSeller({ name: cellValue.value }).then(added => {
                if (added) window.location.reload();
                else alert('could not save seller')
              })
              return
            }
          }
        }
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
