import React, { useState } from 'react';
import recipesMock from '../mock/recipes';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';

function MyRecipes() {
    const history = useNavigate();
    const editRecipe = (id) => {
      history(`/my-recipes/${id}`)
    };
    const deleteRecipe = (id) => {
      setRecipesData(recipesData.filter(row => row.id !== id));
    };
    const [recipesData, setRecipesData] = useState(recipesMock.map(
      ({ id, title, category, score }) => ({ id, title, category, score })
    ));

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Acciones</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Calificación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipesData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <EditIcon color="primary" onClick={() => editRecipe(row.id)} />
                  <DeleteIcon color="primary" onClick={() => deleteRecipe(row.id)} />
                </TableCell>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell >{row.category}</TableCell>
                <TableCell >{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default MyRecipes;
