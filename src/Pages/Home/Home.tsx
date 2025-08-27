import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Paper,
  useTheme
} from '@mui/material';
import {
  Code as CodeIcon,
  BugReport as BugReportIcon,
  Speed as SpeedIcon,
  Api as ApiIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
  Build as BuildIcon,
  Architecture as ArchitectureIcon,
  Rocket as RocketIcon
} from '@mui/icons-material';

interface TopicCard {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const topics: TopicCard[] = [
    // Core Hooks
    {
      title: 'Counter Example',
      description: 'Basic counter implementation demonstrating React state management',
      path: '/counter',
      icon: <BuildIcon />,
      category: 'Core Hooks',
      difficulty: 'Beginner'
    },
    {
      title: 'useEffect Hook',
      description: 'Learn about side effects, cleanup, and dependency management in React components',
      path: '/useEffect',
      icon: <BuildIcon />,
      category: 'Core Hooks',
      difficulty: 'Beginner'
    },
    {
      title: 'useRef Hook',
      description: 'Access DOM elements directly and persist values between renders without causing re-renders',
      path: '/useRefParent',
      icon: <BuildIcon />,
      category: 'Core Hooks',
      difficulty: 'Intermediate'
    },
    {
      title: 'useMemo Hook',
      description: 'Optimize performance by memoizing expensive calculations and preventing unnecessary re-computations',
      path: '/useMemo',
      icon: <BuildIcon />,
      category: 'Core Hooks',
      difficulty: 'Intermediate'
    },
    {
      title: 'useCallback Hook',
      description: 'Memoize functions to prevent unnecessary re-renders of child components',
      path: '/useCallBack',
      icon: <BuildIcon />,
      category: 'Core Hooks',
      difficulty: 'Intermediate'
    },
    {
      title: 'useReducer Hook',
      description: 'Manage complex state logic with reducer pattern, similar to Redux',
      path: '/ParentUseReducer',
      icon: <BuildIcon />,
      category: 'Core Hooks',
      difficulty: 'Advanced'
    },
    {
      title: 'useContext Hook',
      description: 'Share data across component tree without prop drilling',
      path: '/ContextMain',
      icon: <BuildIcon />,
      category: 'Core Hooks',
      difficulty: 'Intermediate'
    },

    // Custom Hooks
    {
      title: 'Custom Hooks',
      description: 'Create reusable logic by building your own custom hooks',
      path: '/ParentCustomHok',
      icon: <CodeIcon />,
      category: 'Custom Hooks',
      difficulty: 'Advanced'
    },

    // Advanced Patterns
    {
      title: 'Error Boundaries',
      description: 'Catch JavaScript errors anywhere in the component tree and display fallback UI',
      path: '/ErrorBoundry',
      icon: <BugReportIcon />,
      category: 'Advanced Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'Lazy Loading',
      description: 'Implement code splitting and lazy loading for better performance',
      path: '/LazyLoading',
      icon: <SpeedIcon />,
      category: 'Advanced Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'API Integration',
      description: 'Handle API calls with proper error handling and loading states',
      path: '/APIMainCalling',
      icon: <ApiIcon />,
      category: 'Advanced Patterns',
      difficulty: 'Intermediate'
    },

    // Utility Concepts
    {
      title: 'Debouncing',
      description: 'Optimize performance by limiting the rate of function calls',
      path: '/debounce',
      icon: <SpeedIcon />,
      category: 'Utility Concepts',
      difficulty: 'Intermediate'
    },
    {
      title: 'Function Currying',
      description: 'Learn advanced JavaScript techniques for function composition',
      path: '/FunctionCurrying',
      icon: <PsychologyIcon />,
      category: 'Utility Concepts',
      difficulty: 'Advanced'
    },
    {
      title: 'Component Lifecycle',
      description: 'Understand component mounting, updating, and unmounting phases',
      path: '/lifecycle',
      icon: <SchoolIcon />,
      category: 'Utility Concepts',
      difficulty: 'Intermediate'
    },

    // Design Patterns
    {
      title: 'Custom Hook Pattern',
      description: 'Create reusable custom hooks for common functionality',
      path: '/patterns/1_Custom_Hook_Pattern',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Intermediate'
    },
    {
      title: 'Container & Presentation Pattern',
      description: 'Separate logic from presentation for better maintainability',
      path: '/patterns/2_Container_and_Presentation_Pattern',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Intermediate'
    },
    {
      title: 'Provider Pattern',
      description: 'Use Context API to provide data throughout component tree',
      path: '/patterns/3_Provider_Pattern',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Intermediate'
    },
    {
      title: 'Controlled vs Uncontrolled',
      description: 'Understand the difference between controlled and uncontrolled components',
      path: '/patterns/4_controlled_uncontrolled_component_pattern',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Intermediate'
    },
    {
      title: 'Compound Components Pattern',
      description: 'Create components that work together as a single unit',
      path: '/patterns/5_Compound_Components_patterns',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'Slot Children as Props',
      description: 'Pass components as props for flexible component composition',
      path: '/patterns/6_Slot_Children_as_Props',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'Render Props Pattern',
      description: 'Share code between components using a prop whose value is a function',
      path: '/patterns/7_Render_Props',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'Toggle Render Props',
      description: 'Advanced render props pattern with toggle functionality',
      path: '/patterns/7_Render_Props_2',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'Polymorphic Components',
      description: 'Create components that can render as different HTML elements',
      path: '/patterns/8_Polymorphic_Components_Pattern',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'State Reducer Pattern',
      description: 'Allow users to control state changes through reducer functions',
      path: '/patterns/9_State_Reducer_Pattern',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'State Machine Pattern',
      description: 'Manage complex state transitions using finite state machines',
      path: '/patterns/10_State_Machine_Pattern',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'Form State Machine',
      description: 'Advanced form handling with state machine pattern',
      path: '/patterns/10_State_Machine_Pattern_Form',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Advanced'
    },
    {
      title: 'Factory Components Pattern',
      description: 'Create components dynamically based on configuration or props',
      path: '/patterns/11_Factory_Components_Pattern',
      icon: <ArchitectureIcon />,
      category: 'Design Patterns',
      difficulty: 'Advanced'
    },

    // React 19 Features
    {
      title: 'React 19 Features',
      description: 'Explore the latest features and improvements in React 19',
      path: '/react19',
      icon: <RocketIcon />,
      category: 'React 19 Features',
      difficulty: 'Advanced'
    },
    {
      title: 'Actions in React 19',
      description: 'Learn about the new Actions API for form handling and mutations',
      path: '/react19/actions',
      icon: <RocketIcon />,
      category: 'React 19 Features',
      difficulty: 'Advanced'
    },
    {
      title: 'Simple Actions Demo',
      description: 'Simple examples demonstrating React 19 Actions functionality',
      path: '/react19/simple-actions',
      icon: <RocketIcon />,
      category: 'React 19 Features',
      difficulty: 'Intermediate'
    }
  ];

