import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';
import urlWebServices from '../webServices';
import { useUserContext } from '../components/UserContext';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    console.log("Use Effect start")
    const getRecipes = async () => {
      await fetchRecipes();
    }
    try {
      getRecipes().then().catch((error) => {
        console.log("Could not fetch recipes...", error)
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const fetchRecipes = async () => {
    console.log("Sending GET with token:", user.token)
    const response = await fetch(urlWebServices.getMyRecipes, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'x-access-token': user.token,
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    const parsedResponse = await response.json();
    console.log("Got response:", parsedResponse)
    if (response.status === 200) {
      setRecipes(parsedResponse.data);
    }
  }

  const history = useNavigate();
  const editRecipe = (id) => {
    history(`/my-recipes/${id}`)
  };
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(row => row.id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Acciones</b></TableCell>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Categoría</b></TableCell>
            <TableCell><b>Calificación</b></TableCell>
            <TableCell><b>Publicada</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes !== undefined ? recipes.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <EditIcon color="primary" onClick={() => editRecipe(row._id)} />
                <DeleteIcon color="primary" onClick={() => deleteRecipe(row._id)} />
              </TableCell>
              <TableCell component="th" scope="row">{row.title}</TableCell>
              <TableCell >{row.category}</TableCell>
              <TableCell >{row.averageScore}</TableCell>
              <TableCell >{row.published ? 'Sí' : 'No'}</TableCell>
            </TableRow>
          )) : <div>Cargando...</p>}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MyRecipes;
