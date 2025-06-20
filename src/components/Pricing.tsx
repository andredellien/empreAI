import { Box, Container, Grid, Typography, Button, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface PricingProps {
  onRegisterClick: () => void;
}

const plans = [
  {
    title: 'Básico',
    price: '29',
    features: [
      'Redacción de contenido básico',
      'Diseño de imágenes (5/mes)',
      'Gestión de 2 redes sociales',
      'Reportes básicos',
    ],
    recommended: false,
  },
  {
    title: 'Profesional',
    price: '79',
    features: [
      'Redacción de contenido avanzado',
      'Diseño de imágenes ilimitado',
      'Gestión de 5 redes sociales',
      'Reportes detallados',
      'Soporte prioritario',
    ],
    recommended: true,
  },
  {
    title: 'Empresarial',
    price: '199',
    features: [
      'Todo lo del plan Profesional',
      'Gestión de redes ilimitadas',
      'API personalizada',
      'Entrenamiento de IA personalizado',
      'Soporte 24/7',
      'Analítica avanzada',
    ],
    recommended: false,
  },
];

const Pricing = ({ onRegisterClick }: PricingProps) => {
  return (
    <Box
      id="pricing"
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
          Planes y Precios
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 8 }}
        >
          Elige el plan perfecto para tu negocio
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={plan.recommended ? 8 : 0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  bgcolor: plan.recommended ? 'primary.main' : 'background.default',
                  color: plan.recommended ? 'white' : 'text.primary',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                {plan.recommended && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'secondary.main',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    Recomendado
                  </Box>
                )}
                <Typography
                  component="h3"
                  variant="h4"
                  align="center"
                  gutterBottom
                >
                  {plan.title}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Typography component="span" variant="h3">
                    ${plan.price}
                  </Typography>
                  <Typography component="span" variant="h6">
                    /mes
                  </Typography>
                </Box>
                <List sx={{ mb: 4 }}>
                  {plan.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckCircleIcon
                          sx={{
                            color: plan.recommended ? 'white' : 'primary.main',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant={plan.recommended ? 'contained' : 'outlined'}
                  color={plan.recommended ? 'secondary' : 'primary'}
                  size="large"
                  fullWidth
                  onClick={onRegisterClick}
                  sx={{
                    mt: 'auto',
                    color: plan.recommended ? 'white' : 'primary.main',
                    borderColor: plan.recommended ? 'white' : 'primary.main',
                    '&:hover': {
                      bgcolor: plan.recommended ? 'secondary.dark' : 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  Comenzar Ahora
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing; 