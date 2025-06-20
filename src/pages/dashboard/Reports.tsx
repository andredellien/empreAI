import { Box, Typography, Paper } from '@mui/material';

const Reports = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reportes y Estadísticas
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Aquí podrás ver reportes y estadísticas del sistema. Esta funcionalidad estará disponible próximamente.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Reports; 