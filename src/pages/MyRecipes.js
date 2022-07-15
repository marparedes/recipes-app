import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { NavLink, useNavigate } from 'react-router-dom';
import urlWebServices from '../webServices';
import { useUserContext } from '../components/UserContext';
import { AlertMessage } from '../components/AlertMessage';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
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
    if (response.status === 200) {
      setRecipes(parsedResponse.data);
    }
  }

  const history = useNavigate();
  const editRecipe = (id) => {
    history(`/my-recipes/${id}`)
  };
  const deleteRecipe = async () => {
    let url = urlWebServices.deleteRecipe.replace('{id}', selectedId);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Accept': 'application/x-www-form-urlencoded',
          'x-access-token': user.token,
          'Origin': 'http://localhost:3000',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      if (response.status === 204) {
        await setRecipes(recipes.filter(row => row._id !== selectedId));
      }
    } catch (error) {
      console.log(`Could not delete recipe ${selectedId}`);
    }
    await setSelectedId("");
    closeDialog();
  };

  const openDialog = async (id) => {
    await setSelectedId(id);
    setShowDialog(true);
  }
  const closeDialog = () => {
    setShowDialog(false);
  }

  return (
    <div>
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
                  <DeleteIcon color="primary" onClick={() => openDialog(row._id)} />
                </TableCell>
                <TableCell component="th" scope="row"><NavLink to={`/recipes/${row._id}`}>{row.title}</NavLink></TableCell>
                <TableCell >{row.category}</TableCell>
                <TableCell >{row.averageScore}</TableCell>
                <TableCell >{row.published ? 'Sí' : 'No'}</TableCell>
              </TableRow>
            )) : <div>Cargando...</div>}
          </TableBody>
        </Table>
        <Dialog open={showDialog} onClose={closeDialog}>
          <DialogContent>¿Borrar la receta permanentemente?</DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancelar</Button>
            <Button onClick={deleteRecipe}>Borrar</Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
      <div className={"my-recipes-none-found"}>
        {recipes.length > 0 ? <></> : <AlertMessage message={"No se encontraron recetas. Por favor, intente" +
          " nuevamente."} severity={"info"} />}
      </div>
    </div>
  )
}

export default MyRecipes;
