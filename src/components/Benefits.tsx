import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const benefits = [
  {
    icon: <TrendingUpIcon sx={{ fontSize: 60 }} />,
    title: 'Aumenta tu Alcance',
    description: 'Llega a más clientes potenciales con contenido optimizado para cada plataforma.',
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 60 }} />,
    title: 'Ahorra Tiempo',
    description: 'Reduce el tiempo de creación de contenido en un 80% con nuestra tecnología de IA.',
  },
  {
    icon: <MonetizationOnIcon sx={{ fontSize: 60 }} />,
    title: 'Reduce Costos',
    description: 'Elimina la necesidad de contratar redactores y diseñadores profesionales.',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 60 }} />,
    title: 'Mejora el Engagement',
    description: 'Aumenta la interacción con tu audiencia gracias a contenido personalizado y relevante.',
  },
];

const Benefits = () => {
  return (
    <Box
      id="benefits"
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Beneficios
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 8 }}
        >
          Descubre cómo EmpreAI puede transformar tu estrategia digital
        </Typography>
        <Grid container spacing={6}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  {benefit.icon}
                </Box>
                <Typography
                  component="h3"
                  variant="h5"
                  color="text.primary"
                  gutterBottom
                >
                  {benefit.title}
                </Typography>
                <Typography color="text.secondary">
                  {benefit.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Benefits; 