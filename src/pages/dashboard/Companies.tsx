import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Companies = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Empresas
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Aquí podrás gestionar las empresas registradas en el sistema. Esta funcionalidad estará disponible próximamente.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Companies; 