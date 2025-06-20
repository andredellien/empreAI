import { Box, Typography, Paper } from '@mui/material';

const Users = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Aquí podrás gestionar los usuarios del sistema. Esta funcionalidad estará disponible próximamente.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Users; 