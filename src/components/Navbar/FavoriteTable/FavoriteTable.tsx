"use client";
import { Person } from '@/models';
import { removeFavorite } from '@/redux/states/favorites';
import { AppStore } from '@/redux/store';
import { IconButton } from '@mui/material';
import { GridRenderCellParams, DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

export type FavoriteTableProps = {
	// types...
}

const FavoriteTable: React.FC<FavoriteTableProps>  = ({}) => {
  const pageSize: number = 5;
  const dispatch = useDispatch();
  const stateFavorites = useSelector((store: AppStore) => store.favorites);

  const handleClick = (person: Person) => {
    dispatch(removeFavorite(person))
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
			<IconButton aria-label="delete" onClick={() =>handleClick(params.row)}>
				<DeleteIcon />
		  	</IconButton>
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
		   <>{params.value}</>
		)
	}
  ]
  
	return (
		<div >
            <DataGrid
              disableColumnSelector
              disableRowSelectionOnClick
              initialState={{
                pagination: { paginationModel: { pageSize: pageSize } },
              }}
              pageSizeOptions={[pageSize]}
			  {...stateFavorites}
        	  rows={[]}
              columns={columns}
              getRowId={(row:any) => row.id}
              />
        </div>
	);
};

export default FavoriteTable;
