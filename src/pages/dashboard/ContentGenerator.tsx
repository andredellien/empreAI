import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  CardActions,
  Chip,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/axios';

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  BusinessSettings: {
    tone: string;
    targetAudience: string;
    keywords: string[];
  };
}

interface GeneratedContent {
  id: number;
  content: string;
  type: string;
  platform: string;
  status: string;
  createdAt: string;
}

const ContentGenerator = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<number | ''>('');
  const [contentType, setContentType] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const response = await api.get('/businesses');
      setBusinesses(response.data);
    } catch (error) {
      showSnackbar('Error al cargar negocios', 'error');
    }
  };

  const loadGeneratedContent = async () => {
    if (!selectedBusiness) return;
    try {
      const response = await api.get(`/content/business/${selectedBusiness}`);
      setGeneratedContent(response.data);
    } catch (error) {
      showSnackbar('Error al cargar contenido generado', 'error');
    }
  };

  useEffect(() => {
    if (selectedBusiness) {
      loadGeneratedContent();
    }
  }, [selectedBusiness]);

  const handleGenerate = async () => {
    if (!selectedBusiness || !contentType || !platform) {
      showSnackbar('Por favor complete todos los campos', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/content', {
        businessId: selectedBusiness,
        contentType,
        platform,
        status: 'pending'
      });

      setGeneratedContent([response.data, ...generatedContent]);
      showSnackbar('Contenido generado exitosamente');
    } catch (error) {
      showSnackbar('Error al generar contenido', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Generador de Contenido
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Genera contenido personalizado para tu negocio usando IA
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Configuración
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Negocio</InputLabel>
                <Select
                  value={selectedBusiness}
                  label="Negocio"
                  onChange={(e) => setSelectedBusiness(e.target.value as number)}
                >
                  {businesses.map((business) => (
                    <MenuItem key={business.id} value={business.id}>
                      {business.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Tipo de Contenido</InputLabel>
                <Select
                  value={contentType}
                  label="Tipo de Contenido"
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <MenuItem value="post">Post</MenuItem>
                  <MenuItem value="article">Artículo</MenuItem>
                  <MenuItem value="caption">Pie de Foto</MenuItem>
                  <MenuItem value="ad">Anuncio</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Plataforma</InputLabel>
                <Select
                  value={platform}
                  label="Plataforma"
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="twitter">Twitter</MenuItem>
                  <MenuItem value="linkedin">LinkedIn</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleGenerate}
                disabled={loading || !selectedBusiness || !contentType || !platform}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Generar Contenido'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Contenido Generado
          </Typography>
          <Grid container spacing={2}>
            {generatedContent.map((content) => (
              <Grid item xs={12} key={content.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle1">
                        {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                      </Typography>
                      <Chip
                        label={content.status}
                        color={content.status === 'completed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {content.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                      Plataforma: {content.platform}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Generado: {new Date(content.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Copiar</Button>
                    <Button size="small" color="error">Eliminar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContentGenerator; 