import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography, autocompleteClasses } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const LogoImageStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  height:250,
  width: 150
}));

const LogoOrdreStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

export default function Login({next}) {
  return (
    <RootStyle title="Login | Minimal-UI">
      

      <MHidden width="mdDown">

        <SectionStyle>
        <div style={{display:"flex", justifyContent:"center"}}>
          <img src="/static/illustrations/issm.jpg" alt="login"/>
          </div>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          <div style={{display:"flex", justifyContent:"center"}}>
            Bon Retour !
            </div>
          </Typography>
          <div style={{display:"flex", justifyContent:"center"}}>
            <img src="/static/Logo OM.png" alt="login"/>
          </div>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Connexion
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Entrez Vos Informations</Typography>
          </Stack>

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Vous n'avez pas de compte?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                S'inscrire
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