  const categories = ['Core Hooks', 'Custom Hooks', 'Advanced Patterns', 'Utility Concepts', 'Design Patterns', 'React 19 Features'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const handleTopicClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
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
          React Advanced Topics & Design Patterns
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Master React concepts, advanced patterns, and the latest React 19 features through interactive examples
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: 3
          }}
        >
          <Typography variant="body1" color="text.secondary">
            🚀 Explore React hooks, design patterns, and cutting-edge features with hands-on examples. 
            From basic hooks to advanced architectural patterns, this platform covers everything you need to become a React expert!
          </Typography>
        </Paper>
      </Box>

      {/* Topics Grid */}
      {categories.map((category) => (
        <Box key={category} mb={6}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            {category === 'Core Hooks' && <BuildIcon />}
            {category === 'Custom Hooks' && <CodeIcon />}
            {category === 'Advanced Patterns' && <BugReportIcon />}
            {category === 'Utility Concepts' && <PsychologyIcon />}
            {category === 'Design Patterns' && <ArchitectureIcon />}
            {category === 'React 19 Features' && <RocketIcon />}
            {category}
          </Typography>
          
          <Grid container spacing={3}>
            {topics
              .filter(topic => topic.category === category)
              .map((topic, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    elevation={3}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                        '& .MuiCardActions-root': {
                          opacity: 1
                        }
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                            mr: 2
                          }}
                        >
                          {topic.icon}
                        </Box>
                        <Chip
                          label={topic.difficulty}
                          color={getDifficultyColor(topic.difficulty) as any}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                        {topic.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        {topic.description}
                      </Typography>
                    </CardContent>
                    
                    <CardActions sx={{ opacity: 0.7, transition: 'opacity 0.3s ease-in-out' }}>
                      <Button
                        size="small"
                        variant="contained"
                        fullWidth
                        onClick={() => handleTopicClick(topic.path)}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600
                        }}
                      >
                        Explore Topic
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}

      {/* Footer */}
      <Box textAlign="center" mt={8} pt={4} borderTop={1} borderColor="divider">
        <Typography variant="body2" color="text.secondary">
          Built with ❤️ using React 19, TypeScript, Material-UI, and Tailwind CSS
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Updated with the latest React 19 features and advanced design patterns
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;