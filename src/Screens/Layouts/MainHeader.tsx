import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const MainHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    const pathMap: { [key: string]: string } = {
      '/': 'Counter Example',
      '/home': 'React Topics Dashboard',
      '/useEffect': 'useEffect Hook',
      '/useRefParent': 'useRef Hook',
      '/useMemo': 'useMemo Hook',
      '/useCallBack': 'useCallback Hook',
      '/ParentUseReducer': 'useReducer Hook',
      '/ParentCustomHok': 'Custom Hooks',
      '/FunctionCurrying': 'Function Currying',
      '/ErrorBoundry': 'Error Boundaries',
      '/LazyLoading': 'Lazy Loading',
      '/APIMainCalling': 'API Integration',
      '/ContextMain': 'useContext Hook',
      '/debounce': 'Debouncing',
      '/lifecycle': 'Component Lifecycle',
      
      // Design Patterns
      '/patterns/1_Custom_Hook_Pattern': 'Custom Hook Pattern',
      '/patterns/2_Container_and_Presentation_Pattern': 'Container & Presentation Pattern',
      '/patterns/3_Provider_Pattern': 'Provider Pattern',
      '/patterns/4_controlled_uncontrolled_component_pattern': 'Controlled vs Uncontrolled Components',
      '/patterns/5_Compound_Components_patterns': 'Compound Components Pattern',
      '/patterns/6_Slot_Children_as_Props': 'Slot Children as Props Pattern',
      '/patterns/7_Render_Props': 'Render Props Pattern',
      '/patterns/7_Render_Props_2': 'Toggle Render Props Pattern',
      '/patterns/8_Polymorphic_Components_Pattern': 'Polymorphic Components Pattern',
      '/patterns/9_State_Reducer_Pattern': 'State Reducer Pattern',
      '/patterns/10_State_Machine_Pattern': 'State Machine Pattern',
      '/patterns/10_State_Machine_Pattern_Form': 'Form State Machine Pattern',
      '/patterns/11_Factory_Components_Pattern': 'Factory Components Pattern',
      
      // React 19 Features
      '/react19': 'React 19 Features',
      '/react19/actions': 'Actions in React 19',
      '/react19/simple-actions': 'Simple Actions Demo'
    };
    return pathMap[pathname] || 'React Topic';
  };

  const getBreadcrumbs = (pathname: string) => {
    if (pathname === '/home' || pathname === '/') {
      return [];
    }

    const breadcrumbs = [
      { label: 'Home', path: '/home' }
    ];

    const currentTitle = getPageTitle(pathname);
    if (currentTitle !== 'React Topic') {
      breadcrumbs.push({ label: currentTitle, path: pathname });
    }

    return breadcrumbs;
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const breadcrumbs = getBreadcrumbs(location.pathname);
  const showBackButton = location.pathname !== '/home' && location.pathname !== '/';

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <SchoolIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            React Advanced Topics & Design Patterns
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          {showBackButton && (
            <Button
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={handleBackClick}
              sx={{ 
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Back
            </Button>
          )}
          
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={handleHomeClick}
            sx={{ 
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Dashboard
          </Button>
        </Box>
      </Toolbar>

      {breadcrumbs.length > 0 && (
        <Box sx={{ px: 3, pb: 1 }}>
          <Breadcrumbs 
            aria-label="breadcrumb"
            sx={{ 
              '& .MuiBreadcrumbs-ol': { 
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.875rem'
              }
            }}
          >
            {breadcrumbs.map((breadcrumb, index) => (
              <Link
                key={breadcrumb.path}
                color="inherit"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(breadcrumb.path);
                }}
                sx={{
                  textDecoration: 'none',
                  color: index === breadcrumbs.length - 1 ? 'white' : 'rgba(255,255,255,0.8)',
                  fontWeight: index === breadcrumbs.length - 1 ? 600 : 400,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {breadcrumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        </Box>
      )}
    </AppBar>
  );
};

export default MainHeader;
