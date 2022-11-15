import axios from 'axios';
import React, { useState } from "react";

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
      return (<input defaultValue={cell.value} onChange={(e) => { cell.value = e.target.value }}></input>)
    }
  },
  {
    Header: "Final Price Per Share",
    accessor: "finalPricePerShare",
    Cell: ({ cell }: { cell: any }) => {
      return (<input defaultValue={cell.value} onChange={(e) => { cell.value = e.target.value }}></input>)
    }
  },
  {
    Header: "Save",
    accessor: "save",
    Cell: ({ cell }: { cell: any }) => {
      const handleSaveChanges = () => {
        //FIRST -> get all rows
        const newCompany = cell.row.cells.map((element: { column: { id: any; }; value: any; }) => {
          if (element.column.id != 'delete' && element.column.id != 'save')
            return [element.column.id, element.value]
          if (element.column.id === 'save') return ['id', cell.value]
        })
        //SECOND => trim rows that are not relevant
        const newCompanyObject = Object.fromEntries(newCompany.filter((element: undefined) => {
          return element != undefined
        }))
        //THIRD => Add current price equal to init price
        newCompanyObject.currentPricePerShare = newCompanyObject.initPricePerShare
        //FOURTH => Send to API
        axios.put(`http://localhost:3000/mysql/company/${cell.value}`, {}, { params: newCompanyObject })
      }
      return <button onClick={() => { handleSaveChanges() }}>Save Changes</button>
    },
  },
  {
    Header: "Delete",
    accessor: "delete",
    Cell: ({ cell }: { cell: any }) => {
      const handleDelete = () => {
        axios.delete(`http://localhost:3000/mysql/company/${cell.value}`).then((_onSuccess) => {
          window.location.reload();
        }, (onReject) => {
          console.log('ERROR: ')
          console.log(onReject)
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
