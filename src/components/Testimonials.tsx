import { Box, Container, Typography, Avatar, Paper } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: 'María González',
    role: 'Emprendedora de Moda',
    image: '/images/testimonial1.jpg',
    content: 'EmpreAI ha transformado completamente mi estrategia de marketing. El contenido generado por IA ha aumentado mi engagement en un 200%.',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Dueño de Restaurante',
    image: '/images/testimonial2.jpg',
    content: 'La automatización de publicaciones y respuestas me ha permitido enfocarme en la calidad de mi servicio. ¡Una herramienta imprescindible!',
  },
  {
    name: 'Ana Martínez',
    role: 'Consultora de Negocios',
    image: '/images/testimonial3.jpg',
    content: 'Los reportes financieros automáticos me ayudan a tomar mejores decisiones. EmpreAI es como tener un equipo de marketing completo.',
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box
      id="testimonials"
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
          Lo que dicen nuestros usuarios
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 8 }}
        >
          Descubre cómo EmpreAI está ayudando a emprendedores a crecer
        </Typography>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <Box key={index} sx={{ px: 2 }}>
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
                  }}
                >
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 2 }}
                  >
                    "{testimonial.content}"
                  </Typography>
                  <Typography
                    component="h3"
                    variant="h6"
                    color="text.primary"
                    gutterBottom
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials; 