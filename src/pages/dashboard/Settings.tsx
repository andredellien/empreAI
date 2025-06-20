import { Box, Typography, Paper } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configuración del Sistema
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Aquí podrás configurar los parámetros del sistema. Esta funcionalidad estará disponible próximamente.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings; 