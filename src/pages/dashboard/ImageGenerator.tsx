import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  Paper,
  Divider,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';
import { useParams } from 'react-router-dom';
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

interface GeneratedImage {
  id: number;
  url: string;
  prompt: string;
  status: string;
  createdAt: string;
}

const ImageGenerator = () => {
  const theme = useTheme();
  const { businessId } = useParams<{ businessId: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    loadBusiness();
    loadGeneratedImages();
  }, [businessId]);

  const loadBusiness = async () => {
    try {
      const response = await api.get(`/businesses/${businessId}`);
      setBusiness(response.data);
    } catch (error) {
      showSnackbar('Error al cargar el negocio', 'error');
    }
  };

  const loadGeneratedImages = async () => {
    try {
      const response = await api.get(`/images/${businessId}`);
      setGeneratedImages(response.data);
    } catch (error) {
      showSnackbar('Error al cargar las imágenes generadas', 'error');
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      showSnackbar('Por favor ingresa un prompt para la imagen', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/images/${businessId}/generate`, { prompt });
      setGeneratedImages([response.data, ...generatedImages]);
      setPrompt('');
      showSnackbar('Imagen generada exitosamente');
    } catch (error) {
      showSnackbar('Error al generar la imagen', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  if (!business) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Generador de Imágenes
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {business.name} - {business.category}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Generar Nueva Imagen
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe la imagen que deseas generar..."
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleGenerate}
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  py: 1.5
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Generar Imagen'}
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Configuración del Negocio
            </Typography>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" color="textSecondary">
                Tono: {business.BusinessSettings.tone}
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" color="textSecondary">
                Audiencia: {business.BusinessSettings.targetAudience}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Imágenes Generadas
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {generatedImages.map((image) => (
              <Card
                key={image.id}
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={image.url}
                  alt={image.prompt}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {new Date(image.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {image.prompt}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href={image.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Original
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

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

export default ImageGenerator; 