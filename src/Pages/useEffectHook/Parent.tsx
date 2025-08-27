import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Divider,
  Chip,
  Alert,
  useTheme
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Code as CodeIcon,
  Info as InfoIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useEffect, useState } from "react";
import Child from "./Child";

const ParentUseEffect: React.FC = () => {
  const [toggle, setToggle] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const theme = useTheme();

  const toggleHandler = () => {
    setToggle(!toggle);
    setClickCount(prev => prev + 1);
  };

  useEffect(() => {
    console.log("toggle click", toggle);
  }, [toggle]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          useEffect Hook Example
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Learn how useEffect manages side effects and component lifecycle
        </Typography>
      </Box>

      {/* Concept Explanation */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <InfoIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            What is useEffect?
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          The <strong>useEffect</strong> Hook lets you perform side effects in functional components. 
          It serves the same purpose as <code>componentDidMount</code>, <code>componentDidUpdate</code>, 
          and <code>componentWillUnmount</code> combined in React classes.
        </Typography>
        <Typography variant="body1" paragraph>
          In this example, we'll see how useEffect:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            Runs after every render when dependencies change
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            Handles component mounting and unmounting
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            Manages side effects like console logging
          </Typography>
        </Box>
      </Paper>

      {/* Interactive Demo */}
      <Card elevation={3} sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Interactive Demo
          </Typography>
          
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Component Status
              </Typography>
              <Chip
                icon={toggle ? <VisibilityIcon /> : <VisibilityOffIcon />}
                label={toggle ? "Child Component Mounted" : "Child Component Unmounted"}
                color={toggle ? "success" : "error"}
                variant="outlined"
                sx={{ fontSize: '1rem', p: 1 }}
              />
            </Box>

            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Toggle Count: {clickCount}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={toggleHandler}
                startIcon={<PlayIcon />}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                {toggle ? 'Unmount Child' : 'Mount Child'}
              </Button>
            </Box>

            <Divider sx={{ width: '100%', my: 2 }} />

            <Box sx={{ width: '100%', minHeight: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {toggle ? (
                <Child />
              ) : (
                <Alert severity="info" sx={{ fontSize: '1.1rem' }}>
                  Child component is currently unmounted
                </Alert>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Code Explanation */}
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <CodeIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
            <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
              Code Breakdown
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              1. State Management
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50', fontFamily: 'monospace' }}>
              {`const [toggle, setToggle] = useState(true);
const [clickCount, setClickCount] = useState(0);`}
            </Paper>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              We use two state variables: <code>toggle</code> to control component visibility and <code>clickCount</code> to track interactions.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              2. useEffect Hook
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50', fontFamily: 'monospace' }}>
              {`useEffect(() => {
  console.log("toggle click", toggle);
}, [toggle]);`}
            </Paper>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              The useEffect runs every time the <code>toggle</code> value changes. The dependency array <code>[toggle]</code> ensures the effect only runs when needed.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              3. Conditional Rendering
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50', fontFamily: 'monospace' }}>
              {`{toggle ? <Child /> : <h2>Child component unmount</h2>}`}
            </Paper>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              We conditionally render the Child component based on the toggle state, demonstrating mounting and unmounting behavior.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Paper elevation={1} sx={{ p: 3, mt: 4, borderRadius: 3, bgcolor: 'primary.50' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          🎯 Key Takeaways
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 0 }}>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            useEffect runs after the component renders
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            Dependencies array controls when the effect runs
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            Perfect for handling side effects like API calls, subscriptions, or DOM manipulation
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ParentUseEffect;