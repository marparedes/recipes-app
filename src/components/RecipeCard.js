import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

export const RecipeCard = ({ id, title, image, category, score, difficulty }) => {
  return (
    <Grid item xs={10} sm={4} lg={3} align="center">
      <Card sx={{ maxWidth: 345, height: "100%" }}>
        <div style={{ height: "85%" }}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <p className="recipe-card-field"><strong>Categoría:</strong> {category}</p>
            <p className="recipe-card-field"><strong>Calificación:</strong> {score}</p>
            <p className="recipe-card-field"><strong>Dificultad:</strong> {difficulty}</p>
          </CardContent>
        </div>
        <CardActions style={{ justifyContent: 'center' }}>
          <Link to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
            <Button size="large">Ver Detalles</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}
