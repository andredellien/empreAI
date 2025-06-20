import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Devices as DevicesIcon,
  Analytics as AnalyticsIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
    title: 'Generación de Contenido IA',
    description: 'Crea contenido único y relevante para tu negocio en segundos usando inteligencia artificial avanzada.',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: 'Rápido y Eficiente',
    description: 'Ahorra tiempo y recursos generando contenido de calidad en minutos en lugar de horas.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Seguro y Confiable',
    description: 'Tu contenido y datos están protegidos con las más altas medidas de seguridad.',
  },
  {
    icon: <DevicesIcon sx={{ fontSize: 40 }} />,
    title: 'Multiplataforma',
    description: 'Accede desde cualquier dispositivo y mantén tu negocio conectado en todo momento.',
  },
  {
    icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
    title: 'Análisis Avanzado',
    description: 'Obtén insights valiosos sobre el rendimiento de tu contenido y optimiza tu estrategia.',
  },
  {
    icon: <SupportIcon sx={{ fontSize: 40 }} />,
    title: 'Soporte 24/7',
    description: 'Nuestro equipo está disponible para ayudarte en cualquier momento que lo necesites.',
  },
];

const Features = () => {
  return (
    <Box
      id="features"
      sx={{
        bgcolor: 'background.default',
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
          Características
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 8 }}
        >
          Todo lo que necesitas para potenciar tu presencia digital
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  component="h3"
                  variant="h5"
                  color="text.primary"
                  gutterBottom
                >
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features; 