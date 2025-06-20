import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

interface CallToActionProps {
  onRegisterClick: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onRegisterClick }) => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h2"
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          ¿Listo para transformar tu negocio?
        </Typography>
        <Typography
          variant="h5"
          align="center"
          paragraph
          sx={{ mb: 6, opacity: 0.9 }}
        >
          Únete a cientos de emprendedores que ya están potenciando su presencia digital con EmpreAI
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={onRegisterClick}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Comenzar Gratis
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="#pricing"
            sx={{
              borderColor: 'white',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                borderColor: 'grey.100',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Ver Planes
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CallToAction; 