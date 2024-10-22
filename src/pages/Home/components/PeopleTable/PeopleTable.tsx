"use client";
import { Person } from '@/models';
import { addFavorite } from '@/redux/states/favorites';
import { AppStore } from '@/redux/store';
import { Checkbox } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type PeopleTableProps = {
	// types...
}

const PeopleTable: React.FC<PeopleTableProps>  = ({}) => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const pageSize: number = 5;
  const dispatch = useDispatch();
  const statePeople = useSelector((store: AppStore) => store.people);
  const favoritePeople = useSelector((store: AppStore) => store.favorites);

  const findPerson = (person:Person) => !!favoritePeople.find(p => p.id == person.id);
  const filterPerson = (person:Person) => favoritePeople.filter(p => p.id != person.id);

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person];
    dispatch(addFavorite(filteredPeople))
    setSelectedPeople(filteredPeople)
  }
  const columns: any = [
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      sortable: false,
      width: 70,
      renderCell: (params: GridRenderCellParams) => (
        <>{
          <Checkbox size='small' checked={findPerson(params.row)} onChange={() => handleChange(params.row)}/>
        }</>
      )
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
         <>{params.value}</>
      )
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
         <>{params.value}</>
      )
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
         <>{params.value}</>
      )
    },
	{
		field: 'levelOfHappiness',
		headerName: 'level of happiness',
		flex: 1,
		minWidth: 150,
		renderCell: (params: GridRenderCellParams) => (
		   <>{params.value}%</>
		)
	}
  ]

  useEffect(() =>{
	setSelectedPeople(favoritePeople)
  }, [favoritePeople])
  
	return (
		<div >
            <DataGrid
              disableColumnSelector
              disableRowSelectionOnClick
              initialState={{
                pagination: { paginationModel: { pageSize: pageSize } },
              }}
              pageSizeOptions={[pageSize]}
              rows={statePeople}
              columns={columns}
              getRowId={(row:any) => row.id}
              />
        </div>
	);
};

export default PeopleTable;

