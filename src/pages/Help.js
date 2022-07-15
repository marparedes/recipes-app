import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import bgImage from '../static/banner.jpg'
import filterImage from '../static/filter.PNG'
import sectionsImage from '../static/sections.PNG'
import myRecipesImage from '../static/myRecipes.PNG'
import StarIcon from '@mui/icons-material/Star';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function Help() {
    return <>
        <Box>
            <Box sx={{
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: "black",
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: 600,
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}>
                <Box sx={{ width: { xs: "100%", sm: "50%", md: "40%" }, padding: { xs: 3, sm: 2, md: 20 } }}>
                    <Box sx={{ background: "white", opacity: "0.8" }}>
                        <Typography variant={'h6'} color="tomato" align='center' pt={8}>
                            Encuentra recetas de todo el mundo
                        </Typography>
                        <Typography variant="h4" align='center'>
                            ¡Compartí tu receta!
                        </Typography>
                        <Typography variant="body1" align='center' pt={8}>
                            ¡Puedes encontrar recetas de todo tipo y del todo el mundo en un solo lugar!
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Box>

        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "auto",
            width: { xs: "70%", sm: "50%", md: "40%" },
            padding: { xs: 2, sm: 15, md: 18 }
        }}>
            <Box sx={{ background: "#EEEDD6", opacity: "0.8", padding: { xs: 1, sm: 5, md: 8 }, borderRadius: 2 }}>
                <Typography variant="h5" align='center'>
                    Para poder compartir tus recetas con el mundo tienes que registrarte. Si todavia no lo hiciste, hazlo aquí:
                </Typography>
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Link to={'/register'} style={{ textDecoration: 'none' }}>
                        <Button>Registrate</Button>
                    </Link>
                </div>
            </Box>
            <Box sx={{ background: "#EEEDD6", opacity: "0.8", padding: { xs: 1, sm: 2 }, borderRadius: 2, marginTop: 10 }}>
                <Typography variant="h5" align='center'>
                    Vas a poder filtrar las recetas subidas por otros usuarios. Ya sea por Ingrediente, Dificultad o Categoria:
                </Typography>
                <Box sx={{
                    backgroundImage: `url(${filterImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "none",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    height: 200,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}></Box>
            </Box>
            <Box sx={{ background: "#EEEDD6", opacity: "0.8", padding: { xs: 1, sm: 2 }, borderRadius: 2, marginTop: 10 }}>
                <Typography variant="h5" align='center'>
                    <StarIcon /> Tambien podrás acceder a la descripcion de cada receta y, si iniciaste sesión, ¡podrás calificar las recetas subidas por otros usuarios! <StarIcon />
                </Typography>
            </Box>

            <Box sx={{ background: "#EEEDD6", opacity: "0.8", padding: { xs: 1, sm: 2 }, borderRadius: 2, marginTop: 10 }}>
                <Typography variant="h5" align='center'>
                    Para cargar tus propias recetas en nuestra web tendrás que ir a la sección de Crear Receta
                </Typography>
                <Box sx={{
                    backgroundImage: `url(${sectionsImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "none",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    height: 200,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}></Box>
                <Typography variant="h5" align='center' marginTop={5}>
                    <FormatListBulletedIcon /> Cuando cargues tus propias recetas podrás verlo en la sección Mis Recetas y eliminarlas o editarlas cuando quieras:
                </Typography>
                <Box sx={{
                    backgroundImage: `url(${myRecipesImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "none",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    height: 200,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}></Box>
            </Box>

            <Box sx={{ background: "#EEEDD6", opacity: "0.8", padding: { xs: 1, sm: 2 }, borderRadius: 2, marginTop: 10 }}>
                <Typography variant="h6" align='center'>
                    Cualquier duda o consulta se pueden contactar a : info.contact@gmail.com
                </Typography>

            </Box>

        </Box>
            <Box textAlign="center" marginBottom={5}>
            Recetas del Mundo &reg; {new Date().getFullYear()}
          </Box>
    </>
}
