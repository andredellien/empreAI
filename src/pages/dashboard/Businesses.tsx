import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  Paper,
  Divider,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  type: string;
  BusinessSetting: {
    tone: string;
    targetAudience: string;
    keywords: string[];
  };
}

const Businesses = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getBusinesses, createBusiness, updateBusiness, deleteBusiness } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [open, setOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | undefined>();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    type: '',
    tone: '',
    targetAudience: '',
    keywords: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const data = await getBusinesses();
      console.log('Datos de negocios recibidos:', data);
      setBusinesses(data);
    } catch (error) {
      console.error('Error al cargar negocios:', error);
      showSnackbar('Error al cargar negocios', 'error');
    }
  };

  const handleOpenDialog = (business?: Business) => {
    if (business) {
      setEditingBusiness(business);
      setFormData({
        name: business.name,
        category: business.category,
        description: business.description,
        type: business.type || '',
        tone: business.BusinessSetting?.tone || '',
        targetAudience: business.BusinessSetting?.targetAudience || '',
        keywords: business.BusinessSetting?.keywords?.join(', ') || ''
      });
    } else {
      setEditingBusiness(undefined);
      setFormData({
        name: '',
        category: '',
        description: '',
        type: '',
        tone: '',
        targetAudience: '',
        keywords: ''
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingBusiness(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const businessData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        type: formData.type,
        BusinessSetting: {
          tone: formData.tone,
          targetAudience: formData.targetAudience,
          keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k !== '')
        }
      };

      if (editingBusiness) {
        await updateBusiness(editingBusiness.id, businessData);
        showSnackbar('Negocio actualizado exitosamente');
      } else {
        await createBusiness(businessData);
        showSnackbar('Negocio creado exitosamente');
      }

      handleCloseDialog();
      loadBusinesses();
    } catch (error: any) {
      console.error('Error al guardar el negocio:', error);
      showSnackbar(error.message || 'Error al guardar el negocio', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este negocio?')) {
      try {
        await deleteBusiness(id);
        showSnackbar('Negocio eliminado exitosamente');
        loadBusinesses();
      } catch (error) {
        showSnackbar('Error al eliminar el negocio', 'error');
      }
    }
  };

  const handleGenerateContent = (businessId: number) => {
    navigate(`/dashboard/content/${businessId}`);
  };

  const handleGenerateImages = (businessId: number) => {
    navigate(`/dashboard/images/${businessId}`);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Mis Negocios
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3
          }}
        >
          Nuevo Negocio
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
        {businesses.map((business) => {
          console.log('Renderizando negocio:', business);
          return (
            <Box key={business.id}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {business.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {business.category}
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ color: theme.palette.text.secondary }}>
                    {business.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`Tono: ${business.BusinessSetting?.tone || 'No especificado'}`}
                      size="small"
                      sx={{ mr: 1, mb: 1, borderRadius: 1 }}
                    />
                    <Chip
                      label={`Audiencia: ${business.BusinessSetting?.targetAudience || 'No especificada'}`}
                      size="small"
                      sx={{ mr: 1, mb: 1, borderRadius: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {business.BusinessSetting?.keywords?.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    )) || (
                      <Chip
                        label="Sin palabras clave"
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    )}
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(business)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(business.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <Button
                      startIcon={<ContentIcon />}
                      onClick={() => handleGenerateContent(business.id)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Contenido
                    </Button>
                    <Button
                      startIcon={<ImageIcon />}
                      onClick={() => handleGenerateImages(business.id)}
                      size="small"
                      variant="contained"
                    >
                      Imágenes
                    </Button>
                  </Box>
                </CardActions>
              </Paper>
            </Box>
          );
        })}
      </Box>

      <Dialog 
        open={open} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          {editingBusiness ? 'Editar Negocio' : 'Nuevo Negocio'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Nombre del Negocio"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Categoría"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Tipo de Negocio"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="Ej: Restaurante, Tienda online, Consultoría"
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Descripción"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Tono"
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  required
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Audiencia Objetivo"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  required
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Palabras Clave (separadas por comas)"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  required
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={handleCloseDialog}
              sx={{ mr: 1 }}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3
              }}
            >
              {editingBusiness ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Businesses; 